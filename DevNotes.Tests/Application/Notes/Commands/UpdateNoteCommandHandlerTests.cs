using DevNotes.Application.Features.Notes.Commands;
using DevNotes.Application.Features.Notes.Commands.UpdateNote;
using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using DevNotes.Domain.Interfaces;
using FluentAssertions;
using Moq;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace DevNotes.Tests.Application.Notes.Commands
{
    public class UpdateNoteCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldUpdateNote_WhenNoteExists()
        {
            // Arrange
            var mockRepo = new Mock<INoteRepository>();
            var handler = new UpdateNoteCommandHandler(mockRepo.Object);
            var command = new UpdateNoteCommand(
                Id: Guid.NewGuid(),
                Title: "Updated Title",
                Content: "Updated Content"
            );

            mockRepo.Setup(r => r.GetByIdAsync(command.Id)).ReturnsAsync(new Note
            {
                Id = command.Id,
                Title = "Old Title",
                Content = "Old Content"
            });

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().BeTrue();
            mockRepo.Verify(r => r.GetByIdAsync(command.Id), Times.Once);
            mockRepo.Verify(r => r.UpdateAsync(It.Is<Note>(n =>
                n.Title == "Updated Title" && n.Content == "Updated Content")), Times.Once);
        }
    }
}
