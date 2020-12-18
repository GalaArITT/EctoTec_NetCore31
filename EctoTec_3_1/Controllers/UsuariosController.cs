using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EctoTec_3_1.Models;
using System.Net.Http;
using EctoTec_3_1.Services;
using EctoTec_3_1.Models.Response;

namespace EctoTec_3_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly EctoTecContext _context;
        private readonly IEmailSenderService _mailer; 

        public UsuariosController(EctoTecContext context, IEmailSenderService mailer)
        {
            _context = context;
            _mailer = mailer;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuario()
        {
            return await _context.Usuario.ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuario.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }
        // POST: api/Usuarios
        [HttpPost]
        public async Task<ActionResult<MyResponse>> PostUsuario(Usuario usuario)
        {
            MyResponse ob = new MyResponse();
            DateTime fecha = Convert.ToDateTime(usuario.Fecha);
            _context.Usuario.Add(usuario);
                if (fecha < fecha.AddYears(100)) //validar que el año no se pase de 100
                {
                    await _context.SaveChangesAsync();
                    await _mailer.SendEmailAsync(usuario.Email.ToString(),"Asunto Examen EctoTec" ,
                        "<img src=\"..//img//green.jpg\"/>" +
                        "<h3>Hemos recibido sus datos y nos pondremos en contacto con usted a la brevedad posible." +
                        "Enviaremos un correo con información a su cuenta </h3>"+
                        "<h4>"+usuario.Email.ToString()+"</ h4 > "
                        );
                    return CreatedAtAction("GetUsuario", new { id = usuario.Id }, usuario);
                }
                else
                {
                    return NotFound();
                }

        }
        private bool UsuarioExists(int id)
        {
            return _context.Usuario.Any(e => e.Id == id);
        }
    }
}
