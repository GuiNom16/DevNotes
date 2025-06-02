using DevNotes.Application.DTOs;
using DevNotes.Application.Features.Notes.Queries;
using DevNotes.Application.Mappers;
using DevNotes.Domain.Entities;
using DevNotes.Application.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Notes.Queries
{
    public class GetAllNotesQueryHandler : IRequestHandler<GetAllNotesQuery, List<NoteDto>>
    {
        private readonly INoteRepository _noteRepository;

        public GetAllNotesQueryHandler(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<List<NoteDto>> Handle(GetAllNotesQuery request, CancellationToken cancellationToken)
        {
            var notes = await _noteRepository.GetAllAsync(cancellationToken);
            return notes.Select(NoteMapper.ToDto).ToList();
        }
    }

}