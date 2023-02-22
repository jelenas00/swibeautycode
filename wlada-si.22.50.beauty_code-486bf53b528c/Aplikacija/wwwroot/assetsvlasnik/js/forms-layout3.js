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

let dugme=document.getElementById("dodajProizvod");
dugme.onclick=(ev)=>preuzmiPodatke();
async function preuzmiPodatke(){
    let s= document.getElementById("inputImeProizvodafl3");
    let imeProizvoda=s.value;
    s= document.getElementById("inputKolicinafl3");
    let kolicina=s.value;
    console.log(imeProizvoda+" "+kolicina);
    let ch= await api.napraviProizvod(imeProizvoda,kolicina,localStorage.getItem("vlasnikId"));
    if (ch==true)
    {
        location.reload();
    }
}