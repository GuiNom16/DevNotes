using DevNotes.Domain.Entities;
using DevNotes.Infrastructure.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Notes.Commands
{
    public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommand, Guid>
    {
        private readonly NotesDbContext _context;

        public CreateNoteCommandHandler(NotesDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
        {
            var note = new Note
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Content = request.Content,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notes.Add(note);
            await _context.SaveChangesAsync(cancellationToken);

            return note.Id;
        }
    }
}