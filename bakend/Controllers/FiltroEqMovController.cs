
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
    public class FiltroEqMovController: ControllerBase{
           private readonly ApplicationDbContext _context;

        public FiltroEqMovController(ApplicationDbContext context)
        {
            _context = context;
            
        } 
        
        [HttpGet]

          public ActionResult<IQueryable<movimiento>> Getmovimiento()
         {

             return _context.movimientos;
         }
    }
}
     


      


 