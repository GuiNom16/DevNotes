using DevNotes.Application.Features.Tags.Queries.GetAllTags;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DevNotes.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public TagsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTags(CancellationToken cancellationToken)
        {
            var tags = await _mediator.Send(new GetAllTagsQuery(), cancellationToken);
            return Ok(tags);
        }
    }
}
