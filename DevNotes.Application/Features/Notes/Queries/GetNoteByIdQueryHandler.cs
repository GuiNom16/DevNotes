using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using MediatR;

namespace DevNotes.Application.Features.Notes.Queries
{
    public class GetNoteByIdQueryHandler : IRequestHandler<GetNoteByIdQuery, Note>
    {
        private readonly INoteRepository _noteRepository;

        public GetNoteByIdQueryHandler(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<Note> Handle(GetNoteByIdQuery request, CancellationToken cancellationToken)
        {
            return await _noteRepository.GetByIdAsync(request.Id);
        }
    }
}
