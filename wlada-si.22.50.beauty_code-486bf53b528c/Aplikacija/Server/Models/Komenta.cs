using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Models
{
    public class Komentar
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(250)]
        public string Sadrzaj { get; set; }

        [Range(0, 5)]
        public int Ocena { get; set; }


        [Required]
        [JsonIgnore]
        public Salon Salon { get; set; }

        [Required]
        [JsonIgnore]
        public int KorisnikID { get; set; }
        public Korisnik Korisnik { get; set; }
    }
}