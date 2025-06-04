using DevNotes.Domain.Entities;

namespace DevNotes.Application.Interfaces
{
    public interface ITagRepository
    {
        Task<List<Tag>> GetTagsByNamesAsync(List<string> tagNames, CancellationToken cancellationToken);
        Task AddTagsAsync(List<Tag> tags, CancellationToken cancellationToken);
        Task<List<string>> GetAllDistinctTagNamesAsync();
    }
}
