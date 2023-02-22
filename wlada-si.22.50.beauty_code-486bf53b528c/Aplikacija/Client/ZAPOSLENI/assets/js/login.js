import { Api } from "../../../assets/js/api.js"
import { Radnik } from "../../../assets/js/radnik.js"

var api=new Api();
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
var akcija=document.getElementById("PrijavaZaposleni");
akcija.onclick=async function(){
    nalog = await api.PrijavaNaSajtUzVracanjeObjekta(document.getElementById("korisnickoImeZaposleni").value,document.getElementById("passwordZaposleni").value);
    console.log(nalog);
    if((nalog instanceof Radnik)==true && nalog!=false)
    {
    //id, ime, prezime, brojTelefona, adresa, godina, email, password, korisnickoIme, skola, plata, radniStaz, tipRadnika
    localStorage.setItem("radnikId",nalog.id);
    localStorage.setItem("radnikIme",nalog.ime);
    localStorage.setItem("radnikPrezime",nalog.prezime);
    localStorage.setItem("radnikBrojTelefona",nalog.brojTelefona);
    localStorage.setItem("radnikAdresa",nalog.adresa);
    localStorage.setItem("radnikGodinaZaposlenja",nalog.godinaZaposlenja);
    localStorage.setItem("radnikDatumRodjenja",nalog.datumRodjenja);
    localStorage.setItem("radnikEmail",nalog.email);
    localStorage.setItem("radnikPassword",nalog.password);
    localStorage.setItem("radnikKorisnickoIme",nalog.korisnickoIme);
    localStorage.setItem("radnikSkola",nalog.skola);
    localStorage.setItem("radnikPlata",nalog.plata);
    localStorage.setItem("radnikRadniStaz",nalog.radniStaz);
    localStorage.setItem("radnikTipRadnika",nalog.tipRadnika);
    window.location.href = "index.html";
    }
    else console.log("nalog nije zaposleni");
};
var akcija1=document.getElementById("ZaboraviliSteLozinkuZaposleni");
akcija1.onclick=async function(){
    alert("pozovite broj na glavnoj strani");
}