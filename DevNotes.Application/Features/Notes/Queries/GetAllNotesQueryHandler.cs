using DevNotes.Application.Features.Notes.Queries;
using DevNotes.Domain.Entities;
using DevNotes.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Notes.Queries
{
    public class GetAllNotesQueryHandler : IRequestHandler<GetAllNotesQuery, List<Note>>
    {
        private readonly NotesDbContext _context;

        public GetAllNotesQueryHandler(NotesDbContext context)
        {
            _context = context;
        }

        public async Task<List<Note>> Handle(GetAllNotesQuery request, CancellationToken cancellationToken)
        {
            return await _context.Notes.ToListAsync(cancellationToken);
        }
    }
}
