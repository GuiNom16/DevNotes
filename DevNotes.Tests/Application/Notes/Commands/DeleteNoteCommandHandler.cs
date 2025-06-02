using DevNotes.Application.Features.Notes.Commands;
using DevNotes.Application.Features.Notes.Commands.DeleteNote;
using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;
using DevNotes.Application.Interfaces;
using FluentAssertions;
using Moq;
using System;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace DevNotes.Tests.Application.Notes.Commands
{
    public class DeleteNoteCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldReturnTrue_WhenNoteExists()
        {
            // Arrange
            var mockRepo = new Mock<INoteRepository>();
            var handler = new DeleteNoteCommandHandler(mockRepo.Object);
            var command = new DeleteNoteCommand(Guid.NewGuid());

            mockRepo.Setup(r => r.GetByIdAsync(command.Id))
                    .ReturnsAsync(new Note { Id = command.Id });

            mockRepo.Setup(r => r.DeleteAsync(command.Id))
                    .Returns(Task.CompletedTask);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().BeTrue();
            mockRepo.Verify(r => r.GetByIdAsync(command.Id), Times.Once);
            mockRepo.Verify(r => r.DeleteAsync(command.Id), Times.Once);
        }

        [Fact]
        public async Task Handle_ShouldReturnFalse_WhenNoteDoesNotExist()
        {
            // Arrange
            var mockRepo = new Mock<INoteRepository>();
            var handler = new DeleteNoteCommandHandler(mockRepo.Object);
            var command = new DeleteNoteCommand(Guid.NewGuid());

            mockRepo.Setup(r => r.GetByIdAsync(command.Id))
                    .ReturnsAsync((Note)null);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().BeFalse();
            mockRepo.Verify(r => r.GetByIdAsync(command.Id), Times.Once);
            mockRepo.Verify(r => r.DeleteAsync(It.IsAny<Guid>()), Times.Never);
        }
    }
}
