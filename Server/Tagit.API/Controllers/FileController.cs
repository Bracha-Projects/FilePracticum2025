using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Tagit.Core.Entities;
using Tagit.Core.Services;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using File = Tagit.Core.Entities.File;
using System.Security.Claims;
using Tagit.API.PostModels;
using AutoMapper;
using Tagit.Core.DTOs;
using Amazon.Runtime;
using Microsoft.Extensions.Configuration;
using Tagit.Core.PostModels;
using Microsoft.EntityFrameworkCore;

namespace Tagit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IFolderService _folderService;
        private readonly ILogger<FileController> _logger;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public FileController(IConfiguration configuration, IFileService fileService, IFolderService folderService, ILogger<FileController> logger, IMapper mapper)
        {
            _configuration = configuration;
            _fileService = fileService;
            _folderService = folderService;
            _logger = logger;
            _mapper = mapper;
        }

        private int? GetUserId()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(userIdStr, out int userId) ? userId : (int?)null;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> UploadFile([FromQuery] string fileName, [FromQuery] int? folderId)
        {
            try
            {
                string folderPath = "";
                if (folderId != null)
                    folderPath = await _folderService.GetFolderPathByIdAsync(folderId.Value);

                var presignedUrl = await _fileService.GetPresignedUrlAsync(fileName, folderPath);
                return Ok(new { Url = presignedUrl });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating presigned URL");
                return StatusCode(500, "Error generating presigned URL");
            }
        }

        [HttpGet("{id}/download-url")]
        public async Task<IActionResult> GetDownloadUrl(int id)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            var file = await _fileService.GetFileByIdAsync(id);
            if (file == null || file.OwnerId != userId)
                return Forbid();

            var url = _fileService.GeneratePresignedDownloadUrl(file.S3Key);
            return Ok(new { url });
        }

        [HttpGet("{id}/viewing-url")]
        public async Task<IActionResult> GetViewUrl(int id)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            var file = await _fileService.GetFileByIdAsync(id);
            if (file == null || file.OwnerId != userId)
                return Forbid();

            var url = _fileService.GetPresignedUrlForView(file.S3Key);
            return Ok(new { url });
        }

        [HttpDelete("delete-file/{fileId}")]
        public async Task<IActionResult> DeleteFile(int fileId)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            var file = await _fileService.GetFileByIdAsync(fileId);
            if (file == null || file.OwnerId != userId)
                return Forbid();

            var success = await _fileService.MarkFileAsDeletedAsync(fileId);
            if (!success)
                return NotFound(new { message = "File not found or already deleted." });

            return Ok(new { message = "File marked as deleted" });
        }

        [HttpPost("add-file")]
        public async Task<IActionResult> AddFile([FromBody] FilePostModel file)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            if (file == null || string.IsNullOrEmpty(file.S3Key))
                return BadRequest("Invalid file metadata.");

            var fileDto = _mapper.Map<FileDTO>(file);
            fileDto.OwnerId = userId.Value;

            var result = await _fileService.AddFileAsync(fileDto);
            return Ok(result);
        }

        [HttpGet("user-files")]
        public async Task<IActionResult> GetUserFiles()
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized("User ID is not valid");

            var files = await _fileService.GetAllFilesByUserIdAsync(userId.Value);
            return Ok(files);
        }
    }
}
