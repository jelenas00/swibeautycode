import { Api } from "../../../assets/js/api.js";
import {Radnik} from "../../../assets/js/radnik.js";
import { Salon } from "../../../assets/js/salon.js";
let api= new Api();
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

var salon= new Salon(
    localStorage.getItem("salonId"),
    localStorage.getItem("salonIme"),
    localStorage.getItem("salonAdresa"),
    localStorage.getItem("salonSlika"),
    localStorage.getItem("salonPIB"),
    localStorage.getItem("salongodOsnivanja"));

console.log(salon);
document.getElementById("namedropdown-togglezap").innerHTML=`${radnik.ime}`;
document.getElementById("namedropdown-headerzap").innerHTML=`${radnik.ime} ${radnik.prezime}`;
document.getElementById("radnapozicija").innerHTML=`${radnik.tipRadnika}`;

let listaProizvoda=[];
listaProizvoda= await api.vratiProizvodeSalona(salon.id);
console.log(listaProizvoda);
listaProizvoda.forEach((p,i)=>{
    document.getElementById("tbproizvodizap").innerHTML+=`
            <tr id="${i}">
                <th scope="row">${i+1}</th>
                <td>${p.naziv}</td>
                <td>${p.kolicina}</td>
                <td><input class="size-input" name="kolValue" type="number" placeholder="0" min="0" max="${p.kolicina}" size="5" ></td>
            </tr>
    `
    if(p.kolicina>0){
        document.getElementById(i).style="background-color:#c4ffc6";
    }
    else{
        document.getElementById(i).style="background-color:#ffbdbd"
    }
})

let divBtnRadnici=document.getElementById('divizmenitg2zap');
let izmeniBtn=document.createElement("button");
izmeniBtn.innerText="Smanji količinu";
izmeniBtn.className="btn btn-info buttonb buttonb2";
izmeniBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-pencil-square"></i>`;
divBtnRadnici.appendChild(izmeniBtn);

izmeniBtn.onclick=(ev)=>pokupiKolicine();

async function pokupiKolicine()
{
    let izm=0;
    let s= document.getElementsByName("kolValue");
    s.forEach((s,i)=>{
        console.log(s.value+" "+i);
        if(s.value>0)
        {
            api.smanjiKolicinuProizvoda(s.value,listaProizvoda[i],localStorage.getItem("radnikId"));
            izm++;
        }
    })
    console.log(izm);
    if(izm>0)
    {
        location.reload();
    }
}
