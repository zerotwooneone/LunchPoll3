using System;
using System.IO;
using System.Text;
using LunchPollServer.Controllers;
using LunchPollServer.DataTransfer;
using LunchPollServer.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace LunchPollServer
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                //.AddJsonFile("appsettings.private.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddDbContext<LunchPollContext>(options => options.UseSqlite("Data Source=lunchPoll.db"));
            AddRepository<INominationRepository, NominationRepository>(services);
            AddRepository<IUserRepository, TokenIdUserRepository>(services);
            AddRepository<IPollRepository, PollRepository>(services);

            AddService<NominationService>(services);
            AddService<UserService>(services);
        }

        private void AddRepository<TInterface, TImplementation>(IServiceCollection services) where TInterface : class where TImplementation : class, TInterface
        {
            services.AddScoped<TInterface, TImplementation>();
        }

        private void AddService<T>(IServiceCollection services) where T : class
        {
            services.AddScoped<T>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            //app.UseDeveloperExceptionPage();
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug(LogLevel.Debug);

            app.UseExceptionHandler(errorApp =>
            {
                errorApp.Run(async context =>
                {
                    context.Response.StatusCode = 500; // or another Status accordingly to Exception Type
                    context.Response.ContentType = "application/json";

                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    if (error != null)
                    {
                        var ex = error.Error;

                        await context.Response.WriteAsync(new ErrorDto()
                        {
                            Code = 1,
                            Message = env.IsDevelopment() ? ex.Message : "Error" 
                            // other custom data
                        }.ToString(), Encoding.UTF8);
                    }
                });
            });

            var options = new JwtBearerOptions
            {
                Audience = Configuration["auth0:clientId"],
                Authority = $"https://{Configuration["auth0:domain"]}/"
            };
            app.UseJwtBearerAuthentication(options);


            app.UseMvc();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // ## this serves my index.html from the wwwroot folder when 
            // ## a route not containing a file extension is not handled by MVC.  
            // ## If the route contains a ".", a 404 will be returned instead.
            app.MapWhen(context => //context.Response.StatusCode == 404 &&
            !Path.HasExtension(context.Request.Path.Value),
                        branch =>
                        {
                            branch.Use((context, next) =>
                            {
                                context.Request.Path = new PathString("/index.html");
                                Console.WriteLine("Path changed to:" + context.Request.Path.Value);
                                return next();
                            });

                            branch.UseStaticFiles();
                        });
        }
    }
}
