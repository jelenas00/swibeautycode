import { Api } from "../../../assets/js/api.js";
import {Radnik} from "../../../assets/js/radnik.js"
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

document.getElementById("namedropdown-togglezap").innerHTML=`${radnik.ime}`;
document.getElementById("namedropdown-headerzap").innerHTML=`${radnik.ime} ${radnik.prezime}`;
document.getElementById("radnapozicija").innerHTML=`${radnik.tipRadnika}`;
document.getElementById("section-userzap").innerHTML=`${radnik.ime} ${radnik.prezime}`;
document.getElementById("section-userzap-tip").innerHTML=`${radnik.tipRadnika}`;

document.getElementById("fullNamezap").innerHTML=`${radnik.ime} ${radnik.prezime}`;
document.getElementById("brtelzap").innerHTML=`${radnik.brojTelefona}`;
document.getElementById("adresazap").innerHTML=`${radnik.adresa}`;
document.getElementById("godzapzap").innerHTML=`${radnik.godinaZaposlenja}`;
let dat=radnik.datumRodjenja.split('T');
document.getElementById("datrodjzap").innerHTML=`${dat[0]}`;
document.getElementById("emailzap").innerHTML=`${radnik.email}`;
document.getElementById("korimezap").innerHTML=`${radnik.korisnickoIme}`;
document.getElementById("skolazap").innerHTML=`${radnik.skola}`;
document.getElementById("platazap").innerHTML=`${radnik.plata}`;
document.getElementById("tipradzap").innerHTML=`${radnik.tipRadnika}`;


document.getElementById("imeIzmenezap").value=radnik.ime;
document.getElementById("prezimeIzmenezap").value=radnik.prezime;
document.getElementById("izmenBrTel").value=radnik.brojTelefona;
document.getElementById("izmenaAdrzap").value=radnik.adresa;
document.getElementById("izmenDatRodj").value=dat[0];
document.getElementById("izmenaEmail").value=radnik.email;
document.getElementById("korImeIzmena").value=radnik.korisnickoIme;
document.getElementById("izmenaSkola").value=radnik.skola;
document.getElementById("izmenaRadnikProf").onclick=(ev)=>pokupiInfo();
function pokupiInfo(){
    let ime=document.getElementById("imeIzmenezap").value;
    let prezime=document.getElementById("prezimeIzmenezap").value;
    let brtel=document.getElementById("izmenBrTel").value;
    let adr=document.getElementById("izmenaAdrzap").value;
    let datiz=document.getElementById("izmenDatRodj").value;
    let email=document.getElementById("izmenaEmail").value;
    let korime=document.getElementById("korImeIzmena").value;
    let sk=document.getElementById("izmenaSkola").value;
    changeRadnik(ime,prezime,brtel,adr,datiz,email,korime,sk);
}

async function changeRadnik(ime,prezime,brtel,adr,datrodj,email,korime,sk)
{
    let rad= new Radnik();
    rad=radnik;
    rad.ime=ime;
    rad.prezime=prezime;
    rad.brojTelefona=brtel;
    rad.adresa=adr;
    let dat=radnik.datumRodjenja.split('T');
    dat[0]=datrodj;
    let novi=dat.join('T');
    rad.datumRodjenja=novi;
    rad.email=email;
    rad.korisnickoIme=korime;
    rad.skola=sk;
    console.log(rad);
    let ch= await api.promeniInfoOSebiRadnik(rad);
    if(ch==true)
    {
        localStorage.setItem("radnikId",rad.id);
        localStorage.setItem("radnikIme",rad.ime);
        localStorage.setItem("radnikPrezime",rad.prezime);
        localStorage.setItem("radnikBrojTelefona",rad.brojTelefona);
        localStorage.setItem("radnikAdresa",rad.adresa);
        localStorage.setItem("radnikGodinaZaposlenja",rad.godinaZaposlenja);
        localStorage.setItem("radnikDatumRodjenja",rad.datumRodjenja);
        localStorage.setItem("radnikEmail",rad.email);
        localStorage.setItem("radnikPassword",rad.password);
        localStorage.setItem("radnikKorisnickoIme",rad.korisnickoIme);
        localStorage.setItem("radnikSkola",rad.skola);
        localStorage.setItem("radnikPlata",rad.plata);
        localStorage.setItem("radnikRadniStaz",rad.radniStaz);
        localStorage.setItem("radnikTipRadnika",rad.tipRadnika);
        location.reload();
    }
    
}

document.getElementById("promeniLozR").onclick=(ev)=>promeniLozinkuR();
async function promeniLozinkuR(){
    let pass= document.getElementById("currentPasswordzap").value;
    let newpas = document.getElementById("newPasswordzap").value;
    let renewpas = document.getElementById("renewPasswordzap").value;
    if(newpas!=renewpas)
    {
        alert("Lozinke se ne poklapaju!")
    }
    else{
        let ch= await api.promeniLozinkuRadnik(radnik.id,pass,newpas);
        if(ch==true)
        {
            localStorage.setItem("radnikPassword",newpas);
            location.reload();
        }
    }
    
}