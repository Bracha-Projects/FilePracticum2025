using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Entities;
using Tagit.Core.Repositories;
using File = Tagit.Core.Entities.File;

namespace Tagit.Data.Repositories
{
    public class FolderRepository : IFolderRepository
    {
        private readonly TagitDBContext _context;

        public FolderRepository(TagitDBContext context)
        {
            _context = context;
        }

        public async Task<Folder> AddFolderAsync(Folder folder)
        {
            await _context.Folders.AddAsync(folder);
            await _context.SaveChangesAsync();
            return folder;
        }

        public async Task<Folder> GetFolderByIdAsync(int folderId)
        {
            return await _context.Folders
                .FirstOrDefaultAsync(f => f.Id == folderId && !f.IsDeleted); 
        }

        public async Task<List<Folder>> GetFoldersByParentAsync(int userId, int parentFolderId)
        {
            return await _context.Folders
                .Where(f => f.OwnerId == userId && f.ParentFolderId == parentFolderId && !f.IsDeleted)
                .ToListAsync();
        }

        public async Task<List<Folder>> GetAllFoldersAsync()
        {
            return await _context.Folders.ToListAsync();
        }

        public async Task<Folder> UpdateFolderAsync(Folder folder)
        {
            await _context.SaveChangesAsync();
            return folder;
        }

        public async Task SoftDeleteFolderAsync(int folderId)
        {
            var folder = await GetFolderByIdAsync(folderId);
            if (folder != null)
            {
                folder.IsDeleted = true;
                await UpdateFolderAsync(folder);
            }
        }

        public async Task<List<Folder>> GetUserFoldersAsync(int userId)
        {
            return await _context.Folders
                .Where(f => f.OwnerId == userId && !f.IsDeleted)
                .ToListAsync();
        }

        public async Task<List<File>> GetFilesInFolderAsync(int folderId)
        {
            return await _context.Files
                       .Where(f => f.FolderId == folderId && !f.IsDeleted)
                       .ToListAsync();
        }
    }
}
