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
    public class TerminController : ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public TerminController(ContextKlasa context) 
        { 
            Context = context; 
        }
        [Authorize(Policy="RequireRadnikRole")]
        [Route("VratiTermineZaposlenogTogDana/{id}/{datum}")]
        [HttpGet]
        public async Task<ActionResult> VratiTermineZaposlenogTogDana(int id,string datum)
        {
            DateTime datum1=DateTime.Parse(datum);
            var Termins= await Context.Termini.Include(y=>y.ListaUsluga).Include(y=>y.Radnik).Include(y=>y.Salon).Include(k=>k.Korisnik)
                        .Where(x=>(x.Datum==datum1&&x.Radnik.ID==id))
                        .ToListAsync();
            

            return Ok(Termins.Select(t=>new{
                ID=t.ID,
                Datum=t.Datum,
                VremePocetka=t.VremePocetka,
                VremeKraja=t.VremeKraja,
                UkupnaCena=t.UkupnaCena,
                ListaUsluga=t.ListaUsluga,
                Salon=t.Salon,
                Korisnik=t.Korisnik,
                Radnik=t.Radnik
            }).ToList());
            
            
        }
        [Authorize(Policy="RequireKorisnikRole")]
        [Route("VratiTermineKorisnika/{idkor}")]
        [HttpGet]
        public async Task<ActionResult> VratiTermineKorisnika(int idkor)
        {
            var Termins= await Context.Termini.Include(y=>y.ListaUsluga).Include(y=>y.Radnik).Include(y=>y.Salon).Include(k=>k.Korisnik)
                        .Where(x=>x.Korisnik.ID==idkor)
                        .ToListAsync();
            

            return Ok(Termins.Select(t=>new{
                ID=t.ID,
                Datum=t.Datum,
                VremePocetka=t.VremePocetka,
                VremeKraja=t.VremeKraja,
                UkupnaCena=t.UkupnaCena,
                ListaUsluga=t.ListaUsluga,
                Salon=t.Salon,
                Korisnik=t.Korisnik,
                Radnik=t.Radnik
            }).ToList());
            
            
        }
        [Authorize(Policy="RequireKorisnikRole")]
        [Route("ObrisiTermin/{termId}/{korid}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiTermin(int termId,int korid)
        {
            var kor =await Context.Korisnici.Where(x=>x.ID==korid).FirstOrDefaultAsync();
            if(kor==null || kor.GetType().ToString()!="Models.Korisnik")
                return BadRequest("Nemate dozvolu");

            var ter= await Context.Termini.Include(y=>y.ListaUsluga).Where(x=>x.ID==termId).FirstOrDefaultAsync();
        if(ter==null)
            return BadRequest("Termin");
        
        ter.ListaUsluga.ForEach( x=>
        {
             Context.Usluge.Remove(x);
        });
          Context.Termini.Remove(ter);

          try
            {
                await Context.SaveChangesAsync();
                return Ok("Termin obrisan");
            }
            catch(Exception e)
            {
                return BadRequest(e.InnerException.Message+" "+e.StackTrace);
            }
        }

        [Route("ObrisiTerminePrethodne")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiTerminePrethodne()
        {
            var ter= await Context.Termini.Include(y=>y.ListaUsluga).Where(x=>x.Datum<DateTime.Now).FirstOrDefaultAsync();
            if(ter==null)
            return BadRequest("Termin");
        
            ter.ListaUsluga.ForEach( x=>
            {
                Context.Usluge.Remove(x);
            });
             Context.Termini.Remove(ter);

            try
                {
                    await Context.SaveChangesAsync();
                    return Ok("Termini obrisani");
                }
                catch(Exception e)
                {
                    return BadRequest(e.InnerException.Message+" "+e.StackTrace);
                }
        }
        [Authorize(Policy="RequireRadnikRole")]
        [Route("IzvrsiTermin/{datum}/{vremeid}/{idRadnika}")]
        [HttpDelete]
        public async Task<ActionResult> IzvrsiTermin(string datum,int vremeid,int idRadnika)
        {
            var rad =await Context.Radnici.Where(x=>x.ID==idRadnika).FirstOrDefaultAsync();
            if(rad==null || rad.GetType().ToString()!="Models.Radnik")
                return BadRequest("Nemate dozvolu");
            DateTime datum1=DateTime.Parse(datum);
            var sal= await Context.Saloni.Include(x=>x.ListaProizvoda).FirstOrDefaultAsync();
            var ter= await Context.Termini.Include(y=>y.ListaUsluga).Where(x=>x.ID==vremeid).FirstOrDefaultAsync();
        if(sal==null)
            return BadRequest("salon");
        if(ter==null)
            return BadRequest("Termin");
        
        ter.ListaUsluga.ForEach( x=>
        {
             Context.Usluge.Remove(x);
        });
          Context.Termini.Remove(ter);

          try
            {
                await Context.SaveChangesAsync();
                return Ok("ociscen magacin od praznih proizvoda");
            }
            catch(Exception e)
            {
                return BadRequest(e.InnerException.Message+" "+e.StackTrace);
            }
        }
        [Authorize(Policy="RequireKorisnikRole")]
        [Route("ZakaziTermin/{dan}/{vreme}/{frizerID}/{listaUsluga}/{korisnikID}/{tip}")]
        [HttpPost]
        public async Task<ActionResult> ZakaziTermin(string dan,int vreme,int frizerID,string listaUsluga,int korisnikID,string tip)
        {
            DateTime dan1=DateTime.Parse(dan);
            Termin t=new Termin();
            var sal=await Context.Saloni.FirstOrDefaultAsync();
            if(sal==null)
                return BadRequest("nema salona u bazi");
            var izabranoVremePocetka=Common.CommonMethods.vratiVreme(dan1,vreme);
            if(DateTime.Equals(izabranoVremePocetka,DateTime.MinValue)==true)
                return BadRequest("Lose odradjeno vreme");
            var kor=await Context.Korisnici.Where(x=>x.ID==korisnikID).FirstOrDefaultAsync();
            if(kor==null)
                return BadRequest("Ne postoji korisnik sa ti ID-ijem");
            var friz=await Context.Radnici.Where(x=>x.ID==frizerID).FirstOrDefaultAsync();
            if(friz==null)
                return BadRequest("Ne postoji frizer sa ti ID-ijem");
                t.Datum=dan1;
                t.VremePocetka=izabranoVremePocetka;
                
                t.Korisnik=kor;
                t.Salon=sal;
                var brojac=0;
            
            var listaSplit= listaUsluga.Split(';').ToList();
            int vremeZaKraj=0;
            int cenaZaSve=0;
            listaSplit.ForEach(x=>
            {
                var broj=int.Parse(x);
                var vracanjeUsluge=Context.Usluge.Where(u=>u.ID==broj).FirstOrDefault();
                var usl=new Usluga();
                    usl.ImeUsluge=vracanjeUsluge.ImeUsluge;
                    usl.VremeTrajanja=vracanjeUsluge.VremeTrajanja;
                    usl.Cena=vracanjeUsluge.Cena;
                    usl.Salon=vracanjeUsluge.Salon;
                    usl.Termin=t;
                    usl.TipUsluge=tip;
                vremeZaKraj+=usl.VremeTrajanja;
                cenaZaSve+=usl.Cena;
                Context.Usluge.Add(usl);
            });
            t.UkupnaCena=cenaZaSve;
            t.VremeKraja=t.VremePocetka.AddMinutes(vremeZaKraj);
            var listaTermina=await Context.Termini.Where(x=>x.Radnik.ID==frizerID).ToListAsync();
            if(listaTermina.Count!=0)
            {
                listaTermina.ForEach(x=>{
                    if(DateTime.Equals(x.VremePocetka,t.VremePocetka)==false)
                        if(((DateTime.Compare(t.VremePocetka,x.VremePocetka)>0)&&(DateTime.Compare(t.VremePocetka,x.VremeKraja)>0))||((DateTime.Compare(t.VremePocetka,x.VremePocetka)<0)&&(DateTime.Compare(t.VremeKraja,x.VremePocetka)<0)))
                            if(DateTime.Compare(t.VremeKraja,new DateTime(t.Datum.Year,t.Datum.Month,t.Datum.Day,22,0,0))<0)             
                            brojac++;              
                });
                if(brojac==listaTermina.Count)
                    t.Radnik=friz;
                else
                    return BadRequest("Radnik je zauzet u tom teminu");
            }
            else{t.Radnik=friz;}
            Context.Termini.Add(t);
            try
            {
            await Context.SaveChangesAsync();
            return Ok(t);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message+e.StackTrace);
            }
        }

    }
}