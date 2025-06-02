using DevNotes.Application.Features.Tags.Commands.RemoveTagFromNote;
using DevNotes.Infrastructure.Persistence;
using DevNotes.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Tests.Application.Tags.Commands.RemoveTagFromNote
{
    public class RemoveTagFromNoteCommandHandlerTests
    {
        private NotesDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<NotesDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new NotesDbContext(options);
        }

        [Fact]
        public async Task Handle_RemovesTagFromNote_Successfully()
        {
            // Arrange
            using var context = GetInMemoryDbContext();

            var tag = new Domain.Entities.Tag { Name = "tagToRemove" };
            var noteId = Guid.NewGuid();
            var note = new Domain.Entities.Note { Id = noteId, Tags = new List<Domain.Entities.Tag> { tag } };

            context.Tags.Add(tag);
            context.Notes.Add(note);
            await context.SaveChangesAsync();

            var service = new TagAssociationService(context);
            var handler = new RemoveTagFromNoteCommandHandler(service);

            var command = new RemoveTagFromNoteCommand
            {
                NoteId = noteId,
                TagName = "tagToRemove"
            };

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            var updatedNote = await context.Notes.Include(n => n.Tags).FirstAsync(n => n.Id == noteId);
            Assert.DoesNotContain(updatedNote.Tags, t => t.Name == "tagToRemove");
        }

        [Fact]
        public async Task Handle_ThrowsNotFoundException_WhenNoteDoesNotExist()
        {
            // Arrange
            using var context = GetInMemoryDbContext();

            var service = new TagAssociationService(context);
            var handler = new RemoveTagFromNoteCommandHandler(service);

            var command = new RemoveTagFromNoteCommand
            {
                NoteId = Guid.NewGuid(),
                TagName = "nonexistentTag"
            };

            // Act & Assert
            await Assert.ThrowsAsync<DevNotes.Application.Common.Exceptions.NotFoundException>(() =>
                handler.Handle(command, CancellationToken.None));
        }
    }
}
