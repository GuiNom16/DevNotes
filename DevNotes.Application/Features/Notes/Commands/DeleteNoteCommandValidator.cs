using DevNotes.Application.Features.Notes.Commands;
using FluentValidation;

namespace DevNotes.Application.Features.Notes.Commands;

public class DeleteNoteCommandValidator : AbstractValidator<DeleteNoteCommand>
{
    public DeleteNoteCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Note ID is required.");
    }
}
