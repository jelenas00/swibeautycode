#pragma checksum "C:\Users\bojan\Documents\si.22.50.beauty_code\Aplikacija\Pages\Frizure.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a6a76dd72a5ac990298436749264c22ee19fc055"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Pages_Frizure), @"mvc.1.0.razor-page", @"/Pages/Frizure.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a6a76dd72a5ac990298436749264c22ee19fc055", @"/Pages/Frizure.cshtml")]
    public class Pages_Frizure : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 2 "C:\Users\bojan\Documents\si.22.50.beauty_code\Aplikacija\Pages\Frizure.cshtml"
  
    Layout="_Frizure";

#line default
#line hidden
#nullable disable
            DefineSection("Heder", async() => {
                WriteLiteral(@"
     <!-- ======= Header ======= -->
  <header id=""header"" class=""fixed-top d-flex align-items-center "">
    <div class=""container d-flex align-items-center justify-content-between"">

      <div class=""logo"">
        <h1><a href=""./Pocetna"">BeautyCode</a></h1>
      </div>

      <nav id=""navbar"" class=""navbar"">
        <ul>
          <li><a class=""nav-link scrollto"" href=""./Pocetna"">Početna</a></li>
          <li><a class=""nav-link scrollto"" href=""./Pocetna#about"">O nama</a></li>
          <li><a class=""nav-link scrollto"" href=""./Pocetna#services"">Usluge</a></li>
          <li><a class=""nav-link scrollto"" href=""./Pocetna#portfolio"">Galerija</a></li>
          <li><a class=""nav-link scrollto"" href=""./Pocetna#pricing"">Cene</a></li>
          <!-- <li><a class=""nav-link scrollto"" href=""index.html#team"">Tim</a></li> -->
          <li class=""dropdown""><a href=""#""><span>Log In</span> <i class=""bi bi-chevron-down""></i></a>
            <ul>
              
              <li class=""dropdown""><a hr");
                WriteLiteral(@"ef=""#""><span>Log in kao...</span> <i class=""bi bi-chevron-right""></i></a>
                <ul>
                  <li><a href=""./LoginVlasnik"">Vlasnik</a></li>   <!-- PAZNJAAA !!!! -->
                  <li><a href=""./LoginZaposleni"">Zaposleni</a></li>
                  <li><a href=""./LoginKorisnik"">Korisnik</a></li>
                </ul>
              </li>
    
            </ul>

          </li>
          <li><a class=""nav-link scrollto"" href=""./Index#team"">Tim</a></li>
          <!-- <li><a class=""nav-link scrollto"" href=""#contact"">Kontakt</a></li> -->
        </ul>
        <i class=""bi bi-list mobile-nav-toggle""></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->
");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Pages_Frizure> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages_Frizure> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages_Frizure>)PageContext?.ViewData;
        public Pages_Frizure Model => ViewData.Model;
    }
}
#pragma warning restore 1591
