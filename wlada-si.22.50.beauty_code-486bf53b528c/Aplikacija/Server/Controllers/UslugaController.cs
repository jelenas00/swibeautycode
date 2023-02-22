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
    public class UslugaController : ControllerBase
    {
        public ContextKlasa Context { get; set; }

        public UslugaController(ContextKlasa context)
        {
            Context = context;
        }


        [Route("VratiUsluge/{ids}")]
        [HttpGet]
        public async Task<ActionResult> VratiUsluge(int ids)
        {

            var salon = Context.Saloni.Where(s => s.ID == ids).FirstOrDefault();

            if (salon == null) {
                return BadRequest("Nepostojeci salon!");
            }

            var usluge = await Context.Usluge.Where(u => u.Salon == salon).ToListAsync();


            try {
                return Ok(usluge);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }
        }
        [Route("VratiUslugeIzabrane/{ids}")]
        [HttpGet]
        public async Task<ActionResult> VratiUslugeIzabrane(string ids)
        {

            var salon = await Context.Saloni.FirstOrDefaultAsync();

            if (salon == null) {
                return BadRequest("Nepostojeci salon!");
            }
            var listaZaVracanje=new List<Usluga>();
            var listaSplit= ids.Split(';').ToList();
            listaSplit.ForEach(x=>
            {
                var broj=int.Parse(x);
                var vracanjeUsluge= Context.Usluge.Where(u=>u.ID==broj).FirstOrDefault();
                listaZaVracanje.Add(vracanjeUsluge);
            });

            try {
                return Ok(listaZaVracanje);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Policy="RequireVlasnikRole")]
        [Route("ObrisiUslugu/{id}/{idVlasnika}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiUslugu(int id,int idVlasnika)
        {
            try {
                var usluga = await Context.Usluge.FindAsync(id);
                 
                var rad=await Context.Vlasnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();
                var rad1=await Context.Radnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();
                if(rad==null || rad.GetType().ToString()!="Models.Vlasnik"||rad1.GetType().ToString()!="Models.Radnik")
                    return BadRequest("Ne dozvoljen pristup");
                if (usluga != null)
                {
                    Context.Usluge.Remove(usluga);
                    await Context.SaveChangesAsync();
                    return Ok("Usluga je uspesno uklonjena!");
                }
                else {
                    return BadRequest("Usluga nije pronadjena u bazi!");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DodajNovuUslugu/{nova}/{trajanje}/{cena}/{tip}")]
        [HttpPost]
        public async Task<ActionResult> DodajNovuUslugu(string nova, int trajanje, int cena,string tip)
        {
            Usluga usluga = new Usluga();

            if (nova == null)
            {
                return BadRequest("Naziv usluge je nevalidan!");
            }

            if (trajanje < 15 || trajanje > 240)
            {
                return BadRequest("Nevalidno trajanje!");
            }

            if (cena < 100 || cena > 10000)
            {
                return BadRequest("Nevalidna cena!");
            }

            usluga.ImeUsluge = nova;
            usluga.VremeTrajanja = trajanje;
            usluga.Cena = cena;  
            usluga.TipUsluge=tip;

            var sal= await Context.Saloni.FirstOrDefaultAsync();
            
            if (sal == null) {
                return BadRequest("Salon nije pronadjen!");
            }
            
            usluga.Salon = sal;
            usluga.Termin = null;

            try {
                Context.Usluge.Add(usluga);
                Context.Saloni.Update(sal);
                await Context.SaveChangesAsync();
                return Ok(usluga);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }
        }
        [Route("VratiUslugePrazne")]
        [HttpGet]
        public async Task<ActionResult> VratiUslugePrazne()
        {

            var salon = Context.Saloni.FirstOrDefault();

            if (salon == null) {
                return BadRequest("Nepostojeci salon!");
            }

            var usluge = await Context.Usluge.Include(y=>y.Salon).Where(u => u.Termin == null).ToListAsync();


            try {
                return Ok(usluge);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }
        }
        [Route("VratiUslugePrazne4")]
        [HttpGet]
        public async Task<ActionResult> VratiUslugePrazne4()
        {

            var salon = await Context.Saloni.FirstOrDefaultAsync();

            if (salon == null) {
                return BadRequest("Nepostojeci salon!");
            }

            var usluge =  Context.Usluge.Include(y=>y.Salon).Where(u => u.Termin == null).Take(4).OrderBy(p => p.ID);;


            try {
                return Ok(usluge);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Policy="RequireVlasnikRole")]
        [Route("IzmeniUslugu/{idVlasnika}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniUslugu(int idVlasnika,[FromBody]Usluga u)
        {
            var usl= Context.Usluge.Where(p => p.ID == u.ID).FirstOrDefault();
            var rad=await Context.Vlasnici.Where(x=>x.ID==idVlasnika).FirstOrDefaultAsync();
                
            if(rad==null || rad.GetType().ToString()!="Models.Vlasnik")
                return BadRequest("Ne dozvoljen pristup");
            if(usl!=null)
            {
                if (usl.ImeUsluge.Length<3 || usl.ImeUsluge.Length>30 || string.IsNullOrWhiteSpace(usl.ImeUsluge))
                {
                    return BadRequest("Naziv usluge je nevalidan!");
                }

                if (usl.VremeTrajanja < 15 || usl.VremeTrajanja > 240)
                {
                    return BadRequest("Nevalidno trajanje!");
                }

                if (usl.Cena < 100 || usl.Cena > 10000)
                {
                    return BadRequest("Nevalidna cena!");
                }

                usl.ImeUsluge=u.ImeUsluge;
                usl.TipUsluge=u.TipUsluge;
                usl.VremeTrajanja=u.VremeTrajanja;
                usl.Cena=u.Cena;

                Context.Usluge.Update(usl);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izmenjene informacije o usluzi");
            }
            return BadRequest("Usluga nije nadjena");
        }

        [Route("VratiUslugePoTipu/{tip}")]
        [HttpGet]
        public async Task<ActionResult> VratiUslugePoTipu(string tip)
        {

            var usluge = await Context.Usluge.Where(u => u.TipUsluge == tip).Where(u => u.Termin == null).ToListAsync();


            try {
                return Ok(usluge);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }
        }

    }
}