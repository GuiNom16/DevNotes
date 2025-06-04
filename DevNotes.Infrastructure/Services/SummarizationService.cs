using DevNotes.Application.Interfaces;
using System.Text;
using System.Text.Json;

namespace DevNotes.Infrastructure.Services
{
    public class SummarizationService : ISummarizationService
    {
        private readonly HttpClient _httpClient;
        private string _summaryApiUrl = "http://localhost:5000/summarize";

        public SummarizationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> SummarizeAsync(string content, CancellationToken cancellationToken = default)
        {
            var payload = new { content = content };
            var contentJson = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(_summaryApiUrl, contentJson, cancellationToken);

            // If the backend returns an error, bubble it up properly
            if (!response.IsSuccessStatusCode)
            {
                var errorMessage = await response.Content.ReadAsStringAsync(cancellationToken);
                throw new ApplicationException(
                    $"Summarization API failed with status {response.StatusCode}: {errorMessage}"
                );
            }

            var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
            var result = JsonSerializer.Deserialize<SummaryResponse>(responseJson, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return result?.Summary ?? throw new ApplicationException("Summarization API returned no summary");
        }


        private class SummaryResponse
        {
            public string Summary { get; set; } = string.Empty;
        }
    }
}
