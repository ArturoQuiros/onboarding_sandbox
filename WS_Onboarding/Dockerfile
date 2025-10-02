# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

# Set working directory inside the container
WORKDIR /app

# Copy the project file from root
COPY WS_Onboarding/WS_Onboarding.csproj ./WS_Onboarding/
RUN dotnet restore ./WS_Onboarding/WS_Onboarding.csproj

# Copy the source code from src folder
COPY ./WS_Onboarding/ ./WS_Onboarding/

# Build and publish the app
RUN dotnet publish ./WS_Onboarding/WS_Onboarding.csproj -c Release -o /publish

# Use the ASP.NET runtime image to run the app
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copia los archivos publicados desde la etapa de build
COPY --from=build /publish .

# Expose the port your app listens on
EXPOSE 80

# Start the app
ENTRYPOINT ["dotnet", "WS_Onboarding.dll"]