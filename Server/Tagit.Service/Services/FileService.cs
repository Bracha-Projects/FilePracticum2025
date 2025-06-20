using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
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
using Tag = Tagit.Core.Entities.Tag;

namespace Tagit.Service.Services
{
    public class FileService : IFileService
    {
        private readonly IFileRepository _fileRepository;
        private readonly IAmazonS3 _s3Client;
        private readonly IMapper _mapper;
        private readonly ILogger<FileService> _logger;
        public FileService(IFileRepository fileRepository, IAmazonS3 s3Client, IMapper mapper,ILogger<FileService> logger)
        {
            _fileRepository = fileRepository;
            _s3Client = s3Client;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<string> GetPresignedUrlAsync(string fileName, string folderPath)
        {
            try
            {
                var fileKey = $"{folderPath.TrimEnd('/')}/{fileName}".TrimStart('/');
                var request = new GetPreSignedUrlRequest
                {
                    BucketName = "tagitbucket", 
                    Key = fileKey,
                    Verb = HttpVerb.PUT,
                    Expires = DateTime.UtcNow.AddMinutes(15), 
                    ContentType = GetContentType(fileName) 
                };

                string presignedUrl = _s3Client.GetPreSignedURL(request);
                
                return await Task.FromResult(presignedUrl);
            }
            catch (AmazonS3Exception ex)
            {
                Console.WriteLine($"Amazon S3 error generating pre-signed URL: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating pre-signed URL: {ex.Message}");
                throw;
            }
        }

        public async Task<string> GeneratePresignedDownloadUrl(string key)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "tagitbucket",
                Key = key,
                Expires = DateTime.UtcNow.AddMinutes(15), 
                ResponseHeaderOverrides = new ResponseHeaderOverrides
                {
                    ContentDisposition = "attachment; filename=\"" + key + "\""
                }
            };

            var url = _s3Client.GetPreSignedURL(request);
            return await Task.FromResult(url);
        }

        public async Task<string> GetPresignedUrlForView(string key)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "tagitbucket",
                Key = key,
                Expires = DateTime.UtcNow.AddMinutes(15)
            };

            return await Task.FromResult(_s3Client.GetPreSignedURL(request));
        }
        public async Task<FileDTO> AddFileAsync(FileDTO file)
        {
            file.DateCreated = DateTime.UtcNow; 
            var uploadedFile = await _fileRepository.AddFileAsync(_mapper.Map<File>(file));
            return _mapper.Map<FileDTO>(uploadedFile);
        }

        public async Task<FileDTO> GetFileByIdAsync(int fileId)
        {
            return _mapper.Map<FileDTO>(await _fileRepository.GetFileByIdAsync(fileId));
        }

        public async Task<FileDTO> UpdateFileAsync(FileDTO file)
        {
            var updatedFile = await _fileRepository.UpdateFileAsync(_mapper.Map<File>(file));
            return _mapper.Map<FileDTO>(updatedFile);
        }

        public async Task<bool> MarkFileAsDeletedAsync(int fileId)
        {
            try
            {
                var file = await _fileRepository.GetFileByIdAsync(fileId);
                if (file == null)
                {
                    _logger.LogWarning($"File with ID {fileId} not found or already deleted.");
                    return false; 
                }

                file.IsDeleted = true;
                await _fileRepository.UpdateFileAsync(file);

                _logger.LogInformation($"File with ID {fileId} has// Successfully marked as deleted");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting file");
                return false; 
            }
        }

        public async Task<List<FileDTO>> GetAllFilesByUserIdAsync(int userId)
        {
            var files = await _fileRepository.GetAllFilesByUserIdAsync(userId);
            return _mapper.Map<List<FileDTO>>(files);
        }
        public async Task<List<FileDTO>> GetUserRecentFiles(int userId, int limit)
        {
            var files = await _fileRepository.RecentFiles(userId, limit);
            return _mapper.Map<List<FileDTO>>(files);
        }
        private string GetContentType(string fileName)
        {
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(fileName, out var contentType))
            {
                contentType = "application/pdf"; 
            }
            return contentType;
        }

    }
}
