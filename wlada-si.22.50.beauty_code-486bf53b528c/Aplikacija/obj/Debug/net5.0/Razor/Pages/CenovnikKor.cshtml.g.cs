#pragma checksum "C:\Users\bojan\Documents\si.22.50.beauty_code\Aplikacija\Pages\CenovnikKor.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "aa4a477d45633ffec614efdb5d38f226642f6754"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Pages_CenovnikKor), @"mvc.1.0.razor-page", @"/Pages/CenovnikKor.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"aa4a477d45633ffec614efdb5d38f226642f6754", @"/Pages/CenovnikKor.cshtml")]
    public class Pages_CenovnikKor : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 3 "C:\Users\bojan\Documents\si.22.50.beauty_code\Aplikacija\Pages\CenovnikKor.cshtml"
  
    Layout = "_LayoutCenovnik";

#line default
#line hidden
#nullable disable
            DefineSection("NavCenovnik", async() => {
                WriteLiteral(@"
    <li class=""dropdown""><a href=""#""><span> Vaš profil</span> <i class=""bi bi-chevron-down""></i></a>
            <ul>
              
              <!-- PAZNJAAA !!!! --> <!-- PAZNJAAA !!!! --> <!-- PAZNJAAA !!!! -->
                  <li><a href=""./ProfilKorisnik""> <i style=""font-size: large; font-weight: 900;"" class=""bi bi-gear""></i>Izmeni profil</a></li>  
                  <li><a href=""./OstaviKomentar""> <i style=""font-size: large; font-weight: 900;"" class=""bi bi-chat-left-dots""></i></i>Ostavi komentar</a></li>  
                  <li><a href=""#"" id=""odjava""> <i style=""font-size: large; font-weight: 900;"" class=""bi bi-box-arrow-right""></i> Odjavi se  </a></li>
              
            </ul>

          </li>
");
            }
            );
            WriteLiteral(@"
  <main id=""main"">

    <!-- ======== SECTION MENU ========= -->
          
    <section id=""menu"" class=""menu section-bg"">
      <div class=""container"" data-aos=""fade-up"">

        <div class=""section-title"">
          <h2>MENU</h2>
          <p>Bacite pogled na cenovnik</p>
        </div>

        <br><br>
        <div class=""col-md-4"">
          <label for=""inputTip"" class=""form-label"" style=""font-weight:550; font-size:larger"">  Izaberite tip usluge: </label>
          <select id=""inputTip"" class=""form-select tipUslugeSelekt"">
            <!-- <option selected>Izaberi...</option> -->
            <option selected value=""0"">Tip usluge</option>
            <option value=""Frizerska"">Frizerske</option>
            <option value=""Kozmeticka"">Kozmetičke</option>
            <option value=""Masaza"">Masaže</option>             
          </select>
        </div>
        <br><br>
        <div class=""usluge-container"" id=""usluga"">

          <!-- POZIVA SE F-JA IZ CENOVNIK.JS-->

        ");
            WriteLiteral(@"  
        </div>
        <br><br>
        <div class=""col-lg-3 cta-btn-container "">
          <a style=""font-size: medium; font-weight: bolder; font-size: larger"" class=""cta-btn align-middle"" href=""./Korisnik"">◄ NAZAD na početnu stranu</a>
        </div>

      </div>
    </section><!-- End Menu Section -->

      <!-- ======= Cta Section ======= -->

      <!-- End Cta Section -->
     <!-- ======= Team Section ======= -->
     <section id=""team"" class=""team"">
      <div class=""container"">

        <div class=""section-title"" data-aos=""zoom-out"">
          <h2>TIM</h2>
          <p>Naš vredan tim</p>
        </div>

        <div class=""row"" id=""radniciCenovikStrana"">
        </div>
        <!-- JS FAJL NEKI -->

      </div>
    </section><!-- End Team Section -->
    <!-- ======= Clients Section ======= -->
    <section id=""sponsors"" class=""sponsors"">
      <div class=""container"">

        <div class=""section-title"" data-aos=""zoom-out"">
          <h2>SPONZORI</h2>
         ");
            WriteLiteral(@" <p>Naši sponzori</p>
        </div>

    <section id=""clients"" class=""clients section-bg"">
      <div class=""container"">

        <div class=""row"">

          <div class=""col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center"">
            <img src=""assets/img/sponzori/sponzor1.jfif"" class=""img-fluid""");
            BeginWriteAttribute("alt", " alt=\"", 3211, "\"", 3217, 0);
            EndWriteAttribute();
            WriteLiteral(">\r\n          </div>\r\n\r\n          <div class=\"col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center\">\r\n            <img src=\"assets/img/sponzori/sponzor2.jfif\" class=\"img-fluid\"");
            BeginWriteAttribute("alt", " alt=\"", 3413, "\"", 3419, 0);
            EndWriteAttribute();
            WriteLiteral(">\r\n          </div>\r\n\r\n          <div class=\"col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center\">\r\n            <img src=\"assets/img/sponzori/sponzor3.png\" class=\"img-fluid\"");
            BeginWriteAttribute("alt", " alt=\"", 3614, "\"", 3620, 0);
            EndWriteAttribute();
            WriteLiteral(">\r\n          </div>\r\n\r\n          <div class=\"col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center\">\r\n            <img src=\"assets/img/sponzori/sponzor4.png\" class=\"img-fluid\"");
            BeginWriteAttribute("alt", " alt=\"", 3815, "\"", 3821, 0);
            EndWriteAttribute();
            WriteLiteral(">\r\n          </div>\r\n\r\n          <div class=\"col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center\">\r\n            <img src=\"assets/img/sponzori/sponzor5.png\" class=\"img-fluid\"");
            BeginWriteAttribute("alt", " alt=\"", 4016, "\"", 4022, 0);
            EndWriteAttribute();
            WriteLiteral(">\r\n          </div>\r\n\r\n          <div class=\"col-lg-2 col-md-4 col-6 d-flex align-items-center justify-content-center\">\r\n            <img src=\"assets/img/sponzori/spozor6.png\" class=\"img-fluid\"");
            BeginWriteAttribute("alt", " alt=\"", 4216, "\"", 4222, 0);
            EndWriteAttribute();
            WriteLiteral(@">
          </div>
        </div>
      </div>
        <!-- NAPOMENAAAAAAAAAAAAA: 
                  OVAJ FOOTER TREBA DA SE PRIKAZE TEK KAD SE SELEKTUJE CHECK BOX !!!!!! -->

        <div class=""footer"">
          <p>  <button class=""btn-termin btn default"" style=""font-family: Open Sans, sans-serif;"" type=""button"" id=""PrelazSaCenovnikaNaZakazivanje""> Izaberite usluge i termin </button> </a>  </p>
        </div>

    </section><!-- End Clients Section -->
      
    <div style=""justify-content: flex-start;"" class=""col-lg-3 cta-btn-container"">
      <a style=""font-weight: bolder; font-size: larger;"" class=""cta-btn align-middle"" href=""./Korisnik"">◄ NAZAD na početnu stranu</a>
  </div>


  </main>

");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n        <!-- Template Main JS File -->\r\n    <script src=\"assets/js/cenovnik-korisnik.js\" type=\"module\"></script>\r\n");
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Pages.KorisnikAuth> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages.KorisnikAuth> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages.KorisnikAuth>)PageContext?.ViewData;
        public Pages.KorisnikAuth Model => ViewData.Model;
    }
}
#pragma warning restore 1591
