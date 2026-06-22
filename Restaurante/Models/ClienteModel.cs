using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurante.Models
{
    [Table("Cliente")]
    public class ClienteModel
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "La cédula es obligatoria.")]
        [MaxLength(15, ErrorMessage = "La cédula no puede superar los 10 caracteres.")]
        [RegularExpression(@"^\d{10}$",
    ErrorMessage = "Solo se permiten números.")]
        [Display(Name = "Cédula")]
        public string Cedula { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio.")]
        [MaxLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres.")]
        [Display(Name = "Nombre")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El apellido es obligatorio.")]
        [MaxLength(100, ErrorMessage = "El apellido no puede superar los 100 caracteres.")]
        [Display(Name = "Apellido")]
        public string Apellido { get; set; }

        [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
        [EmailAddress(ErrorMessage = "El correo electrónico no es válido.")]
        [MaxLength(150, ErrorMessage = "El correo electrónico no puede superar los 150 caracteres.")]
        [Display(Name = "Correo Electrónico")]
        public string Email { get; set; }

        [Required(ErrorMessage = "El teléfono es obligatorio.")]
        [MaxLength(10, ErrorMessage = "El teléfono no puede superar los 10 caracteres.")]
        [Display(Name = "Teléfono")]
        [RegularExpression(@"^\d{10}$",
    ErrorMessage = "Solo se permiten números.")]
        public string Telefono { get; set; }

        [MaxLength(50)]
        [Display(Name = "Usuario")]
        public string? Username { get; set; }

        [MaxLength(100)]
        [Display(Name = "Contraseña")]
        public string? Password { get; set; }

        // Relación con Ordenes
        public ICollection<OrdenModel>? Ordenes { get; set; }
    }
}
