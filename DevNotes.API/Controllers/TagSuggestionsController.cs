using DevNotes.Application.Interfaces;
using DevNotes.Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace DevNotes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagSuggestionsController : ControllerBase
    {
        private readonly ITagSuggestionService _tagSuggestionService;

        public TagSuggestionsController(ITagSuggestionService tagSuggestionService)
        {
            _tagSuggestionService = tagSuggestionService;
        }

        [HttpPost("suggest")]
        public async Task<IActionResult> SuggestTags([FromBody] TagSuggestionRequest request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
                return BadRequest("Text is required.");

            var suggestedTags = await _tagSuggestionService.SuggestTagsAsync(request.Text, cancellationToken);
            return Ok(suggestedTags);
        }

        public class TagSuggestionRequest
        {
            public string Text { get; set; } = string.Empty;
        }
    }
}
