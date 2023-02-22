using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Aplikacija
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Aplikacija", Version = "v1" });
            });
            services.AddDbContext<ContextKlasa>(p => 
                    p.UseSqlServer(Configuration.GetConnectionString("BeautyCodeCS")));
            services.AddCors(options =>
                        {
                            options.AddPolicy("CORS", builder =>
                            {
                                builder.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                            });
                        });
            services.AddAuthentication("CookieAuth").AddCookie("CookieAuth",options=>{
                options.Cookie.Name="CookieAuth";
                options.LoginPath="/LoginKorisnik";

                options.AccessDeniedPath ="/AccDenied";

                options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
            });  
            services.AddAuthorization(options=>{
                options.AddPolicy("RequireVlasnikRole",
                        policy => policy.RequireClaim(ClaimTypes.Role, "Vlasnik"));
                options.AddPolicy("RequireRadnikRole",
                        policy => policy.RequireClaim(ClaimTypes.Role, "Radnik"));
                options.AddPolicy("RequireKorisnikRole",
                        policy => policy.RequireClaim(ClaimTypes.Role, "Korisnik"));
            });
            services.AddMvc();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Aplikacija v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CORS");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapRazorPages();
            });
        }
    }
}
