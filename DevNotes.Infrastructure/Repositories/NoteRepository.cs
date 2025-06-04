using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using DevNotes.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace DevNotes.Infrastructure.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly NotesDbContext _context;

        public NoteRepository(NotesDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Note note, CancellationToken cancellationToken)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task<Note> GetByIdAsync(Guid id)
        {
            return await _context.Notes
                .Include(n => n.Tags)
                .FirstOrDefaultAsync(n => n.Id == id);
        }

        public async Task<List<Note>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _context.Notes
            .Include(n => n.Tags)
            .ToListAsync(cancellationToken);
        }

        public async Task UpdateAsync(Note note)
        {
            _context.Notes.Update(note);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note != null)
            {
                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();
            }
        }


    }

}
