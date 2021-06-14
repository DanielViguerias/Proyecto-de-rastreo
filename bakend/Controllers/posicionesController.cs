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
    public class posicionesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public posicionesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/posiciones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<posicion>>> Getposiciones()
        {
            try
            {
                return await _context.posiciones.ToListAsync();
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }

        }

        // GET: api/posiciones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<posicion>> Getposicion(int id)
        {
            try
            {
                var posicion = await _context.posiciones.FindAsync(id);

                if (posicion == null)
                {
                    return NotFound();
                }

                return posicion;
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }

        }

        // PUT: api/posiciones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putposicion(int id, posicion posicion)
        {
            if (id != posicion.PosId)
            {
                return BadRequest();
            }

            _context.Entry(posicion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!posicionExists(id))
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

        // POST: api/posiciones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<posicion>> Postposicion(posicion posicion)
        {
            try
            {
                _context.posiciones.Add(posicion);
                await _context.SaveChangesAsync();

                return CreatedAtAction("Getposicion", new { id = posicion.PosId }, posicion);
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }

        }

        // DELETE: api/posiciones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteposicion(int id)
        {
            try
            {
                var posicion = await _context.posiciones.FindAsync(id);
                if (posicion == null)
                {
                    return NotFound();
                }

                _context.posiciones.Remove(posicion);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                throw;
            }

        }

        private bool posicionExists(int id)
        {
            return _context.posiciones.Any(e => e.PosId == id);
        }
    }
}
