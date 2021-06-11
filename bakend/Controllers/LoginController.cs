using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using modelos;
using Tools;


namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
      

        private readonly ApplicationDbContext _context;
        public LoginController(ApplicationDbContext context)
        {
            _context = context;
        }
   public async Task<ActionResult<IEnumerable<usuario>>> GetAllAsyn()
        {
            return await _context.usuarios.ToListAsync();
        }
        [HttpPost]

       
        public async Task<IActionResult> Post([FromBody]usuario usuario)
        {
            try
            {
                usuario.password = Encrypt.GetSHA256(usuario.password);

                 var user = (await _context.Usuario.SingleOrDefaultAsync(x => x.correo == usuario.correo 
                                                                         && x.password == usuario.password   
                 ));
                
                //var user = await _context.usuarios.SingleAsync(b => b.correo == usuario.correo && b.password == usuario.password);
                if(user == null)
                {
                    return BadRequest(new { message = "Usuario o contraseña invalidos" });
                }

                return Ok(new { 
                    id = user.Usuarioid,
                    nombre = user.nombre,
                    role = user.role
                    });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
