using DevNotes.Application.Features.TagSuggestions.Queries.SuggestTags;
using DevNotes.Application.Interfaces;
using Moq;

namespace DevNotes.Tests.Application.TagSuggestions.Queries.SuggestTags
{
    public class SuggestTagsQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ReturnsSuggestedTags()
        {
            // Arrange
            var mockService = new Mock<ITagSuggestionService>();
            var sampleText = "This is a note about C# and unit testing.";
            var expectedTags = new List<string> { "C#", "unit testing" };

            mockService
                .Setup(service => service.SuggestTagsAsync(sampleText, It.IsAny<CancellationToken>()))
                .ReturnsAsync(expectedTags);

            var handler = new SuggestTagsQueryHandler(mockService.Object);
            var query = new SuggestTagsQuery(sampleText);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedTags.Count, result.Count);
            Assert.Equal(expectedTags, result);
        }
    }
}
