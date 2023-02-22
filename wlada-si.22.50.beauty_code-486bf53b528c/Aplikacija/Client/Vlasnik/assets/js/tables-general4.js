import { Vlasnik } from "../../../assets/js/vlasnik.js";
import { Salon } from "../../../assets/js/salon.js";
import { Api } from "../../../assets/js/api.js";
import { Proizvod } from "../../../assets/js/proizvod.js";
import { Korisnik } from "../../../assets/js/korisnik.js";
import { Komentar } from "../../../assets/js/komentar.js";

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
document.getElementById("namedropdown-togglet3").innerHTML=`${vlasnik.ime}`;
document.getElementById("namedropdown-headert3").innerHTML=`${vlasnik.ime} ${vlasnik.prezime}`;
var salon= new Salon(
    localStorage.getItem("salonId"),
    localStorage.getItem("salonIme"),
    localStorage.getItem("salonAdresa"),
    localStorage.getItem("salonSlika"),
    localStorage.getItem("salonPIB"),
    localStorage.getItem("salongodOsnivanja"));

let listaKomentara=[];
listaKomentara= await api.vratiKomentare(salon.id);
console.log(listaKomentara);
listaKomentara.forEach((p,i)=>{
    let korisnik=new Korisnik();
    korisnik=p.korisnik;
    document.getElementById("tblkomentari").innerHTML+=`
            <tr id="${i}">
                <th scope="row">${i+1}</th>
                <td>${korisnik.korisnickoIme}</td>
                <td>${p.sadrzaj}</td>
                <td>${p.ocena}</td>
                <td name="radioKomentari"></td>
            </tr>
    `
})

let s= document.getElementsByName('radioKomentari');
s.forEach((s,i)=>{
    let btn=document.createElement("input");
    btn.type="radio";
    btn.name="btnkomentari";
    btn.value=i;
    s.appendChild(btn);
})

let divBtnRadnici=document.getElementById('divizmenitg4');
let obrisiBtn= document.createElement("button");
obrisiBtn.innerText="Obriši";
obrisiBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-x-square"></i>`;
obrisiBtn.className="btn btn-danger buttonr buttonr2";
divBtnRadnici.appendChild(obrisiBtn);

obrisiBtn.onclick=(ev)=>obrisiPodatak();

async function obrisiPodatak()
{
    let index;
    let izabrano=0;
    document.getElementsByName("btnkomentari").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Odaberite komentar!");
    }
    else
    {
        let p= new Komentar();
        p=listaKomentara[index];
        let ch= await api.obrisiKomentar(p.ID,localStorage.getItem("vlasnikId"));
        if(ch==true)
        {
            location.reload();
        }
        else{
            console.log(ch);
        }
    }
}