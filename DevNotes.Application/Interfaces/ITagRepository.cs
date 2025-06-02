using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DevNotes.Application.Interfaces
{
    public interface ITagRepository
    {
        Task<List<string>> GetAllDistinctTagNamesAsync();
    }
}
