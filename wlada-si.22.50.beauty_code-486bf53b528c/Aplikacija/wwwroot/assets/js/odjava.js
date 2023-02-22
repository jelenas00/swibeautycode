document.getElementById("odjava").onclick=(ev)=>odjava();


function odjava(){
  localStorage.removeItem("korisnikId");
    localStorage.removeItem("korisnikIme");
    localStorage.removeItem("korisnikPrezime");
    localStorage.removeItem("korisnikBrojTelefona");
    localStorage.removeItem("korisnikAdresa");
    localStorage.removeItem("korisnikGodina");
    localStorage.removeItem("korisnikEmail");
    localStorage.removeItem("korisnikPassword");
    localStorage.removeItem("korisnikKorisnickoIme");
    localStorage.removeItem("korisnikDatumRodjenja");
    window.location.href = "./Pocetna";
}