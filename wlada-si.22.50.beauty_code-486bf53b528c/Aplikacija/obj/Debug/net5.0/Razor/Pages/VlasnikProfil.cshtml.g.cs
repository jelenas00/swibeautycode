#pragma checksum "C:\Users\bojan\Documents\si.22.50.beauty_code\Aplikacija\Pages\VlasnikProfil.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "cda5f10cfcc30f505a0a6ada0a319ee673d5e58e"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Pages_VlasnikProfil), @"mvc.1.0.razor-page", @"/Pages/VlasnikProfil.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"cda5f10cfcc30f505a0a6ada0a319ee673d5e58e", @"/Pages/VlasnikProfil.cshtml")]
    public class Pages_VlasnikProfil : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 3 "C:\Users\bojan\Documents\si.22.50.beauty_code\Aplikacija\Pages\VlasnikProfil.cshtml"
  
    Layout = "_LayoutVlasnik";
    ViewData["Title"]="Beauty Code";

#line default
#line hidden
#nullable disable
            WriteLiteral(@" <main id=""main"" class=""main"">

    <div class=""pagetitle"">
      <h1>Profil</h1>
      <nav>
        <ol class=""breadcrumb"">
          <li class=""breadcrumb-item""><a href=""index.html"">Početna</a></li>
          <li class=""breadcrumb-item"">Profil</li>
          <li class=""breadcrumb-item active"">Moj profil</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class=""section profile"">
      <div class=""row"">
        <div class=""col-xl-4"">

          <div class=""card"">
            <div class=""card-body profile-card pt-4 d-flex flex-column align-items-center"">
              <h2 id=""section-profile-us""></h2>
              <h3>Vlasnik</h3>
            </div>
          </div>

        </div>

        <div class=""col-xl-8"">

          <div class=""card"">
            <div class=""card-body pt-3"">
              <!-- Bordered Tabs -->
              <ul class=""nav nav-tabs nav-tabs-bordered"">

                <li class=""nav-item"">
                  <button class=");
            WriteLiteral(@"""nav-link active"" data-bs-toggle=""tab"" data-bs-target=""#profile-overview"">Pregled</button>
                </li>

                <li class=""nav-item"">
                  <button class=""nav-link"" data-bs-toggle=""tab"" data-bs-target=""#profile-edit"">Izmeni profil</button>
                </li>
                <li class=""nav-item"">
                  <button class=""nav-link"" data-bs-toggle=""tab"" data-bs-target=""#profile-change-password"">Promeni lozinku</button>
                </li>

              </ul>
              <div class=""tab-content pt-2"">

                <div class=""tab-pane fade show active profile-overview"" id=""profile-overview"">
                  <h5 class=""card-title"">Detalji</h5>

                  <div class=""row"">
                    <div class=""col-lg-3 col-md-4 label "">Puno ime i prezime</div>
                    <div class=""col-lg-9 col-md-8"" id=""fullnamedetaljius""></div>
                  </div>

                  <div class=""row"">
                    <div class=""col-lg-3");
            WriteLiteral(@" col-md-4 label"">Salon</div>
                    <div class=""col-lg-9 col-md-8"" id=""vlasniksalon""></div>
                  </div>

                  <div class=""row"">
                    <div class=""col-lg-3 col-md-4 label"">Vlasnik od</div>
                    <div class=""col-lg-9 col-md-8"" id=""vlasnikOd""></div>
                  </div>

                  <div class=""row"">
                    <div class=""col-lg-3 col-md-4 label"">Država</div>
                    <div class=""col-lg-9 col-md-8"">Srbija</div>
                  </div>

                  <div class=""row"">
                    <div class=""col-lg-3 col-md-4 label"">Adresa</div>
                    <div class=""col-lg-9 col-md-8"" id=""adresaus""></div>
                  </div>

                  <div class=""row"">
                    <div class=""col-lg-3 col-md-4 label"">Telefon</div>
                    <div class=""col-lg-9 col-md-8"" id=""telefonus""></div>
                  </div>

                  <div class=""row"">
                 ");
            WriteLiteral(@"   <div class=""col-lg-3 col-md-4 label"">Email</div>
                    <div class=""col-lg-9 col-md-8"" id=""emailus""></div>
                  </div>

                </div>

                <div class=""tab-pane fade profile-edit pt-3"" id=""profile-edit"">

                  <!-- Profile Edit Form -->
                  <form onsubmit=""return false"">

                    <div class=""row mb-3"">
                      <label for=""fullName"" class=""col-md-4 col-lg-3 col-form-label"">Ime</label>
                      <div class=""col-md-8 col-lg-9"" id=""imeizmenaus"">
                        
                      </div>
                    </div>
                    <div class=""row mb-3"">
                      <label for=""fullName"" class=""col-md-4 col-lg-3 col-form-label"">Prezime</label>
                      <div class=""col-md-8 col-lg-9"" id=""prezimeizmenaus"">
                        
                      </div>
                    </div>
                    
                    <div class=""row mb");
            WriteLiteral(@"-3"">
                      <label for=""Address"" class=""col-md-4 col-lg-3 col-form-label"">Adresa</label>
                      <div class=""col-md-8 col-lg-9"" id=""adresaizmenaus"">
                        
                      </div>
                    </div>

                    <div class=""row mb-3"">
                      <label for=""Phone"" class=""col-md-4 col-lg-3 col-form-label"">Telefon</label>
                      <div class=""col-md-8 col-lg-9"" id=""telefonizmenaus"">
                        
                      </div>
                    </div>

                    <div class=""row mb-3"">
                      <label for=""Phone"" class=""col-md-4 col-lg-3 col-form-label"">Vlasnik od</label>
                      <div class=""col-md-8 col-lg-9"" id=""vlasnikodizmenaus"">
                        
                      </div>
                    </div>

                    <div class=""row mb-3"">
                      <label for=""Email"" class=""col-md-4 col-lg-3 col-form-label"">Email</label>
 ");
            WriteLiteral(@"                     <div class=""col-md-8 col-lg-9"" id=""emailizmenaus"">
                        
                      </div>
                    </div>

                    <div class=""row mb-3"">
                      <label for=""Korime"" class=""col-md-4 col-lg-3 col-form-label"">Korisničko ime</label>
                      <div class=""col-md-8 col-lg-9"" id=""korimeizmenaus"">
                        
                      </div>
                    </div>

                    <div class=""row mb-3"">
                      <label for=""Godina"" class=""col-md-4 col-lg-3 col-form-label"">Godina rođenja</label>
                      <div class=""col-md-8 col-lg-9"" id=""godinaizmenaus"">
                        
                      </div>
                    </div>
                   <div class=""text-center"">
                      <button type=""submit"" class=""btn btn-primary"" id=""btnvlasnikch"">Sačuvaj izmene</button>
                    </div>
                  </form><!-- End Profile Edit Form -->
");
            WriteLiteral(@"
                </div>

                

                <div class=""tab-pane fade pt-3"" id=""profile-change-password"">
                  <!-- Change Password Form -->
                  <form onsubmit=""return false"">

                    <div class=""row mb-3"">
                      <label for=""currentPassword"" class=""col-md-4 col-lg-3 col-form-label"">Trenutna lozinka</label>
                      <div class=""col-md-8 col-lg-9"">
                        <input name=""password"" type=""password"" class=""form-control"" id=""currentPassword"">
                      </div>
                    </div>

                    <div class=""row mb-3"">
                      <label for=""newPassword"" class=""col-md-4 col-lg-3 col-form-label"">Nova lozinka</label>
                      <div class=""col-md-8 col-lg-9"">
                        <input name=""newpassword"" type=""password"" class=""form-control"" id=""newPassword"">
                      </div>
                    </div>

                    <div class=""row mb");
            WriteLiteral(@"-3"">
                      <label for=""renewPassword"" class=""col-md-4 col-lg-3 col-form-label"">Ponovo unesite novu lozinku</label>
                      <div class=""col-md-8 col-lg-9"">
                        <input name=""renewpassword"" type=""password"" class=""form-control"" id=""renewPassword"">
                      </div>
                    </div>

                    <div class=""text-center"">
                      <button type=""submit"" class=""btn btn-primary"" id=""promeniLozinkuVlasnik"">Promeni lozinku</button>
                    </div>
                  </form><!-- End Change Password Form -->

                </div>

              </div><!-- End Bordered Tabs -->

            </div>
          </div>

        </div>
      </div>
    </section>

  </main><!-- End #main -->

");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n    <!-- Nase skripte-->\r\n    <script src=\"assetsvlasnik/js/users-profile.js\" type=\"module\"></script>\r\n");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<Pages.VlasnikAuth> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages.VlasnikAuth> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<Pages.VlasnikAuth>)PageContext?.ViewData;
        public Pages.VlasnikAuth Model => ViewData.Model;
    }
}
#pragma warning restore 1591
