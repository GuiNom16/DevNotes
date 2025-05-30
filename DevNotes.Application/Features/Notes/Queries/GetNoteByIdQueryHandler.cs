using DevNotes.Application.DTOs;
using DevNotes.Application.Mappers;
using DevNotes.Domain.Interfaces;
using MediatR;

namespace DevNotes.Application.Features.Notes.Queries
{
    public class GetNoteByIdQueryHandler : IRequestHandler<GetNoteByIdQuery, NoteDto>
    {
        private readonly INoteRepository _noteRepository;

        public GetNoteByIdQueryHandler(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<NoteDto> Handle(GetNoteByIdQuery request, CancellationToken cancellationToken)
        {
            var note = await _noteRepository.GetByIdAsync(request.Id);
            return NoteMapper.ToDto(note);
        }
    }
}
