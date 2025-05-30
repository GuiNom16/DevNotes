using DevNotes.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
