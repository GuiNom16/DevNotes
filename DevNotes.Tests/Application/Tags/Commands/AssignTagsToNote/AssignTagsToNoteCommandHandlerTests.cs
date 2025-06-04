using DevNotes.Application.Common.Exceptions;
using DevNotes.Application.Features.Tags.Commands.AssignTagsToNote;
using DevNotes.Application.Interfaces;
using DevNotes.Application.Services;
using DevNotes.Domain.Entities;
using Moq;

namespace DevNotes.Tests.Application.Tags.Commands.AssignTagsToNote
{
    public class AssignTagsToNoteCommandHandlerTests
    {
        [Fact]
        public async Task Handle_AssignsTagsToNote_Successfully()
        {
            // Arrange
            var noteId = Guid.NewGuid();

            var existingNote = new Note
            {
                Id = noteId,
                Tags = new List<Tag>()
            };

            var mockNoteRepository = new Mock<INoteRepository>();
            mockNoteRepository
                .Setup(r => r.GetByIdAsync(noteId))
                .ReturnsAsync(existingNote);
            mockNoteRepository
                .Setup(r => r.UpdateAsync(It.IsAny<Note>()))
                .Returns(Task.CompletedTask);

            var mockTagRepository = new Mock<ITagRepository>();
            // Let's assume no existing tags, so return empty list when asked for tags by name
            mockTagRepository
                .Setup(r => r.GetTagsByNamesAsync(It.IsAny<List<string>>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(new List<Tag>());
            mockTagRepository
                .Setup(r => r.AddTagsAsync(It.IsAny<List<Tag>>(), It.IsAny<CancellationToken>()))
                .Returns(Task.CompletedTask);

            var service = new TagAssociationService(mockNoteRepository.Object, mockTagRepository.Object);
            var handler = new AssignTagsToNoteCommandHandler(service);

            var command = new AssignTagsToNoteCommand
            {
                NoteId = noteId,
                TagNames = new List<string> { "tagA", "tagB" }
            };

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            // The note's Tags property should contain the two new tags
            Assert.Equal(2, existingNote.Tags.Count);
            Assert.Contains(existingNote.Tags, t => t.Name == "tagA");
            Assert.Contains(existingNote.Tags, t => t.Name == "tagB");

            // Verify UpdateAsync was called once
            mockNoteRepository.Verify(r => r.UpdateAsync(existingNote), Times.Once);
            // Verify AddTagsAsync was called once with the new tags
            mockTagRepository.Verify(r => r.AddTagsAsync(It.Is<List<Tag>>(tags => tags.Count == 2), It.IsAny<CancellationToken>()), Times.Once);
        }

        [Fact]
        public async Task Handle_ThrowsException_WhenNoteNotFound()
        {
            // Arrange
            var mockNoteRepository = new Mock<INoteRepository>();
            mockNoteRepository
                .Setup(r => r.GetByIdAsync(It.IsAny<Guid>()))
                .ReturnsAsync((Note?)null); // Simulate note not found

            var mockTagRepository = new Mock<ITagRepository>();

            var service = new TagAssociationService(mockNoteRepository.Object, mockTagRepository.Object);
            var handler = new AssignTagsToNoteCommandHandler(service);

            var command = new AssignTagsToNoteCommand
            {
                NoteId = Guid.NewGuid(),
                TagNames = new List<string> { "tagA" }
            };

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));
        }
    }
}
