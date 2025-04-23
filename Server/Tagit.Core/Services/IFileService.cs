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
    public interface IFileService
    {
        Task<string> GetPresignedUrlAsync(string fileName, string folderPath);
        Task<string> GeneratePresignedDownloadUrl(string key);
        Task<string> GetPresignedUrlForView(string key);
        Task<FileDTO> AddFileAsync(FileDTO file);
        Task<FileDTO> GetFileByIdAsync(int fileId);
        Task<FileDTO> UpdateFileAsync(FileDTO file);
        Task<bool> MarkFileAsDeletedAsync(int fileId);
        Task<List<FileDTO>> GetAllFilesByUserIdAsync(int userId);
    }
}
