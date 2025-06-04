using DevNotes.Application.Common.Exceptions;
using DevNotes.Application.Interfaces;
using DevNotes.Domain.Entities;

namespace DevNotes.Application.Services
{
    public class TagAssociationService : ITagAssociationService
    {
        private readonly INoteRepository _noteRepository;
        private readonly ITagRepository _tagRepository;

        public TagAssociationService(INoteRepository noteRepository, ITagRepository tagRepository)
        {
            _noteRepository = noteRepository;
            _tagRepository = tagRepository;
        }

        public async Task AssociateTagsToNoteAsync(Guid noteId, List<string> tagNames, CancellationToken cancellationToken)
        {
            var note = await _noteRepository.GetByIdAsync(noteId);
            if (note == null)
                throw new NotFoundException(nameof(Note), noteId);

            var currentTags = note.Tags ?? new List<Tag>();

            var existingTags = await _tagRepository.GetTagsByNamesAsync(tagNames, cancellationToken);
            var existingTagNames = existingTags.Select(t => t.Name).ToList();

            var newTagNames = tagNames.Except(existingTagNames).ToList();
            var newTags = newTagNames.Select(name => new Tag { Name = name }).ToList();

            if (newTags.Any())
            {
                await _tagRepository.AddTagsAsync(newTags, cancellationToken);
                existingTags.AddRange(newTags);
            }

            foreach (var tag in existingTags)
            {
                if (!currentTags.Any(t => t.Name == tag.Name))
                    currentTags.Add(tag);
            }


            note.Tags = currentTags;

            await _noteRepository.UpdateAsync(note);
        }


        public async Task RemoveTagFromNoteAsync(Guid noteId, string tagName, CancellationToken cancellationToken)
        {
            var note = await _noteRepository.GetByIdAsync(noteId);
            if (note == null)
                throw new NotFoundException(nameof(Note), noteId);

            var tagToRemove = note.Tags.FirstOrDefault(t => t.Name == tagName);
            if (tagToRemove != null)
            {
                note.Tags.Remove(tagToRemove);
                await _noteRepository.UpdateAsync(note);
            }
        }
    }
}
