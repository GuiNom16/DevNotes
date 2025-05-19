using DevNotes.Domain.Entities;
using DevNotes.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace DevNotes.Application.Features.Notes.Queries
{
    public class GetNoteByIdQueryHandler : IRequestHandler<GetNoteByIdQuery, Note>
    {
        private readonly NotesDbContext _context;

        public GetNoteByIdQueryHandler(NotesDbContext context)
        {
            _context = context;
        }

        public async Task<Note> Handle(GetNoteByIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Notes.FirstOrDefaultAsync(n => n.Id == request.Id, cancellationToken);
        }
    }
}
