import { Api } from "./api.js"
import { Korisnik } from "./korisnik.js"

var api=new Api();
var nalog;

var akcija=document.getElementById("LoginKorisnikStrana");
akcija.onclick=async function(){
    nalog = await api.PrijavaNaSajtUzVracanjeObjekta(document.getElementById("korisnickoImeKorisnik").value,document.getElementById("passwordKorisnik").value);
    console.log(nalog);
    if((nalog instanceof Korisnik)==true && nalog!=false)
    {
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
    window.location.href = "./Korisnik";
    }
    else console.log("nalog nije korisnik");
};
var akcija1=document.getElementById("ZaboraviliSteLozinkuKorisnik");
akcija1.onclick=async function(){
    alert("pozovite broj na glavnoj strani");
}
var akcija2=document.getElementById("SignUpKorisnikStrana");
akcija2.onclick=async function(){
    await api.dodajKorisnika(document.getElementById("korisnickoImeKorisnik2").value,document.getElementById("emailKorisnik").value,document.getElementById("password2Korisnik").value,document.getElementById("repassword2Korisnik").value);
    nalog=await api.PrijavaNaSajtUzVracanjeObjekta(document.getElementById("korisnickoImeKorisnik2").value,document.getElementById("password2Korisnik").value);
    if((nalog instanceof Korisnik)==true && nalog!=false)
    {
        console.log(nalog);
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
    window.location.href = "./Korisnik";
    }
    else console.log("nalog nije korisnik");
}