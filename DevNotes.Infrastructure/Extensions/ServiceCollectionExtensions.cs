using DevNotes.Application.Interfaces;
using DevNotes.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace DevNotes.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<NotesDbContext>(options =>
                options.UseNpgsql(connectionString));

            // Ensure the AddHttpClient extension method is available  
            services.AddHttpClient<ITagSuggestionService, TagSuggestionService>();

            return services;
        }
    }
}
