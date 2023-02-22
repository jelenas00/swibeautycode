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
    public class ProizvodController : ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public ProizvodController(ContextKlasa context) 
        { 
            Context = context; 
        }

        [Authorize(Policy="RequireVlasnikRole")]
        [Route("NapraviProizvod/{naziv}/{kolicina}/{idVlasnika}")]
        [HttpPost]
        public async Task<ActionResult> napraviProizvod(string naziv,int kolicina,int idVlasnika)
        {
            if(string.IsNullOrWhiteSpace(naziv)==true)
                return BadRequest("lose unesen naziv");
            if(kolicina>2000||kolicina<0)
                return BadRequest("lose unesena granica");
            var vl=await Context.Vlasnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();

            if(vl==null||vl.GetType().ToString()!="Models.Vlasnik")
                return BadRequest("Nemate ovlacenje");
            var sal= await Context.Saloni.FirstOrDefaultAsync();
            var pro=new Proizvod();
            pro.Naziv=naziv;
            pro.Kolicina=kolicina;
            pro.Salon=sal;
            try
            {
                Context.Proizvod.Add(pro);
                await Context.SaveChangesAsync();
                return Ok("uspesno dodat proizvod");
            }
            catch (System.Exception e)
            {
                return BadRequest(e.StackTrace + " "+e.Message);
            }
        }
        [Route("VratiProizvodeSalona")]
        [HttpGet]
        public async Task<ActionResult> vratiProizvodeSalona()
        {
            var sal= await Context.Saloni
            .Include(p=>p.ListaProizvoda)
            .FirstOrDefaultAsync();

            if(sal==null)
                return BadRequest("ne postoji salon u bazi");
            
            var proizvodi = sal.ListaProizvoda;

            if(proizvodi==null)
                return BadRequest("greska pri vracanju proizvoda");

            try
            {
                return Ok(proizvodi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message+" "+e.StackTrace);
            }
        }

        [Authorize(Policy="RequireVlasnikRole")]
        [Route("IzmeniProizvod/{idVlasnika}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniProizvod(int idVlasnika,[FromBody]Proizvod p)
        {
            var pro= Context.Proizvod.Where(a => a.ID == p.ID).FirstOrDefault();
            var vl=await Context.Vlasnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();

            if(vl==null||vl.GetType().ToString()!="Models.Vlasnik")
                return BadRequest("Nemate ovlacenje");
            if(pro!=null)
            {
                if (pro.Naziv.Length<3 || pro.Naziv.Length>50 || string.IsNullOrWhiteSpace(pro.Naziv))
                {
                    return BadRequest("Naziv je nevalidan!");
                }

                if (pro.Kolicina < 0 )
                {
                    return BadRequest("Nevalidna kolicina!");
                }

                pro.Naziv=p.Naziv;
                pro.Kolicina=p.Kolicina;

                Context.Proizvod.Update(pro);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izmenjene informacije o proizvodu");
            }
            return BadRequest("Proizvod nije nadjen");
        }

        [Authorize(Policy="RequireVlasnikRole")]
        [Route("DodajKolicinu/{kol}/{idVlasnika}")]
        [HttpPut]
        public async Task<ActionResult> DodajKolicinu(int kol,int idVlasnika,[FromBody]Proizvod p)
        {
            var pro= Context.Proizvod.Where(a => a.ID == p.ID).FirstOrDefault();

            var vl=await Context.Vlasnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();

            if(vl==null||vl.GetType().ToString()!="Models.Vlasnik")
                return BadRequest("Nemate ovlacenje");

            if(pro!=null)
            {
                pro.Kolicina+=kol;

                Context.Proizvod.Update(pro);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata kolicina");
            }
            return BadRequest("Proizvod nije nadjen");
        }

        [Authorize(Policy="RequireRadnikRole")]
        [Route("SmanjiKolicinu/{kol}/{idRadnika}")]
        [HttpPut]
        public async Task<ActionResult> SmanjiKolicinu(int kol,int idRadnika,[FromBody]Proizvod p)
        {
            var pro= Context.Proizvod.Where(a => a.ID == p.ID).FirstOrDefault();

            var vl=await Context.Radnici.Where(x=>x.ID==idRadnika).FirstOrDefaultAsync();

            if(vl==null||vl.GetType().ToString()!="Models.Radnik")
                return BadRequest("Nemate ovlacenje");

            if(pro!=null)
            {
                if(pro.Kolicina-kol<0)
                return BadRequest("Nevalidna vrednost kolicine!");
                else{
                    pro.Kolicina-=kol;
                
                Context.Proizvod.Update(pro);
                await Context.SaveChangesAsync();
                return Ok("Uspesno dodata kolicina");
                }
                
            }
            return BadRequest("Proizvod nije nadjen");
        }

        [Authorize(Policy="RequireVlasnikRole")]
        [Route("ObrisiProizvod/{id}/{idVlasnika}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiRProizvod(int id,int idVlasnika)
        {
            try {
                var proizvod = await Context.Proizvod.FindAsync(id);
                
                var vl=await Context.Vlasnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();

                if(vl==null||vl.GetType().ToString()!="Models.Vlasnik")
                return BadRequest("Nemate ovlacenje");

                if (proizvod != null)
                {
                    Context.Proizvod.Remove(proizvod);
                    await Context.SaveChangesAsync();
                    return Ok("Proizovd je uspesno uklonjen!");
                }
                else {
                    return BadRequest("Proizvod nije pronadjen u bazi!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}