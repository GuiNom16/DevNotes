using DevNotes.Application.DTOs;
using MediatR;

namespace DevNotes.Application.Features.Notes.Queries
{
    public record GetNoteByIdQuery(Guid Id) : IRequest<NoteDto>;

}
