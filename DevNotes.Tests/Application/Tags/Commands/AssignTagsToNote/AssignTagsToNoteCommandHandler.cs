using DevNotes.Application.Features.Tags.Commands.AssignTagsToNote;
using DevNotes.Infrastructure.Persistence;
using DevNotes.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Tests.Application.Tags.Commands.AssignTagsToNote
{
    public class AssignTagsToNoteCommandHandlerTests
    {
        private NotesDbContext GetInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<NotesDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            return new NotesDbContext(options);
        }

        [Fact]
        public async Task Handle_AssignsTagsToNote_Successfully()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var noteId = Guid.NewGuid();
            context.Notes.Add(new Domain.Entities.Note { Id = noteId, Tags = new List<Domain.Entities.Tag>() });
            await context.SaveChangesAsync();

            var service = new TagAssociationService(context);
            var handler = new AssignTagsToNoteCommandHandler(service);

            var command = new AssignTagsToNoteCommand
            {
                NoteId = noteId,
                TagNames = new List<string> { "tagA", "tagB" }
            };

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            var note = await context.Notes.Include(n => n.Tags).FirstAsync(n => n.Id == noteId);
            Assert.Equal(2, note.Tags.Count);
            Assert.Contains(note.Tags, t => t.Name == "tagA");
            Assert.Contains(note.Tags, t => t.Name == "tagB");
        }

        [Fact]
        public async Task Handle_ThrowsException_WhenNoteNotFound()
        {
            // Arrange
            using var context = GetInMemoryDbContext();
            var service = new TagAssociationService(context);
            var handler = new AssignTagsToNoteCommandHandler(service);

            var command = new AssignTagsToNoteCommand
            {
                NoteId = Guid.NewGuid(),
                TagNames = new List<string> { "tagA" }
            };

            // Act & Assert
            await Assert.ThrowsAsync<Exception>(() => handler.Handle(command, CancellationToken.None));
        }
    }
}
