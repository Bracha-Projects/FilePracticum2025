using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = Tagit.Core.Entities.File;


namespace Tagit.Core.Repositories
{
    public interface IFileRepository
    {
        Task<File> GetByIdAsync(int id);
        Task<File> AddFileAsync(File file);
        Task<File> UpdateFileAsync(File file);
        Task DeleteFileAsync(File file);
        Task<List<File>> GetUserFilesAsync(int userId);
    }
}
