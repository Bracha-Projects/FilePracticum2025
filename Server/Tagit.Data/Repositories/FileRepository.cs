using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Repositories;
using File = Tagit.Core.Entities.File;

namespace Tagit.Data.Repositories
{
    public class FileRepository : IFileRepository
    {
        private readonly TagitDBContext _context;

        public FileRepository(TagitDBContext context)
        {
            _context = context;
        }
        // Add a new file record to the database
        public async Task<File> AddFileAsync(File file)
        {
            await _context.Files.AddAsync(file);
            await _context.SaveChangesAsync();
            return file;
        }

        // Get a file by its ID
        public async Task<File> GetFileByIdAsync(int fileId)
        {
            return await _context.Files.Include(f => f.FileTags) 
                .FirstOrDefaultAsync(f => f.Id == fileId && !f.IsDeleted); // Soft delete consideration
        }

        // Update the file record in the database
        public async Task<File> UpdateFileAsync(File file)
        {
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return file;
        }

        // Get files by folder (if folderId is provided)
        public async Task<List<File>> GetFilesByFolderAsync(int folderId)
        {
            return await _context.Files
                .Include(f => f.FileTags) // אין FileTags – הולך ישר ל-Tags
                 .Where(f => f.FolderId == folderId && !f.IsDeleted)
                .ToListAsync();
        }

        // Get all files, including deleted ones if needed
        public async Task<List<File>> GetAllFilesAsync()
        {
            return await _context.Files.ToListAsync();
        }

        public async Task<List<File>> GetAllFilesByUserIdAsync(int userId)
        {
            return await _context.Files
                .Include(f => f.FileTags) // אם יש תגיות ורוצים לכלול אותן
                .Where(f => f.OwnerId == userId)
                .ToListAsync();
        }
    }
}
