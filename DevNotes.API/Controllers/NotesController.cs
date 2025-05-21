using DevNotes.Application.Features.Notes.Commands;
using DevNotes.Application.Features.Notes.Queries;
using DevNotes.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevNotes.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public NotesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/notes
        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] CreateNoteCommand command)
        {
            var noteId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetNoteById), new { id = noteId }, null);
        }

        // GET: api/notes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNoteById(Guid id)
        {
            var note = await _mediator.Send(new GetNoteByIdQuery(id));
            if (note == null) return NotFound();
            return Ok(note);
        }

        // GET: api/notes
        [HttpGet]
        public async Task<ActionResult<List<Note>>> GetAllNotes()
        {
            var notes = await _mediator.Send(new GetAllNotesQuery());
            return Ok(notes);
        }

        // PUT: api/notes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(Guid id, [FromBody] UpdateNoteCommand command)
        {
            if (id != command.Id)
                return BadRequest("Id in URL and body must match");

            var updated = await _mediator.Send(command);
            if (!updated) return NotFound();

            return NoContent();
        }

        // DELETE: api/notes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var deleted = await _mediator.Send(new DeleteNoteCommand(id));
            if (!deleted) return NotFound();

            return NoContent();
        }
    }
}

