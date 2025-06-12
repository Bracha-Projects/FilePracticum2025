using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Tagit.API.Extensions;
using Tagit.API.PostModels;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.PostModels;
using Tagit.Core.Services;
using Tagit.Service.Services;
using File = Tagit.Core.Entities.File;


namespace Tagit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IFolderService _folderService;
        private readonly ILogger<FileController> _logger;
        private readonly IMapper _mapper;
        private readonly IActivityService _activityService;

        public FileController(IFileService fileService, IFolderService folderService, ILogger<FileController> logger, IMapper mapper, IActivityService activityService)
        {
            _fileService = fileService;
            _folderService = folderService;
            _logger = logger;
            _mapper = mapper;
            _activityService = activityService;
        }

        [Authorize]

        [Authorize]
        [HttpGet("presigned-url")]
        public async Task<IActionResult> UploadFile([FromQuery] string fileName, [FromQuery] int? folderId)
        {
            try
            {
                var userId = User.GetUserId();
                if (userId == null) return Unauthorized();

                string folderPath = "";
                if (folderId != null)
                    folderPath = await _folderService.GetFolderPathByIdAsync(folderId.Value);

                var presignedUrl = await _fileService.GetPresignedUrlAsync(fileName, folderPath);
                await _activityService.LogActivityAsync(userId.Value, "Requested Upload URL", fileName);
                return Ok(new { Url = presignedUrl });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating presigned URL");
                return StatusCode(500, "Error generating presigned URL");
            }
        }

        [Authorize]
        [HttpGet("{id}/download-url")]
        public async Task<IActionResult> GetDownloadUrl(int id)
        {
            var userId = User.GetUserId();
            if (userId == null)
                return Unauthorized();

            var file = await _fileService.GetFileByIdAsync(id);
            if (file == null || file.OwnerId != userId)
                return Forbid();

            var url = _fileService.GeneratePresignedDownloadUrl(file.S3Key);
            await _activityService.LogActivityAsync(userId.Value, "Requested Download URL", file.FileName);
            return Ok(new { url });
        }

        [Authorize]
        [HttpGet("{id}/viewing-url")]
        public async Task<IActionResult> GetViewUrl(int id)
        {
            var userId = User.GetUserId();
            if (userId == null)
                return Unauthorized();

            var file = await _fileService.GetFileByIdAsync(id);
            if (file == null || file.OwnerId != userId)
                return Forbid();

            var url = _fileService.GetPresignedUrlForView(file.S3Key);
            await _activityService.LogActivityAsync(userId.Value, "Requested Viewing URL", file.FileName);

            return Ok(new { url });
        }

        [Authorize]
        [HttpDelete("delete-file/{fileId}")]
        public async Task<IActionResult> DeleteFile(int fileId)
        {
            var userId = User.GetUserId();
            if (userId == null) return Unauthorized();

            var success = await _fileService.MarkFileAsDeletedAsync(fileId);
            if (!success) return Forbid();

            await _activityService.LogActivityAsync(userId.Value, "Deleted File", fileId.ToString());
            return Ok();
        }

        [Authorize]
        [HttpPost("add-file")]
        public async Task<IActionResult> AddFile([FromBody] FilePostModel file)
        {
            var userId = User.GetUserId();
            if (userId == null)
                return Unauthorized();

            if (file == null || string.IsNullOrEmpty(file.S3Key))
                return BadRequest("Invalid file metadata.");

            var fileDto = _mapper.Map<FileDTO>(file);
            fileDto.OwnerId = userId.Value;

            var result = await _fileService.AddFileAsync(fileDto);
            await _activityService.LogActivityAsync(userId.Value, "Add File: ", file.FileName);
            return Ok(result);
        }

        [Authorize]
        [HttpGet("user-files")]
        public async Task<IActionResult> GetUserFiles()
        {
            var userId = User.GetUserId();
            if (userId == null)
                return Unauthorized("User ID is not valid");

            var files = await _fileService.GetAllFilesByUserIdAsync(userId.Value);
            return Ok(files);
        }


        [Authorize]
        [HttpGet("{userId}/recent-files")]
        public async Task<IActionResult> GetUserRecentFiles(int userId, int limit)
        {
            var recentFiles = await _fileService.GetUserRecentFiles(userId, limit);
            return Ok(recentFiles);
        }

    }
}
