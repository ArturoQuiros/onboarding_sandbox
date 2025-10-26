using System;
using Microsoft.EntityFrameworkCore;
using WS_Onboarding.Models;

namespace WS_Onboarding.Data;

public class ApplicatonDBContext : DbContext
{
    public ApplicatonDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {

    }
    public DbSet<Pais> Paises { get; set; }
    public DbSet<Rol> Roles { get; set; }
    public DbSet<UsuarioInterno> UsuariosInternos { get; set; }
    public DbSet<UsuarioExterno> UsuariosExternos { get; set; }
    public DbSet<Servicio> Servicios { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Contrato> Contratos { get; set; }
    public DbSet<ContratoServicio> Contrato_Servicios { get; set; }
    public DbSet<Tareas> Tareas { get; set; }
    public DbSet<EstadosTarea> Estados_Tarea { get; set; }
    public DbSet<TareaContrato> Tarea_Contrato { get; set; }
}
