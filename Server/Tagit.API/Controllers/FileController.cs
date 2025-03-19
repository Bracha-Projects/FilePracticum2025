using Microsoft.AspNetCore.Mvc;
using Tagit.Core.PostModels;
using Tagit.Core.Services;
using Tagit.Core.Entities;
using File = Tagit.Core.Entities.File;
using AutoMapper;
using Tagit.Core.DTOs;
namespace Tagit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        public FileController(IFileService fileService,IMapper mapper)
        {
            _fileService = fileService;
            _mapper = mapper;
        }

        // פעולה להעלאת קובץ
        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromBody] FilePostModel filePostModel)
        {
            if (filePostModel == null)
            {
                return BadRequest("Invalid file data.");
            }
            var file = _mapper.Map<FileDTO>(filePostModel);
            // קריאה לשירות להעלות את הקובץ
            var fileDto = await _fileService.UploadFileAsync(file);
            return Ok(_mapper.Map<FileDTO>(fileDto));
        }

        // פעולה לקבלת קבצים של משתמש
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserFiles(int userId)
        {
            // קריאה לשירות לקבלת קבצים
            var files = await _fileService.GetUserFilesAsync(userId);

            if (files == null || files.Count == 0)
            {
                return NotFound("No files found for this user.");
            }
            return Ok(_mapper.Map<List<FileDTO>>(files)); // החזרת רשימת DTO
        }
    }
}
