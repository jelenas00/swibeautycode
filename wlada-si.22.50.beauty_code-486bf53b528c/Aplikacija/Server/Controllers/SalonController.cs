using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Common;
using Microsoft.AspNetCore.Authentication;  
using Microsoft.AspNetCore.Authentication.Cookies; 
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace Aplikacija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SalonController : ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public SalonController(ContextKlasa context) 
        { 
            Context = context; 
        }
        
        
        [Route("DodajSalon")]
        [HttpPost]
        public async Task<ActionResult> DodajSalon([FromBody]Salon s)
        {
            if ((s.Ime.Length<50 && s.Ime.Length>0) || (s.Adresa.Length<50 && s.Adresa.Length>5)
                || s.Slika.Length>1
                || s.PIB.Length==10
                || (s.GodinaOsnivanja>1900 && s.GodinaOsnivanja<2022))
            {
                Context.Saloni.Add(s);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodat salon");
            }
            else return BadRequest("Lose informacije o Salonu");
        }
        

        [Route("VratiInfoOSalonu")]
        [HttpGet]
        public async Task<ActionResult> VratiInfoOSalonu()
        {
            var sal = await Context.Saloni.FirstAsync();
            if(sal != null)
            {
                return Ok(
                new
                {
                    ID = sal.ID,
                    Ime = sal.Ime,
                    Adresa = sal.Adresa,
                    Slika = sal.Slika,
                    PIB = sal.PIB,
                    GodinaOsnivanja = sal.GodinaOsnivanja
                }
                );
            }
            else return BadRequest("Nemoguce vratiti informacije o salonu");
        }


        [Route("PrijavaNaSajt/{korisnickoIme}/{password}")]
        [HttpGet]
        public async Task<ActionResult> PrijavaNaSajt(string korisnickoIme, string password)
        {
            var sal = await Context.Saloni.FirstAsync();
            if(sal != null)
            {
                var pass = CommonMethods.EncryptPassword(password, korisnickoIme);
                var osoba = await Context.Vlasnici.Where(p => p.Password == pass).FirstOrDefaultAsync();
                if(osoba != null)
                {
                    var claims= new List<Claim>{
                        new Claim(ClaimTypes.Name,osoba.KorisnickoIme),
                        new Claim(ClaimTypes.Role,"Vlasnik")
                    };
                    var identity= new ClaimsIdentity(claims,"CookieAuth");
                    ClaimsPrincipal claimsPrincipal= new ClaimsPrincipal(identity);
                    await HttpContext.SignInAsync("CookieAuth",claimsPrincipal);
                    return Ok( new
                    {
                        ID = osoba.ID,
                        Ime = osoba.Ime,
                        Prezime = osoba.Prezime,
                        BrojTelefona = osoba.BrojTelefona,
                        Adresa = osoba.Adresa,
                        VlasnikOd = osoba.VlasnikOd,
                        DatumRodjenja = osoba.DatumRodjenja,
                        Email = osoba.Email,
                        Password = CommonMethods.DecryptPassword(pass).Substring(0,CommonMethods.DecryptPassword(pass).Length - osoba.KorisnickoIme.Length),
                        KorisnickoIme = osoba.KorisnickoIme,
                        TipStranice = "Vlasnik"
                    });
                }

                var osoba1 = await Context.Radnici.Where(p => p.Password == pass).FirstOrDefaultAsync();
                if(osoba1 != null)
                {
                    var claims= new List<Claim>{
                        new Claim(ClaimTypes.Name,osoba1.KorisnickoIme),
                        new Claim(ClaimTypes.Role,"Radnik")
                    };
                    var identity= new ClaimsIdentity(claims,"CookieAuth");
                    ClaimsPrincipal claimsPrincipal= new ClaimsPrincipal(identity);
                    await HttpContext.SignInAsync("CookieAuth",claimsPrincipal);
                    return Ok( new
                    {
                        ID = osoba1.ID,
                        Ime = osoba1.Ime,
                        Prezime = osoba1.Prezime,
                        BrojTelefona = osoba1.BrojTelefona,
                        Adresa = osoba1.Adresa,
                        GodinaZaposlenja = osoba1.GodinaZaposlenja,
                        DatumRodjenja = osoba1.DatumRodjenja,
                        Email = osoba1.Email,
                        Password = CommonMethods.DecryptPassword(pass).Substring(0,CommonMethods.DecryptPassword(pass).Length - osoba1.KorisnickoIme.Length),
                        KorisnickoIme = osoba1.KorisnickoIme,
                        Skola = osoba1.Skola,
                        Plata = osoba1.Plata,
                        RadniStaz = osoba1.RadniStaz,
                        TipRadnika = osoba1.TipRadnika,
                        TipStranice = "Radnik"
                    });
                }
                

                var osoba2 = await Context.Korisnici.Where(p => p.Password == pass).FirstOrDefaultAsync();
                if(osoba2 != null)
                {
                    var claims= new List<Claim>{
                        new Claim(ClaimTypes.Name,osoba2.KorisnickoIme),
                        new Claim(ClaimTypes.Role,"Korisnik")
                    };
                    var identity= new ClaimsIdentity(claims,"CookieAuth");
                    ClaimsPrincipal claimsPrincipal= new ClaimsPrincipal(identity);
                    await HttpContext.SignInAsync("CookieAuth",claimsPrincipal);
                    return Ok( new
                    {
                        ID = osoba2.ID,
                        Ime = osoba2.Ime,
                        Prezime = osoba2.Prezime,
                        BrojTelefona = osoba2.BrojTelefona,
                        Adresa = osoba2.Adresa,
                        Godina = osoba2.Godina,
                        Email = osoba2.Email,
                        Password = CommonMethods.DecryptPassword(pass).Substring(0,CommonMethods.DecryptPassword(pass).Length - osoba2.KorisnickoIme.Length),
                        KorisnickoIme = osoba2.KorisnickoIme,
                        DatumRodjenja = osoba2.DatumRodjenja,
                        TipStranice = "Korisnik"
                    });
                }
                else return BadRequest("Nepostojeci nalog!");
            }
            else return BadRequest("Nepostojeci salon!");
        }
        [Authorize(Policy="RequireVlasnikRole")]
        [Route("IzmeniInfoOSalonu/{idVlasnika}")]
        [HttpPut]
        public async Task<ActionResult> izmeniInfoOSalonu(int idVlasnika,[FromBody]Salon s)
        {
            var vl=await Context.Vlasnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();
            if(vl==null ||vl.GetType().ToString()!="Models.Vlasnik")
                return BadRequest("Ne dozvoljen pristup");
            var sal= await Context.Saloni.Where(x=>x.ID==s.ID).FirstOrDefaultAsync();
            if ((s.Ime.Length<50 && s.Ime.Length>0) 
                || (s.Adresa.Length<50 && s.Adresa.Length>5)
                || s.Slika.Length>1
                || s.PIB.Length==10
                || (s.GodinaOsnivanja>1900 && s.GodinaOsnivanja<2022))
            {
                sal.Ime=s.Ime;
                sal.Adresa=s.Adresa;
                sal.Slika=s.Slika;
                sal.PIB=s.PIB;
                sal.GodinaOsnivanja=s.GodinaOsnivanja;
                Context.Saloni.Update(sal);
                await Context.SaveChangesAsync();
                return Ok(sal);
            }
            else return BadRequest("Lose informacije o Salonu");
        }
        [Route("IzbrisiPrazneProizvodeIzSalona")]
        [HttpDelete]
        public async Task<ActionResult> izbrisiPrazneProizvodeIzSalona()
        {
            var sal= await Context.Saloni
                .Include(p=>p.ListaProizvoda)
                .FirstOrDefaultAsync();
            if(sal==null)
                return BadRequest("ne postoji salon");
            
            var proizvodi=sal.ListaProizvoda;

            proizvodi.ForEach(p=>
            {
                if(p.Kolicina<20)
                Context.Proizvod.Remove(p);
            });
            try
            {
                await Context.SaveChangesAsync();
                return Ok("ociscen magacin od praznih proizvoda");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message+" "+e.StackTrace);
            }
        }
    }
}