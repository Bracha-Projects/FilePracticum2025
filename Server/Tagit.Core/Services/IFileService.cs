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
        Task<FileDTO> UploadFileAsync(FileDTO file);
        Task<List<FileDTO>> GetUserFilesAsync(int userId);
    }
}
