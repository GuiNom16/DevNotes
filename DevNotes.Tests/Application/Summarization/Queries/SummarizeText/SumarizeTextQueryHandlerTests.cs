using DevNotes.Application.Features.Summarization.Queries.SummarizeText;
using DevNotes.Application.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Tests.Application.Summarization.Queries.SummarizeText
{
    public class SummarizeTextQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ReturnsSummaryFromService()
        {
            // Arrange
            var mockSummarizationService = new Mock<ISummarizationService>();
            var sampleText = "This is a long text that needs summarization.";
            var expectedSummary = "This is a summary.";

            mockSummarizationService
                .Setup(s => s.SummarizeAsync(sampleText, It.IsAny<CancellationToken>()))
                .ReturnsAsync(expectedSummary);

            var handler = new SummarizeTextQueryHandler(mockSummarizationService.Object);
            var query = new SummarizeTextQuery(sampleText);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.Equal(expectedSummary, result);
            mockSummarizationService.Verify(s => s.SummarizeAsync(sampleText, It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
