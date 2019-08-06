using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MMTAPI.Helper;
using MMTAPI.Model;

namespace MMTAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ApiController]
    public class MoviesController : ControllerBase {
        public class MediaIdDTO {
            public int id { get; set; }
            public String media_type { get; set; }
        }

        private readonly myfilmbaseContext _context;

        public MoviesController(myfilmbaseContext context) {
            _context = context;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetMovie() {
            return await _context.Movie.ToListAsync();
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id) {
            var movie = await _context.Movie.FindAsync(id);

            if (movie == null) {
                return NotFound();
            }

            return movie;
        }

        // GET: api/Movies/GetByIdAndType/{type}/{id}
        // Get media by media id and media type
        [HttpGet]
        [Route("GetByIdAndType")]
        [Route("GetByIdAndType/{type}/{id}")]
        public async Task<ActionResult<Movie>> GetMovie(int id, string type) {
            var movie = await _context.Movie.FirstOrDefaultAsync(m => m.MediaId == id && m.MediaType.Equals(type));

            if (movie == null) {
                return NotFound();
            }
            return Ok(movie);
        }

        // GET: api/Movies/GetFavourites/{userId}
        // Get favourites by user id
        [HttpGet]
        [Route("GetFavourites")]
        [Route("GetFavourites/{userId}")]
        public async Task<ActionResult<IEnumerable<Movie>>> GetFavourites(int userId) {
            return await _context.Movie.FromSql($"Select Movie.* From Movie Inner Join UserFavourites On Movie.media_id = UserFavourites.media_id AND Movie.media_type = UserFavourites.media_type where UserFavourites.user_id = {userId}").ToListAsync();
        }

        // PUT: api/Movies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovie(int id, Movie movie)
        {
            if (id != movie.Id)
            {
                return BadRequest();
            }

            _context.Entry(movie).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Movies
        [HttpPost]
        public async Task<ActionResult<Movie>> PostMovie(MediaIdDTO dto)
        {
            Movie media = TMDBHelper.getMediaById(dto.id, dto.media_type);

            _context.Movie.Add(media);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MovieExists(dto.id, dto.media_type)) {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMovie", new { id = media.Id }, media);
        }

        // DELETE: api/Movies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Movie>> DeleteMovie(MediaIdDTO id)
        {
            var movie = await _context.Movie.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }

            _context.Movie.Remove(movie);
            await _context.SaveChangesAsync();

            return movie;
        }

        private bool MovieExists(int id, String media_type)
        {
            return _context.Movie.Any(e => e.MediaId == id && e.MediaType.Equals(media_type));
        }
    }
}
