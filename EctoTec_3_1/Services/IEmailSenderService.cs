using EctoTec_3_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EctoTec_3_1.Services
{
    public interface IEmailSenderService
    {
        Task SendEmailAsync(string email, string subject, string body);
    }
}
