using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using Tagit.Core.Models;
using File = Tagit.Core.Entities.File;

namespace Tagit.Core.Repositories
{
    public interface ISearchRepository
    {
        Task<List<File>> SearchFilesAsync(FileSearchModel model);
    }
}
