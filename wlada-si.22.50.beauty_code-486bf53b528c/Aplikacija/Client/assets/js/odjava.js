document.getElementsByName("odjava").forEach(p=>
  {
    p.onclick=(ev)=>odjava();
  })


function odjava(){
  localStorage.clear();
}