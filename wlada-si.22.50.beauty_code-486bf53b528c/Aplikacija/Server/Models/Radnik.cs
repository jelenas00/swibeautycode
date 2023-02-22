using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Radnik {

        [Key]
        public int ID { get; set; }

        [Required]
        [RegularExpression("^[A-Z][A-Za-z0-9]*$")]
        [StringLength(30, MinimumLength = 3)]
        public string Ime { get; set; }

        [Required]
        [RegularExpression("^[A-Z][A-Za-z0-9]*$")]
        [StringLength(40, MinimumLength = 3)]
        public string Prezime { get; set; }

        [Required]
        [RegularExpression(@"^\+?[0-9][0-9\s.-]{7,11}$")]
        public string BrojTelefona { get; set; }

        [Required]
        public string Adresa { get; set; }

        [Required]
        public int GodinaZaposlenja { get; set; }

        [Required]   
        public DateTime DatumRodjenja { get; set; }

        [Required]
        [RegularExpression(@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z")]
        public string Email { get; set; }

        [Required]
        [MinLength(5)]
        public string  Password { get; set; }

        [Required]
        [RegularExpression("^[a-zA-Z][a-zA-Z0-9]*$")]
        public string KorisnickoIme { get; set; }


        [JsonIgnore]
        public Salon Salon { get; set; }

        public string  Skola { get; set; }

        [Required]
        [Range(32195,250000)]
        public int Plata { get; set; }

        [Required]
        [Range(0,17155)]
        public int RadniStaz { get; set; }

        [Required]
        public string TipRadnika { get; set; }
        
        [JsonIgnore]
        public List<Termin> ListaTermina { get; set; }
    }
}