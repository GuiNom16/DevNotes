using DevNotes.Application.Features.Notes.Commands.CreateNote;
using DevNotes.Application.Features.Notes.Commands.DeleteNote;
using DevNotes.Application.Features.Notes.Commands.UpdateNote;
using DevNotes.Application.Features.Notes.Queries;
using DevNotes.Application.Features.Tags.Commands.AssignTagsToNote;
using DevNotes.Application.Features.Tags.Commands.RemoveTagFromNote;
using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DevNotes.API.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ITagAssociationService _tagAssociationService;

        public NotesController(IMediator mediator, ITagAssociationService tagAssociationService)
        {
            _mediator = mediator;
            _tagAssociationService = tagAssociationService;
        }

        // POST: api/notes
        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] CreateNoteCommand command)
        {
            var noteId = await _mediator.Send(command);
            var createdNote = await _mediator.Send(new GetNoteByIdQuery(noteId));
            return CreatedAtAction(nameof(GetNoteById), new { id = noteId }, createdNote);
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

            var updatedNote = await _mediator.Send(new GetNoteByIdQuery(id));

            return Ok(updatedNote);
        }

        // DELETE: api/notes/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var deleted = await _mediator.Send(new DeleteNoteCommand(id));
            if (!deleted) return NotFound();

            return NoContent();
        }

        [HttpPost("{noteId}/tags")]
        public async Task<IActionResult> AssignTags(Guid noteId, [FromBody] List<string> tagNames, CancellationToken cancellationToken)
        {
            var command = new AssignTagsToNoteCommand
            {
                NoteId = noteId,
                TagNames = tagNames
            };

            await _mediator.Send(command, cancellationToken);
            return Ok();
        }

        [HttpDelete("{noteId}/tags/{tagName}")]
        public async Task<IActionResult> RemoveTag(Guid noteId, string tagName, CancellationToken cancellationToken)
        {
            var command = new RemoveTagFromNoteCommand
            {
                NoteId = noteId,
                TagName = tagName
            };

            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }


    }
}

