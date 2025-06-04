using DevNotes.Application.Features.Tags.Queries.GetAllTags;
using DevNotes.Application.Interfaces;
using Moq;

namespace DevNotes.Tests.Application.Tags.Queries.GetAllTags
{
    public class GetAllTagsQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ReturnsAllTags()
        {
            // Arrange
            var mockTagRepository = new Mock<ITagRepository>();
            var expectedTags = new List<string> { "tag1", "tag2", "tag3" };

            mockTagRepository
                .Setup(repo => repo.GetAllDistinctTagNamesAsync())
                .ReturnsAsync(expectedTags);

            var handler = new GetAllTagsQueryHandler(mockTagRepository.Object);

            // Act
            var result = await handler.Handle(new GetAllTagsQuery(), CancellationToken.None);

            // Assert
            Assert.Equal(expectedTags.Count, result.Count);
            Assert.Equal(expectedTags, result);
        }
    }
}
