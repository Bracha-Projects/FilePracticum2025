using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tagit.API.Extensions;
using Tagit.API.PostModels;
using Tagit.Controllers;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.Services;

namespace Tagit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FolderController : ControllerBase
    {
        private readonly IFolderService _folderService;
        private readonly ILogger<FolderController> _logger;
        private readonly IMapper _mapper;
        private readonly IActivityService _activityService;

        public FolderController(IFolderService folderService, ILogger<FolderController> logger, IMapper mapper, IActivityService activityService)
        {
            _folderService = folderService;
            _logger = logger;
            _mapper = mapper;
            _activityService = activityService;
        }

        [Authorize]
        [HttpGet("{folderId}/items")]
        public async Task<IActionResult> GetFolderContents(int folderId)
        {
            try
            {
                var userId = User.GetUserId();
                if (!userId.HasValue)
                    return Unauthorized("User not authenticated");

                if (!await _folderService.UserHasAccessToFolder(userId.Value, folderId))
                    return Forbid();

                var subFolders = await _folderService.GetFoldersInParentAsync(userId.Value, folderId);
                var files = await _folderService.GetFilesInFolderAsync(folderId);

                return Ok(new { subFolders, files });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching folder contents");
                return StatusCode(500, "Error fetching folder contents");
            }
        }

        [Authorize]
        [HttpPost("create-folder")]
        public async Task<IActionResult> CreateFolder([FromBody] FolderPostModel folder)
        {
            try
            {
                var userId = User.GetUserId();
                if (!userId.HasValue)
                    return Unauthorized("User not authenticated");

                if (folder == null)
                    return BadRequest("Invalid folder data");

                // Create the folder in the database (assigning OwnerId, ParentFolderId, etc.)
                var createdFolder = await _folderService.AddFolderAsync(_mapper.Map<FolderDTO>(folder));
                await _activityService.LogActivityAsync(userId.Value, "Created Folder", createdFolder.Name);
                return Ok(createdFolder);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating folder");
                return StatusCode(500, "Error creating folder");
            }
        }

        [Authorize]
        [HttpDelete("{folderId}")]
        public async Task<IActionResult> DeleteFolder(int folderId)
        {
            try
            {
                var userId = User.GetUserId();
                if (!userId.HasValue)
                    return Unauthorized("User not authenticated");
                if (!await _folderService.UserHasAccessToFolder(userId.Value, folderId))
                    return Forbid();
                await _folderService.SoftDeleteFolderAsync(folderId);
                await _activityService.LogActivityAsync(userId.Value, "Deleted Folder", folderId.ToString());
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting folder");
                return StatusCode(500, "Error deleting folder");
            }
        }

        [Authorize]
        [HttpPut("{folderId}")]
        public async Task<IActionResult> UpdateFolder(int folderId, [FromBody] FolderPostModel folder)
        {
            try
            {
                var userId = User.GetUserId();
                if (!userId.HasValue)
                    return Unauthorized("User not authenticated");

                if (!await _folderService.UserHasAccessToFolder(userId.Value, folderId))
                    return Forbid();

                if (folder == null)
                    return BadRequest("Invalid folder data");

                var updatedFolder = await _folderService.UpdateFolderAsync(folderId, _mapper.Map<FolderDTO>(folder)); 
                await _activityService.LogActivityAsync(userId.Value, "Updated Folder", updatedFolder.Name);
                return Ok(updatedFolder);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating folder");
                return StatusCode(500, "Error updating folder");
            }
        }

    }
}
