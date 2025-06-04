using FluentValidation;

namespace DevNotes.Application.Features.Tags.Commands.AssignTagsToNote
{
    public class AssignTagsToNoteCommandValidator : AbstractValidator<AssignTagsToNoteCommand>
    {
        public AssignTagsToNoteCommandValidator()
        {
            RuleFor(x => x.NoteId)
                .NotEmpty().WithMessage("NoteId must be a valid GUID.");

            RuleFor(x => x.TagNames)
                .NotNull().WithMessage("TagNames cannot be null.")
                .Must(list => list.Count > 0).WithMessage("At least one tag must be provided.")
                .ForEach(tagRule => tagRule.NotEmpty().WithMessage("Tag names cannot be empty."));
        }
    }
}
