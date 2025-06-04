using DevNotes.Application.Interfaces;
using MediatR;

namespace DevNotes.Application.Features.Tags.Commands.RemoveTagFromNote
{
    public class RemoveTagFromNoteCommandHandler : IRequestHandler<RemoveTagFromNoteCommand>
    {
        private readonly ITagAssociationService _tagAssociationService;

        public RemoveTagFromNoteCommandHandler(ITagAssociationService tagAssociationService)
        {
            _tagAssociationService = tagAssociationService;
        }

        public async Task<Unit> Handle(RemoveTagFromNoteCommand request, CancellationToken cancellationToken)
        {
            await _tagAssociationService.RemoveTagFromNoteAsync(request.NoteId, request.TagName, cancellationToken);
            return Unit.Value;
        }
    }

}
