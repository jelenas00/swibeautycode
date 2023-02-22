import { Api } from "../js/api.js";
import { Usluga } from "../js/usluga.js";
import { Radnik } from "../js/radnik.js";

var api=new Api();
var salon=await api.vratiSalon();
var radnici=[];
var tip= localStorage.getItem("Tip");
console.log(tip);
if(tip==='Frizerska')
  {
    console.log("rradi");
    radnici= await api.vratiRadnikePoTipu('Frizer');
      console.log(radnici);
    
  }
  if(tip==='Kozmeticka')
  {
    console.log("rradi");
    radnici= await api.vratiRadnikePoTipu('Kozmeticar');
      console.log(radnici);
    
  }
  if(tip==='Masaza')
  {
    console.log("rradi");
    radnici= await api.vratiRadnikePoTipu('Maser');
    console.log(radnici);
    
}
console.log(radnici);
var selekcija=document.getElementById("dropBoxZaRadnikeZakazivanje");
for(const rad of radnici)
{
    selekcija.innerHTML+=` <option value="${rad.id}">${rad.ime}</option>`
}
var listaUslugaPoslatih=[];
var uslugeIzabrane=localStorage.getItem("UslugeDuzina");
for(var i=0;i<uslugeIzabrane;i++)
{
    var broj=localStorage.getItem(`Usluge${i}`);
    console.log(broj);
    listaUslugaPoslatih.push(broj);
}
var stringUsluga=listaUslugaPoslatih.join(';');
var usluge=await api.vratiUslugeIzabrane(stringUsluga);
var selekcija1=document.getElementById("zakazivanjeInfo");
var ukCena=0;
for(const usl of usluge)
{
    selekcija1.innerHTML+=`<div class="naziv"> ${usl.imeUsluge} (${usl.vremeTrajanja}min)   -   ${usl.cena} RSD  </div>`
    ukCena+=usl.cena;
}

var selekcija2=document.getElementById("placanjeZakazivanjeStrana");
selekcija2.innerHTML=` <strong> Način plaćanja: </strong>  <em> plaćanje u salonu </em>
<br> <br> 
<strong> UKUPNO: </strong> ${ukCena}RSD`;

var selekcija2=document.getElementById("vreme termina");
var sati=10,minuta=0;
var brojKrajni=48;
for(var i=0;i<brojKrajni;i++)
{
    if(minuta<15)
    selekcija2.innerHTML+=` <option value="${i}">${sati}:${minuta}0 h</option>`
    else
    selekcija2.innerHTML+=` <option value="${i}">${sati}:${minuta} h</option>`

    minuta+=15;
    if(minuta==60)
    {
        minuta=0;
        sati++;
    }
}
document.getElementById("imeZakazivanje").innerHTML=`${salon.ime}`;
document.getElementById("adresaZakazivanje").innerHTML=`${salon.adresa}`;

document.getElementById("dugmeZakazi").onclick=(ev)=>zakaziTermin();

async function zakaziTermin()
{
    if(document.getElementById("datum termina").value!=""&&document.getElementById("vreme termina").value!=null&&document.getElementById("dropBoxZaRadnikeZakazivanje").value!=0&&stringUsluga!=null&&localStorage.getItem("korisnikId")!=null)
    {
        let ch= await api.zakaziTermin(document.getElementById("datum termina").value,document.getElementById("vreme termina").value,document.getElementById("dropBoxZaRadnikeZakazivanje").value,stringUsluga,localStorage.getItem("korisnikId"),tip);
        if(ch==true)
        {
            localStorage.removeItem("Tip");
            var uslugeIzabrane=localStorage.getItem("UslugeDuzina");
            for(var i=0;i<uslugeIzabrane;i++)
            {
                localStorage.removeItem(`Usluge${i}`);
            }
            localStorage.removeItem("UslugeDuzina");
            window.location.href = "./Korisnik";
        }
    }
    else alert("Forma nije lepo popunjena");
}

var akcija=document.getElementById("pocetnaSaZakazivanja");
akcija.onclick=async function(){
    localStorage.setItem("korisnikId",nalog.id);
    localStorage.setItem("korisnikIme",nalog.ime);
    localStorage.setItem("korisnikPrezime",nalog.prezime);
    localStorage.setItem("korisnikBrojTelefona",nalog.brojTelefona);
    localStorage.setItem("korisnikAdresa",nalog.adresa);
    localStorage.setItem("korisnikGodina",nalog.godina);
    localStorage.setItem("korisnikEmail",nalog.email);
    localStorage.setItem("korisnikPassword",nalog.password);
    localStorage.setItem("korisnikKorisnickoIme",nalog.korisnickoIme);
    localStorage.setItem("korisnikDatumRodjenja",nalog.datumRodjenja);
}
var akcija1=document.getElementById("cenonikZakazivanje");
akcija1.onclick=async function(){
    localStorage.setItem("korisnikId",nalog.id);
    localStorage.setItem("korisnikIme",nalog.ime);
    localStorage.setItem("korisnikPrezime",nalog.prezime);
    localStorage.setItem("korisnikBrojTelefona",nalog.brojTelefona);
    localStorage.setItem("korisnikAdresa",nalog.adresa);
    localStorage.setItem("korisnikGodina",nalog.godina);
    localStorage.setItem("korisnikEmail",nalog.email);
    localStorage.setItem("korisnikPassword",nalog.password);
    localStorage.setItem("korisnikKorisnickoIme",nalog.korisnickoIme);
    localStorage.setItem("korisnikDatumRodjenja",nalog.datumRodjenja);
}
