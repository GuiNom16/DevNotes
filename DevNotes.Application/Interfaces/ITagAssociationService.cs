using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Interfaces
{
    public interface ITagAssociationService
    {
        Task AssociateTagsToNoteAsync(Guid noteId, List<string> tagNames, CancellationToken cancellationToken);
    }
}
