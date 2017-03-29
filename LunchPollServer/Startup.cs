using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LunchPollServer.Controllers;
using LunchPollServer.DataTransfer;
using LunchPollServer.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            services.AddDbContext<LunchPollContext>(options => options.UseSqlite("Data Source=lunchPoll.db"));
            AddRepository<INominationRepository, NominationRepository>(services);

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
            app.UseDeveloperExceptionPage();
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug(LogLevel.Debug);

            app.UseMvc();
            app.UseStaticFiles();
        }
    }
}
