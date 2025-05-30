using DevNotes.Application.Features.Summurization.Queries.SummurizeText;
using DevNotes.Application.Interfaces;
using MediatR;

namespace DevNotes.Application.Features.Summarization.Handlers
{
    public class SummarizeTextQueryHandler : IRequestHandler<SummarizeTextQuery, string>
    {
        private readonly ISummarizationService _summarizationService;

        public SummarizeTextQueryHandler(ISummarizationService summarizationService)
        {
            _summarizationService = summarizationService;
        }

        public async Task<string> Handle(SummarizeTextQuery request, CancellationToken cancellationToken)
        {
            return await _summarizationService.SummarizeAsync(request.Text, cancellationToken);
        }
    }
}
