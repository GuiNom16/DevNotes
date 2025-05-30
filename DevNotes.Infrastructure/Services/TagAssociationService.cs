using DevNotes.Application.Interfaces;
using DevNotes.Infrastructure.Persistence;
using DevNotes.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using DevNotes.Application.Common.Exceptions;


namespace DevNotes.Infrastructure.Services
{
    public class TagAssociationService : ITagAssociationService
    {
        private readonly NotesDbContext _context;

        public TagAssociationService(NotesDbContext context)
        {
            _context = context;
        }

        public async Task AssociateTagsToNoteAsync(Guid noteId, List<string> tagNames, CancellationToken cancellationToken)
        {
            var note = await _context.Notes
                .Include(n => n.Tags)
                .FirstOrDefaultAsync(n => n.Id == noteId, cancellationToken);

            if (note == null)
                throw new Exception("Note not found");

            var existingTags = await _context.Tags
                .Where(t => tagNames.Contains(t.Name))
                .ToListAsync(cancellationToken);

            var newTagNames = tagNames.Except(existingTags.Select(t => t.Name)).ToList();

            foreach (var newTagName in newTagNames)
            {
                var newTag = new Tag { Name = newTagName };
                _context.Tags.Add(newTag);
                existingTags.Add(newTag);
            }

            note.Tags = existingTags;

            await _context.SaveChangesAsync(cancellationToken);
        }

        public async Task RemoveTagFromNoteAsync(Guid noteId, string tagName, CancellationToken cancellationToken)
        {
            var note = await _context.Notes
                .Include(n => n.Tags)
                .FirstOrDefaultAsync(n => n.Id == noteId, cancellationToken);

            if (note == null) throw new NotFoundException(nameof(Note), noteId);

            var tag = note.Tags.FirstOrDefault(t => t.Name == tagName);
            if (tag != null)
            {
                note.Tags.Remove(tag);
                await _context.SaveChangesAsync(cancellationToken);
            }
        }

    }
}
