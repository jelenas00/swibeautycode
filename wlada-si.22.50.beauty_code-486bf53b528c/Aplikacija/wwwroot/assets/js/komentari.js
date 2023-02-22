import { Korisnik} from "./korisnik.js";
import { Api } from "./api.js"

var api= new Api();
var korisnik= new Korisnik(
    localStorage.getItem("korisnikId"),
    localStorage.getItem("korisnikIme"),
    localStorage.getItem("korisnikPrezime"),
    localStorage.getItem("korisnikBrojTelefona"),
    localStorage.getItem("korisnikAdresa"),
    localStorage.getItem("korisnikGodina"),
    localStorage.getItem("korisnikEmail"),
    localStorage.getItem("korisnikPassword"),
    localStorage.getItem("korisnikKorisnickoIme"),
    localStorage.getItem("korisnikDatumRodjenja"));

    console.log(korisnik);

document.getElementById("postavi-komentar-btn").onclick=(ev)=>pokupiKomentar();

async function pokupiKomentar()
{
    let ocena;
    let izabrano=0;
    let kom=document.getElementById("tekstKomentara").value;
    document.getElementsByName("zvezdica").forEach(d=>{
        if(d.checked==true)
        {
            ocena=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Nista dodali ocenu!");
    }
    if(kom.length==0)
    {
        alert("Niste dodali komentar!");
    }
    else
    {
        let ch= await api.dodajKomentar(kom,ocena,korisnik.id);
        if(ch==true)
        {
            location.reload();
        }
    }
}