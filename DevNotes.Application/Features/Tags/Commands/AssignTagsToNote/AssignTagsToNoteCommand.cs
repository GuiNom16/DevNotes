using MediatR;

namespace DevNotes.Application.Features.Tags.Commands.AssignTagsToNote
{
    public class AssignTagsToNoteCommand : IRequest
    {
        public Guid NoteId { get; set; }
        public List<string> TagNames { get; set; } = new();
    }

}
