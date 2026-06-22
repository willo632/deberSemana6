
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurante.Data;
using Restaurante.Models;
using Restaurante.Models.ViewModel;

public class OrdenController : Controller
{
    private readonly ApplicationDbContext _context;

    public OrdenController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: ORDENMODELS
    public async Task<IActionResult> Index()    
    {
        var ordenes = await _context.Ordenes
           .Include(orden => orden.Cliente)
           .Include(orden => orden.DetallesOrden)
           .OrderByDescending(orden => orden.FechaOrden)
           .ToListAsync();

        return View(ordenes);
    }

    // GET: ORDENMODELS/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id is null)
        {
            return NotFound();
        }

        var orden = await _context.Ordenes
            .Include(item => item.Cliente)
            .Include(item => item.DetallesOrden)
            .ThenInclude(detalle => detalle.Menu)
            .FirstOrDefaultAsync(item => item.Id == id);

        return orden is null ? NotFound() : View(orden);
    }

    // GET: ORDENMODELS/Create
    public async Task<IActionResult> Create()
    {
        var viewModel = new OrdenCreateViewModel();
        await CargarListasAsync(viewModel);
        return View(viewModel);
    }

    // POST: ORDENMODELS/Create
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(OrdenCreateViewModel viewModel)
    {
        var detallesValidos = viewModel.Detalles
            .Where(detalle => detalle.MenuId.HasValue && detalle.Cantidad > 0)
            .ToList();

        if (detallesValidos.Count == 0)
        {
            ModelState.AddModelError(string.Empty, "Agregue al menos un menu a la orden.");
        }

        var clienteExiste = await _context.Clientes.AnyAsync(cliente => cliente.Id == viewModel.ClienteId);
        if (!clienteExiste)
        {
            ModelState.AddModelError(nameof(viewModel.ClienteId), "Seleccione un cliente valido.");
        }

        if (!ModelState.IsValid)
        {
            await CargarListasAsync(viewModel);
            return View(viewModel);
        }

        var menuIds = detallesValidos.Select(detalle => detalle.MenuId!.Value).ToList();
        var menus = await _context.Menus
            .Where(menu => menuIds.Contains(menu.Id) && menu.Disponible)
            .ToDictionaryAsync(menu => menu.Id);

        var orden = new OrdenModel
        {
            ClienteId = viewModel.ClienteId,
            FechaOrden = DateTime.Now
        };

        foreach (var detalleInput in detallesValidos)
        {
            if (!menus.TryGetValue(detalleInput.MenuId!.Value, out var menu))
            {
                ModelState.AddModelError(string.Empty, "Uno de los menus seleccionados no esta disponible.");
                await CargarListasAsync(viewModel);
                return View(viewModel);
            }

            var subtotal = menu.Precio * detalleInput.Cantidad;
            orden.DetallesOrden.Add(new DetalleOrdenModel
            {
                MenuId = menu.Id,
                Cantidad = detalleInput.Cantidad,
                PrecioUnitario = menu.Precio,
                Subtotal = subtotal
            });
        }

        orden.Subtotal = orden.DetallesOrden.Sum(detalle => detalle.Subtotal);
        orden.Iva = orden.Subtotal * 0.15m;
        orden.Total = orden.Subtotal + orden.Iva;
        _context.Ordenes.Add(orden);
        await _context.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }

    private async Task CargarListasAsync(OrdenCreateViewModel viewModel)
    {
        var clientes = await _context.Clientes
            .OrderBy(cliente => cliente.Apellido)
            .ThenBy(cliente => cliente.Nombre)
            .ToListAsync();

        var menus = await _context.Menus
            .Where(menu => menu.Disponible)
            .OrderBy(menu => menu.Nombre)
            .ToListAsync();

        viewModel.Cliente = clientes
            .Select(cliente => new ClienteOptionViewModel
            {
                ClienteId = cliente.Id,
                NombreCompleto = cliente.Nombre + " " + cliente.Apellido
            })
            .ToList();

        viewModel.Menus = menus
            .Select(menu => new MenuOptionViewModel
            {
                MenuId = menu.Id,
                Nombre = menu.Nombre,
                Descripcion = menu.Descripcion,
                Precio = menu.Precio
            })
            .ToList();
    }
}
