using DevNotes.Application.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Features.Tags.Queries.GetAllTags
{
    public class GetAllTagsQueryHandler : IRequestHandler<GetAllTagsQuery, List<string>>
    {
        private readonly ITagRepository _tagRepository;

        public GetAllTagsQueryHandler(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<List<string>> Handle(GetAllTagsQuery request, CancellationToken cancellationToken)
        {
            return await _tagRepository.GetAllDistinctTagNamesAsync();
        }
    }
}
