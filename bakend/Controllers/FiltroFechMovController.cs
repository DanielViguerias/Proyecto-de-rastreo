





using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using modelos;

namespace bakend.Controllers
{
    public class FiltroFechMovController : ControllerBase{
        private readonly ApplicationDbContext _context;

        public FiltroFechMovController(ApplicationDbContext context){
            _context = context;
        }

        [HttpPost("/api/ffechIni")]
        public Task<List<movimiento>> GetInicio([FromQuery]string busqueda){

            var fecha = DateTime.Parse(busqueda);
            return _context.movimientos.Where(x => x.FInicio.Year == fecha.Year
            && x.FInicio.Month == fecha.Month
            && x.FInicio.Day == fecha.Day).ToListAsync();
        }
        [HttpPost("/api/ffechFin")]
        public Task<List<movimiento>> GetFin([FromQuery]string busqueda){

            var fecha = DateTime.Parse(busqueda);
            return _context.movimientos.Where(x => x.FFin.Year == fecha.Year
            && x.FFin.Month == fecha.Month
            && x.FFin.Day == fecha.Day).ToListAsync();
        }

    }
}