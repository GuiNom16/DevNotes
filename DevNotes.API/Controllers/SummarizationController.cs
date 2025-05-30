using DevNotes.Application.Features.Summurization.Queries.SummurizeText;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DevNotes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SummarizationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SummarizationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        public class SummarizationRequest
        {
            public string Text { get; set; } = string.Empty;
        }

        [HttpPost("summarize")]
        public async Task<IActionResult> Summarize([FromBody] SummarizationRequest request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
                return BadRequest("Text is required.");

            var query = new SummarizeTextQuery(request.Text);
            var summary = await _mediator.Send(query, cancellationToken);

            return Ok(new { summary });
        }
    }
}
