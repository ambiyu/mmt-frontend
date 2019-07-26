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
    public class UserTrackingsController : ControllerBase
    {
        private readonly myfilmbaseContext _context;

        public UserTrackingsController(myfilmbaseContext context)
        {
            _context = context;
        }

        // GET: api/UserTrackings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTracking>>> GetUserTracking()
        {
            return await _context.UserTracking.ToListAsync();
        }

        // GET: api/UserTrackings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTracking>> GetUserTracking(int id)
        {
            var userTracking = await _context.UserTracking.FindAsync(id);

            if (userTracking == null)
            {
                return NotFound();
            }

            return userTracking;
        }

        // PUT: api/UserTrackings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserTracking(int id, UserTracking userTracking)
        {
            if (id != userTracking.TrackingId)
            {
                return BadRequest();
            }

            _context.Entry(userTracking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTrackingExists(id))
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

        // POST: api/UserTrackings
        [HttpPost]
        public async Task<ActionResult<UserTracking>> PostUserTracking(UserTracking userTracking)
        {
            _context.UserTracking.Add(userTracking);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserTrackingExists(userTracking.TrackingId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserTracking", new { id = userTracking.TrackingId }, userTracking);
        }

        // DELETE: api/UserTrackings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserTracking>> DeleteUserTracking(int id)
        {
            var userTracking = await _context.UserTracking.FindAsync(id);
            if (userTracking == null)
            {
                return NotFound();
            }

            _context.UserTracking.Remove(userTracking);
            await _context.SaveChangesAsync();

            return userTracking;
        }

        private bool UserTrackingExists(int id)
        {
            return _context.UserTracking.Any(e => e.TrackingId == id);
        }
    }
}
