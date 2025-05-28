using DevNotes.Application.Interfaces;
using System.Net.Http.Json;

public class TagSuggestionService : ITagSuggestionService
{
    private readonly HttpClient _httpClient;
    private readonly string _tagApiUrl = "http://127.0.0.1:5000/generate-tags";

    public TagSuggestionService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<string>> SuggestTagsAsync(string noteContent, CancellationToken cancellationToken = default)
    {
        try
        {
            var response = await _httpClient.PostAsJsonAsync(_tagApiUrl, new { text = noteContent }, cancellationToken);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadFromJsonAsync<TagResponse>(cancellationToken: cancellationToken);
            return result?.Tags ?? new List<string>();
        }
        catch (Exception)
        {
            return new List<string>();
        }
    }

    private class TagResponse
    {
        public List<string> Tags { get; set; } = new();
    }
}
