using DevNotes.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.NoteBeautification.Queries
{
    public class BeautifyNoteQueryHandler : IRequestHandler<BeautifyNoteQuery, string>
    {
        private readonly INoteBeautificationService _beautificationService;

        public BeautifyNoteQueryHandler(INoteBeautificationService beautificationService)
        {
            _beautificationService = beautificationService;
        }

        public async Task<string> Handle(BeautifyNoteQuery request, CancellationToken cancellationToken)
        {
            return await _beautificationService.BeautifyAsync(request.Text, cancellationToken);
        }
    }
}
