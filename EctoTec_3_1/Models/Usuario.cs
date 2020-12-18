using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EctoTec_3_1.Models
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public int? Idpais { get; set; }
        public string Nombre { get; set; }
        public string Telefono { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}", ApplyFormatInEditMode = true)]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime? Fecha { get; set; }
        public string Email { get; set; }

        public virtual Ciudad IdpaisNavigation { get; set; }
    }
}
