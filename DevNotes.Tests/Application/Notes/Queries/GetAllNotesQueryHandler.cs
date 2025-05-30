using DevNotes.Application.Features.Notes.Queries;
using DevNotes.Application.Interfaces;
using DevNotes.Application.Notes.Queries;
using DevNotes.Domain.Entities;
using DevNotes.Domain.Interfaces;
using FluentAssertions;
using Moq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace DevNotes.Tests.Application.Notes.Queries
{
    public class GetAllNotesQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldReturnListOfNotes()
        {
            // Arrange
            var mockRepo = new Mock<INoteRepository>();
            var handler = new GetAllNotesQueryHandler(mockRepo.Object);

            var notes = new List<Note>
            {
                new Note { Id = System.Guid.NewGuid(), Title = "Note 1", Content = "Content 1" },
                new Note { Id = System.Guid.NewGuid(), Title = "Note 2", Content = "Content 2" },
            };

            mockRepo.Setup(r => r.GetAllAsync(It.IsAny<CancellationToken>()))
                    .ReturnsAsync(notes);

            var query = new GetAllNotesQuery();

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            result.Should().NotBeNull();
            result.Should().HaveCount(2);
            result.Should().BeEquivalentTo(notes);

            // Assert against DTOs
            result[0].Title.Should().Be("Note 1");
            result[0].Content.Should().Be("Content 1");
            result[1].Title.Should().Be("Note 2");
            result[1].Content.Should().Be("Content 2");


            mockRepo.Verify(r => r.GetAllAsync(It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
