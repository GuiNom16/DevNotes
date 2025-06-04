using MediatR;

namespace DevNotes.Application.Features.Tags.Commands.RemoveTagFromNote
{
    public class RemoveTagFromNoteCommand : IRequest
    {
        public Guid NoteId { get; set; }
        public string TagName { get; set; } = string.Empty;
    }

}
