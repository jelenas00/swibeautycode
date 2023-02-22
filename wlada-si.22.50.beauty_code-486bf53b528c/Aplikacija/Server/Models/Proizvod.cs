using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Proizvod
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Naziv { get; set; }

        [Required]
        [Range(0,2000)]
        public int Kolicina { get; set; }
        
        [JsonIgnore]
        public Salon Salon { get; set; }
    }
}