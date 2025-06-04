using MediatR;

namespace DevNotes.Application.Features.Notes.Commands.CreateNote
{
    public record CreateNoteCommand(string Title, string Content) : IRequest<Guid>;
}
