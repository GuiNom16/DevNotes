using MediatR;

namespace DevNotes.Application.Features.Notes.Commands.UpdateNote
{
    public record UpdateNoteCommand(Guid Id, string Title, string Content) : IRequest<bool>;
}
