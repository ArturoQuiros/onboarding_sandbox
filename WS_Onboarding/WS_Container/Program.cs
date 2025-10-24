using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using WS_Onboarding.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.Kiota.Abstractions.Authentication;
using WS_Onboarding.Functions;
using Microsoft.Graph;
using WS_Onboarding.Services;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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

// ==========================
// 🔐 AUTENTICACIÓN
// ==========================

// 1️⃣ Autenticación con Azure AD
builder.Services.AddAuthentication()
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"),
        jwtBearerScheme: "AzureAD")
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddMicrosoftGraph(builder.Configuration.GetSection("Graph"))
    .AddInMemoryTokenCaches();

// 2️⃣ JWT Interno
var jwtKey = builder.Configuration.GetValue<string>("Jwt:Key")
    ?? throw new InvalidOperationException("Jwt:Key no está configurada en appsettings.json");

var jwtIssuer = builder.Configuration.GetValue<string>("Jwt:Issuer");
var jwtAudience = builder.Configuration.GetValue<string>("Jwt:Audience");
            
var internalKey = Encoding.UTF8.GetBytes(jwtKey);

builder.Services.AddAuthentication()
    .AddJwtBearer("InternalJWT", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(internalKey)
        };
    });

// ==========================
// 🔑 AUTORIZACIÓN
// ==========================
builder.Services.AddAuthorization(options =>
{
    // Política para Azure AD
    options.AddPolicy("AzureAdPolicy", policy =>
        policy.AddAuthenticationSchemes("AzureAD")
              .RequireAuthenticatedUser());

    // Política para JWT interno
    options.AddPolicy("InternalPolicy", policy =>
        policy.AddAuthenticationSchemes("InternalJWT")
              .RequireAuthenticatedUser());

    // (Opcional) Política combinada: acepta ambos tokens
    options.AddPolicy("AnyAuthPolicy", policy =>
        policy.AddAuthenticationSchemes("AzureAD", "InternalJWT")
              .RequireAuthenticatedUser());
});

// ==========================
// 🔧 SERVICIOS
// ==========================
builder.Services.AddScoped<IAuthenticationProvider, UserAccessTokenProvider>();
builder.Services.AddScoped<AuthService>();

// 🧾 Autorización (opcional, pero recomendable)
//builder.Services.AddAuthorization();

// Inyección manual de GraphServiceClient con token del usuario
builder.Services.AddScoped<GraphServiceClient>(sp =>
{
    var authProvider = sp.GetRequiredService<IAuthenticationProvider>();
    return new GraphServiceClient(authProvider);
});

builder.Services.Configure<AzureAdSettings>(
    builder.Configuration.GetSection("AzureAd"));

// Servicio para enviar emails
builder.Services.AddScoped<IEmailService, EmailService>();

// Servicio para generar tokens internos (opcional)
builder.Services.AddSingleton<JwtService>();

// ==========================
// 🚀 APP PIPELINE
// ==========================
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

// Enable CORS middleware before MapControllers
app.UseCors("AllowReactApp"); 

// Azure Authentication
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();