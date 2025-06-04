using DevNotes.Application.Common.Behaviors;
using DevNotes.Application.Features.Notes.Commands.CreateNote;
using DevNotes.Application.Interfaces;
using DevNotes.Application.Notes.Queries;
using DevNotes.Application.Services;
using DevNotes.Infrastructure.Configuration;
using DevNotes.Infrastructure.Extensions;
using DevNotes.Infrastructure.Persistence;
using DevNotes.Infrastructure.Repositories;
using DevNotes.Infrastructure.Services;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var authSettings = builder.Configuration
    .GetSection("AuthSettings")
    .Get<AuthSettings>()
    ?? throw new InvalidOperationException("AuthSettings configuration is missing.");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructure(builder.Configuration);

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// EF Core
builder.Services.AddDbContext<NotesDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// MediatR
builder.Services.AddMediatR(typeof(GetAllNotesQueryHandler).Assembly);

// DI
builder.Services.AddScoped<INoteRepository, NoteRepository>();
builder.Services.AddScoped<ITagRepository, TagRepository>();
builder.Services.AddScoped<ITagAssociationService, TagAssociationService>();
builder.Services.AddScoped<ITagSuggestionService, TagSuggestionService>();
builder.Services.AddScoped<INoteBeautificationService, NoteBeautificationService>();
builder.Services.AddScoped<ISummarizationService, SummarizationService>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateNoteCommandValidator>();
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
builder.Services.AddSingleton(authSettings);

// Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = authSettings.Issuer,
        ValidAudience = authSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authSettings.Key))
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

app.UseAuthentication();  // <-- Fix order here
app.UseAuthorization();

app.MapControllers();

app.Run();
