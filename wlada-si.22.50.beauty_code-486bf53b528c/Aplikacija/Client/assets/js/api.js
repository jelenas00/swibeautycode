import { Salon } from "./salon.js";
import { Komentar } from "./komentar.js";
import { Usluga } from "./usluga.js";
import { Radnik } from "./radnik.js";
import { Vlasnik } from "./vlasnik.js";
import { Korisnik } from "./korisnik.js";
import { Proizvod } from "./proizvod.js";
import { Termin } from "./termin.js";

export class Api{
    constructor(){}

//GET (8/8)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async vratiVlasnika(vlasnikID){
    let v= new Vlasnik();
    let response= await fetch(`https://localhost:5001/Vlasnik/VratiVlasnika/`+parseInt(vlasnikID)+`/`,
    {
        method:"GET"
    });
    switch(response.status){
        case 200: {
           // console.log(`Uspesno preuzet salon`);
           let vlasnik=await response.json()
                v = new Vlasnik(vlasnik.id, vlasnik.ime, vlasnik.prezime, vlasnik.brojTelefona, vlasnik.adresa, vlasnik.godina, vlasnik.email, vlasnik.password, vlasnik.korisnickoIme);           
           //console.log(s);
            return v;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }
}
async vratiSalon(){
    let s;
    let response = await fetch(`https://localhost:5001/Salon/VratiInfoOSalonu/`);          
    switch(response.status){
    case 200: {
       // console.log(`Uspesno preuzet salon`);
       let salon=await response.json()
            s = new Salon(salon.id, salon.ime, salon.adresa, salon.slika, salon.pib, salon.godinaOsnivanja, null);           
       //console.log(s);
        return s;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiKomentare10(salonID){
    let list = [];

    let response = await fetch(`https://localhost:5001/Komentar/VratiKomentare10/`+parseInt(salonID)+`/`,
    {
        method:"GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            const komentar = new Komentar(el.id,el.sadrzaj,el.ocena,el.salon,el.korisnik);
            list.push(komentar);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiProizvodeSalona(){
    let list = [];

    let response = await fetch(`https://localhost:5001/Proizvod/VratiProizvodeSalona/`,
    {
        method:"GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            const proizvod = new Proizvod(el.id,el.naziv,el.kolicina);
            list.push(proizvod);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiUslugePrazne(){
    let list = [];

    let response = await fetch(`https://localhost:5001/Usluga/VratiUslugePrazne/`,
    {
        method:"GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            const usluga = new Usluga(el.id,el.imeUsluge,el.vremeTrajanja,el.cena,el.terminID,el.salonID,el.tipUsluge);
            list.push(usluga);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}
async vratiUslugePrazne4(){
    let list = [];

    let response = await fetch(`https://localhost:5001/Usluga/VratiUslugePrazne4/`,
    {
        method:"GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            const usluga = new Usluga(el.id,el.imeUsluge,el.vremeTrajanja,el.cena,el.terminID,el.salonID,el.tipUsluge);
            list.push(usluga);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiTermineZaposlenogTogDana(id,datum){
    let list = [];

    let response = await fetch(`https://localhost:5001/Termin/VratiTermineZaposlenogTogDana/${id}/${datum}`,
    {
        method:"GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            const termin = new Termin(el.id,el.datum,el.vremePocetka,el.vremeKraja,el.ukupnaCena,el.radnik,el.korisnik,el.salon,el.listaUsluga);
            list.push(termin);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiTermineKorisnika(idkor){
    let list = [];

    let response = await fetch(`https://localhost:5001/Termin/VratiTermineKorisnika/${idkor}`,
    {
        method:"GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            const termin = new Termin(el.id,el.datum,el.vremePocetka,el.vremeKraja,el.ukupnaCena,el.radnik,el.korisnik,el.salon,el.listaUsluga);
            list.push(termin);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiKomentare(salonID){
    let list = [];
    let response = await fetch("https://localhost:5001/Komentar/VratiKomentare/"+salonID+"/",
    {
        method:"GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            const komentar = new Komentar(el.id,el.sadrzaj,el.ocena,el.salonID,el.korisnik);
            list.push(komentar);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiUsluge(salonID){
    let list=[];
    let response = await fetch("https://localhost:5001/Usluga/VratiUsluge/"+salonID+"/",
    {
        method: "GET"
    });
    
    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            let usluga = new Usluga(el.id,el.imeUsluge,el.vremeTrajanja,el.cena,el.terminID,el.salonID);
            list.push(usluga);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiUslugePoTipu(tip){
    let list = [];

    let response = await fetch(`https://localhost:5001/Usluga/VratiUslugePoTipu/`+tip,
    {
        method:"GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            const usluga = new Usluga(el.id,el.imeUsluge,el.vremeTrajanja,el.cena,null,null);
            list.push(usluga);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiUslugeIzabrane(Ids){
    let list=[];
    let response = await fetch("https://localhost:5001/Usluga/VratiUslugeIzabrane/"+Ids+"/",
    {
        method: "GET"
    });
    
    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            let usluga = new Usluga(el.id,el.imeUsluge,el.vremeTrajanja,el.cena,el.terminID,el.salonID);
            list.push(usluga);
        });
        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}
async vratiRadnikePoTipu(Tip){
    var list=[];
    let response = await fetch("https://localhost:5001/Radnik/VratiRadnikePoTipu/"+Tip,
    {
        method: "GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            let radnik = new Radnik(el.id, el.ime, el.prezime, el.brojTelefona, el.adresa, el.godinaZaposlenja, el.datumRodjenja, el.email, el.password, el.korisnickoIme, el.skola, el.plata, el.radniStaz, el.tipRadnika, el.salon);
            list.push(radnik);
        });

        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async vratiRadnike(salonID){
    let list=[];
    let response = await fetch("https://localhost:5001/Radnik/VratiRadnike/"+salonID+"/",
    {
        method: "GET"
    });

    switch(response.status){
    case 200: {
        var data= await response.json();

        data.forEach(el=>{
            let radnik = new Radnik(el.id, el.ime, el.prezime, el.brojTelefona, el.adresa, el.godinaZaposlenja, el.datumRodjenja, el.email, el.password, el.korisnickoIme, el.skola, el.plata, el.radniStaz, el.tipRadnika, el.salon);
            list.push(radnik);
        });

        return list;
    }
    case 400:{
        console.log(`Client error: ${await response.text()}`);
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}
}

async PrijavaNaSajtUzVracanjeObjekta(korisnickoIme,password){
    let nalog;
    let response = await fetch("https://localhost:5001/Salon/PrijavaNaSajt/"+korisnickoIme+"/"+password+"/");
    switch(response.status){
    case 200: {
        let n1= await response.json();
        console.log(n1);
        if(n1.tipStranice == "Radnik")
        
                nalog = new Radnik(n1.id, n1.ime, n1.prezime, n1.brojTelefona, n1.adresa, n1.godinaZaposlenja, n1.datumRodjenja, n1.email, n1.password, n1.korisnickoIme, n1.skola, n1.plata, n1.radniStaz, n1.tipRadnika, n1.salon);
                else if(n1.tipStranice == "Vlasnik")
                nalog = new Vlasnik(n1.id, n1.ime, n1.prezime, n1.brojTelefona, n1.adresa, n1.vlasnikOd, n1.datumRodjenja, n1.email, n1.password, n1.korisnickoIme);
            else if(n1.tipStranice=="Korisnik")
                nalog = new Korisnik(n1.id, n1.ime, n1.prezime, n1.brojTelefona, n1.adresa, n1.godina, n1.email, n1.password, n1.korisnickoIme, n1.datumRodjenja);            
            
                return nalog;
    }
    case 400:{
        alert("Nalog sa korisnickim imenom i/ili lozinkom nije pronadjen!");
        return false;
    }
    default:{
        console.log(`Server error: ${await response.text()}`);
        return false;
    }
}

}

//DELETE (6/6)
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async obrisiUslugu(id,idv){
        let response = await fetch("https://localhost:5001/Usluga/ObrisiUslugu/"+id+"/"+idv+"/",
        {
            method:"DELETE"
        });
        
        switch(response.status){
        case 200: {
            alert(`Uspesno izbrisana usluga`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }


    }


    async obrisiKorisnika(id){
        let response = await fetch("https://localhost:5001/Korisnik/ObrisiKorisnika/"+id+"/",
        {
            method:"DELETE"
        });
        
        switch(response.status){
        case 200: {
            alert(`Uspesno izbrisan korisnik`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }


    }

    async obrisiRadnika(id,idv){
        
        let response = await fetch("https://localhost:5001/Radnik/ObrisiRadnika/"+id+"/"+idv+"/",
        {
            method:"DELETE"
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izbrisan radnik`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async obrisiProizvod(id,idv){
        
        let response = await fetch("https://localhost:5001/Proizvod/ObrisiProizvod/"+id+"/"+idv+"/",
        {
            method:"DELETE"
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izbrisan proizvod`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async obrisiKomentar(id,idv){

        let response = await fetch("https://localhost:5001/Komentar/ObrisiKomentar/"+id+"/"+idv+"/",
        {
            method:"DELETE"
        });
        
        switch(response.status){
        case 200: {
            alert(`Uspesno izbrisan komentar`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }
    
    }

    async izbrisiPrazneProizvodeIzSalona(){

        let response = await fetch("https://localhost:5001/Salon/IzbrisiPrazneProizvodeIzSalona/",
        {
            method:"DELETE"
        });
        
        switch(response.status){
        case 200: {
            alert(`Uspesno ociscen magacin od praznih proizvoda`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }
    
    }

    async izvrsiTermin(datum,vremeid,idr){

        let response = await fetch(`https://localhost:5001/Termin/IzvrsiTermin/${datum}/${vremeid}/${idr}`,
        {
            method:"DELETE"
        });
        
        switch(response.status){
        case 200: {
            alert(`Uspesno zavrsen termin`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }
    
    }

    async obrisiTermin(terminID,korisnikID){

        let response = await fetch(`https://localhost:5001/Termin/ObrisiTermin/${terminID}/${korisnikID}`,
        {
            method:"DELETE"
        });
        
        switch(response.status){
        case 200: {
            alert(`Termin obrisan!`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }
    
    }

    async obrisiTerminePrethodne(){

        let response = await fetch(`https://localhost:5001/Termin/ObrisiTerminePrethodne`,
        {
            method:"DELETE"
        });
        
        switch(response.status){
        case 200: {
            console.log(`Prethodni termini obrisani!`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }
    
    }

//POST (11/13 )
///////////////////////////////////////////////////////////////////////////////////////

    async dodajKorisnika(korisnickoIme,email,pass,repass){

        let response = await fetch("https://localhost:5001/Korisnik/DodajKorisnika/"+korisnickoIme+"/"+email+"/"+pass+"/"+repass+"/",
        {
            method:"POST"
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno kreiran nalog`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }
    }


    async dodajKomentar(sadrzaj,ocena,korisnikID){

        let response = await fetch("https://localhost:5001/Komentar/DodajKomentar/"+sadrzaj+"/"+ocena+"/"+korisnikID+"/",
        {
            method:"POST"
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno dodat komentar`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }


    }

    async dodajNovuUslugu(nova,trajanje,cena,tip){
        let s = "";
        let response = await fetch("https://localhost:5001/Usluga/DodajNovuUslugu/"+nova+"/"+trajanje+"/"+cena+"/"+tip,
        {
            method:"POST"
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno dodata usluga`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }


    }

    async ZaposliRadnika(ime,prezime,brojTelefona,adresa,godina,datumRodjenja,email,password,korisnickoIme,skola,plata,radniStaz,tipRadnika,idv){
        let rad=new Radnik();
        let response = await fetch("https://localhost:5001/Radnik/ZaposliRadnika/"+ime+"/"+prezime+"/"+brojTelefona+"/"+adresa+"/"+godina+"/"+datumRodjenja+"/"+email+"/"+password+"/"+korisnickoIme+"/"+skola+"/"+plata+"/"+radniStaz+"/"+tipRadnika+"/"+idv+"/",
        {
            method:"POST"
        })
        
        switch(response.status){
        case 200: {
            var r= response.json();
            r.then(data=>{
                console.log(data);
                rad=data;
                console.log(`Uspesno dodat ranik/ca ${rad.ime}`);
            })
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }
    }

    async dodajSalon(salon){

        let response = await fetch("https://localhost:5001/Salon/DodajSalon/",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"POST",
            body: JSON.stringify(salon)
        });

        switch(response.status){
        case 200: {
            console.log(`Uspesno dodat salon`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async dodajVlasnika(vlasnik){

        let response = await fetch("https://localhost:5001/Vlasnik/DodajVlasnika/",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"POST",
            body: JSON.stringify(vlasnik)
        });

        switch(response.status){
        case 200: {
            console.log(`Uspesno dodat vlasnik`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async napraviProizvod(naziv,kolicina,idv){
        let response = await fetch(`https://localhost:5001/Proizvod/NapraviProizvod/${naziv}/${kolicina}/${idv}/`,
        {
            method:"POST"
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno dodat proizvod`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async zakaziTermin(dan,vreme,frizerID,listaUsluga,korisnikID,tip){
        let response = await fetch(`https://localhost:5001/Termin/ZakaziTermin/${dan}/${vreme}/${frizerID}/${listaUsluga}/${korisnikID}/${tip}/`,
        {
            method:"POST"
        });

        switch(response.status){
        case 200: {
            console.log(`Uspesno zakazan termin`);
            var data = await response.json();
            const termin = new Termin(data.id,data.datum,data.vremePocetka,data.vremeKraja,data.ukupnaCena,data.radnikID,data.korisnikID,data.salonID);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

//PUT(4/4)
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async promeniInfoOSebi(korisnik){

        let response = await fetch("https://localhost:5001/Korisnik/PromeniInfoOSebi/",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(korisnik)
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izmenjeni podaci korisnika`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async izvrsiIzmeneKaoVlasnik(radnik,idv){

        let response = await fetch(`https://localhost:5001/Vlasnik/IzvrsiIzmeneKaoVlasnik/${idv}/`,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(radnik)
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izmenjeni podaci`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }


    async promeniInfoOSebiRadnik(radnik){

        let response = await fetch("https://localhost:5001/Radnik/PromeniInfoOSebiRadnik/",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(radnik)
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izmenjeni podaci radnika`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async izmeniInfoOSalonu(salon,idv){

        let response = await fetch(`https://localhost:5001/Salon/IzmeniInfoOSalonu/${idv}`,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(salon)
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izmenjeni podaci o salonu`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async promeniInfoOSebiVlasnik(vlasnik){

        let response = await fetch("https://localhost:5001/Vlasnik/PromeniInfoOSebiVlasnik/",
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(vlasnik)
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izmenjeni podaci vlasnika`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async promeniLozinkuVlasnik(id,pass,newPass){
        let response= await fetch("https://localhost:5001/Vlasnik/PromeniLozinkuVlasnik/"+id+"/"+pass+"/"+newPass,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT"});
        
        switch(response.status){
            case 200: {
                alert(`Uspešno izmenjena lozinka`);
                return true;
            }
            case 404:{
                console.log(`Client error: ${response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async izmeniUslugu(usluga,idv){
        let response = await fetch(`https://localhost:5001/Usluga/IzmeniUslugu/${idv}`,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(usluga)
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izmenjeni podaci o usluzi`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async izmeniProizvod(proizvod,idv){
        let response = await fetch(`https://localhost:5001/Proizvod/IzmeniProizvod/${idv}`,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(proizvod)
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno izmenjeni podaci o proizvodu`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async dodajKolicinuProizvodu(kol,proizvod,idv){
        let response = await fetch("https://localhost:5001/Proizvod/DodajKolicinu/"+kol+"/"+idv,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(proizvod)
        });

        switch(response.status){
        case 200: {
            alert(`Uspešno dodata količina`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async smanjiKolicinuProizvoda(kol,proizvod,idv){
        let response = await fetch("https://localhost:5001/Proizvod/SmanjiKolicinu/"+kol+"/"+idv,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT",
            body: JSON.stringify(proizvod)
        });

        switch(response.status){
        case 200: {
            alert(`Uspesno smanjena količina`);
            return true;
        }
        case 400:{
            console.log(`Client error: ${await response.text()}`);
            return false;
        }
        default:{
            console.log(`Server error: ${await response.text()}`);
            return false;
        }
    }

    }

    async promeniLozinkuRadnik(id,pass,newPass){
        let response= await fetch("https://localhost:5001/Radnik/PromeniLozinkuRadnik/"+id+"/"+pass+"/"+newPass,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT"});
        
        switch(response.status){
            case 200: {
                alert(`Uspesno izmenjena lozinka`);
                return true;
            }
            case 404:{
                console.log(`Client error: ${response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }

    async promeniLozinkuKorisnik(id,pass,newPass){
        let response= await fetch("https://localhost:5001/Korisnik/PromeniLozinkuKorisnik/"+id+"/"+pass+"/"+newPass,
        {
            headers:
            {
                Accept:"application/json",
                "Content-type":"application/json",
            },
            method:"PUT"});
        
        switch(response.status){
            case 200: {
                alert(`Uspesno izmenjena lozinka`);
                return true;
            }
            case 404:{
                console.log(`Client error: ${response.text()}`);
                return false;
            }
            default:{
                console.log(`Server error: ${await response.text()}`);
                return false;
            }
        }
    }


}