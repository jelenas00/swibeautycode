using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Usluga {
        
        [Key]
        public int ID { get; set; }
        
        [Required]
        public string ImeUsluge { get; set; }
        
        [Required]
        [Range(15,240)]
        public int VremeTrajanja { get; set; }
        
        [Required]
        [Range(100,10000)]
        public int Cena { get; set; }
        
        [Required]
        public string TipUsluge { get; set; }
        
        [JsonIgnore]
        public Termin Termin { get; set; }
        
        [JsonIgnore]
        public Salon  Salon { get; set; }
    }
}