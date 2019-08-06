using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MMTAPI.Model;

namespace MMTAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserFavouritesController : ControllerBase
    {
        private readonly myfilmbaseContext _context;

        public UserFavouritesController(myfilmbaseContext context)
        {
            _context = context;
        }

        // GET: api/UserFavourites
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserFavourites>>> GetUserFavourites()
        {
            return await _context.UserFavourites.ToListAsync();
        }

        // GET: api/UserFavourites/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserFavourites>> GetUserFavourites(int id)
        {
            var userFavourites = await _context.UserFavourites.FindAsync(id);

            if (userFavourites == null)
            {
                return NotFound();
            }

            return userFavourites;
        }

        // GET: api/UserFavourites/Get/{user_id}/{media_type}/{media_id}
        [HttpGet]
        [Route("Get")]
        [Route("Get/{user_id}/{media_type}/{media_id}")]
        public async Task<ActionResult<UserFavourites>> GetUserFavourites(int user_id, String media_type, int media_id) {
            var uf = await _context.UserFavourites.FirstOrDefaultAsync(f => f.UserId == user_id && f.MediaType.Equals(media_type) && f.MediaId == media_id);

            if (uf == null) {
                return NotFound();
            }

            return uf;
        }

        // PUT: api/UserFavourites/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserFavourites(int id, UserFavourites userFavourites)
        {
            if (id != userFavourites.Id)
            {
                return BadRequest();
            }

            _context.Entry(userFavourites).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserFavouritesExists(userFavourites.MediaId, userFavourites.MediaType, userFavourites.UserId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserFavourites
        [HttpPost]
        public async Task<ActionResult<UserFavourites>> PostUserFavourites(UserFavourites userFavourites)
        {
            _context.UserFavourites.Add(userFavourites);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserFavouritesExists(userFavourites.MediaId, userFavourites.MediaType, userFavourites.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserFavourites", new { id = userFavourites.Id }, userFavourites);
        }

        // DELETE: api/UserFavourites/

        // DELETE: api/UserFavourites/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserFavourites>> DeleteUserFavourites(int id)
        {
            var userFavourites = await _context.UserFavourites.FindAsync(id);
            if (userFavourites == null)
            {
                return NotFound();
            }

            _context.UserFavourites.Remove(userFavourites);
            await _context.SaveChangesAsync();

            return userFavourites;
        }

        private bool UserFavouritesExists(int media_id, String media_type, int user_id)
        {
            return _context.UserFavourites.Any(e => e.MediaId == media_id && e.MediaType.Equals(media_type) && e.UserId == user_id);
        }
    }
}
