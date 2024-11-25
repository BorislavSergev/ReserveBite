using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReserveBite.Api.Models
{
    public class Restaurant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string Phone { get; set; } = null!;
        [Required]
        public string Address { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        [Required]
        public string ImageUrl { get; set; } = null!;
    }
}
