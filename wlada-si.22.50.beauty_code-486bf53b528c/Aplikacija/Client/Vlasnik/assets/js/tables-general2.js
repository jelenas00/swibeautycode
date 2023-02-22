import { Vlasnik } from "../../../assets/js/vlasnik.js";
import { Salon } from "../../../assets/js/salon.js";
import { Api } from "../../../assets/js/api.js";
import { Usluga } from "../../../assets/js/usluga.js";

let api= new Api();
var vlasnik=new Vlasnik(
    localStorage.getItem("vlasnikId"),
    localStorage.getItem("vlasnikIme"),
    localStorage.getItem("vlasnikPrezime"),
    localStorage.getItem("vlasnikBrojTelefona"),
    localStorage.getItem("vlasnikAdresa"),
    localStorage.getItem("vlasnikVlOd"),
    localStorage.getItem("vlasnikDatumRodjenja"),
    localStorage.getItem("vlasnikEmail"),
    localStorage.getItem("vlasnikPassword"),
    localStorage.getItem("vlasnikKorisnickoIme"));
document.getElementById("namedropdown-togglet2").innerHTML=`${vlasnik.ime}`;
document.getElementById("namedropdown-headert2").innerHTML=`${vlasnik.ime} ${vlasnik.prezime}`;
var salon= new Salon(
    localStorage.getItem("salonId"),
    localStorage.getItem("salonIme"),
    localStorage.getItem("salonAdresa"),
    localStorage.getItem("salonSlika"),
    localStorage.getItem("salonPIB"),
    localStorage.getItem("salongodOsnivanja"));

let listaUsluga=[];
listaUsluga= await api.vratiUslugePrazne(salon.id);
console.log(listaUsluga);
listaUsluga.forEach((u,i)=>{
    let sati=0;
    let minuti=0;
    let vreme;
    if(u.vremeTrajanja/60<1)
    {
        minuti=u.vremeTrajanja;
        vreme=minuti+" min";
    }
    else{
        sati=parseInt(u.vremeTrajanja/60);
        minuti=u.vremeTrajanja % 60;
        if(minuti==0)
        {
            vreme=sati+"h ";
        }
        else{
            vreme=sati+"h "+minuti+" min";
        }
        
    }
    document.getElementById("tblusluge").innerHTML+=`
                    <tr>
                      <th scope="row">${i+1}</th>
                      <td>${u.imeUsluge}</td>
                      <td>${u.tipUsluge}</td>
                      <td>${vreme}</td>
                      <td>${u.cena}</td>
                      <td name="radioUsluge"></td>
                    </tr>
    `
})
let s= document.getElementsByName('radioUsluge');
s.forEach((s,i)=>{
    let btn=document.createElement("input");
    btn.type="radio";
    btn.name="btnusluge";
    btn.value=i;
    s.appendChild(btn);
})

let divBtnRadnici=document.getElementById('divizmenitg2');
let izmeniBtn=document.createElement("button");
izmeniBtn.innerText="Izmeni";
izmeniBtn.className="btn btn-info buttonb buttonb2";
izmeniBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-pencil-square"></i>`;
divBtnRadnici.appendChild(izmeniBtn);
let obrisiBtn= document.createElement("button");
obrisiBtn.innerText="Obriši";
obrisiBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-x-square"></i>`;
obrisiBtn.className="btn btn-danger buttonr buttonr2";
divBtnRadnici.appendChild(obrisiBtn);

izmeniBtn.onclick=(ev)=>izmeniPodatke();
obrisiBtn.onclick=(ev)=>obrisiPodatak();
function izmeniPodatke()
{
    let index;
    let izabrano=0;
    document.getElementsByName("btnusluge").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Odaberite uslugu!");
    }
    else
    {
        showModal(listaUsluga[index]);
    }
}

function showModal( data) {
  let usluga= new Usluga();
  usluga=data;
  const modal = new bootstrap.Modal(document.getElementById("myModaltg2"), {})
  modal.show();
  document.getElementById("modalBodytg2").innerHTML=`
  <form role="form" method="POST" action="">
  <input type="hidden" name="_token" value="">
  <div class="form-group">
      <label class="control-label">Naziv</label>
      <div>
          <input type="text" class="form-control input-lg" name="naziv" id ="nazivizmena" value="${usluga.imeUsluge}" required/>
      </div>
  </div>
  <div class="col-md-4">
                  <label for="inputTip" class="form-label">Tip usluge</label>
                  <select id="inputTip" class="form-select tipUslugeSelekt">
                    <option value="Frizerska">Frizerske</option>
                    <option value="Kozmeticka">Kozmetičke</option>
                    <option value="Masaza">Masaže</option>             
                  </select>
                </div>
                <div class="col-md-4">
                <label for="inputTrajanje" class="form-label">Trajanje usluge</label>
                <select id="inputTrajanje" class="form-select vremeUslugeSelekt">
                  <!-- <option selected>Izaberi...</option> -->
                  <option value="15">15m</option>
                  <option value="30">30m</option>
                  <option value="45">45m</option>
                  <option value="60">1h</option>
                  <option value="75">1h:15m</option>
                  <option value="90">1h:30m</option>
                  <option value="105">1h:45m</option>
                  <option value="120">2h</option>                    
                </select>
              </div>
</div>
<div class="form-group">
  <label class="control-label">Cena</label>
  <div>
      <input type="number" class="form-control input-lg" name="cena" id ="cenaizmena"  value="${usluga.cena}" required/>
  </div>
</div>
</form>`
document.querySelector('.tipUslugeSelekt').value=usluga.tipUsluge;
document.querySelector('.vremeUslugeSelekt').value=usluga.vremeTrajanja;
let dugmeModal=document.getElementById("btnModaltg2");
    dugmeModal.onclick=(ev)=>pokupiPodatkeModal(usluga);

}

async function pokupiPodatkeModal(data)
{
    let usluga= new Usluga();
    usluga=data;
    usluga.imeUsluge=document.getElementById("nazivizmena").value;
    usluga.tipUsluge=document.querySelector('.tipUslugeSelekt').value;
    usluga.vremeTrajanja=document.querySelector('.vremeUslugeSelekt').value;
    usluga.cena=document.getElementById("cenaizmena").value;
    let ch= await api.izmeniUslugu(usluga,localStorage.getItem("vlasnikId"));
    if(ch==true)
    {
        location.reload();
    }
}

async function obrisiPodatak(){
    let index;
    let izabrano=0;
    document.getElementsByName("btnusluge").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Odaberite uslugu!");
    }
    else
    {
        let us=new Usluga();
        us=listaUsluga[index];
        let ch= await api.obrisiUslugu(us.ID,localStorage.getItem("vlasnikId"));
        if(ch==true)
        {
            location.reload();
        }
        else{
            console.log(ch);
        }
    }
}