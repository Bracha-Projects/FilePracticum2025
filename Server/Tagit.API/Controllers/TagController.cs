using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tagit.API.Extensions;
using Tagit.Core.DTOs;
using Tagit.Core.Entities;
using Tagit.Core.PostModels;
using Tagit.Core.Services;

namespace Tagit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagService _tagService;
        private readonly IMapper _mapper;
        private readonly IActivityService _activityService;
        private readonly ILogger<TagController> _logger;
        private readonly IFileService _fileService;

        public TagController(ITagService tagService, IMapper mapper, IActivityService activityService, ILogger<TagController> logger, IFileService fileService)
        {
            _tagService = tagService;
            _mapper = mapper;
            _activityService = activityService;
            _logger = logger;
            _fileService = fileService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await _tagService.GetAllTagsAsync();
            return Ok(_mapper.Map<List<TagDTO>>(tags));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTagById(int id)
        {
            var tag = await _tagService.GetTagByIdAsync(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TagDTO>(tag));
        }


        [Authorize]
        [HttpGet("{fileId}/tags")]
        public async Task<IActionResult> GetTagsByFileId(int fileId)
        {
            var file = await _fileService.GetFileByIdAsync(fileId);
            return Ok(file.Tags);
        }

        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetTagsByUserId(int userId)
        {
            var tags = await _tagService.GetTagsByUserIdAsync(userId);
            return Ok(tags);
        }

        [Authorize]
        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularTags()
        {
            var tags = await _tagService.GetPopularTagsAsync();
            return Ok(tags);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateTag([FromBody] TagPostModel tagDto)
        {

            var userId = User.GetUserId();
            if (!userId.HasValue)
                return Unauthorized("User not authenticated");

            if (tagDto == null || string.IsNullOrWhiteSpace(tagDto.TagName))
                return BadRequest("Invalid tag data.");

            var createdTag = await _tagService.CreateTagAsync(tagDto.TagName, tagDto.FileId);
            if (createdTag == null)
                return BadRequest("Failed to create tag.");
            await _activityService.LogActivityAsync(userId.Value, "Created Tag", createdTag.TagName);
            return Ok(createdTag);
        }

        [Authorize]
        [HttpPut("{tagId}")]
        public async Task<IActionResult> UpdateTag(int tagId, [FromBody] TagPostModel tagDto)
        {
            var userId = User.GetUserId();
            if (!userId.HasValue)
                return Unauthorized("User not authenticated");

            if (tagDto == null || string.IsNullOrWhiteSpace(tagDto.TagName))
                return BadRequest("Invalid tag data.");

            var tag = _mapper.Map<TagDTO>(tagDto);
            tag.Id = tagId;

            var updatedTag = await _tagService.UpdateTagAsync(tag);
            if (updatedTag == null)
                return NotFound();

            return Ok(updatedTag);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var userId = User.GetUserId();
            if (!userId.HasValue)
                return Unauthorized("User not authenticated");

            var result = await _tagService.DeleteTagAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

    }

}



