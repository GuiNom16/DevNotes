using MediatR;

namespace DevNotes.Application.Features.TagSuggestions.Queries.SuggestTags
{
    public class SuggestTagsQuery(string text) : IRequest<List<string>>
    {
        public string Text { get; } = text;
    }
}
