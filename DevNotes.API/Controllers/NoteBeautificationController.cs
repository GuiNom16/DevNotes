using DevNotes.Application.Features.NoteBeautification.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DevNotes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentBeautificationController : ControllerBase
{
    private readonly IMediator _mediator;

    public ContentBeautificationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("beautify")]
    public async Task<IActionResult> Beautify([FromBody] BeautifyRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Text))
            return BadRequest("Text is required.");

        var result = await _mediator.Send(new BeautifyNoteQuery(request.Text), cancellationToken);
        return Ok(new { beautified = result });
    }

    public class BeautifyRequest
    {
        public string Text { get; set; } = string.Empty;
    }
}
