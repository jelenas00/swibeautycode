using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Authentication;  
using Microsoft.AspNetCore.Authentication.Cookies; 
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Pages
{
    [Authorize(Policy="RequireKorisnikRole")]
    public class KorisnikAuth : PageModel
    {
        public void OnGet()
        {
        }
    }
}