using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tagit.Core.Models;
using Tagit.Core.Services;


namespace Tagit.Service.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;

        public EmailService(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public async Task<bool> SendEmailAsync(EmailRequest request)
        {
            var emailMessage = new MimeMessage();
            var senderEmail = configuration["Gmail:SenderEmail"];

            emailMessage.From.Add(new MailboxAddress("Tag-it", senderEmail));
            emailMessage.To.Add(new MailboxAddress(request.To, request.To));
            emailMessage.Subject = request.Subject;

            var bodyBuilder = new BodyBuilder { TextBody = request.Body };
            emailMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(
                        configuration["Gmail:SmtpServer"],
                        int.Parse(configuration["Gmail:Port"]),
                        SecureSocketOptions.StartTls
                    );

                    await client.AuthenticateAsync(senderEmail, configuration["Gmail:AppPassword"]);
                    await client.SendAsync(emailMessage);
                    await client.DisconnectAsync(true);

                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }


    }
}
