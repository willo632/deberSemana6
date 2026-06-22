using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace Restaurante.Models.ViewModel
{
    public class OrdenCreateViewModel
    {
        [Required(ErrorMessage = "Seleccione un cliente.")]
        [Range(1, int.MaxValue, ErrorMessage = "Seleccione un cliente.")]
        [Display(Name = "Cliente")]
        public int ClienteId { get; set; }

        public string ClienteCedula { get; set; } = string.Empty;

        public List<OrdenDetalleInput> Detalles { get; set; } = [];

        public List<ClienteOptionViewModel> Cliente { get; set; } = [];

        public List<MenuOptionViewModel> Menus { get; set; } = [];
    }

    public class OrdenDetalleInput
    {
        [Display(Name = "Menu")]
        public int? MenuId { get; set; }

        [Range(1, 1000, ErrorMessage = "La cantidad debe ser mayor a cero.")]
        public int Cantidad { get; set; }
    }

    public class ClienteOptionViewModel
    {
        public int ClienteId { get; set; }

        public string NombreCompleto { get; set; } = string.Empty;
    }

    public class MenuOptionViewModel
    {
        public int MenuId { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Descripcion { get; set; } = string.Empty;

        public decimal Precio { get; set; }
    }

}