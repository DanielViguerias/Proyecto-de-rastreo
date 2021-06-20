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
                return await _context.puntos.Where(x => x.active==true).ToListAsync();
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                return NotFound("Ocurrio un error al obtener los puntos.");
            }

        }

        // GET: api/Punto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<punto>> Getpunto(int id)
        {
            try
            {
                var punto = await _context.puntos.FindAsync(id);

                if (punto == null  || punto.active==false)
                {
                    return NotFound("El punto no existe");
                }

                return punto;
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                return NotFound("Ocurrio un error al obtener el punto.");
            }

        }

        // PUT: api/Punto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putpunto(int id, punto punto)
        {

            if (id != punto.PuntoId)
            {
                return BadRequest("No se encontro el punto");
            }

            _context.Entry(punto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!puntoExists(id))
                {
                    return NotFound("No se encontro el punto");
                }
                else
                {
                     ELog.Add(ex.ToString());
                    return NotFound("Ocurrio un error al actualizar el punto.");;
                }
            }

            return Ok("Actualizado con exito");
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
                return NotFound("Ocurrio un error al registrar el punto.");;
            }

        }

        // DELETE: api/Punto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletepunto(int id)
        {
            try
            {
                var punto = await _context.puntos.FindAsync(id);
                if (punto == null || punto.active == false)
                {
                    return NotFound("Punto no encontrado");
                }
            punto.active = false;
            _context.puntos.Update(punto);
                await _context.SaveChangesAsync();

                return Ok("Eliminado con exito");
            }
            catch (Exception ex)
            {
                ELog.Add(ex.ToString());
                return NotFound("Ocurrio un error al borrar el punto.");;
            }

        }

        private bool puntoExists(int id)
        {
            return _context.puntos.Any(e => e.PuntoId == id);
        }
    }
}
