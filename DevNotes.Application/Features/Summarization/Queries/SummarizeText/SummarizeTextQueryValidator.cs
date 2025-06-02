using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Summarization.Queries.SummarizeText
{
    public class SummarizeTextQueryValidator : AbstractValidator<SummarizeTextQuery>
    {
        public SummarizeTextQueryValidator()
        {
            RuleFor(x => x.Text)
                .NotEmpty().WithMessage("Text must not be empty.")
                .MaximumLength(5000).WithMessage("Text length must be less than or equal to 5000 characters.");
        }
    }
}
