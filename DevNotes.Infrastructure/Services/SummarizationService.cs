using DevNotes.Application.Interfaces;
using System.Net.Http.Json;

public class SummarizationService : ISummarizationService
{
    private readonly HttpClient _httpClient;
    private readonly string _summaryApiUrl = "http://127.0.0.1:5000/summary";

    public SummarizationService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> SummarizeAsync(string text, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync(_summaryApiUrl, new { text = text }, cancellationToken);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<SummaryResponse>(cancellationToken: cancellationToken);
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
