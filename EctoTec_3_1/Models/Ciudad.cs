using System;
using System.Collections.Generic;

namespace EctoTec_3_1.Models
{
    public partial class Ciudad
    {
        public Ciudad()
        {
            Usuario = new HashSet<Usuario>();
        }

        public int Idpais { get; set; }
        public string Pais { get; set; }
        public string Estado { get; set; }
        public string Ciudad1 { get; set; }

        public virtual ICollection<Usuario> Usuario { get; set; }
    }
}
