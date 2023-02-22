export class Radnik
{
    constructor(id, ime, prezime, brojTelefona, adresa, godinaZaposlenja, datumRodjenja, email, password, korisnickoIme, skola, plata, radniStaz, tipRadnika,salon)
    {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.brojTelefona = brojTelefona;
        this.adresa = adresa;
        this.godinaZaposlenja = godinaZaposlenja;
        this.datumRodjenja=datumRodjenja;
        this.email = email;
        this.password = password;
        this.korisnickoIme = korisnickoIme;
        this.skola = skola;
        this.plata = plata;
        this.radniStaz = radniStaz;
        this.tipRadnika = tipRadnika;
        
        this.salon = salon;
        
        this.listaTermina = [];
    }
}