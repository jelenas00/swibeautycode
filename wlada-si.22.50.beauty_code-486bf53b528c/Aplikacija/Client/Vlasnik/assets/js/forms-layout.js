import { Radnik } from "../../../assets/js/radnik.js";
import { Vlasnik } from "../../../assets/js/vlasnik.js";
import { Api } from "../../../assets/js/api.js";

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
document.getElementById("namedropdown-togglefl").innerHTML=`${vlasnik.ime}`;
document.getElementById("namedropdown-headerfl").innerHTML=`${vlasnik.ime} ${vlasnik.prezime}`;

let dugme=document.getElementById("zaposli");
dugme.onclick=(ev)=>preuzmiPodatke();
function preuzmiPodatke(){
    let s= document.getElementById("inputImefl");
    let ime=s.value;
    s= document.getElementById("inputPrezimefl");
    let prezime=s.value;
    s= document.getElementById("inputKorImefl");
    let korime=s.value;
    s= document.getElementById("inputEmailfl");
    let email=s.value;
    s= document.getElementById("inputPasswordfl");
    let pass=s.value;
    s= document.getElementById("inputAdresafl");
    let adr=s.value;
    s= document.getElementById("inputBrTelfl");
    let brtel=s.value;
    s= document.getElementById("inputSkolafl");
    let skola=s.value;
    s= document.getElementById("inputStazfl");
    let staz=s.value;
    s= document.getElementById("inputGodZapfl");
    let god=s.value;
    s= document.getElementById("inputPlatafl");
    let plata=s.value;
    let tip=document.querySelector('.zaposliForma').value;
    s=document.getElementById("birthdayRadnikfl");
    let datRodjenja= s.value;
    zaposli(ime,prezime,korime,email,pass,adr,brtel,skola,god,datRodjenja,staz,plata,tip);
}

async function zaposli(ime,prezime,korime,email,pass,adr,brtel,skola,god,datRodjenja,staz,plata,tip){
    let radnik= new Radnik();
    let s= await api.ZaposliRadnika(ime,prezime,brtel,adr,god,datRodjenja,email,pass,korime,skola,plata,staz,tip,localStorage.getItem("vlasnikId"));
    if (s==true)
    {
        alert("Radnik uspešno zapošljen");
        location.reload();
    }
}