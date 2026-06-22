using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurante.Models
{
    [Table("Orden")]
    public class OrdenModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Fecha de Orden")]
        public DateTime FechaOrden { get; set; } = DateTime.Now;
        [Display(Name = "Subtotal")]
        [Column("subtotal", TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }
        [Required]
        [Display(Name = "Total")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Total { get; set; }

        [Display(Name = "IVA")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Iva { get; set; }

        // Relación con Cliente
        [Required(ErrorMessage = "El cliente es obligatorio.")]
        [Display(Name = "Cliente")]
        public int ClienteId { get; set; }
        public ClienteModel? Cliente { get; set; }

        // Relación con DetallesOrden
        public ICollection<DetalleOrdenModel> DetallesOrden { get; set; } = new List<DetalleOrdenModel>();
    }
}
