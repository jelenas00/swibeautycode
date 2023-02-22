import { Vlasnik } from "../../../assets/js/vlasnik.js";
import { Salon } from "../../../assets/js/salon.js";
import { Radnik } from "../../../assets/js/radnik.js";
import { Api } from "../../../assets/js/api.js";

//alert("HEJ");
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
var salon= new Salon(
    localStorage.getItem("salonId"),
    localStorage.getItem("salonIme"),
    localStorage.getItem("salonAdresa"),
    localStorage.getItem("salonSlika"),
    localStorage.getItem("salonPIB"),
    localStorage.getItem("salongodOsnivanja"));
let api= new Api();
var listaRadnika=[];
listaRadnika=await api.vratiRadnike(salon.id);
console.log(listaRadnika);
listaRadnika.forEach((r,i)=>{
    document.getElementById("tblradnici").innerHTML+=`
    <tr>
        <th scope="row">${i+1}</th>
        <td>${r.ime}</td>
        <td>${r.prezime}</td>
        <td>${r.tipRadnika}</td>
        <td>${r.korisnickoIme}</td>
        <td>${r.email}</th>
        <td>${r.adresa}</td>
        <td>${r.brojTelefona}</td>
        <td>${r.plata}</td>
        <td name="radioRadnici"></td>
        
    </tr>
`

})
let s= document.getElementsByName('radioRadnici');
s.forEach((s,i)=>{
    let btn=document.createElement("input");
    btn.type="radio";
    btn.name="btnradnici";
    btn.value=i;
    s.appendChild(btn);
})
function onclik(){
    let s=0;
    let val=document.getElementsByName("btnradnici");
    val.forEach((s,i)=>
    {
        if(s.checked==true){
            alert(i);
        }
    })
    
}
let divBtnRadnici=document.getElementById('divizmenitg');
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
    document.getElementsByName("btnradnici").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Odaberite radnika!");
    }
    else
    {
        showModal(listaRadnika[index]);
    }
    
}

function showModal( data) {
    let radnik= new Radnik();
    radnik=data;
    console.log(radnik);
    const modal = new bootstrap.Modal(document.getElementById("myModaltg"), {})
    modal.show();
    document.getElementById("modalBodytg").innerHTML=`
    <form role="form" method="POST" action="">
    <input type="hidden" name="_token" value="">
    <div class="form-group">
        <label class="control-label">Ime</label>
        <div>
            <input type="text" class="form-control input-lg" name="ime" id="imeModaltg" value="${radnik.ime}" required/>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label">Prezime</label>
        <div>
            <input type="text" class="form-control input-lg" name="prezime" id="prezimeModaltg" value="${radnik.prezime}" required/>
        </div>
    </div>
    <div class="col-md-4">
                  <label for="inputTip" class="form-label">Tip radnika</label>
                  <select id="inputTip" class="form-select zaposliForma">
                    <option value="Frizer">Frizer/ka</option>
                    <option value="Kozmeticar">Kozmetičar/ka</option>
                    <option value="Maser">Maser/ka</option>                       
                  </select>
                </div>
    <div class="form-group">
      <label class="control-label">Korisničko ime</label>
      <div>
          <input type="text" class="form-control input-lg" name="username" id="korImeModaltg" value="${radnik.korisnickoIme}" required/>
      </div>
  </div>
  <div class="form-group">
    <label class="control-label">Adresa</label>
    <div>
        <input type="text" class="form-control input-lg" name="adresa" id="adresaModaltg" value="${radnik.adresa}" required/>
    </div>
</div>
<div class="form-group">
  <label class="control-label">Telefon</label>
  <div>
      <input type="text" class="form-control input-lg" name="telefon" id="telModaltg" value="${radnik.brojTelefona}" required/>
  </div>
</div>
<div class="form-group">
<label class="control-label">Plata</label> 
<div>
    <input type="number" class="form-control input-lg" name="plata" id="plataModaltg" value="${radnik.plata}" required/>
</div>
</div>
  </form>`
    document.querySelector('.zaposliForma').value=radnik.tipRadnika;
    let dugmeModal=document.getElementById("btnModaltg");
    dugmeModal.onclick=(ev)=>pokupiPodatkeModal(radnik);
}
async function pokupiPodatkeModal(rad)
{
    let radnik= new Radnik();
    radnik=rad;
    radnik.ime=document.getElementById("imeModaltg").value;
    radnik.prezime=document.getElementById("prezimeModaltg").value;
    radnik.korisnickoIme=document.getElementById("korImeModaltg").value;
    radnik.adresa=document.getElementById("adresaModaltg").value;
    radnik.brojTelefona=document.getElementById("telModaltg").value;
    radnik.plata=document.getElementById("plataModaltg").value;
    radnik.tipRadnika=document.querySelector('.zaposliForma').value;
    let ch= await api.izvrsiIzmeneKaoVlasnik(radnik,localStorage.getItem("vlasnikId"));
    if(ch==true)
    {
        location.reload();
    }
}

async function obrisiPodatak()
{
    let index;
    let izabrano=0;
    document.getElementsByName("btnradnici").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Odaberite radnika!");
    }
    else
    {
        console.log(listaRadnika[index]);
        let r= new Radnik();
        r=listaRadnika[index];
        let ch= await api.obrisiRadnika(r.id,localStorage.getItem("vlasnikId"));
        if(ch==true)
        {
            location.reload();
        }
        else{
            console.log(ch);
        }
    }
}
