export class Salon
{
    constructor(id, ime, adresa, slika, pib, godinaOsnivanja,vlasnikSalona)
    {
        this.id = id;
        this.ime = ime;
        this.adresa = adresa;
        this.slika = slika;
        this.pib = pib;
        this.godinaOsnivanja = godinaOsnivanja;

        this.vlasnikSalona = vlasnikSalona;

        this.listaProizvoda = [];
        this.listaTermina = [];
        this.listaKomentara = [];
        this.listaRadnika = [];
        this.listaKorisnika = [];
    }
}