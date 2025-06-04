using DevNotes.Application.Interfaces;
using System.Text;
using System.Text.Json;

namespace DevNotes.Infrastructure.Services
{
    public class NoteBeautificationService : INoteBeautificationService
    {
        private readonly HttpClient _httpClient;
        private string _beautifyApiUrl = "http://localhost:5000/summarize";

        public NoteBeautificationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> BeautifyAsync(string content, CancellationToken cancellationToken)
        {
            var payload = new { content = content };
            var contentJson = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(_beautifyApiUrl, contentJson, cancellationToken);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
            var result = JsonSerializer.Deserialize<BeautifyResponse>(responseJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return result?.Beautified ?? string.Empty;
        }

        private class BeautifyResponse
        {
            public string Beautified { get; set; } = string.Empty;
        }
    }
}
