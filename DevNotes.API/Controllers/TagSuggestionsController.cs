using DevNotes.Application.Features.TagSuggestions.Queries.SuggestTags;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DevNotes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagSuggestionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TagSuggestionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        public class TagSuggestionRequest
        {
            public string Text { get; set; } = string.Empty;
        }

        [HttpPost("suggest")]
        public async Task<IActionResult> SuggestTags([FromBody] TagSuggestionRequest request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
                return BadRequest("Text is required.");

            var query = new SuggestTagsQuery(request.Text);
            var suggestedTags = await _mediator.Send(query, cancellationToken);

            return Ok(suggestedTags);
        }
    }
}
