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
        public async Task<ActionResult<IEnumerable<UserTrackings>>> GetUserTrackings()
        {
            return await _context.UserTrackings.ToListAsync();
        }

        // GET: api/UserTrackings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTrackings>> GetUserTracking(int id)
        {
            var userTrackings = await _context.UserTrackings.FindAsync(id);

            if (userTrackings == null)
            {
                return NotFound();
            }

            return userTrackings;
        }

        // PUT: api/UserTrackings/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserTrackings(int id, UserTrackings userTrackings)
        {
            if (id != userTrackings.Id)
            {
                return BadRequest();
            }

            _context.Entry(userTrackings).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserTrackingsExists(id))
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
        public async Task<ActionResult<UserTrackings>> PostUserTrackings(UserTrackings userTrackings)
        {
            _context.UserTrackings.Add(userTrackings);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserTrackingsExists(userTrackings.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserTracking", new { id = userTrackings.Id }, userTrackings);
        }

        // DELETE: api/UserTrackings/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserTrackings>> DeleteUserTrackings(int id)
        {
            var userTrackings = await _context.UserTrackings.FindAsync(id);
            if (userTrackings == null)
            {
                return NotFound();
            }

            _context.UserTrackings.Remove(userTrackings);
            await _context.SaveChangesAsync();

            return userTrackings;
        }

        private bool UserTrackingsExists(int id)
        {
            return _context.UserTrackings.Any(e => e.Id == id);
        }
    }
}
