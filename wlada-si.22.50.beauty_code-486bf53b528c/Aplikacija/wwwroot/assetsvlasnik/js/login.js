import {Api} from "../../../assets/js/api.js"
import { Vlasnik } from "../../../assets/js/vlasnik.js"

var api=new Api();
var salon=await api.vratiSalon();
var nalog;
(function(){
    const forma = document.getElementById("login")
    function submitHandler(e) {
        // const indexLink = document.querySelector(".index-link")
        // indexLink.click();
        e.preventDefault();
        // window.location.href = "index.html"
        // return false;
    }
    forma.addEventListener("submit", submitHandler)

})()
var akcija=document.getElementById("PrijavaAdmin");
akcija.onclick=async function(){
    nalog = await api.PrijavaNaSajtUzVracanjeObjekta(document.getElementById("korisnickoImeAdmin").value,document.getElementById("passwordAdmin").value);
    console.log(nalog);
    if((nalog instanceof Vlasnik)==true && nalog!=false)
    {      
    console.log(nalog);
    localStorage.setItem("vlasnikId",nalog.id);
    localStorage.setItem("vlasnikIme",nalog.ime);
    localStorage.setItem("vlasnikPrezime",nalog.prezime);
    localStorage.setItem("vlasnikBrojTelefona",nalog.brojTelefona);
    localStorage.setItem("vlasnikAdresa",nalog.adresa);
    localStorage.setItem("vlasnikVlOd",nalog.vlasnikOd);
    localStorage.setItem("vlasnikDatumRodjenja",nalog.datumRodjenja)
    localStorage.setItem("vlasnikEmail",nalog.email);
    localStorage.setItem("vlasnikPassword",nalog.password);
    localStorage.setItem("vlasnikKorisnickoIme",nalog.korisnickoIme);
    window.location.href = "./Vlasnik";
    }
    else console.log("nalog nije vlasnicki");
};