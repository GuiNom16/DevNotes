using MediatR;

namespace DevNotes.Application.Features.NoteBeautification.Queries
{
    public class BeautifyNoteQuery : IRequest<string>
    {
        public string Text { get; set; } = string.Empty;

        public BeautifyNoteQuery(string text)
        {
            Text = text;
        }
    }

}
