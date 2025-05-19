using DevNotes.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Notes.Queries
{
    public record GetNoteByIdQuery(Guid Id) : IRequest<Note>;

}
