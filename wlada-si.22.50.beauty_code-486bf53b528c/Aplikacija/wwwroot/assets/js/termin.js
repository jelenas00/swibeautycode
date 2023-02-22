export class Termin
{
    constructor(id,datum,vremePocetka,vremeKraja,ukupnaCena,radnik,korisnik,salon,listaUsluga)
    {
        this.id = id;
        this.datum = datum;
        this.vremePocetka = vremePocetka;
        this.vremeKraja = vremeKraja;
        this.ukupnaCena = ukupnaCena;
        this.radnik = radnik;
        this.korisnik = korisnik;
        this.salon = salon;

        this.listaUsluga = [];
        this.listaUsluga=listaUsluga;

    }
}