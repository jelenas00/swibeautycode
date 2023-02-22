import { Radnik } from "../../../assets/js/radnik.js";
import { Api } from "../../../assets/js/api.js";
import { Korisnik } from "../../../assets/js/korisnik.js";

let api= new Api();
let radnik=new Radnik( localStorage.getItem("radnikId"),
localStorage.getItem("radnikIme"),
localStorage.getItem("radnikPrezime"),
localStorage.getItem("radnikBrojTelefona"),
localStorage.getItem("radnikAdresa"),
localStorage.getItem("radnikGodina"),
localStorage.getItem("radnikEmail"),
localStorage.getItem("radnikPassword"),
localStorage.getItem("radnikKorisnickoIme"),
localStorage.getItem("radnikSkola"),
localStorage.getItem("radnikPlata"),
localStorage.getItem("radnikRadniStaz"),
localStorage.getItem("radnikTipRadnika"));

let listaTerminiZaDan=[];
let dugmeZakazivanje=document.getElementById("dugZakaz");
dugmeZakazivanje.onclick=(ev)=>prikazi();

async function prikazi(){
    let datum = document.getElementById("datZakaz");
    console.log(datum.value);
    listaTerminiZaDan= await api.vratiTermineZaposlenogTogDana(radnik.id,datum.value)
    console.log(listaTerminiZaDan);

    if(listaTerminiZaDan!=null)
    {
        prikaziTermin();
    }
}
function prikaziTermin(){
    console.log(listaTerminiZaDan);
    let div= document.getElementById("divZaTermin");
    div.innerHTML=`
    <h5 class="card-title">Termini </h5>
              
                            <!-- Table with stripped rows -->
                            <table class="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Usluga</th>
                                  <th scope="col">Vreme početka</th>
                                  <th scope="col">Vreme završetka</th>
                                  <th scope="col">Cena</th>
                                  <th scope="col">Klijent</th>
                                </tr>
                              </thead>
                              <tbody id="tblzakazivanje">
                                
                              
                                
                              </tbody>
                            </table>
                            <!-- End Table with stripped rows -->
                            <div style=" flex-direction:row ;display: flex; justify-content: flex-end" id="divIzvrsi">
                            <button type="button" class="btn btn-secondary btn-lista-zakazivanja" style="text-align: center" id="btnIzvrsi"> Izvrsi termin</button>
                            </div>
    `
    listaTerminiZaDan.forEach((t,i)=>{
        let datumPoc = t.vremePocetka.split('T');
        let datumPoc2 = datumPoc[0].split('-');
        let vrijemePoc = t.vremePocetka.split('T');
        let vrijemePoc2 = vrijemePoc[1].split(':');
        let vrijemeZav = t.vremeKraja.split('T');
        let vrijemeZav2 = vrijemeZav[1].split(':');
        let kl= new Korisnik();
        let listalistaUsl = "";
        t.listaUsluga.forEach(z=>{
            listalistaUsl += `${z.imeUsluge},`;
        });
        listalistaUsl = listalistaUsl.slice(0,-1)
        kl=t.korisnik;
        console.log(kl);
        document.getElementById("tblzakazivanje").innerHTML+=`
                    <tr>
                      <th scope="row">${i+1}</th>
                      <td>${listalistaUsl}</td>
                      <td>${vrijemePoc2[0]}:${vrijemePoc2[1]}</td>
                      <td>${vrijemeZav2[0]}:${vrijemeZav2[1]}</td>
                      <td>${t.ukupnaCena}</td>
                      <td>${kl.korisnickoIme}</td>
                      <td name="radioTermini"><input type="radio" class="radioTermini" name="radioTermini" value="${i}"></td>
                    </tr>
        `
    })
    document.getElementById("btnIzvrsi").onclick=(ev)=>izvrsiTermin();
}

async function izvrsiTermin(){
  let index;
  let izabrano=0;
  document.getElementsByName("radioTermini").forEach(d=>{
      if(d.checked==true)
      {
          index=d.value;
          izabrano=1;
      }
  });
  if(izabrano==0)
  {
      alert("Odaberite termin!");
  }
  else
  {
      console.log(listaTerminiZaDan[index]);
      let ch= await api.izvrsiTermin(listaTerminiZaDan[index].datum,listaTerminiZaDan[index].id,localStorage.getItem("radnikId"));
      if(ch==true)
      {
          location.reload();
      }
      else{
          console.log(ch);
      }
  }
}

