using DevNotes.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DevNotes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SummarizationController : ControllerBase
    {
        private readonly ISummarizationService _summarizationService;

        public SummarizationController(ISummarizationService summarizationService)
        {
            _summarizationService = summarizationService;
        }

        [HttpPost("summarize")]
        public async Task<IActionResult> Summarize([FromBody] SummarizationRequest request, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Text))
                return BadRequest("Text is required.");

            var summary = await _summarizationService.SummarizeAsync(request.Text, cancellationToken);
            return Ok(new { summary });
        }

        public class SummarizationRequest
        {
            public string Text { get; set; } = string.Empty;
        }
    }
}
