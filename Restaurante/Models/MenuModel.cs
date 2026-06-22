using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurante.Models
{

    [Table("Menu")]
    public class MenuModel
    {
        [Key] public int Id { get; set; }

        [Required(ErrorMessage = "El nombre del menú es obligatorio.")]
        [MaxLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres.")]
        [Display(Name = "Nombre del Menú")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "La descripción es obligatoria.")]
        [MaxLength(250, ErrorMessage = "La descripción no puede superar los 250 caracteres.")]
        [Display(Name = "Descripción")]
        public string Descripcion { get; set; }

        [Required(ErrorMessage = "El precio es obligatorio.")]
        [Range(typeof(decimal), "0.01", "9999.99",
            ErrorMessage = "El precio debe ser mayor a cero.")]
        [Column(TypeName = "decimal(10,2)")]
        [Display(Name = "Precio")]
        public decimal Precio { get; set; }

        [Required]
        [Display(Name = "Disponible")]
        public bool Disponible { get; set; }
        public ICollection<DetalleOrdenModel> OrdenDetalles { get; set; } = new List<DetalleOrdenModel>();
    }
}
