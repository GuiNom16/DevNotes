using DevNotes.Application.Features.Notes.Commands;
using DevNotes.Infrastructure.Persistence;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Notes.Commands
{
    public class DeleteNoteCommandHandler : IRequestHandler<DeleteNoteCommand, bool>
    {
        private readonly NotesDbContext _context;

        public DeleteNoteCommandHandler(NotesDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteNoteCommand request, CancellationToken cancellationToken)
        {
            var note = await _context.Notes.FindAsync(request.Id);
            if (note == null) return false;

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
