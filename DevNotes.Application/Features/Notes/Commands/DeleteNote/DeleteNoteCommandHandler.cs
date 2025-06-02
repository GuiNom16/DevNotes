using DevNotes.Application.Interfaces;
using DevNotes.Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Notes.Commands.DeleteNote
{
    public class DeleteNoteCommandHandler : IRequestHandler<DeleteNoteCommand, bool>
    {
        private readonly INoteRepository _noteRepository;

        public DeleteNoteCommandHandler(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<bool> Handle(DeleteNoteCommand request, CancellationToken cancellationToken)
        {
            var note = await _noteRepository.GetByIdAsync(request.Id);
            if (note == null) return false;

            await _noteRepository.DeleteAsync(request.Id);

            return true;
        }
    }
}
