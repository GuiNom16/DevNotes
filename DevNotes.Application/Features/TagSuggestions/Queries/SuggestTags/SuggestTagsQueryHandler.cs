using DevNotes.Application.Interfaces;
using MediatR;

namespace DevNotes.Application.Features.TagSuggestions.Queries.SuggestTags
{
    public class SuggestTagsQueryHandler : IRequestHandler<SuggestTagsQuery, List<string>>
    {
        private readonly ITagSuggestionService _tagSuggestionService;

        public SuggestTagsQueryHandler(ITagSuggestionService tagSuggestionService)
        {
            _tagSuggestionService = tagSuggestionService;
        }

        public async Task<List<string>> Handle(SuggestTagsQuery request, CancellationToken cancellationToken)
        {
            return await _tagSuggestionService.SuggestTagsAsync(request.Text, cancellationToken);
        }
    }
}
