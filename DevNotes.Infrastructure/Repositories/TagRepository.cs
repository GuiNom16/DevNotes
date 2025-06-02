using DevNotes.Application.Interfaces;
using DevNotes.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}
