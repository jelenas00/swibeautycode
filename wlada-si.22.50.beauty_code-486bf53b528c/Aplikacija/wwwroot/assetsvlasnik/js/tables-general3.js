import { Vlasnik } from "../../../assets/js/vlasnik.js";
import { Salon } from "../../../assets/js/salon.js";
import { Api } from "../../../assets/js/api.js";
import { Proizvod } from "../../../assets/js/proizvod.js";

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
var salon= new Salon(
    localStorage.getItem("salonId"),
    localStorage.getItem("salonIme"),
    localStorage.getItem("salonAdresa"),
    localStorage.getItem("salonSlika"),
    localStorage.getItem("salonPIB"),
    localStorage.getItem("salongodOsnivanja"));

let listaProizvoda=[];
listaProizvoda= await api.vratiProizvodeSalona(salon.id);
console.log(listaProizvoda);
listaProizvoda.forEach((p,i)=>{
    document.getElementById("tblproizvodi").innerHTML+=`
            <tr id="${i}">
                <th scope="row">${i+1}</th>
                <td>${p.naziv}</td>
                <td>${p.kolicina}</td>
                <td name="radioProizvodi"></td>
            </tr>
    `
    if(p.kolicina>0){
        document.getElementById(i).style="background-color:#c4ffc6";
    }
    else{
        document.getElementById(i).style="background-color:#ffbdbd"
    }
})
let s= document.getElementsByName('radioProizvodi');
s.forEach((s,i)=>{
    let btn=document.createElement("input");
    btn.type="radio";
    btn.name="btnproizvodi";
    btn.value=i;
    s.appendChild(btn);
})

let divBtnRadnici=document.getElementById('divizmenitg3');
let izmeniBtn=document.createElement("button");
izmeniBtn.innerText="Izmeni";
izmeniBtn.className="btn btn-info buttonb buttonb2";
izmeniBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-pencil-square"></i>`;
divBtnRadnici.appendChild(izmeniBtn);
let obrisiBtn= document.createElement("button");
obrisiBtn.innerText="Obriši";
obrisiBtn.innerHTML+=`<i style="font-weight:bold;" class="bi bi-x-square"></i>`;
obrisiBtn.className="btn btn-danger buttonr buttonr2";
divBtnRadnici.appendChild(obrisiBtn);

izmeniBtn.onclick=(ev)=>izmeniPodatke();
obrisiBtn.onclick=(ev)=>obrisiPodatak();
function izmeniPodatke()
{
    let index;
    let izabrano=0;
    document.getElementsByName("btnproizvodi").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Odaberite proizvod!");
    }
    else
    {
        showModal(listaProizvoda[index]);
    }
}



function showModal( data) {
    let proizvod= new Proizvod();
    proizvod=data;
    console.log(proizvod);
    const modal = new bootstrap.Modal(document.getElementById("myModaltg3"), {});
    modal.show();
    document.getElementById("modalBodytg3").innerHTML=`
    <form role="form" method="POST" action="">
            <input type="hidden" name="_token" value="">
            <div class="form-group">
                <label class="control-label">Ime proizvoda</label>
                <div>
                    <input type="text" class="form-control input-lg" name="naziv" id="nazivIzm" value="${proizvod.naziv}" required/>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label">Količina</label>
                <div>
                  <input type="text" class="form-control input-lg" name="kolicina" id="kolicinaIzm" value="${proizvod.kolicina}" required/>
                </div>
            </div>
          </form>
        <div class="modal-footer">
            <button class="btn btn-success" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" id="btnModaltg3">Sačuvaj izmene</button>
        </div>
        <form role="form" method="POST" action="">
            <input type="hidden" name="_token" value="">
            <div class="form-group">
              <label class="control-label">Dodaj količinu</label>
              <div>
                  <input type="text" class="form-control input-lg" name="kolicinaDodaj" id="dodajKol" value="0" required/>
              </div>
            </div>
          </form>
        <div class="modal-footer">
            <button class="btn btn-success" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" id="btnModaltg31">Dodaj količinu</button>
        </div>
    `
    let dugmeModal=document.getElementById("btnModaltg3");
    dugmeModal.onclick=(ev)=>pokupiPodatkeModal(proizvod);

    let dugmeModal1=document.getElementById("btnModaltg31");
    dugmeModal1.onclick=(ev)=>pokupiKolicinuModal(proizvod);
}

async function pokupiPodatkeModal(prozivod)
{
    let pro=new Proizvod();
    pro=prozivod;
    pro.naziv=document.getElementById("nazivIzm").value;
    pro.kolicina=document.getElementById("kolicinaIzm").value;
    let ch= await api.izmeniProizvod(pro,localStorage.getItem("vlasnikId"));
    if(ch==true)
    {
        location.reload();
        
    }
    
}
async function pokupiKolicinuModal(prozivod)
{
    let pro=new Proizvod();
    pro=prozivod;
    let kol= document.getElementById("dodajKol").value;
    if(kol==0)
    {
        alert("Količina koju pokušavate da dodate je 0!")
    }
    else{
        let ch= await api.dodajKolicinuProizvodu(kol,pro,localStorage.getItem("vlasnikId"));
        if(ch==true)
        {
            location.reload();
            
        }
    }
}

async function obrisiPodatak()
{
    let index;
    let izabrano=0;
    document.getElementsByName("btnproizvodi").forEach(d=>{
        if(d.checked==true)
        {
            index=d.value;
            izabrano=1;
        }
    });
    if(izabrano==0)
    {
        alert("Odaberite proizvod!");
    }
    else
    {
        let p= new Proizvod();
        p=listaProizvoda[index];
        let ch= await api.obrisiProizvod(p.id,localStorage.getItem("vlasnikId"));
        if(ch==true)
        {
            location.reload();
        }
        else{
            console.log(ch);
        }
    }


}