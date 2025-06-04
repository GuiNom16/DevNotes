using MediatR;

namespace DevNotes.Application.Features.Notes.Commands.DeleteNote
{
    public record DeleteNoteCommand(Guid Id) : IRequest<bool>;
}
