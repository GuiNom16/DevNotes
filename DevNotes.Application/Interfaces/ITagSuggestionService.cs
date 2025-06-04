namespace DevNotes.Application.Interfaces
{
    public interface ITagSuggestionService
    {
        Task<List<string>> SuggestTagsAsync(string noteContent, CancellationToken cancellationToken);
    }
}
