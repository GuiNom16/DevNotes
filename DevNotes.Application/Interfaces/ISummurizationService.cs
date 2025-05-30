using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Interfaces
{
    public interface ISummarizationService
    {
        Task<string> SummarizeAsync(string text, CancellationToken cancellationToken = default);
    }
}
