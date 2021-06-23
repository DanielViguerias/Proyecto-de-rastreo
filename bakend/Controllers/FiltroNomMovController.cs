using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using modelos;

namespace bakend.Controllers
{
    public class FiltroNomMovController: ControllerBase{
           private readonly ApplicationDbContext _context;

        public FiltroNomMovController(ApplicationDbContext context)
        {
            _context = context;
            
        } 
        
        [HttpPost("/api/fnom")]
        public Task<List<movimiento>> GetResult([FromQuery]string busqueda){

            return _context.movimientos.Where(x => x.Usuario.nombre == busqueda).ToListAsync();
              
        }
          
    }
}
     


      


 