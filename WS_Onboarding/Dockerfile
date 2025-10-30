# =========================
# Etapa 1: Build
# =========================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

# Copiar archivos del proyecto (para aprovechar la caché de dependencias)
COPY WS_Container/*.csproj ./WS_Container/
# Si tienes un .sln fuera del proyecto, cópialo también
COPY WS_Container/*.sln ./WS_Container/

# Restaurar dependencias
RUN dotnet restore ./WS_Container/WS_Onboarding.sln

# Copiar el resto del código fuente
COPY WS_Container/. ./WS_Container/

# Compilar el proyecto en modo Release
WORKDIR /src/WS_Container
RUN dotnet publish -c Release -o /app/publish

# =========================
# Etapa 2: Runtime
# =========================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final

WORKDIR /app

# Copiar los archivos compilados desde la etapa de build
COPY --from=build /app/publish .

# Exponer el puerto donde escucha la aplicación
EXPOSE 5005

# Configurar entorno de producción
ENV ASPNETCORE_URLS=http://+:5005
ENV ASPNETCORE_ENVIRONMENT=Production

# Comando de inicio
ENTRYPOINT ["dotnet", "WS_Onboarding.dll"]