using DevNotes.Application.Interfaces;
using MediatR;

namespace DevNotes.Application.Features.Tags.Commands.AssignTagsToNote
{
    public class AssignTagsToNoteCommandHandler : IRequestHandler<AssignTagsToNoteCommand>
    {
        private readonly ITagAssociationService _tagAssociationService;

        public AssignTagsToNoteCommandHandler(ITagAssociationService tagAssociationService)
        {
            _tagAssociationService = tagAssociationService;
        }

        public async Task<Unit> Handle(AssignTagsToNoteCommand request, CancellationToken cancellationToken)
        {
            await _tagAssociationService.AssociateTagsToNoteAsync(request.NoteId, request.TagNames, cancellationToken);
            return Unit.Value;
        }
    }

}
