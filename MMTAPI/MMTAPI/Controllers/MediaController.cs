using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MMTAPI.Helper;
using MMTAPI.Model;

namespace MMTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        public class MediaDTO
        {
            public int media_id { get; set; }
            public String media_type { get; set; }
        }

        private readonly MyMovieTrackerContext _context;

        public MediaController(MyMovieTrackerContext context)
        {
            _context = context;
        }

        // GET: api/Media
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetMedia()
        {
            return await _context.Media.ToListAsync();
        }

        // GET: api/Media/5
        [HttpGet("{media_type}/{media_id}")]
        public async Task<ActionResult<Media>> GetMedia(String media_type, int media_id)
        {
            var media = await _context.Media.FindAsync(media_type, media_id);

            if (media == null)
            {
                return NotFound();
            }

            return media;
        }

        // GET: api/Movies/GetFavourites/{userId}
        // Get favourites by user id
        [HttpGet]
        [Route("GetFavourites")]
        [Route("GetFavourites/{user_id}")]
        public async Task<ActionResult<IEnumerable<Media>>> GetFavourites(int user_id) {
            return await _context.Media.FromSql($"Select Media.* From Media Inner Join UserFavourites On Media.media_id = UserFavourites.media_id AND Media.media_type = UserFavourites.media_type where UserFavourites.user_id = {user_id}").ToListAsync();
        }

        // GET: api/Movies/GetWatchlist/{userId}
        // Get watchlist by user id
        [HttpGet]
        [Route("GetWatchlist")]
        [Route("GetWatchlist/{user_id}")]
        public async Task<ActionResult<IEnumerable<Media>>> GetWatchlist(int user_id) {
            return await _context.Media.FromSql($"Select Media.* From Media Inner Join UserWatchlist On Media.media_id = UserWatchlist.media_id AND Media.media_type = UserWatchlist.media_type where UserWatchlist.user_id = {user_id}").ToListAsync();
        }

        // POST: api/Media
        [HttpPost]
        public async Task<ActionResult<Media>> PostMedia(MediaDTO dto)
        {
            Media media = TMDBHelper.getMediaById(dto.media_id, dto.media_type);
            _context.Media.Add(media);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MediaExists(media.MediaType, media.MediaId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMedia", new { media_type = media.MediaType, media_id = media.MediaId }, media);
        }

        // DELETE: api/Media/5
        [HttpDelete("{media_type}/{media_id}")]
        public async Task<ActionResult<Media>> DeleteMedia(String media_type, int media_id)
        {
            var media = await _context.Media.FindAsync(media_type, media_id);
            if (media == null)
            {
                return NotFound();
            }

            _context.Media.Remove(media);
            await _context.SaveChangesAsync();

            return media;
        }

        private bool MediaExists(String media_type, int media_id)
        {
            return _context.Media.Any(e => e.MediaType.Equals(media_type) && e.MediaId == media_id);
        }
    }
}
