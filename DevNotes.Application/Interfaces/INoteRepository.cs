using DevNotes.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Interfaces
{
    public interface INoteRepository
    {
        Task AddAsync(Note note, CancellationToken cancellationToken);
        Task<Note> GetByIdAsync(Guid id);
        Task UpdateAsync(Note note);
        Task DeleteAsync(Guid id);
        Task<List<Note>> GetAllAsync(CancellationToken cancellationToken);

    }
}
