import { Api } from "./api.js"
import { Salon } from "./salon.js"
import { Korisnik } from "./korisnik.js"
import { Radnik } from "./radnik.js";

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

document.getElementById("headerprofimeprez").innerHTML=`${korisnik.ime} ${korisnik.prezime}`;

document.getElementById("fullnamekor").innerHTML=`${korisnik.ime} ${korisnik.prezime}`;
document.getElementById("brtelkor").innerHTML=`${korisnik.brojTelefona}`;
document.getElementById("adresakor").innerHTML=`${korisnik.adresa}`;
document.getElementById("godinakor").innerHTML=`${korisnik.godina}`;
document.getElementById("emailkor").innerHTML=`${korisnik.email}`;
document.getElementById("korimekor").innerHTML=`${korisnik.korisnickoIme}`;

let vr=korisnik.datumRodjenja.split('T');

document.getElementById("datrodjkor").innerHTML=`${vr[0]}`;

document.getElementById("imeIzmenekor").value=`${korisnik.ime}`;
document.getElementById("prezimeIzmenekor").value=`${korisnik.prezime}`;
document.getElementById("izmenBrTelkor").value=`${korisnik.brojTelefona}`;
document.getElementById("izmenaAdrkor").value=`${korisnik.adresa}`;
document.getElementById("izmenaEmailkor").value=`${korisnik.email}`;
document.getElementById("korImeIzmenakor").value=`${korisnik.korisnickoIme}`;
document.getElementById("datRodjIzmenakor").value=`${vr[0]}`;

document.getElementById("izmenaKorisnikRadnikProf").onclick=(ev)=>pokupiIzmeneKor();
function pokupiIzmeneKor(){
    let ime= document.getElementById("imeIzmenekor").value;
    let prezime= document.getElementById("prezimeIzmenekor").value;
    let brtel= document.getElementById("izmenBrTelkor").value;
    let adr= document.getElementById("izmenaAdrkor").value;
    let email= document.getElementById("izmenaEmailkor").value;
    let korime= document.getElementById("korImeIzmenakor").value;
    let dat= document.getElementById("datRodjIzmenakor").value;
    console.log(ime,prezime,brtel,adr,email,korime,dat);
    izmeniKorisnika(ime,prezime,brtel,adr,email,korime,dat);
}
async function izmeniKorisnika(ime,prez,brtel,adr,email,korime,dat)
{
    let kor=new Korisnik();
    kor=korisnik;
    kor.ime=ime;
    kor.prezime=prez;
    kor.brojTelefona=brtel;
    kor.adresa=adr;
    kor.email=email;
    kor.korisnickoIme=korime;
    let d=kor.datumRodjenja.split('T');
    d[0]=dat;
    let datum=d.join('T');
    kor.datumRodjenja=datum;
    
    let ch= await api.promeniInfoOSebi(kor);
    if(ch==true)
    {
        localStorage.setItem("korisnikId",kor.id);
        localStorage.setItem("korisnikIme",kor.ime);
        localStorage.setItem("korisnikPrezime",kor.prezime);
        localStorage.setItem("korisnikBrojTelefona",kor.brojTelefona);
        localStorage.setItem("korisnikAdresa",kor.adresa);
        localStorage.setItem("korisnikGodina",kor.godina);
        localStorage.setItem("korisnikEmail",kor.email);
        localStorage.setItem("korisnikPassword",kor.password);
        localStorage.setItem("korisnikKorisnickoIme",kor.korisnickoIme);
        localStorage.setItem("korisnikDatumRodjenja",kor.datumRodjenja);
        location.reload();
    }

}

document.getElementById("promeni-lozinku-btnkor").onclick=(ev)=>promeniLozinku();
async function promeniLozinku(){
    let pass= document.getElementById("currentPasswordkor").value;
    let newpas = document.getElementById("newPasswordkor").value;
    let renewpas = document.getElementById("renewPasswordkor").value;
    if(newpas!=renewpas)
    {
        alert("Lozinke se ne poklapaju!")
    }
    else{
        let ch= await api.promeniLozinkuKorisnik(korisnik.id,pass,newpas);
        if(ch==true)
        {
            location.reload();
        }
    }
}
await api.obrisi
let listaTermina=[];
listaTermina=await api.vratiTermineKorisnika(localStorage.getItem("korisnikId"));
console.log(listaTermina);
if(listaTermina.length==0)
{
    document.getElementById("termini5h").innerHTML=`<p>Nemate zakazanih termina</p>`
}
else{
    document.getElementById("termini5h").innerHTML=`
    <!-- Table with stripped rows -->
                            <table class="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col"> </th>
                                  <th scope="col">Usluge</th>
                                  <th scope="col">Datum</th>
                                  <th scope="col">Vreme početka</th>
                                  <th scope="col">Vreme završetka</th>
                                  <th scope="col">Odabrani radnik</th>
                                  <th scope="col">Ukupna cena</th>
                                </tr>
                              </thead>
                              <tbody id="tbltermini">
                                
                              
                                
                              </tbody>
                            </table>
                            <!-- End Table with stripped rows -->
                            <div style=" flex-direction:row ;display: flex; justify-content: flex-end" id="divOtkazi">
                            <button type="button" class="btn btn-secondary btn-lista-zakazivanja" style="text-align: center" id="btnOtkazi"> Otkaži termin</button>
                            </div>
  `
    listaTermina.forEach((t,i)=>{
        let datumPoc = t.vremePocetka.split('T');
        let datumPoc2 = datumPoc[0].split('-');
        let vrijemePoc = t.vremePocetka.split('T');
        let vrijemePoc2 = vrijemePoc[1].split(':');
        let vrijemeZav = t.vremeKraja.split('T');
        let vrijemeZav2 = vrijemeZav[1].split(':');
        let rd= new Radnik();
        let listalistaUsl = "";
        t.listaUsluga.forEach(z=>{
            listalistaUsl += `${z.imeUsluge},`;
        });
        listalistaUsl = listalistaUsl.slice(0,-1)
        rd=t.radnik;
        console.log(rd);
        document.getElementById("tbltermini").innerHTML+=`
                    <tr>
                      <th scope="row">${i+1}</th>
                      <td>${listalistaUsl}</td>
                      <td>${datumPoc[0]}</td>
                      <td>${vrijemePoc2[0]}:${vrijemePoc2[1]}</td>
                      <td>${vrijemeZav2[0]}:${vrijemeZav2[1]}</td>
                      <td>${rd.ime} ${rd.prezime}</td>
                      <td>${t.ukupnaCena}</td>
                      <td name="radioTermini"><input type="radio" class="radioTermini" name="radioTermini" value="${i}"></td>
                    </tr>
        `
    })
    document.getElementById("btnOtkazi").onclick=(ev)=>otkaziTermin();
function otkaziTermin(){
    let index;
    let izabrano=0;
    document.getElementsByName("radioTermini").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Odaberite termin!");
    }
    else
    {
        const modal = new bootstrap.Modal(document.getElementById("myModaltg"), {})
        modal.show();

        document.getElementById("btnPotvrdi").onclick=(ev)=>otkazi(listaTermina[index]);
    }
  }

  async function otkazi(data)
  {
            console.log(data);
            let ch= await api.obrisiTermin(data.id,localStorage.getItem("korisnikId"));
            if(ch==true)
            {
                location.reload();
            }
            else{
                console.log(ch);
            }
  }
}




  