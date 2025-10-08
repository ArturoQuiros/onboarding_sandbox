using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using WS_Onboarding.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.Kiota.Abstractions.Authentication;
using WS_Onboarding.Classes;
using Microsoft.Graph;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

// CORS configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") 
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<ApplicatonDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// 🔐 Autenticación con Azure AD
builder.Services.AddMicrosoftIdentityWebApiAuthentication(builder.Configuration, "AzureAd")
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddMicrosoftGraph(builder.Configuration.GetSection("Graph"))
    .AddInMemoryTokenCaches();

builder.Services.AddScoped<IAuthenticationProvider, UserAccessTokenProvider>();

// 🧾 Autorización (opcional, pero recomendable)
builder.Services.AddAuthorization();

// Inyección manual de GraphServiceClient con token del usuario
builder.Services.AddScoped<GraphServiceClient>(sp =>
{
    var authProvider = sp.GetRequiredService<IAuthenticationProvider>();
    return new GraphServiceClient(authProvider);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "Demo BDO Web Service"); 
    });
    app.MapScalarApiReference(); 
}

app.UseHttpsRedirection();

// Azure Authentication
app.UseAuthentication();
app.UseAuthorization();

// Enable CORS middleware before MapControllers
app.UseCors("AllowReactApp"); 

app.MapControllers();

app.Run();