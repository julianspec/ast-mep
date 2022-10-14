using Accusys.Uniweb2.Basics.Services;
using Backend;
using Backend.Globals;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors();

            services.AddControllers().AddJsonOptions(x =>
            x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

            services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("desaConnection")));

            Connection.ConnectionString = Configuration.GetConnectionString("desaConnection");

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new() { Title = "MepApi", Version = "v1" });
            });

            services.AddSingleton<IContextManager, MockConetxtManager>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();

            Console.WriteLine("Habilitando Swagger");
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MepApi V1");
            });

            //Para pruebas
            //app.UseCors(
            //    options => options.WithOrigins("*").AllowAnyMethod()
            //);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }
    }
}
