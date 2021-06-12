using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using modelos;

namespace bakend.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class LugarController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LugarController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Lugar
        [HttpGet]
        public async Task<ActionResult<IEnumerable<lugar>>> Getlugares()
        {
            return await _context.lugares.ToListAsync();
        }

        // GET: api/Lugar/5
        [HttpGet("{id}")]
        public async Task<ActionResult<lugar>> Getlugar(int id)
        {
            var lugar = await _context.lugares.FindAsync(id);

            if (lugar == null)
            {
                return NotFound();
            }

            return lugar;
        }

        // PUT: api/Lugar/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putlugar(int id, lugar lugar)
        {
            if (id != lugar.LugarId)
            {
                return BadRequest();
            }

            _context.Entry(lugar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!lugarExists(id))
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

        // POST: api/Lugar
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<lugar>> Postlugar(lugar lugar)
        {
            _context.lugares.Add(lugar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getlugar", new { id = lugar.LugarId }, lugar);
        }

        // DELETE: api/Lugar/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletelugar(int id)
        {
            var lugar = await _context.lugares.FindAsync(id);
            if (lugar == null)
            {
                return NotFound();
            }

            _context.lugares.Remove(lugar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool lugarExists(int id)
        {
            return _context.lugares.Any(e => e.LugarId == id);
        }
    }
}
