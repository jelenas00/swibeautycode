document.getElementsByName("odjava").forEach(p=>
  {
    p.onclick=(ev)=>odjava();
  })


function odjava(){
        console.log(radnik);
          localStorage.removeItem("radnikId");
          localStorage.removeItem("radnikIme");
          localStorage.removeItem("radnikPrezime");
          localStorage.removeItem("radnikBrojTelefona");
          localStorage.removeItem("radnikAdresa");
          localStorage.removeItem("radnikGodina");
          localStorage.removeItem("radnikEmail");
          localStorage.removeItem("radnikPassword");
          localStorage.removeItem("radnikKorisnickoIme");
          localStorage.removeItem("radnikSkola");
          localStorage.removeItem("radnikPlata");
          localStorage.removeItem("radnikRadniStaz");
          localStorage.removeItem("radnikTipRadnika");
        
}