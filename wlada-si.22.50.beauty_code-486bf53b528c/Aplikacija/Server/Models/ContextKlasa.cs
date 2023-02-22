using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ContextKlasa : DbContext
    {
        public ContextKlasa(DbContextOptions options) : base(options) { }
        public DbSet<Komentar> Komentari { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Proizvod> Proizvod { get; set; }
        public DbSet<Radnik> Radnici { get; set; }
        public DbSet<Salon> Saloni { get; set; }
        public DbSet<Termin> Termini { get; set; }
        public DbSet<Usluga> Usluge { get; set; }
        public DbSet<Vlasnik> Vlasnici { get; set; }

    }
}