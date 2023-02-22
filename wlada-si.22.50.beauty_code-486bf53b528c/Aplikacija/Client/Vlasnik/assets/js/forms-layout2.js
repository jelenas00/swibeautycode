import { Api } from "../../../assets/js/api.js";
import { Vlasnik } from "../../../assets/js/vlasnik.js";
import { Usluga } from "../../../assets/js/usluga.js";

let api= new Api();
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
document.getElementById("namedropdown-togglefl2").innerHTML=`${vlasnik.ime}`;
document.getElementById("namedropdown-headerfl2").innerHTML=`${vlasnik.ime} ${vlasnik.prezime}`;

let dugme=document.getElementById("dodaj");
dugme.onclick=(ev)=>preuzmiPodatke();
async function preuzmiPodatke(){
    let s= document.getElementById("inputImeUslugefl2");
    let imeUsluge=s.value;
    s= document.getElementById("inputCenafl2");
    let cena=s.value;
    let trajanje=document.querySelector('.vremeUslugeSelekt').value;
    let tip=document.querySelector('.tipUslugeSelekt').value;
    console.log(imeUsluge+" "+cena+" "+trajanje+" "+tip);
    let ch= await api.dodajNovuUslugu(imeUsluge,trajanje,cena,tip);
    if (ch==true)
    {
        location.reload();
    }
}