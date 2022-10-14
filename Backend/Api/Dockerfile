#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["monitor.api.csproj", "."]
RUN dotnet nuget add source http://172.28.195.165:8070/nuget -n accusys
RUN dotnet restore "monitor.api.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "monitor.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "monitor.api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "monitor.api.dll"]
