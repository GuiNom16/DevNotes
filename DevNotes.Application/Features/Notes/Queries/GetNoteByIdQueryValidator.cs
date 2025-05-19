using DevNotes.Application.Features.Notes.Queries;
using FluentValidation;

namespace DevNotes.Application.Features.Notes.Queries;

public class GetNoteByIdQueryValidator : AbstractValidator<GetNoteByIdQuery>
{
    public GetNoteByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Note ID is required.");
    }
}
