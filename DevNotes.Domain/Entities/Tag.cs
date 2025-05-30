using System;
using System.Collections.Generic;

namespace DevNotes.Domain.Entities
{
    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Note> Notes { get; set; } = new List<Note>(); // Many-to-many
    }

}
