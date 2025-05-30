using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Tags.Commands.RemoveTagFromNote
{
    public class RemoveTagFromNoteCommand : IRequest
    {
        public Guid NoteId { get; set; }
        public string TagName { get; set; } = string.Empty;
    }

}
