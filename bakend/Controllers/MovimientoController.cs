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
    public class MovimientoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MovimientoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Movimiento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<movimiento>>> Getmovimientos()
        {
            return await _context.movimientos.ToListAsync();
        }

        // GET: api/Movimiento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<movimiento>> Getmovimiento(int id)
        {
            var movimiento = await _context.movimientos.FindAsync(id);

            if (movimiento == null)
            {
                return NotFound();
            }

            return movimiento;
        }

        // PUT: api/Movimiento/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putmovimiento(int id, movimiento movimiento)
        {
            if (id != movimiento.MovId)
            {
                return BadRequest();
            }

            _context.Entry(movimiento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!movimientoExists(id))
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

        // POST: api/Movimiento
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<movimiento>> Postmovimiento(movimiento movimiento)
        {
            _context.movimientos.Add(movimiento);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getmovimiento", new { id = movimiento.MovId }, movimiento);
        }

        // DELETE: api/Movimiento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletemovimiento(int id)
        {
            var movimiento = await _context.movimientos.FindAsync(id);
            if (movimiento == null)
            {
                return NotFound();
            }

            _context.movimientos.Remove(movimiento);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool movimientoExists(int id)
        {
            return _context.movimientos.Any(e => e.MovId == id);
        }
    }
}
