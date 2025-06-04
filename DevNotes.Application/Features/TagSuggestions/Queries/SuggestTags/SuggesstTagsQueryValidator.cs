using FluentValidation;

namespace DevNotes.Application.Features.TagSuggestions.Queries.SuggestTags
{
    public class SuggestTagsQueryValidator : AbstractValidator<SuggestTagsQuery>
    {
        public SuggestTagsQueryValidator()
        {
            RuleFor(x => x.Text)
                .NotEmpty().WithMessage("Text must not be empty.")
                .MaximumLength(5000).WithMessage("Text must not exceed 5000 characters.");
        }
    }
}
