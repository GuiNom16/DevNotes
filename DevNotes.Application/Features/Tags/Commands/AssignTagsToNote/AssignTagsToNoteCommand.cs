using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Tags.Commands.AssignTagsToNote
{
    public class AssignTagsToNoteCommand : IRequest
    {
        public Guid NoteId { get; set; }
        public List<string> TagNames { get; set; } = new();
    }

}
