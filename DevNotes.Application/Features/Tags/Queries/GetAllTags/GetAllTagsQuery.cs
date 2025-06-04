using MediatR;

namespace DevNotes.Application.Features.Tags.Queries.GetAllTags
{
    public class GetAllTagsQuery : IRequest<List<string>>;
}
