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
        private readonly MyMovieTrackerContext _context;

        public UserFavouritesController(MyMovieTrackerContext context)
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
        [HttpGet("{user_id}/{media_type}/{media_id}")]
        public async Task<ActionResult<UserFavourites>> GetUserFavourites(int user_id, String media_type, int media_id)
        {
            var userFavourites = await _context.UserFavourites.FindAsync(user_id, media_type, media_id);

            if (userFavourites == null)
            {
                return NotFound();
            }

            return userFavourites;
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
                if (UserFavouritesExists(userFavourites.UserId, userFavourites.MediaType, userFavourites.MediaId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            //return Ok(userFavourites);
            return CreatedAtAction("GetUserFavourites", new { user_id = userFavourites.UserId, media_type = userFavourites.MediaType, media_id = userFavourites.MediaId }, userFavourites);
        }

        // DELETE: api/UserFavourites/5
        [HttpDelete("{user_id}/{media_type}/{media_id}")]
        public async Task<ActionResult<UserFavourites>> DeleteUserFavourites(int user_id, String media_type, int media_id)
        {
            var userFavourites = await _context.UserFavourites.FindAsync(user_id, media_type, media_id);
            if (userFavourites == null)
            {
                return NotFound();
            }

            _context.UserFavourites.Remove(userFavourites);
            await _context.SaveChangesAsync();

            return userFavourites;
        }

        private bool UserFavouritesExists(int user_id, String media_type, int media_id)
        {
            return _context.UserFavourites.Any(e => e.UserId == user_id && e.MediaType.Equals(media_type) && e.MediaId == media_id);
        }
    }
}
