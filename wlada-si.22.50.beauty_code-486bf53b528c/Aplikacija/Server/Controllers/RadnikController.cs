using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Common;
using Microsoft.AspNetCore.Authentication;  
using Microsoft.AspNetCore.Authentication.Cookies; 
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace Aplikacija.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RadnikController : ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public RadnikController(ContextKlasa context) { Context = context; }



        [Route("VratiRadnike/{ids}")]
        [HttpGet]
        public async Task<ActionResult> VratiRadnike(int ids) {

            var salon = Context.Saloni.Where(s => s.ID == ids).FirstOrDefault();

            if (salon == null) {
                return BadRequest("Nepostojeci salon!");
            }

            var radnici = await Context.Radnici.Where(r => r.Salon == salon).ToListAsync();
            

            try {
                
                return Ok(radnici.Select(osoba1=>new{
                        ID = osoba1.ID,
                        Ime = osoba1.Ime,
                        Prezime = osoba1.Prezime,
                        BrojTelefona = osoba1.BrojTelefona,
                        Adresa = osoba1.Adresa,
                        GodinaZaposlenja = osoba1.GodinaZaposlenja,
                        DatumRodjenja = osoba1.DatumRodjenja,
                        Email = osoba1.Email,
                        Password = CommonMethods.DecryptPassword(osoba1.Password).Substring(0,CommonMethods.DecryptPassword(osoba1.Password).Length - osoba1.KorisnickoIme.Length),
                        KorisnickoIme = osoba1.KorisnickoIme,
                        Skola = osoba1.Skola,
                        Plata = osoba1.Plata,
                        RadniStaz = osoba1.RadniStaz,
                        TipRadnika = osoba1.TipRadnika,
                        Salon=osoba1.Salon,
                        ListaTermina=osoba1.ListaTermina
                }).ToList());
            }
            catch(Exception e) {
        
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy="RequireVlasnikRole")]    
        [Route("ZaposliRadnika/{ime}/{prezime}/{brojTelefona}/{adresa}/{godina}/{datum}/{email}/{password}/{korisnickoIme}/{skola}/{plata}/{radniStaz}/{tipRadnika}/{idVlasnika}")]
        [HttpPost]
        
        public async Task<ActionResult> ZaposliRadnika(string ime, string prezime, string brojTelefona, string adresa, int godina, DateTime datum, string email, string password, string korisnickoIme, string skola, int plata, int radniStaz, string tipRadnika,int idVlasnika)
        {
            var vl=await Context.Vlasnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();
            if(vl==null||vl.GetType().ToString()!="Models.Vlasnik")
                return BadRequest("Nemate dozvolu");
            Radnik r = new Radnik();

            if (ime.Length < 3 || ime.Length > 30 || string.IsNullOrWhiteSpace(ime) || Regex.IsMatch(ime, "^[A-Z][A-Za-z0-9]*$") == false)
            {
                return BadRequest("Ime nevalidno!");
            }

            if (prezime.Length < 3 || prezime.Length > 30 || string.IsNullOrWhiteSpace(prezime) || Regex.IsMatch(prezime, "^[A-Z][A-Za-z0-9]*$") == false)
            {
                return BadRequest("Prezime nevalidno!");
            }

            if (Regex.IsMatch(brojTelefona,@"^\+?[0-9][0-9\s.-]{7,11}$") == false || string.IsNullOrWhiteSpace(brojTelefona))
            {
                return BadRequest("Format telefonskog broja je neispravan!");
            }

            if (string.IsNullOrWhiteSpace(adresa))
            {
                return BadRequest("Adresa je neispravna!");
            }

            if (string.IsNullOrWhiteSpace(email) || Regex.IsMatch(email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z") == false)
            {
                return BadRequest("E-mail je neispravan!");
            }

            if (password.Length < 5)
            {
                return BadRequest("Lozinka je neispravna!");
            }

            if (string.IsNullOrWhiteSpace(korisnickoIme) || Regex.IsMatch(korisnickoIme, "^[a-zA-Z][a-zA-Z0-9]*$")==false)
            {
                return BadRequest("Korisnicko ime je neispravno!");
            }

            if (string.IsNullOrWhiteSpace(skola))
            {
                return BadRequest("Naziv skole nevalidan!");
            }

            if (plata < 32195 || plata > 250000)
            {
                return BadRequest("Plata je izvan opsega");
            }

            if (radniStaz < 0 || radniStaz > 17155)
            {
                return BadRequest("Radni staz je izvan opsega");
            }

            Salon s = await Context.Saloni.FirstOrDefaultAsync();

            if (s == null)
            {
                return BadRequest("Nepostojeci salon!");
            }

            var a = 0;
            var Radnici = await Context.Radnici.ToListAsync();
            Radnici.ForEach(p =>
            {
                if (p.Email == email)
                    a = 1;
                else if (p.KorisnickoIme == korisnickoIme)
                    a = 2;

            });

            var Korisnici = await Context.Korisnici.ToListAsync();
            Korisnici.ForEach(p =>
            {
                if (p.Email == email)
                    a = 1;
                else if (p.KorisnickoIme == korisnickoIme)
                    a = 2;
            });

            var Vlasnici = await Context.Vlasnici.ToListAsync();
            Vlasnici.ForEach(p =>
            {
                if (p.Email == email)
                    a = 1;
                else if (p.KorisnickoIme == korisnickoIme)
                    a = 2;
            });
                if (a == 1) 
                    return BadRequest("Postoji nalog sa tim emailom");
                 else if (a == 2) 
                    return BadRequest("Postoji nalog sa tim korisnickim imenom");

            r.Ime = ime;
            r.Prezime = prezime;
            r.BrojTelefona = brojTelefona;
            r.Adresa = adresa;
            r.GodinaZaposlenja = godina;
            r.DatumRodjenja= datum;
            r.Email = email;
            r.Salon = s;
            r.Password = CommonMethods.EncryptPassword(password, korisnickoIme);
            r.KorisnickoIme = korisnickoIme;
            r.Skola = skola;
            r.Plata = plata;
            r.RadniStaz = radniStaz;
            r.TipRadnika = tipRadnika;

            try {
                Context.Radnici.Add(r);
                await Context.SaveChangesAsync();
                return Ok(r);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Authorize(Policy="RequireVlasnikRole")]
        [Route("ObrisiRadnika/{id}/{idVlasnika}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiRadnika(int id,int idVlasnika)
        {
            try {
                var vl= await Context.Vlasnici.FindAsync(idVlasnika);
                if(vl==null||vl.GetType().ToString()!="Models.Vlasnik")
                    return BadRequest("Nemate dozvolu");
                var radnik = await Context.Radnici.FindAsync(id);
                
                if (radnik != null)
                {
                    Context.Radnici.Remove(radnik);
                    await Context.SaveChangesAsync();
                    return Ok("Radnik je uspesno uklonjen!");
                }
                else {
                    return BadRequest("Radnik nije pronadjen u bazi!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy="RequireRadnikRole")]    
        [Route("PromeniInfoOSebiRadnik")]
        [HttpPut]
        public async Task<ActionResult> PromeniInfoOSebiRadnik([FromBody]Radnik k)
        {
            var rad = Context.Radnici.Where(p => p.ID == k.ID).FirstOrDefault();
            
            if(rad != null && rad.GetType().ToString()=="Models.Radnik")
            {
                if((k.Ime.Length<3||k.Ime.Length>30)||Regex.IsMatch(k.Ime,"^[A-Z][A-Za-z0-9]*$")==false)
                    return BadRequest("Nije lepo uneseno ime");

                if((k.Prezime.Length<3||k.Prezime.Length>30)||Regex.IsMatch(k.Prezime,"^[A-Z][A-Za-z0-9]*$")==false)
                    return BadRequest("Nije lepo uneseno prezime");
            
                if(Regex.IsMatch(k.BrojTelefona,@"^\+?[0-9][0-9\s.-]{7,11}$")==false)
                    return BadRequest("Nije lepo formiran broj telefona");
            
                if(String.IsNullOrWhiteSpace(k.Adresa))
                    return BadRequest("Uneta prazna adresa");
            
                if (k.Email.Length > 30 || string.IsNullOrWhiteSpace(k.Email))
                    return BadRequest("Unesite ispravnu adresu!");
           
                if (string.IsNullOrWhiteSpace(k.Password))
                    return BadRequest("Unesite lozinku!");
                
                if (k.Password.Length > 20)
                    return BadRequest("Lozinka je predugaÄka!");
            

                var a = 0;
                var Radnici = await Context.Radnici.ToListAsync();
                Radnici.ForEach(p =>
                {
                    if(p.ID!=k.ID)
                    {
                    if (p.Email == k.Email)
                        a = 1;
                    else if (p.KorisnickoIme == k.KorisnickoIme)
                        a = 2;
                    }
                });

                var Korisnici = await Context.Korisnici.ToListAsync();
                Korisnici.ForEach(p =>
                {

                    if (p.Email == k.Email)
                        a = 1;
                    else if (p.KorisnickoIme == k.KorisnickoIme)
                        a = 2;
                    
                });

                var Vlasnici = await Context.Vlasnici.ToListAsync();
                Vlasnici.ForEach(p =>
                {

                    if (p.Email == k.Email)
                        a = 1;
                    else if (p.KorisnickoIme == k.KorisnickoIme)
                        a = 2;
                    
                });

                if (a == 1) 
                    return BadRequest("Postoji nalog sa tim emailom");
                else if (a == 2) 
                    return BadRequest("Postoji nalog sa tim korisnickim imenom");
                
                rad.Ime=k.Ime;
                rad.Prezime=k.Prezime;
                rad.BrojTelefona=k.BrojTelefona;
                rad.Adresa=k.Adresa;
                rad.GodinaZaposlenja=k.GodinaZaposlenja;
                rad.TipRadnika=k.TipRadnika;
                rad.Email=k.Email;
                rad.KorisnickoIme=k.KorisnickoIme;
                rad.Password=CommonMethods.EncryptPassword(k.Password,k.KorisnickoIme);

                Context.Radnici.Update(rad);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izmenjene informacije o radniku");
            }
            return BadRequest("ne postoji radnik");
        }

        [Authorize(Policy="RequireRadnikRole")]
        [Route("PromeniLozinkuRadnik/{id}/{pass}/{newpass}")]
        [HttpPut]
        public async Task<ActionResult> PromeniLozinkuRadnik(int id, string pass,string newpass)
        {
            if (string.IsNullOrWhiteSpace(newpass))
                    return BadRequest("Unesite novu lozinku!");
            if (string.IsNullOrWhiteSpace(pass))
                    return BadRequest("Unesite lozinku!");

            if (newpass.Length > 20)
                    return BadRequest("Lozinka je predugačka!");

            var rad =await Context.Radnici.Where(p => p.ID == id).FirstOrDefaultAsync();

            if(rad!=null && rad.GetType().ToString()=="Models.Radnik")
            {
                var loz=CommonMethods.DecryptPassword(rad.Password).Substring(0,CommonMethods.DecryptPassword(rad.Password).Length - rad.KorisnickoIme.Length);
                if(!loz.Equals(pass))
                    return BadRequest("Netacna lozinka!"+loz);
                else{
                    if(loz==newpass)
                    {
                        return BadRequest("Nova lozinka ne moze biti ista kao stara!");
                    }
                    else{
                        rad.Password=CommonMethods.EncryptPassword(newpass,rad.KorisnickoIme);
                        Context.Radnici.Update(rad);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno promenjena lozinka!");
                    }
                    
                }
            }
            else{
                return BadRequest("Nalog nije pronadjen!");
            }

        }
        
        [Route("VratiRadnikePoTipu/{Tip}")]
        [HttpGet]
        public async Task<ActionResult> VratiRadnikePoTipu(string Tip)
        {
            var rad =await  Context.Radnici.Where(p => p.TipRadnika == Tip).ToListAsync();
            
            try {
                
                return Ok(rad);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message+e.StackTrace);
            }
        }
    }
}

