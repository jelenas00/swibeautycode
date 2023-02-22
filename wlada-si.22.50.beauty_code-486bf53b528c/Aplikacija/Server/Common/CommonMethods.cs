using System;
using System.Text;

namespace Common
{
    public static class CommonMethods
    {
        private static string key = "abv#7896@gd";


        public static string EncryptPassword(string Pass, string korIme)
        {
            if (string.IsNullOrWhiteSpace(Pass) == true)
                return "Los password za enkripciju";

            if (string.IsNullOrWhiteSpace(korIme) == true)
                return "Lose korisnicko ime za enkripciju";

            Pass = Pass + korIme + key;
            byte[] newPas = Encoding.UTF8.GetBytes(Pass);
            return Convert.ToBase64String(newPas);
        }

        public static string DecryptPassword(string Passa)
        {
            if (string.IsNullOrWhiteSpace(Passa) == true)
                return "Losa deskripcija passworda";

            byte[] Pass = Convert.FromBase64String(Passa);
            string result = Encoding.UTF8.GetString(Pass);
            result = result.Substring(0,result.Length-key.Length);
            return result;
        }
        public static DateTime vratiVreme(DateTime dt,int vr)
        {
            int brojac=0;
          for(int i=10;i<22;i++)
            for(int j=0;j<60;j=j+15)
                {
                    if(brojac==vr)
                        return new DateTime(dt.Year,dt.Month,dt.Day,i,j,0);
                    brojac++;
                }
                return DateTime.MinValue;
        }    
    }
}