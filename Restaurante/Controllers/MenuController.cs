
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurante.Models;
using Restaurante.Data;

public class MenuController : Controller
{
    private readonly ApplicationDbContext _context;

    public MenuController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: MENUMODELS
    public async Task<IActionResult> Index()    
    {
        return View(await _context.Menus.ToListAsync());
    }

    // GET: MENUMODELS/Details/5
    public async Task<IActionResult> Details(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var menumodel = await _context.Menus
            .FirstOrDefaultAsync(m => m.Id == id);
        if (menumodel == null)
        {
            return NotFound();
        }

        return View(menumodel);
    }

    // GET: MENUMODELS/Create
    public IActionResult Create()
    {
        return View();
    }

    // POST: MENUMODELS/Create
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Id,Nombre,Descripcion,Precio,Disponible,Estado")] MenuModel menumodel)
    {
        if (ModelState.IsValid)
        {
            _context.Add(menumodel);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
        return View(menumodel);
    }

    // GET: MENUMODELS/Edit/5
    public async Task<IActionResult> Edit(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var menumodel = await _context.Menus.FindAsync(id);
        if (menumodel == null)
        {
            return NotFound();
        }
        return View(menumodel);
    }

    // POST: MENUMODELS/Edit/5
    // To protect from overposting attacks, enable the specific properties you want to bind to.
    // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int? id, [Bind("Id,Nombre,Descripcion,Precio,Disponible,Estado")] MenuModel menumodel)
    {
        if (id != menumodel.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            try
            {
                _context.Update(menumodel);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuModelExists(menumodel.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction(nameof(Index));
        }
        return View(menumodel);
    }

    // GET: MENUMODELS/Delete/5
    public async Task<IActionResult> Delete(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var menumodel = await _context.Menus
            .FirstOrDefaultAsync(m => m.Id == id);
        if (menumodel == null)
        {
            return NotFound();
        }

        return View(menumodel);
    }

    // POST: MENUMODELS/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int? id)
    {
        var menumodel = await _context.Menus.FindAsync(id);
        if (menumodel != null)
        {
            _context.Menus.Remove(menumodel);
        }

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    private bool MenuModelExists(int? id)
    {
        return _context.Menus.Any(e => e.Id == id);
    }
}
