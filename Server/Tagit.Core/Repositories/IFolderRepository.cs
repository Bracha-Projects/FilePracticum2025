using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using File = Tagit.Core.Entities.File;

namespace Tagit.Core.Repositories
{
    public interface IFolderRepository
    {
        Task<Folder> AddFolderAsync(Folder folder);
        Task<Folder> GetFolderByIdAsync(int folderId);
        Task<List<Folder>> GetFoldersByParentIdAsync(int parentFolderId);
        Task<List<Folder>> GetAllFoldersAsync();
        Task<Folder> UpdateFolderAsync(Folder folder);
        Task SoftDeleteFolderAsync(int folderId);
        Task<List<Folder>> GetUserFoldersAsync(int userId);
        Task<List<File>> GetFilesInFolderAsync(int folderId);
    }
}
