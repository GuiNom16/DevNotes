using DevNotes.Application.DTOs;
using DevNotes.Application.Features.Notes.Queries;
using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using FluentAssertions;
using Moq;

namespace DevNotes.Tests.Application.Notes.Queries
{
    public class GetNoteByIdQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldReturnNoteDto_WhenNoteExists()
        {
            // Arrange
            var mockRepo = new Mock<INoteRepository>();
            var handler = new GetNoteByIdQueryHandler(mockRepo.Object);
            var noteId = Guid.NewGuid();

            var note = new Note
            {
                Id = noteId,
                Title = "Test Note",
                Content = "Test Content"
            };

            mockRepo.Setup(r => r.GetByIdAsync(noteId))
                    .ReturnsAsync(note);

            var query = new GetNoteByIdQuery(noteId);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoteDto>();
            result.Id.Should().Be(note.Id);
            result.Title.Should().Be(note.Title);
            result.Content.Should().Be(note.Content);

            mockRepo.Verify(r => r.GetByIdAsync(noteId), Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldReturnNull_WhenNoteDoesNotExist()
        {
            // Arrange
            var mockRepo = new Mock<INoteRepository>();
            var handler = new GetNoteByIdQueryHandler(mockRepo.Object);
            var noteId = Guid.NewGuid();

            mockRepo.Setup(r => r.GetByIdAsync(noteId))
                    .ReturnsAsync((Note)null);

            var query = new GetNoteByIdQuery(noteId);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            result.Should().BeNull();

            mockRepo.Verify(r => r.GetByIdAsync(noteId), Times.Once);
        }
    }
}