using Newtonsoft.Json.Converters;
using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace EctoTec_3_1.Models
{
    public class JsonDateConverter : IsoDateTimeConverter
    {
        public JsonDateConverter()
        {
            DateTimeFormat = "yyyy-MM-dd";
            
        }
    }
}
