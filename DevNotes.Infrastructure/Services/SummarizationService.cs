using DevNotes.Application.Interfaces;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Infrastructure.Services
{
    public class SummarizationService : ISummarizationService
    {
        private readonly HttpClient _httpClient;
        private string _summaryApiUrl = "http://127.0.0.1:5000/summarize";

        public SummarizationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> SummarizeAsync(string content, CancellationToken cancellationToken = default)
        {
            var payload = new { content = content };
            var contentJson = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync(_summaryApiUrl, contentJson, cancellationToken);
                response.EnsureSuccessStatusCode();

                var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
                var result = JsonSerializer.Deserialize<SummaryResponse>(responseJson, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return result?.Summary ?? string.Empty;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

        private class SummaryResponse
        {
            public string Summary { get; set; } = string.Empty;
        }
    }
}
