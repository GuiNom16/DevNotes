namespace DevNotes.Application.Interfaces
{
    public interface INoteBeautificationService
    {
        Task<string> BeautifyAsync(string content, CancellationToken cancellationToken);
    }
}
