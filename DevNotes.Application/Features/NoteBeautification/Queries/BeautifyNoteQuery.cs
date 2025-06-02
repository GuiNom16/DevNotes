using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
