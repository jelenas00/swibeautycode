import { Radnik } from "../../../assets/js/radnik.js";
import { Api } from "../../../assets/js/api.js";

var api= new Api();
var radnik=new Radnik( localStorage.getItem("radnikId"),
localStorage.getItem("radnikIme"),
localStorage.getItem("radnikPrezime"),
localStorage.getItem("radnikBrojTelefona"),
localStorage.getItem("radnikAdresa"),
localStorage.getItem("radnikGodinaZaposlenja"),
localStorage.getItem("radnikDatumRodjenja"),
localStorage.getItem("radnikEmail"),
localStorage.getItem("radnikPassword"),
localStorage.getItem("radnikKorisnickoIme"),
localStorage.getItem("radnikSkola"),
localStorage.getItem("radnikPlata"),
localStorage.getItem("radnikRadniStaz"),
localStorage.getItem("radnikTipRadnika"));
console.log(radnik);

document.getElementById("namedropdown-togglezap").innerHTML=`${radnik.ime}`;
document.getElementById("namedropdown-headerzap").innerHTML=`${radnik.ime} ${radnik.prezime}`;
document.getElementById("radnapozicija").innerHTML=`${radnik.tipRadnika}`;
document.getElementById("ImeIPrezimeZaposleniGlavna").innerHTML=`${radnik.ime} ${radnik.prezime}`;
document.getElementById("glavniTipradnika").innerHTML=`${radnik.tipRadnika}`;