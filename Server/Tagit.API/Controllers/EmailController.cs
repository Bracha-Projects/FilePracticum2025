using Microsoft.AspNetCore.Mvc;
using Tagit.Core.Models;
using Tagit.Core.Services;

namespace Tagit.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmailAsync([FromBody] EmailRequest request)
        {
            await _emailService.SendEmailAsync(request);
            return Ok();
        }

    }
}
