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
    public class KorisnikController : ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public KorisnikController(ContextKlasa context)
        {
            Context = context;
        }


        [Route("DodajKorisnika/{korisnickoIme}/{email}/{pass}/{repass}")]
        [HttpPost]
        public async Task<ActionResult> dodajKorisnika(string korisnickoIme, string email, string pass, string repass)
        {
            var sal = await Context.Saloni.FirstAsync();
            
            if(sal == null)
            {
                return BadRequest("Nije nadjen salon!");
            }

            if (korisnickoIme.Length > 30)
            {
                return BadRequest("Ime je predugačko!");
            }

            if (string.IsNullOrWhiteSpace(korisnickoIme))
            {
                return BadRequest("Unesite korisničko ime!");
            }

            if (email.Length > 30 || string.IsNullOrWhiteSpace(email) || Regex.IsMatch(email, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z") == false)
            {
                return BadRequest("Unesite ispravnu adresu!");
            }

            if (string.IsNullOrWhiteSpace(pass))
            {
                return BadRequest("Unesite lozinku!");
            }

            if (pass.Length > 20)
            {
                return BadRequest("Lozinka je predugačka!");
            }

            if (string.Equals(pass, repass)==false)
            {
                return BadRequest("Lozinke se ne poklapaju!");
            }

            var a = 0;
            var radnici = await Context.Radnici.ToListAsync();
            radnici.ForEach(p =>
            {
                if (p.Email == email)
                {
                    a = 1;
                }

                if (p.KorisnickoIme == korisnickoIme)
                {
                    a = 2;
                }
            });

            if (a == 1)
            {
                return BadRequest("Postoji nalog sa tom email adresom!");
            }

            if (a == 2)
            {
                return BadRequest("Postoji nalog sa takvim korisnickim imenom");
            }

            var korisnici = await Context.Korisnici.ToListAsync();
            korisnici.ForEach(p =>
            {
                
                if (p.Email == email)
                {
                    a = 1;
                }

                if (p.KorisnickoIme == korisnickoIme)
                {
                    a = 2;
                }
            });

            if (a == 1)
            {
                return BadRequest("Postoji nalog sa tom email adresom!");
            }

            if (a == 2)
            {
                return BadRequest("Postoji nalog sa takvim korisnickim imenom");
            }

            try
            {
                DateTime myDateTime = DateTime.Now;
                int year = myDateTime.Year;
                Korisnik korisnik = new Korisnik
                {
                    Ime="",
                    Prezime="",
                    BrojTelefona="",
                    Adresa="",
                    Godina=year,
                    DatumRodjenja=DateTime.MinValue,
                    KorisnickoIme = korisnickoIme,
                    Email = email,
                    Password = CommonMethods.EncryptPassword(pass,korisnickoIme),
                    Salon = sal
                };
                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();
                return Ok(korisnik);
            }
            catch (Exception e)
            {
                return BadRequest(e.StackTrace + e.Message);
            }
        }


        [Route("ObrisiKorisnika/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiKorisnika(int id)
        {
            try
            {
                var korisnik = await Context.Korisnici.FindAsync(id);

                if (korisnik != null)
                {
                    Context.Korisnici.Remove(korisnik);
                    await Context.SaveChangesAsync();
                    return Ok("Korisnik je uspesno uklonjen!");
                }
                else
                {
                    return BadRequest("Korisnik nije pronadjen u bazi!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Policy="RequireKorisnikRole")]
        [Route("PromeniInfoOSebi")]
        [HttpPut]
        public async Task<ActionResult> PromeniInfoOSebi([FromBody] Korisnik k)
        {
            var kor = Context.Korisnici.Where(p => p.ID == k.ID).FirstOrDefault();
            if (kor != null)
            {
                if ((k.Ime.Length < 3 || k.Ime.Length > 30) || Regex.IsMatch(k.Ime, "^[A-Z][A-Za-z0-9]*$") == false)
                    return BadRequest("Nije lepo uneseno ime");

                if ((k.Prezime.Length < 3 || k.Prezime.Length > 30) || Regex.IsMatch(k.Prezime, "^[A-Za-z][A-Za-z0-9]*$") == false)
                    return BadRequest("Nije lepo uneseno prezime");

                if (Regex.IsMatch(k.BrojTelefona, @"^\+?[0-9][0-9\s.-]{7,11}$") == false)
                    return BadRequest("Nije lepo formiran broj telefona");

                if (String.IsNullOrWhiteSpace(k.Adresa))
                    return BadRequest("Uneta prazna adresa");

                if (k.Godina < 18)
                    return BadRequest("Mali broj godina");

                if (k.KorisnickoIme.Length > 30)
                    return BadRequest("Ime je predugačko!");

                if (string.IsNullOrWhiteSpace(k.KorisnickoIme))
                    return BadRequest("Unesite korisničko ime!");

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
                if (p.Email == k.Email)
                    a = 1;
                else if (p.KorisnickoIme == k.KorisnickoIme)
                    a = 2;
            });

            var Korisnici = await Context.Korisnici.ToListAsync();
            Korisnici.ForEach(p =>
            {
                if(p.ID!=k.ID)
                {
                if (p.Email == k.Email)
                    a = 1;
                else if (p.KorisnickoIme == k.KorisnickoIme)
                    a = 2;
                }
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

                kor.Ime = k.Ime;
                kor.Prezime = k.Prezime;
                kor.BrojTelefona = k.BrojTelefona;
                kor.Adresa = k.Adresa;
                kor.Godina = k.Godina;
                kor.DatumRodjenja = k.DatumRodjenja;
                kor.Email = k.Email;
                kor.KorisnickoIme = k.KorisnickoIme;
                kor.Password = CommonMethods.EncryptPassword(k.Password,k.KorisnickoIme);

                Context.Korisnici.Update(kor);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izmenjene informacije o korisniku");
            }
            return BadRequest("ne postoji korisnik");

        }

        [Authorize(Policy="RequireKorisnikRole")]
        [Route("PromeniLozinkuKorisnik/{id}/{pass}/{newpass}")]
        [HttpPut]
        public async Task<ActionResult> PromeniLozinkuKorisnik(int id, string pass,string newpass)
        {
            if (string.IsNullOrWhiteSpace(newpass))
                    return BadRequest("Unesite novu lozinku!");
            if (string.IsNullOrWhiteSpace(pass))
                    return BadRequest("Unesite lozinku!");

            if (newpass.Length > 20)
                    return BadRequest("Lozinka je predugačka!");

            var kor =await Context.Korisnici.Where(p => p.ID == id).FirstOrDefaultAsync();

            if(kor!=null)
            {
                var loz=CommonMethods.DecryptPassword(kor.Password).Substring(0,CommonMethods.DecryptPassword(kor.Password).Length - kor.KorisnickoIme.Length);
                if(!loz.Equals(pass))
                    return BadRequest("Netacna lozinka!"+loz);
                else{
                    if(loz==newpass)
                    {
                        return BadRequest("Nova lozinka ne moze biti ista kao stara!");
                    }
                    else{
                        kor.Password=CommonMethods.EncryptPassword(newpass,kor.KorisnickoIme);
                        Context.Korisnici.Update(kor);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno promenjena lozinka!");
                    }
                    
                }
            }
            else{
                return BadRequest("Nalog nije pronadjen!");
            }

        }
    }
}