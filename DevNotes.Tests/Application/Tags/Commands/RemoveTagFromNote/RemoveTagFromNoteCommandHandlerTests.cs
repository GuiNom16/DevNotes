using DevNotes.Application.Common.Exceptions;
using DevNotes.Application.Features.Tags.Commands.RemoveTagFromNote;
using DevNotes.Application.Interfaces;
using DevNotes.Application.Services;
using DevNotes.Domain.Entities;
using Moq;

namespace DevNotes.Tests.Application.Tags.Commands.RemoveTagFromNote
{
    public class RemoveTagFromNoteCommandHandlerTests
    {
        [Fact]
        public async Task Handle_RemovesTagFromNote_Successfully()
        {
            // Arrange
            var tagToRemove = new Tag { Name = "tagToRemove" };
            var noteId = Guid.NewGuid();
            var existingNote = new Note
            {
                Id = noteId,
                Tags = new List<Tag> { tagToRemove }
            };

            var mockNoteRepository = new Mock<INoteRepository>();
            mockNoteRepository
                .Setup(r => r.GetByIdAsync(noteId))
                .ReturnsAsync(existingNote);
            mockNoteRepository
                .Setup(r => r.UpdateAsync(It.IsAny<Note>()))
                .Returns(Task.CompletedTask);

            var mockTagRepository = new Mock<ITagRepository>();
            // We might not need any special setup for tag repo here if service only uses note repo for removal

            var service = new TagAssociationService(mockNoteRepository.Object, mockTagRepository.Object);
            var handler = new RemoveTagFromNoteCommandHandler(service);

            var command = new RemoveTagFromNoteCommand
            {
                NoteId = noteId,
                TagName = "tagToRemove"
            };

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.DoesNotContain(existingNote.Tags, t => t.Name == "tagToRemove");

            mockNoteRepository.Verify(r => r.UpdateAsync(existingNote), Times.Once);
        }

        [Fact]
        public async Task Handle_ThrowsNotFoundException_WhenNoteDoesNotExist()
        {
            // Arrange
            var mockNoteRepository = new Mock<INoteRepository>();
            mockNoteRepository
                .Setup(r => r.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync((Note?)null); // Note not found

            var mockTagRepository = new Mock<ITagRepository>();

            var service = new TagAssociationService(mockNoteRepository.Object, mockTagRepository.Object);
            var handler = new RemoveTagFromNoteCommandHandler(service);

            var command = new RemoveTagFromNoteCommand
            {
                NoteId = Guid.NewGuid(),
                TagName = "nonexistentTag"
            };

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));
        }
    }
}
