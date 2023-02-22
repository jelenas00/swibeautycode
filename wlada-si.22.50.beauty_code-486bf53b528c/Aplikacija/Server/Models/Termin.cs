using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Termin {
        
        [Key]
        public int ID { get; set; }
        
        [Required]
        public DateTime Datum { get; set; }
        
        [Required]
        public DateTime VremePocetka { get; set; }
        
        [Required]
        public DateTime VremeKraja { get; set; }
        
        [Required]
        public int UkupnaCena { get; set; }
        
        [JsonIgnore]
        public List<Usluga> ListaUsluga { get; set; }
        
        [JsonIgnore]
        public Radnik Radnik { get; set; }
        
        [JsonIgnore]
        public Korisnik Korisnik { get; set; }
        
        [JsonIgnore]
        public Salon Salon { get; set; }
    }
}