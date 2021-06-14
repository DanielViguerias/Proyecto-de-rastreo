using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using bakend.Tools;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using modelos;

namespace bakend.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class PuntoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PuntoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Punto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<punto>>> Getpuntos()
        {
            try
            {
                return await _context.puntos.ToListAsync();
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }

        }

        // GET: api/Punto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<punto>> Getpunto(int id)
        {
            try
            {
                var punto = await _context.puntos.FindAsync(id);

                if (punto == null)
                {
                    return NotFound();
                }

                return punto;
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }

        }

        // PUT: api/Punto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putpunto(int id, punto punto)
        {

            if (id != punto.PuntoId)
            {
                return BadRequest();
            }

            _context.Entry(punto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!puntoExists(id))
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

        // POST: api/Punto
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<punto>> Postpunto(punto punto)
        {
            try
            {
                _context.puntos.Add(punto);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Getpunto", new { id = punto.PuntoId }, punto);
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }

        }

        // DELETE: api/Punto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletepunto(int id)
        {
            try
            {
                var punto = await _context.puntos.FindAsync(id);
                if (punto == null)
                {
                    return NotFound();
                }

                _context.puntos.Remove(punto);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }

        }

        private bool puntoExists(int id)
        {
            return _context.puntos.Any(e => e.PuntoId == id);
        }
    }
}
