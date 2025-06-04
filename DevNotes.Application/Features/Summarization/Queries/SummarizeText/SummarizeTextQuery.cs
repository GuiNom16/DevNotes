using MediatR;

namespace DevNotes.Application.Features.Summarization.Queries.SummarizeText
{
    public class SummarizeTextQuery : IRequest<string>
    {
        public string Text { get; set; } = string.Empty;

        public SummarizeTextQuery(string text)
        {
            Text = text;
        }
    }
}

