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
    public class UserWatchlistController : ControllerBase
    {
        private readonly MyMovieTrackerContext _context;

        public UserWatchlistController(MyMovieTrackerContext context)
        {
            _context = context;
        }

        // GET: api/UserWatchlist
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserWatchlist>>> GetUserWatchlist()
        {
            return await _context.UserWatchlist.ToListAsync();
        }

        // GET: api/UserWatchlist/5
        [HttpGet("{user_id}/{media_type}/{media_id}")]
        public async Task<ActionResult<UserWatchlist>> GetUserWatchlist(int user_id, String media_type, int media_id)
        {
            var userWatchlist = await _context.UserWatchlist.FindAsync(user_id, media_type, media_id);

            if (userWatchlist == null)
            {
                return NotFound();
            }

            return userWatchlist;
        }

        // POST: api/UserWatchlist
        [HttpPost]
        public async Task<ActionResult<UserWatchlist>> PostUserWatchlist(UserWatchlist userWatchlist)
        {
            _context.UserWatchlist.Add(userWatchlist);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserWatchlistExists(userWatchlist.UserId, userWatchlist.MediaType, userWatchlist.MediaId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserWatchlist", new { user_id = userWatchlist.UserId, media_type = userWatchlist.MediaType, media_id = userWatchlist.MediaId }, userWatchlist);
        }

        // DELETE: api/UserWatchlist/5
        [HttpDelete("{user_id}/{media_type}/{media_id}")]
        public async Task<ActionResult<UserWatchlist>> DeleteUserWatchlist(int user_id, String media_type, int media_id)
        {
            var userWatchlist = await _context.UserWatchlist.FindAsync(user_id, media_type, media_id);
            if (userWatchlist == null)
            {
                return NotFound();
            }

            _context.UserWatchlist.Remove(userWatchlist);
            await _context.SaveChangesAsync();

            return userWatchlist;
        }

        private bool UserWatchlistExists(int user_id, String media_type, int media_id)
        {
            return _context.UserWatchlist.Any(e => e.UserId == user_id && e.MediaType.Equals(media_type) && e.MediaId == media_id);
        }
    }
}
