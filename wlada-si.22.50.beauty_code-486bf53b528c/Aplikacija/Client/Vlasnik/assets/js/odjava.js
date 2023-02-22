document.getElementsByName("odjava").forEach(p=>
  {
    p.onclick=(ev)=>odjava();
  })
function odjava(){
  console.log("unloading")
        localStorage.removeItem('vlasnikId');
        localStorage.removeItem('vlasnikIme');
        localStorage.removeItem("vlasnikPrezime");
        localStorage.removeItem("vlasnikBrojTelefona");
        localStorage.removeItem("vlasnikAdresa");
        localStorage.removeItem("vlasnikVlOd");
        localStorage.removeItem("vlasnikDatumRodjenja")
        localStorage.removeItem("vlasnikEmail");
        localStorage.removeItem("vlasnikPassword");
        localStorage.removeItem("vlasnikKorisnickoIme");
        
}
