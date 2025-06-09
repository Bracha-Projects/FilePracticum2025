using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using File = Tagit.Core.Entities.File;

namespace Tagit.Core.Services
{
    public interface IFolderService
    {
        Task<FolderDTO> AddFolderAsync(FolderDTO folder);
        Task<FolderDTO> GetFolderByIdAsync(int folderId);
        Task<List<FolderDTO>> GetFoldersInParentAsync(int userId, int parentFolderId);
        Task<FolderDTO> UpdateFolderAsync(int folderId, FolderDTO updatedData);
        Task SoftDeleteFolderAsync(int folderId);
        Task<string> GetFolderPathByIdAsync(int folderId);
        Task<List<FolderDTO>> GetUserFoldersAsync(int userId); 
        Task<List<FileDTO>> GetFilesInFolderAsync(int folderId);
        Task<bool> UserHasAccessToFolder(int userId, int folderId);

    }
}
