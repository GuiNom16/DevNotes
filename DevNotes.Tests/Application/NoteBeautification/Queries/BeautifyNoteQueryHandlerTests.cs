using DevNotes.Application.Features.NoteBeautification.Queries;
using DevNotes.Application.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Tests.Application.NoteBeautification.Queries
{
    public class BeautifyNoteQueryHandlerTests
    {
        [Fact]
        public async Task Handle_ReturnsBeautifiedText_FromService()
        {
            // Arrange
            var inputText = "some note text";
            var beautifiedText = "BEAUTIFIED NOTE";

            var mockService = new Mock<INoteBeautificationService>();
            mockService
                .Setup(s => s.BeautifyAsync(inputText, It.IsAny<CancellationToken>()))
                .ReturnsAsync(beautifiedText);

            var handler = new BeautifyNoteQueryHandler(mockService.Object);

            var query = new BeautifyNoteQuery(inputText);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.Equal(beautifiedText, result);
            mockService.Verify(s => s.BeautifyAsync(inputText, It.IsAny<CancellationToken>()), Times.Once);
        }
    }
}
