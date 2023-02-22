export class Korisnik
{
    constructor(id, ime, prezime, brojTelefona, adresa, godina, email, password, korisnickoIme, datumRodjenja)
    {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.brojTelefona = brojTelefona;
        this.adresa = adresa;
        this.godina = godina;
        this.email = email;
        this.password = password;
        this.korisnickoIme = korisnickoIme;
        this.datumRodjenja = datumRodjenja;
        
        this.salon = null;

        this.listaKomentara = [];
        this.listaTermina = [];
    }
}