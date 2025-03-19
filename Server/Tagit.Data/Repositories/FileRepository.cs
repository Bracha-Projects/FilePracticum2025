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

        public async Task<File> GetByIdAsync(int id)
        {
            return await _context.Files.FindAsync(id);
        }

        public async Task<File> AddFileAsync(File file)
        {
            _context.Files.Add(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task<File> UpdateFileAsync(File file)
        {
            _context.Files.Update(file);
            await _context.SaveChangesAsync();
            return file;
        }

        public async Task DeleteFileAsync(File file)
        {
            _context.Files.Remove(file);
            await _context.SaveChangesAsync();
        }

        public async Task<List<File>> GetUserFilesAsync(int userId)
        {
            return await _context.Files.Where(f => f.UserId == userId).ToListAsync();
        }
    }
}
