using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurante.Models;
using Restaurante.Data;

[Route("api/Clientes")]
[ApiController]
public class ClienteApiController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public ClienteApiController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/ClienteModel
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ClienteModel>>> GetClienteModel()
    {
        return await _context.Clientes.ToListAsync();
    }

    // GET: api/ClienteModel/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ClienteModel>> GetClienteModel(int id)
    {
        var clientemodel = await _context.Clientes.FindAsync(id);

        if (clientemodel == null)
        {
            return NotFound();
        }

        return clientemodel;
    }

    // PUT: api/ClienteModel/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutClienteModel(int? id, ClienteModel clientemodel)
    {
        if (id != clientemodel.Id)
        {
            return BadRequest();
        }

        _context.Entry(clientemodel).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ClienteModelExists(id))
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

    // POST: api/ClienteModel
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ClienteModel>> PostClienteModel(ClienteModel clientemodel)
    {
        _context.Clientes.Add(clientemodel);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetClienteModel", new { id = clientemodel.Id }, clientemodel);
    }

    // DELETE: api/ClienteModel/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClienteModel(int? id)
    {
        var clientemodel = await _context.Clientes.FindAsync(id);
        if (clientemodel == null)
        {
            return NotFound();
        }

        _context.Clientes.Remove(clientemodel);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ClienteModelExists(int? id)
    {
        return _context.Clientes.Any(e => e.Id == id);
    }
}
