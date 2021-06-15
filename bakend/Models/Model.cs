using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace modelos
{
    
    public class ApplicationDbContext: DbContext
    {
            protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   
            
            modelBuilder.Entity<posicion>()
            .Property(b => b.FStamp)
            .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<usuario>(entity => {
            entity.HasIndex(e => e.correo).IsUnique();
        });
    }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

        public DbSet<usuario> Usuario { get; set; }
        public DbSet<usuario> usuarios {get; set;}
        public DbSet<recurso> recursos {get; set;}
        public DbSet<lugar> lugares {get; set;}
        public DbSet<movimiento> movimientos {get; set;}
        public DbSet<geolug> geolugares {get; set;}
        public DbSet<punto> puntos {get; set;}
        public DbSet<ent_sal> EntradasSalidas {get; set;}
        public DbSet<posicion> posiciones {get; set;}
    }
    [Table("Usuario")]
    public class usuario
    {
        [Key]
        
        public int? Usuarioid {get; set;}
        
        public string nombre {get; set;}
        [EmailAddress,Required]
        public string correo {get; set;}
        [MinLength(8,ErrorMessage="El password requiere minimo 8 caracteres"),Required]
        public string password {get; set;}
        public string role {get;set;}
        public bool active {get;set;} = true;

    }
    [Table("Recurso")]
    public class recurso{

        [Key]
        public int RecursoId{get; set;}
        [Required]
        public string nombre {get;set;}
        [Required]
        public string tipo{get;set;}
        public bool active {get;set;} = true;       

    }
    [Table("Lugar")]
    public class lugar{
        [Key]
        public int LugarId{ get; set;}
        [Required]
        public string nombre {get;set;}
        [Required]
        public string domicilio {get;set;}
        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal latitud {get;set;}
        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal longitud {get; set;}
        public bool active {get;set;} = true;       

    }
    [Table("Usu_Rec")]
    public class movimiento
    {
        [Key]
        public int MovId{ get; set;}
        public int UsuarioId {get; set;}
        [ForeignKey("UsuarioId")]
        public usuario usuario{get;set;}
        public int RecursoId {get; set;}
        [ForeignKey("RecursoId")]
        public recurso recurso{get;set;}
        [Timestamp]
        public byte FInicio {get; set;}
        [Timestamp]
        public byte FFin {get; set;}
        public bool active {get;set;} = true;    

    }

    public class geolug{
         [Key]
        public int GLId{ get; set;}
        public int LugId {get; set;}
        [ForeignKey("LugarId")]
        public lugar lugar{get;set;}
        public bool active {get;set;} = true;    


    }

    public class punto{
        [Key]
        public int PuntoId{get; set;}
        public int GLId{get;set;}
        [ForeignKey("GLId")]
        public geolug geolug {get;set;}
         [Required]
         [Column(TypeName = "decimal(9, 6)")]
        public decimal latitud {get;set;}
        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal longitud {get; set;}
        public bool active {get;set;} = true;       
       
    }

    public class posicion {
        
        [Key]
        public int PosId { get; set;}
        public int RecursoId{get;set;}
        [ForeignKey("RecursoId")]
        public recurso recurso{get;set;}

        public int UsuarioId{get;set;}
        [ForeignKey("UsuarioId")]
        public usuario usuario{get;set;}
        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal latitud {get;set;}
        [Required]
        [Column(TypeName = "decimal(9, 6)")]
        public decimal longitud {get; set;}
        [DataType(DataType.Date)]
        public DateTime FStamp {get; set;}
    
    }

    public class ent_sal{
        [Key]
        public int EntSalId{get; set;}
         public int RecursoId { get; set; }
        [ForeignKey("RecursoId")]
        public recurso recurso { get; set; }
        public int GLId { get; set; }
        [ForeignKey("GLId")]
        public geolug geolug { get; set; }
        [Timestamp]
        public byte Entrada {get; set;}
        [Timestamp]
        public byte Salida {get; set;}
        public bool active {get;set;} = true;    


    }
}