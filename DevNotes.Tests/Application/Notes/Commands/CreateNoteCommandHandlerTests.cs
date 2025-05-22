using DevNotes.Application.Features.Notes.Commands;
using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using FluentAssertions;
using Moq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace DevNotes.Tests.Application.Notes.Commands
{
    public class CreateNoteCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldAddNote()
        {
            // Arrange
            var mockRepo = new Mock<INoteRepository>();
            var handler = new CreateNoteCommandHandler(mockRepo.Object);
            var command = new CreateNoteCommand(
                Title: "New Note",
                Content: "Some content"
            );

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().NotBeEmpty(); // Assuming your handler returns the new note's Id as string or Guid
            mockRepo.Verify(r => r.AddAsync(It.Is<Note>(n =>
                n.Title == "New Note" && n.Content == "Some content"),
                It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
