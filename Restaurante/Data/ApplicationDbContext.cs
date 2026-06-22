using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Restaurante.Models;

namespace Restaurante.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : IdentityDbContext(options)
    {
        public DbSet<MenuModel> Menus { get; set; }
        public DbSet<ClienteModel> Clientes { get; set; }
        public DbSet<OrdenModel> Ordenes { get; set; }
        public DbSet<DetalleOrdenModel> DetalleOrden { get; set; }
    }
}
