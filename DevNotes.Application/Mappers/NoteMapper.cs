using DevNotes.Application.DTOs;
using DevNotes.Domain.Entities;
using System;

namespace DevNotes.Application.Mappers
{
    public static class NoteMapper
    {
        public static NoteDto ToDto(Note note)
        {
            if (note == null) return null;

                return new NoteDto
        {
            Id = note.Id,
            Title = note.Title,
            Content = note.Content,
            CreatedAt = note.CreatedAt,
            UpdatedAt = note.UpdatedAt
        };
        }

        public static Note ToEntity(NoteDto dto)
        {
            if (dto == null) return null;

            return new Note
            {
                Id = dto.Id,
                Title = dto.Title,
                Content = dto.Content,
                CreatedAt = dto.CreatedAt,
                UpdatedAt = dto.UpdatedAt
            };
        }
    }
}