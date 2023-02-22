import { Api } from "../../../assets/js/api.js";
import { Vlasnik } from "../../../assets/js/vlasnik.js";
//import {InfoVlasnik} from "./infovlasnik.js";

var api= new Api();
var vl= new Vlasnik();
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
function ime()
{
    document.getElementById("namedropdown-toggle").innerHTML=`${vlasnik.ime}`;
    document.getElementById("namedropdown-header").innerHTML=`${vlasnik.ime} ${vlasnik.prezime}`;
}
ime();
document.getElementById("nameindex").innerHTML=`${vlasnik.ime} ${vlasnik.prezime}`;