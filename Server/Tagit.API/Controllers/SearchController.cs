using Microsoft.AspNetCore.Mvc;
using Tagit.Core.Models;
using Tagit.Core.Services;

namespace Tagit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        [HttpGet("files")]
        public async Task<IActionResult> SearchFiles([FromQuery] FileSearchModel searchModel)
        {
            var results = await _searchService.SearchFilesAsync(searchModel);
            return Ok(results);
        }
    }
}
