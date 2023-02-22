using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;  
using Microsoft.AspNetCore.Authentication.Cookies; 
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace Aplikacija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KomentarController : ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public KomentarController(ContextKlasa context) { Context = context; }


        [Route("VratiKomentare10/{sID}")]
        [HttpGet]
        public ActionResult VratiKomentare10(int sID)
        {
            var salon = Context.Saloni.Where(p => p.ID == sID).FirstOrDefault();

            if (salon == null)
            {
                return BadRequest("Salon ne postoji!");
            }

            var komentari = Context.Komentari.Include(y=>y.Korisnik).Where(p => p.Salon.ID == sID).Take(10).OrderBy(p => p.ID);

            if (komentari == null)
            {
                return BadRequest("Nema komentara!");
            }

            try
            {
                return Ok(komentari.Select(x=>new
                {
                    ID=x.ID,
                    Sadrzaj=x.Sadrzaj,
                    Ocena=x.Ocena,
                    Korisnik=x.Korisnik.KorisnickoIme,
                    Salon=x.Salon.ID
                }).ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("VratiKomentare/{sID}")]
        [HttpGet]
        public ActionResult VratiKomentare(int sID)
        {
            var salon = Context.Saloni.Where(p => p.ID == sID).FirstOrDefault();

            if (salon == null)
            {
                return BadRequest("Salon ne postoji!");
            }

            var komentari = Context.Komentari.Include(u=>u.Korisnik).Where(p => p.Salon.ID == sID).ToList();

            if (komentari == null)
            {
                return BadRequest("Nema komentara!");
            }

            try
            {
                return Ok(komentari);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy="RequireKorisnikRole")]
        [Route("DodajKomentar/{sadrzaj}/{ocena}/{korisnikID}")]
        [HttpPost]
        public async Task<ActionResult> DodajKomentar(string sadrzaj, int ocena, int korisnikID)
        {
            if (sadrzaj.Length>250)
            {
                return BadRequest("Komentar je predugacak!");
            }

            if (string.IsNullOrWhiteSpace(sadrzaj))
            {
                return BadRequest("Unesite validan komentar!");
            }

            var salon = await Context.Saloni.FirstOrDefaultAsync();

            if (salon == null)
            {
                return BadRequest("Greska kod dodavanja komentara salonu!");
            }

            var korisnik = await Context.Korisnici.FindAsync(korisnikID);
            
            if (korisnik == null)
            {
                return BadRequest("Nevalidan korisnik za dodavanje komentara!");
            }


            try {
                Komentar kom = new Komentar{
                    Sadrzaj = sadrzaj,
                    Ocena = ocena,
                    Salon = salon,
                    Korisnik = korisnik
                };
                Context.Komentari.Add(kom);
                await Context.SaveChangesAsync();
                return Ok("Komentar je uspesno dodat!:)");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Authorize(Policy="RequireVlasnikRole")]
        [Route("ObrisiKomentar/{idKomentara}/{idVlasnika}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiKomentar(int idKomentara,int idVlasnika)
        {
            try
            {
                var dozvola= await Context.Vlasnici.FindAsync(idVlasnika);
                var komentar = await Context.Komentari.FindAsync(idKomentara);
                if(dozvola==null|| dozvola.GetType().ToString()!="Models.Vlasnik")
                return BadRequest("Nemate dozvolu obrisati komentar");
                if (komentar != null) {
                    Context.Komentari.Remove(komentar);
                    await Context.SaveChangesAsync();
                    return Ok("Komentar uspesno uklonjen!");
                }
                else{
                    return BadRequest("Komentar nije pronadjen!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}