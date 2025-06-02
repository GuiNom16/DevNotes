using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Tags.Queries.GetAllTags
{
    public class GetAllTagsQuery : IRequest<List<string>>;
}
