import { Vlasnik } from "../../../assets/js/vlasnik.js";
import { Salon } from "../../../assets/js/salon.js";
import { Api } from "../../../assets/js/api.js";

let api= new Api();
//alert("HEJ");
var salon= new Salon(
    localStorage.getItem("salonId"),
    localStorage.getItem("salonIme"),
    localStorage.getItem("salonAdresa"),
    localStorage.getItem("salonSlika"),
    localStorage.getItem("salonPIB"),
    localStorage.getItem("salongodOsnivanja"));
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
document.getElementById("section-profile-us").innerHTML=`${vlasnik.ime} ${vlasnik.prezime}`;
document.getElementById("fullnamedetaljius").innerHTML=`${vlasnik.ime} ${vlasnik.prezime}`;
document.getElementById("vlasniksalon").innerHTML=`${salon.ime} `;
document.getElementById("vlasnikOd").innerHTML=`${vlasnik.vlasnikOd}`;
document.getElementById("adresaus").innerHTML=`${vlasnik.adresa} `;
document.getElementById("telefonus").innerHTML=`${vlasnik.brojTelefona} `;
document.getElementById("emailus").innerHTML=`${vlasnik.email} `;

let s=document.getElementById("imeizmenaus");
s.innerHTML+=`
<input name="fullName" type="text" class="form-control" id="imeizmena" value="${vlasnik.ime}">
`
s=document.getElementById("prezimeizmenaus");
s.innerHTML+=`
<input name="fullName" type="text" class="form-control" id="prezimeNameizmena" value="${vlasnik.prezime}">
`
s=document.getElementById("adresaizmenaus");
s.innerHTML+=`
<input name="address" type="text" class="form-control" id="vlasnikadrch" value="${vlasnik.adresa}">
`
s=document.getElementById("telefonizmenaus");
s.innerHTML+=`
<input name="phone" type="text" class="form-control" id="vlasniktelch" value="${vlasnik.brojTelefona}">
`

s=document.getElementById("vlasnikodizmenaus");
s.innerHTML+=`
<input name="phone" type="text" class="form-control" id="vlasnikodch" value="${vlasnik.vlasnikOd}">
`

s=document.getElementById("emailizmenaus");
s.innerHTML+=`
<input name="email" type="email" class="form-control" id="vlasnikemailch" value="${vlasnik.email}">
`
s=document.getElementById("korimeizmenaus");
s.innerHTML+=`
<input name="korime" type="korime" class="form-control" id="vlasnikimech" value="${vlasnik.korisnickoIme}">
`
let vr=vlasnik.datumRodjenja.split('T');
s=document.getElementById("godinaizmenaus");
s.innerHTML+=`
<input name="godina" type="godina" class="form-control" id="vlasnikgodch" value="${vr[0]}">
`
let prom=document.getElementById("btnvlasnikch");
prom.onclick=(ev)=>pokupiIzmene();
function pokupiIzmene(){
    let ch= document.getElementById("imeizmena");
    let novoIme=ch.value;
    ch= document.getElementById("prezimeNameizmena");
    let novoPre=ch.value;
    ch= document.getElementById("vlasnikadrch");
    let novaAdr=ch.value;
    ch= document.getElementById("vlasniktelch");
    let noviTel=ch.value;
    ch= document.getElementById("vlasnikodch");
    let vlOd=ch.value;
    ch= document.getElementById("vlasnikemailch");
    let noviEmail=ch.value;
    ch= document.getElementById("vlasnikimech");
    let novoKorIme=ch.value;
    ch= document.getElementById("vlasnikgodch");
    let novaGod=ch.value;
    console.log("top");
    changeVlasnika(novoIme,novoPre,novaAdr,noviTel,noviEmail,novoKorIme,novaGod,vlOd);
}

async function changeVlasnika(ime,prez,adr,tel,email,korime,god,vlod){
    let vl= new Vlasnik();
    vl=vlasnik;
    console.log(vl);
    vl.ime=ime;
    vl.prezime=prez;
    vl.brojTelefona=tel;
    vl.adresa=adr;
    vl.vlasnikOd=vlod;
    let dat= vlasnik.datumRodjenja.split('T');
    dat[0]=god;
    let novi=dat.join('T');
    console.log(novi);
    vl.datumRodjenja=novi;
    vl.korisnickoIme=korime;
    vl.email=email;
    let ch= await api.promeniInfoOSebiVlasnik(vl);
    if(ch==true)
    {
        localStorage.setItem("vlasnikId",vl.id);
        localStorage.setItem("vlasnikIme",vl.ime);
        localStorage.setItem("vlasnikPrezime",vl.prezime);
        localStorage.setItem("vlasnikBrojTelefona",vl.brojTelefona);
        localStorage.setItem("vlasnikAdresa",vl.adresa);
        localStorage.setItem("vlasnikVlOd",vl.vlasnikOd);
        localStorage.setItem("vlasnikDatumRodjenja",vl.datumRodjenja)
        localStorage.setItem("vlasnikEmail",vl.email);
        localStorage.setItem("vlasnikKorisnickoIme",vl.korisnickoIme);
        location.reload();
    }
}

let btnPasCh= document.getElementById("promeniLozinkuVlasnik");
btnPasCh.onclick=(ev)=>promeniLozinku();
async function promeniLozinku(){
    let pass= document.getElementById("currentPassword").value;
    let newpas = document.getElementById("newPassword").value;
    let renewpas = document.getElementById("renewPassword").value;
    if(newpas!=renewpas)
    {
        alert("Lozinke se ne poklapaju!")
    }
    else{
        let ch= await api.promeniLozinkuVlasnik(vlasnik.id,pass,newpas);
        if(ch==true)
        {
            location.reload();
        }
    }
    
}