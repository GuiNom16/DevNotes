namespace DevNotes.Application.Interfaces
{
    public interface ITagAssociationService
    {
        Task AssociateTagsToNoteAsync(Guid noteId, List<string> tagNames, CancellationToken cancellationToken);
        Task RemoveTagFromNoteAsync(Guid noteId, string tagName, CancellationToken cancellationToken);
    }
}
