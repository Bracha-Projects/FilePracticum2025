using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.Repositories;
using Tagit.Core.Services;
using File = Tagit.Core.Entities.File;

namespace Tagit.Service.Services
{
    public class FolderService : IFolderService
    {
        private readonly IFolderRepository _folderRepository;
        private readonly IFileRepository _fileRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public FolderService(IFolderRepository folderRepository, IFileRepository fileRepository, IMapper mapper, IUserService userService)
        {
            _folderRepository = folderRepository;
            _fileRepository = fileRepository;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<FolderDTO> AddFolderAsync(FolderDTO folder)
        {
            var folderToAdd = _mapper.Map<Folder>(folder);
            folder.CreatedAt = DateTime.UtcNow; 
            return _mapper.Map<FolderDTO>(await _folderRepository.AddFolderAsync(folderToAdd));
        }

        public async Task<FolderDTO> GetFolderByIdAsync(int folderId)
        {
            return _mapper.Map<FolderDTO>(await _folderRepository.GetFolderByIdAsync(folderId));
        }

        public async Task<List<FolderDTO>> GetFoldersInParentAsync(int userId, int parentFolderId)
        {
            var folders = await _folderRepository.GetFoldersByParentAsync(userId, parentFolderId);
            return _mapper.Map<List<FolderDTO>>(folders);
        }

        public async Task<FolderDTO> UpdateFolderAsync(int folderId, FolderDTO updatedData)
        {
            var existingFolder = await _folderRepository.GetFolderByIdAsync(folderId);
            if (existingFolder == null)
                throw new Exception("Folder not found");

            if(existingFolder.IsDeleted)
                throw new Exception("Cannot update a deleted folder");

            if(existingFolder.OwnerId != updatedData.OwnerId)
                throw new UnauthorizedAccessException("You do not have permission to update this folder");

            _mapper.Map(updatedData, existingFolder);

            await _folderRepository.UpdateFolderAsync(existingFolder);

            return _mapper.Map<FolderDTO>(existingFolder);
        }


        public async Task SoftDeleteFolderAsync(int folderId)
        {
            List<FileDTO> files = await GetFilesInFolderAsync(folderId);
            foreach (var file in files)
            {
                file.IsDeleted = true;
                await _fileRepository.UpdateFileAsync(_mapper.Map<File>(file));
            }
            await _folderRepository.SoftDeleteFolderAsync(folderId);
        }

        public async Task<string> GetFolderPathByIdAsync(int folderId)
        {
            var folder = await _folderRepository.GetFolderByIdAsync(folderId);
            if (folder == null)
            {
                throw new InvalidOperationException("Folder not found");
            }

            var folderPath = new StringBuilder();
            while (folder != null)
            {
                folderPath.Insert(0, folder.Name + "/");
                folder = await _folderRepository.GetFolderByIdAsync(folder.ParentFolderId ?? 0); // Get parent folder
            }

            return folderPath.ToString().TrimEnd('/');
        }

        public async Task<List<FolderDTO>> GetUserFoldersAsync(int userId)
        {
            return _mapper.Map<List<FolderDTO>>(await _folderRepository.GetUserFoldersAsync(userId));
        }

        public async Task<List<FileDTO>> GetFilesInFolderAsync(int folderId)
        {
            return _mapper.Map<List<FileDTO>>(await _fileRepository.GetFilesByFolderAsync(folderId));
        }

        public async Task<bool> UserHasAccessToFolder(int userId, int folderId)
        {
            var folder = await _folderRepository.GetFolderByIdAsync(folderId);
            if (folder == null)
                return false;

            return folder.OwnerId == userId; 
        }
    }
}
