import { Vlasnik } from "../../../assets/js/vlasnik.js";
import { Salon } from "../../../assets/js/salon.js";
import { Api } from "../../../assets/js/api.js";

var api= new Api();
var salon= new Salon(
    localStorage.getItem("salonId"),
    localStorage.getItem("salonIme"),
    localStorage.getItem("salonAdresa"),
    localStorage.getItem("salonSlika"),
    localStorage.getItem("salonPIB"),
    localStorage.getItem("salongodOsnivanja"));
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

document.getElementById("adresasalona").innerHTML=`${salon.adresa}`;
document.getElementById("salonimepc").innerHTML=`${salon.ime}`;
document.getElementById("salonadresapc").innerHTML=`${salon.adresa}`;
document.getElementById("salonpibpc").innerHTML=`${salon.pib}`;
document.getElementById("godosnivanjapc").innerHTML=`${salon.godinaOsnivanja}`;

let s=document.getElementById("salonimeizmenapc");
s.innerHTML+=`
<input name="fullName" type="text" class="form-control" id="salimepc" value="${salon.ime}">
`
s=document.getElementById("salonadresaizmenapc");
s.innerHTML+=`
<input name="address" type="text" class="form-control" id="saladrpc" value="${salon.adresa}">
`
s=document.getElementById("salonpibizmenapc");
s.innerHTML+=`
<input name="address" type="text" class="form-control" id="salpibpc" value="${salon.pib}">
`
s=document.getElementById("salongodinaizmenapc");
s.innerHTML+=`
<input name="address" type="text" class="form-control" id="salgodpc" value="${salon.godinaOsnivanja}">
`

let prom=document.getElementById("btnsalchange");
prom.onclick=(ev)=>pokupiIzmene();
function pokupiIzmene(){
    let s=document.getElementById("salimepc");
    let novoIme=s.value;
    s=document.getElementById("saladrpc");
    let novaAdresa=s.value;
    s=document.getElementById("salpibpc");
    let noviPIB=s.value;
    s=document.getElementById("salgodpc");
    let novaGod=s.value;
    console.log(novoIme+novaAdresa+noviPIB+novaGod);
    changeSalon(novoIme,novaAdresa,noviPIB,novaGod);
}
async function changeSalon(ime,adr,pib,god){
    let sal= new Salon();
    sal= await api.vratiSalon();
    sal.ime=ime;
    sal.adresa=adr;
    sal.pib=pib;
    sal.godinaOsnivanja=god;
    let ch=await api.izmeniInfoOSalonu(sal,localStorage.getItem("vlasnikId"));
    if(ch==true){
        localStorage.setItem("salonId",sal.id);
      localStorage.setItem("salonIme",sal.ime);
      localStorage.setItem("salonAdresa",sal.adresa);
      localStorage.setItem("salonPIB",sal.pib);
      localStorage.setItem("salongodOsnivanja",sal.godinaOsnivanja);
      localStorage.setItem("salonSlika",sal.slika);
        location.reload();
    }
}