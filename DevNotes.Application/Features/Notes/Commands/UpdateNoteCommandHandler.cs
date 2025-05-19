using DevNotes.Application.Features.Notes.Commands;
using DevNotes.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Notes.Commands
{
    public class UpdateNoteCommandHandler : IRequestHandler<UpdateNoteCommand, bool>
    {
        private readonly NotesDbContext _context;

        public UpdateNoteCommandHandler(NotesDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdateNoteCommand request, CancellationToken cancellationToken)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == request.Id, cancellationToken);
            if (note == null) return false;

            note.Title = request.Title;
            note.Content = request.Content;
            note.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
