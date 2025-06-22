using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tagit.API.Extensions;
using Tagit.Core.Entities;
using Tagit.Core.Models;
using Tagit.Core.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Tagit.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class SearchController : ControllerBase
    {
        private readonly ISearchService _searchService;
        private readonly IActivityService _activityService;
        public SearchController(ISearchService searchService, IActivityService activityService)
        {
            _searchService = searchService;
            _activityService = activityService;
        }
        [Authorize]
        [HttpGet("files")]
        public async Task<IActionResult> SearchFiles([FromQuery] FileSearchModel searchModel)
        {
            var userId = User.GetUserId();
            if (!userId.HasValue)
                return Unauthorized("User not authenticated");

            var results = await _searchService.SearchFilesAsync(searchModel);
            await _activityService.LogActivityAsync(userId.Value, "Searched Files");

            return Ok(results);
        }
    }
}
