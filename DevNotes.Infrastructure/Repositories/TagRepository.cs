using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using DevNotes.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DevNotes.Infrastructure.Repositories
{
    public class TagRepository : ITagRepository
    {
        private readonly NotesDbContext _context;

        public TagRepository(NotesDbContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetAllDistinctTagNamesAsync()
        {
            return await _context.Tags
                .Select(t => t.Name)
                .Distinct()
                .OrderBy(name => name)
                .ToListAsync();
        }

        public async Task<List<Tag>> GetTagsByNamesAsync(List<string> tagNames, CancellationToken cancellationToken)
        {
            return await _context.Tags
                .Where(t => tagNames.Contains(t.Name))
                .ToListAsync(cancellationToken);
        }

        public async Task AddTagsAsync(List<Tag> tags, CancellationToken cancellationToken)
        {
            await _context.Tags.AddRangeAsync(tags, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
