using DevNotes.Domain.Entities;
using DevNotes.Application.Interfaces;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Notes.Commands.CreateNote
{
    public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommand, Guid>
    {
        private readonly INoteRepository _noteRepository;

        public CreateNoteCommandHandler(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<Guid> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
        {
            var note = new Note
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Content = request.Content,
                CreatedAt = DateTime.UtcNow
            };

            await _noteRepository.AddAsync(note, cancellationToken);

            return note.Id;
        }
    }
}
