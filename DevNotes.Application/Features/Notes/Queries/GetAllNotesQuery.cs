using DevNotes.Application.DTOs;
using MediatR;

namespace DevNotes.Application.Features.Notes.Queries
{
    public record GetAllNotesQuery() : IRequest<List<NoteDto>>;
}
