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
    public class RecursoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RecursoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Recurso
        [HttpGet]
        public async Task<ActionResult<IEnumerable<recurso>>> Getrecursos()
        {
            return await _context.recursos.ToListAsync();
        }

        // GET: api/Recurso/5
        [HttpGet("{id}")]
        public async Task<ActionResult<recurso>> Getrecurso(int id)
        {
            var recurso = await _context.recursos.FindAsync(id);

            if (recurso == null)
            {
                return NotFound();
            }

            return recurso;
        }

        // PUT: api/Recurso/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putrecurso(int id, recurso recurso)
        {
            if (id != recurso.RecursoId)
            {
                return BadRequest();
            }

            _context.Entry(recurso).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!recursoExists(id))
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

        // POST: api/Recurso
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<recurso>> Postrecurso(recurso recurso)
        {
            _context.recursos.Add(recurso);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getrecurso", new { id = recurso.RecursoId }, recurso);
        }

        // DELETE: api/Recurso/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleterecurso(int id)
        {
            var recurso = await _context.recursos.FindAsync(id);
            if (recurso == null)
            {
                return NotFound();
            }

            _context.recursos.Remove(recurso);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool recursoExists(int id)
        {
            return _context.recursos.Any(e => e.RecursoId == id);
        }
    }
}
