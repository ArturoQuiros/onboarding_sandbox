using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using Microsoft.Extensions.Options;
using WS_Onboarding.Models;
using Microsoft.Graph.Models;
using Azure.Identity;
using Microsoft.Graph.Users.Item.SendMail;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace WS_Onboarding.Services
{
    public class AzureAdSettings
    {
        public required string TenantId { get; set; }
        public required string ClientId { get; set; }
        public required string ClientSecret { get; set; }
    }
    public interface IEmailService
    {
        //Task SendEmailAzureAsync(EmailRequest request);
        Task SendEmailAsync(EmailRequest request);
        Task SendPasswordRecoveryEmail(string subject, string fromEmail,
        string fromPassword, string toEmail, string recoveryLink, string tempPassword);
    }
    public class EmailService : IEmailService
    {
        private readonly AzureAdSettings _settings;
        public EmailService(IOptions<AzureAdSettings> settings)
        {
            _settings = settings.Value;
        }

        //Por ahora no esta en uso. Este es el metodo atraves de un correo de usuario valido en Azure AD
        /*public async Task SendEmailAzureAsync(EmailRequest request)
        {
            var credential = new ClientSecretCredential(
            _settings.TenantId,
            _settings.ClientId,
            _settings.ClientSecret);

            var graphClient = new GraphServiceClient(credential, new[] { "https://graph.microsoft.com/.default" });

            var body = new SendMailPostRequestBody
            {
                Message = new Message
                {
                    Subject = request.Subject,
                    Body = new ItemBody
                    {
                        ContentType = BodyType.Text,
                        Content = request.Body
                    },
                    ToRecipients = new List<Recipient>
                    {
                        new Recipient
                        {
                            EmailAddress = new EmailAddress
                            {
                                Address = request.To
                            }
                        }
                    }
                }
            };

            // Cambia esto por la cuenta habilitada para enviar correos
            // string senderUserId = "correo_o_userId_de_cuenta_autorizada@tuempresa.com";
            string senderUserId = request.From;

            await graphClient.Users[senderUserId].SendMail.PostAsync(body);
        }*/

        public async Task SendEmailAsync(EmailRequest request)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("No-Replay", request.From));
            message.To.Add(new MailboxAddress("", request.To));
            message.Subject = request.Subject;

            message.Body = new TextPart("html") { Text = request.Body};

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                client.Authenticate(request.From, request.FromPassword);
                client.Send(message);
                client.Disconnect(true);
            }
        }

        public async Task SendPasswordRecoveryEmail(string subject ,string fromEmail, string fromPassword, string toEmail, string recoveryLink, string tempPassword)
        {
            var emailRequestModel = new EmailRequest
            {
                From = fromEmail,
                FromPassword = fromPassword,
                To = toEmail,
                Subject = subject,
                Body = $@"
                <p>Hola,</p>
                <p>Hemos recibido una solicitud para recuperar tu contraseña.</p>
                <p>Por favor utiliza la siguiente contraseña: '{tempPassword}' (Recuerda que puedes cambiarla mas adelante)</p>
                <p>Utiliza el siguiente enlace para acceder nuevamente al sistema: <a href='{recoveryLink}' style='background-color:#007bff;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;'>Login</a></p>
                <p>Si no fuiste tú, puedes ignorar este mensaje.</p>"
            };

            await SendEmailAsync(emailRequestModel);
        }
    }
}