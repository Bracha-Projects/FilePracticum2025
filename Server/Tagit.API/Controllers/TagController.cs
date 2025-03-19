using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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

        public TagController(ITagService tagService, IMapper mapper)
        {
            _tagService = tagService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await _tagService.GetAllTagsAsync();
            return Ok(_mapper.Map<List<TagDTO>>(tags));
        }

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

        [HttpPost]
        public async Task<IActionResult> CreateTag([FromBody] TagPostModel tagPostModel)
        {
            var tag = _mapper.Map<TagDTO>(tagPostModel);
            var createdTag = await _tagService.CreateTagAsync(tag);
            return CreatedAtAction(nameof(GetTagById), new { id = createdTag.Id }, _mapper.Map<TagDTO>(createdTag));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTag(int id, [FromBody] TagPostModel tagPostModel)
        {
            var tag = _mapper.Map<TagDTO>(tagPostModel);
            tag.Id = id;
            var updatedTag = await _tagService.UpdateTagAsync(tag);
            if (updatedTag == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TagDTO>(updatedTag));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var result = await _tagService.DeleteTagAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }

}

