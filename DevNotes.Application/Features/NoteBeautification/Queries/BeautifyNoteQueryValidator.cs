using FluentValidation;

namespace DevNotes.Application.Features.NoteBeautification.Queries
{
    public class BeautifyNoteQueryValidator : AbstractValidator<BeautifyNoteQuery>
    {
        public BeautifyNoteQueryValidator()
        {
            RuleFor(x => x.Text)
                .NotEmpty().WithMessage("Text must not be empty")
                .MaximumLength(5000).WithMessage("Text is too long");
        }
    }
}
