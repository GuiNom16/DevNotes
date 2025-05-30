using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace DevNotes.Application.Features.Summurization.Queries.SummurizeText
{
    public class SummarizeTextQuery : IRequest<string>
    {
        public string Text { get; set; } = string.Empty;

        public SummarizeTextQuery(string text)
        {
            Text = text;
        }
    }
}

