using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.DTOs;
using Tagit.Core.Repositories;
using Tagit.Core.Services;
using Tagit.Core.Entities;
using File = Tagit.Core.Entities.File;
using AutoMapper;

namespace Tagit.Service.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IMapper _mapper;
        public FileService(IFileRepository fileRepository, IMapper mapper)
        {
            _fileRepository = fileRepository;
            _mapper = mapper;
        }

        async Task<FileDTO> IFileService.UploadFileAsync(FileDTO file)
        {
            // הוספת הקובץ
            await _fileRepository.AddFileAsync(_mapper.Map<File>(file));
            return file;
        }

        public async Task<List<FileDTO>> GetUserFilesAsync(int userId)
        {
            return _mapper.Map<List<FileDTO>>(await _fileRepository.GetUserFilesAsync(userId));
        }
    }
}
