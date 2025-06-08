using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Tagit.API.PostModels;
using Tagit.Controllers;
using Tagit.Core.DTOs;
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

        public FolderController(IFolderService folderService, ILogger<FolderController> logger, IMapper mapper)
        {
            _folderService = folderService;
            _logger = logger;
            _mapper = mapper;
        }

        // Get the list of folders for a user
        //[HttpGet]
        //public async Task<IActionResult> GetUserFolders()
        //{
        //    try
        //    {
        //        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //        var folders = await _folderService.GetUserFoldersAsync(int.Parse(userId));
        //        return Ok(folders);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error fetching user folders");
        //        return StatusCode(500, "Error fetching user folders");
        //    }
        //}

        //// Get files inside a specific folder
        //[HttpGet("files-in-folder/{folderId}")]
        //public async Task<IActionResult> GetFilesInFolder(int folderId)
        //{
        //    try
        //    {
        //        var files = await _folderService.GetFilesInFolderAsync(folderId);
        //        return Ok(files);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError(ex, "Error fetching files for folder");
        //        return StatusCode(500, "Error fetching files for folder");
        //    }
        //}

        [HttpGet("{folderId}/items")]
        public async Task<IActionResult> GetFolderContents(int folderId)
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                if (!await _folderService.UserHasAccessToFolder(userId, folderId))
                    return Forbid();

                var subFolders = await _folderService.GetFoldersInParentAsync(userId, folderId);
                var files = await _folderService.GetFilesInFolderAsync(folderId);

                return Ok(new { subFolders, files });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching folder contents");
                return StatusCode(500, "Error fetching folder contents");
            }
        }


        [HttpPost("create-folder")]
        public async Task<IActionResult> CreateFolder([FromBody] FolderPostModel folder)
        {
            try
            {
                if (folder == null)
                    return BadRequest("Invalid folder data");

                // Create the folder in the database (assigning OwnerId, ParentFolderId, etc.)
                var createdFolder = await _folderService.AddFolderAsync(_mapper.Map<FolderDTO>(folder));

                return Ok(createdFolder);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating folder");
                return StatusCode(500, "Error creating folder");
            }
        }
    }
}
