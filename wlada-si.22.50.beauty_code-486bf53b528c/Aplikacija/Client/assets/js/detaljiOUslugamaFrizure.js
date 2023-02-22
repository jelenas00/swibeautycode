import {Api} from "./api.js";
import { Salon } from "./salon.js";

var api=new Api();
var radniciString=await api.vratiRadnikePoTipu("Frizer");
var zaUpis="";
for( const x of radniciString)
    {
        zaUpis+=x.ime+"/";
    }
var selekcija=document.getElementById("Radnik-details-frizura");
selekcija.innerHTML=`<strong>Radnik:</strong> ${zaUpis}`;