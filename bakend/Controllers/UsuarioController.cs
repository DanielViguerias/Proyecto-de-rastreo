using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using modelos;
using bakend.DTO;
using Tools;
using System.Security.Claims;

namespace bakend.Controllers
{
    
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]

    public class UsuarioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

         public async Task SaveUser(usuario usuario) 
        {
            _context.Add(usuario);
            await _context.SaveChangesAsync();
        }
        public UsuarioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<usuario>>> Getusuarios()
        {
            return await _context.usuarios.ToListAsync();
        }

        // GET: api/Usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<usuario>> Getusuario(int id)
        {
            var usuario = await _context.usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuario/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Putusuario(int id, usuario usuario)
        {
            if (id != usuario.Usuarioid)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!usuarioExists(id))
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
        //[Route("CambiarPassowrd")]
        [HttpPut("cambiarpass")]
        public async Task<IActionResult> CambiarPassword([FromBody] CambiarPasswordDTO cambiarPassword)
        {
            
            try
            {   var Identity = HttpContext.User.Identity as ClaimsIdentity;
                int idUsuario = JwtConfigurator.GetTokenIdUsuario(Identity);
                string passwordEncriptado = Encrypt.GetSHA256(cambiarPassword.passwordAnterior);
                
                //var usuario = await _context.Usuario.Where(x => x.Usuarioid == idUsuario && x.password == passwordEncriptado).FirstOrDefaultAsync();
                var usuario = await _context.Usuario.FindAsync(idUsuario);

                if((usuario == null) || (usuario.password != passwordEncriptado))
                {
                    return BadRequest(new { message = "La password es incorrecto "  });
                } else
                {
                    usuario.password = Encrypt.GetSHA256(cambiarPassword.nuevaPassword);
                    _context.Update(usuario);
                     await _context.SaveChangesAsync();

                    return Ok(new { message = "El password fue actualizado con exito!" });

                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        // POST: api/Usuario
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<usuario>> Postusuario([FromBody]usuario usuario)
        {
            try
            {
                
                 var validateExistence = await _context.Usuario.AnyAsync(x => x.correo == usuario.correo);;
                if (validateExistence)
                {
                    return BadRequest(new { message ="El usuario " + usuario.correo + " ya existe!" } );
                }
                string hpass = Encrypt.GetSHA256(usuario.password);
                //string hpass = BCrypt.Net.BCrypt.HashPassword(usuario.password);
                 usuario.password = (hpass);
                 _context.usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getusuario", new { id = usuario.Usuarioid }, usuario);
            }
            catch (System.Exception)
            {
                
                throw;
            }
            
        }

        // DELETE: api/Usuario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteusuario(int id)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            _context.usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool usuarioExists(int id)
        {
            return _context.usuarios.Any(e => e.Usuarioid == id);
        }
    }
}
