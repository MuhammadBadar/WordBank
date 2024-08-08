using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Extenstions
{
    public static class Base64ImageString
    {
        public static String ToBase64ImageString(this String base64Path)
        {
            return base64Path.Split(",")[1].Trim();
        }
    }
}
