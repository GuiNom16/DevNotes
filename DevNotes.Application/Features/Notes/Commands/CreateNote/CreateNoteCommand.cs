using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Notes.Commands.CreateNote
{
    public record CreateNoteCommand(string Title, string Content) : IRequest<Guid>;
}
