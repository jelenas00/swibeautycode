using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Salon {
        
        [Key]
        public int ID { get; set; }

        [Required]
        public string Ime { get; set; }

        [Required]
        public string Adresa { get; set; }

        [MinLength(1)]
        public string Slika { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        public string PIB { get; set; }

        [Required]
        [Range(1900,2022)]
        public int GodinaOsnivanja { get; set; }


        [JsonIgnore]
        public List<Proizvod> ListaProizvoda { get; set; }
        
        [JsonIgnore]
        public List<Usluga> ListaUsluga { get; set; }

        [JsonIgnore]
        public List<Termin> ListaTermina { get; set; }

        [JsonIgnore]
        public List<Komentar> ListaKomentara { get; set; }

        [JsonIgnore]
        public Vlasnik VlasnikSalona { get; set; }

        [JsonIgnore]
        public List<Radnik> ListaRadnika { get; set; }

        [JsonIgnore]
        public List<Korisnik> ListaKorisnika { get; set; }
    }
}