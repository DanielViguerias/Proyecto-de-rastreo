using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bakend.Tools;
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
            try
            {
              return await _context.lugares.ToListAsync();  
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }
            
        }

        // GET: api/Lugar/5
        [HttpGet("{id}")]
        public async Task<ActionResult<lugar>> Getlugar(int id)
        {
            var lugar = await _context.lugares.FindAsync(id);
            try
            {
                if (lugar == null)
            {
                return NotFound();
            }

            return lugar;
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }
            
        }

        // PUT: api/Lugar/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putlugar(int id, lugar lugar)
        {
            try
            {
                 if (id != lugar.LugarId)
            {
                return BadRequest();
            }

            _context.Entry(lugar).State = EntityState.Modified;
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }
           

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!lugarExists(id))
                {
                    return NotFound();
                }
                else
                {
                    ELog.Add(ex.ToString());
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

            try
            {
                _context.lugares.Add(lugar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getlugar", new { id = lugar.LugarId }, lugar);
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }
            
        }

        // DELETE: api/Lugar/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletelugar(int id)
        {
            try
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
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }
            
        }

        private bool lugarExists(int id)
        {
            return _context.lugares.Any(e => e.LugarId == id);
        }
    }
}
