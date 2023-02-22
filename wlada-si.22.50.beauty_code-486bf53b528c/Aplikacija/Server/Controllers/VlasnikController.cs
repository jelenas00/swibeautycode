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
    public class VlasnikController : ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public VlasnikController(ContextKlasa context)
        {
            Context = context;
        }


        [Route("DodajVlasnika")]
        [HttpPost]
        public async Task<ActionResult> DodajVlasnika([FromBody] Vlasnik v)
        {
            if ((v.Ime.Length < 3 || v.Ime.Length > 30) || Regex.IsMatch(v.Ime, "^[A-Z][A-Za-z0-9]*$") == false)
                return BadRequest("Nije lepo uneseno ime");

            if ((v.Prezime.Length < 3 || v.Prezime.Length > 30) || Regex.IsMatch(v.Prezime, "^[A-Z][A-Za-z0-9]*$") == false)
                return BadRequest("Nije lepo uneseno prezime");

            if (Regex.IsMatch(v.BrojTelefona, @"^\+?[0-9][0-9\s.-]{7,11}$") == false)
                return BadRequest("Nije lepo formiran broj telefona");

            if (String.IsNullOrWhiteSpace(v.Adresa))
                return BadRequest("Uneta prazna adresa");

            if (Regex.IsMatch(v.Email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z") == false)
                return BadRequest("Greska pri dodavanju vlasnika");

            if (v.Password.Length < 5 && v.Password.Length > 30)
                return BadRequest("Losa sifra");

            if (Regex.IsMatch(v.KorisnickoIme, "^[a-zA-Z][a-zA-Z0-9]*$") == false)
                return BadRequest("Ne slaze se korisnicko ime");

            var a = 0;
            var Radnici = await Context.Radnici.ToListAsync();
            Radnici.ForEach(p =>
            {
                if (p.Email == v.Email)
                    a = 1;
                else if (p.KorisnickoIme == v.KorisnickoIme)
                    a = 2;

            });

            var Korisnici = await Context.Korisnici.ToListAsync();
            Korisnici.ForEach(p =>
            {
                if (p.Email == v.Email)
                    a = 1;
                else if (p.KorisnickoIme == v.KorisnickoIme)
                    a = 2;
            });

            if (a == 1) 
                return BadRequest("Postoji nalog sa tim emailom");
            else if (a == 2) 
                return BadRequest("Postoji nalog sa tim korisnickim imenom");

            var sal = await Context.Saloni.FirstOrDefaultAsync();
            if (sal != null)
                sal.VlasnikSalona = v;
                v.Password=CommonMethods.EncryptPassword(v.Password,v.KorisnickoIme);

            try
            {
                Context.Vlasnici.Add(v);
                Context.Saloni.Update(sal);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodat vlasnik");
            }
            catch (Exception e)
            {
                return BadRequest(e.StackTrace);
            }
        }

        [Authorize(Policy="RequireVlasnikRole")]
        [Route("IzvrsiIzmeneKaoVlasnik/{idVlasnika}")]
        [HttpPut]
        public async Task<ActionResult> IzvrsiIzmeneKaoVlasnik(int idVlasnika,[FromBody] Radnik k)
        {
            var rad = Context.Radnici.Where(p => p.ID == k.ID).FirstOrDefault();
            var vl= Context.Vlasnici.Where(p => p.ID == idVlasnika).FirstOrDefault();
            if (rad != null && vl.GetType().ToString()=="Models.Vlasnik")
            {
                if ((k.Ime.Length < 3 || k.Ime.Length > 30) || Regex.IsMatch(k.Ime, "^[A-Z][A-Za-z0-9]*$") == false)
                    return BadRequest("Nije lepo uneseno ime");

                if ((k.Prezime.Length < 3 || k.Prezime.Length > 30) || Regex.IsMatch(k.Prezime, "^[A-Z][A-Za-z0-9]*$") == false)
                    return BadRequest("Nije lepo uneseno prezime");

                if (Regex.IsMatch(k.BrojTelefona, @"^\+?[0-9][0-9\s.-]{7,11}$") == false)
                    return BadRequest("Nije lepo formiran broj telefona");

                if (String.IsNullOrWhiteSpace(k.Adresa))
                    return BadRequest("Uneta prazna adresa");

                if (k.Plata < 32195 || k.Plata > 250000)
                    return BadRequest("Plata nije u granicama");

                if (k.RadniStaz < 0 || k.RadniStaz > 17155)
                    return BadRequest("Radni staz nije u granicama");

                if (k.Email.Length > 30 || string.IsNullOrWhiteSpace(k.Email))
                    return BadRequest("Unesite ispravnu adresu!");

                if (string.IsNullOrWhiteSpace(k.Password))
                    return BadRequest("Unesite lozinku!");

                if (k.Password.Length > 20)
                    return BadRequest("Lozinka je predugačka!");

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
                rad.Plata=k.Plata;

                Context.Radnici.Update(rad);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izmenjene informacije o radniku");
            }
            return BadRequest("ne postoji radnik");
        }
        [Route("VratiVlasnika/{id}")]
        [HttpGet]
        public async Task<ActionResult> VratiVlasnika(int id)
        {
            var vlasnik = await Context.Vlasnici.Where(p => p.ID == id).FirstOrDefaultAsync();
            if(vlasnik != null)
            {
                return Ok(vlasnik);
            }
            else return BadRequest("Nemoguce vratiti informacije o vlasniku");
        }
        [Authorize(Policy="RequireVlasnikRole")]
        [Route("PromeniLozinkuVlasnik/{id}/{pass}/{newpass}")]
        [HttpPut]
        public async Task<ActionResult> PromeniLozinkuVlasnik(int id, string pass,string newpass)
        {
            if (string.IsNullOrWhiteSpace(newpass))
                    return BadRequest("Unesite novu lozinku!");
            if (string.IsNullOrWhiteSpace(pass))
                    return BadRequest("Unesite lozinku!");

            if (newpass.Length > 20)
                    return BadRequest("Lozinka je predugačka!");

            var vl =await Context.Vlasnici.Where(p => p.ID == id).FirstOrDefaultAsync();
            
            if(vl!=null && vl.GetType().ToString()=="Models.Vlasnik")
            {
                var loz=CommonMethods.DecryptPassword(vl.Password).Substring(0,CommonMethods.DecryptPassword(vl.Password).Length - vl.KorisnickoIme.Length);
                if(!loz.Equals(pass))
                    return BadRequest("Netacna lozinka!"+loz);
                else{
                    if(loz==newpass)
                    {
                        return BadRequest("Nova lozinka ne moze biti ista kao stara!");
                    }
                    else{
                        vl.Password=CommonMethods.EncryptPassword(newpass,vl.KorisnickoIme);
                        Context.Vlasnici.Update(vl);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno promenjena lozinka!");
                    }
                    
                }
            }
            else{
                return BadRequest("Nalog nije pronadjen!");
            }

        }
        [Authorize(Policy="RequireVlasnikRole")]
        [Route("PromeniInfoOSebiVlasnik")]
        [HttpPut]
        public async Task<ActionResult> PromeniInfoOSebiVlasnik([FromBody]Vlasnik k)
        {
            var vl = Context.Vlasnici.Where(p => p.ID == k.ID).FirstOrDefault();
            
            if(vl != null && vl.GetType().ToString()=="Models.Vlasnik")
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
                    return BadRequest("Lozinka je predugačka!");
            

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

                    if(p.ID!=k.ID)
                    {
                    if (p.Email == k.Email)
                        a = 1;
                    else if (p.KorisnickoIme == k.KorisnickoIme)
                        a = 2;
                    }
                });

                if (a == 1) 
                    return BadRequest("Postoji nalog sa tim emailom");
                else if (a == 2) 
                    return BadRequest("Postoji nalog sa tim korisnickim imenom");
                
                
                vl.Ime = k.Ime;
                vl.Prezime = k.Prezime;
                vl.BrojTelefona = k.BrojTelefona;
                vl.Adresa = k.Adresa;
                vl.DatumRodjenja = k.DatumRodjenja;
                vl.VlasnikOd = k.VlasnikOd;
                vl.Email=k.Email;
                vl.KorisnickoIme=k.KorisnickoIme;
                vl.Password=CommonMethods.EncryptPassword(k.Password,k.KorisnickoIme);

                Context.Vlasnici.Update(vl);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izmenjene informacije o vlasniku");
            }
            return BadRequest("ne postoji radnik");
        }
    
    }
}