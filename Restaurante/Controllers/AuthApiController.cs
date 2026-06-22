using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurante.Data;
using Restaurante.Models;

[Route("api/auth")]
[ApiController]
public class AuthApiController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public AuthApiController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { mensaje = "Usuario y contraseña son obligatorios" });

        var cliente = await _db.Clientes
            .FirstOrDefaultAsync(c => c.Username == request.Username && c.Password == request.Password);

        if (cliente == null)
            return Unauthorized(new { mensaje = "Credenciales inválidas" });

        return Ok(new { mensaje = "Login exitoso", usuario = cliente.Username, nombre = cliente.Nombre });
    }

    [HttpPost("validate")]
    public async Task<IActionResult> Validate([FromBody] ValidateRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username))
            return Ok(new { valido = false, usuario = "" });

        var existe = await _db.Clientes
            .AnyAsync(c => c.Username == request.Username);

        return Ok(new { valido = existe, usuario = request.Username });
    }
}
