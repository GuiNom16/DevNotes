using System;
using System.Collections.Generic;

namespace DevNotes.Domain.Entities
{
    public class Tag
    {
        public Guid Id { get; set; } // Primary key

        public string Name { get; set; } = string.Empty;

        // Navigation property for notes that have this tag
        public ICollection<Note> Notes { get; set; } = [];
    }
}
