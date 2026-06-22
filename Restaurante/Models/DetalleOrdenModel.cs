using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurante.Models
{
    [Table("DetalleOrden")]
    public class DetalleOrdenModel
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "La orden es obligatoria.")]
        [Display(Name = "Orden")]
        public int OrdenId { get; set; }
        [Required(ErrorMessage = "Debe seleccionar un menú.")]
        [Display(Name = "Menú")]
        public int MenuId { get; set; }
        [Required(ErrorMessage = "La cantidad es obligatoria.")]
        [Range(1, 1000, ErrorMessage = "La cantidad debe ser mayor a cero.")]
        [Display(Name = "Cantidad")]
        public int Cantidad { get; set; }
        [Required(ErrorMessage = "El precio unitario es obligatorio.")]
        [Range(typeof(decimal), "0.01", "999999.99",
       ErrorMessage = "El precio unitario debe ser mayor a cero.")]
        [Display(Name = "Precio Unitario")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal PrecioUnitario { get; set; }
        [Display(Name = "Subtotal")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }
     
        public OrdenModel Orden { get; set; }
        public MenuModel Menu { get; set; }
    }
}
