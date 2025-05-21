using DevNotes.Application.Features.Notes.Queries;
using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Notes.Queries
{
    public class GetAllNotesQueryHandler : IRequestHandler<GetAllNotesQuery, List<Note>>
    {
        private readonly INoteRepository _noteRepository;

        public GetAllNotesQueryHandler(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<List<Note>> Handle(GetAllNotesQuery request, CancellationToken cancellationToken)
        {
            return await _noteRepository.GetAllAsync(cancellationToken);
        }
    }

}
}
