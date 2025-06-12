using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using File = Tagit.Core.Entities.File;


namespace Tagit.Core.Repositories
{
    public interface IFileRepository
    {
        Task<File> AddFileAsync(File file);
        Task<File> GetFileByIdAsync(int fileId);
        Task<File> UpdateFileAsync(File file);
        Task<List<File>> GetFilesByFolderAsync(int folderId);
        Task<List<File>> GetAllFilesAsync();
        Task<List<File>> GetAllFilesByUserIdAsync(int userId);
        Task<List<File>> RecentFiles(int userId, int limit);
    }
}
