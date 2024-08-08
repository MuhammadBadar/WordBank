using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Extenstions
{
    public static class TimeExtension 
    {
        public static string ToDateTimeString(this DateTime date)
        {
            return date.ToString("dd-MM-yyyy h:mm tt");
        }
        public static string ToDateString(this DateTime date)
        {
            return date.ToString("dd-MM-yyyy");
        }

        public static string GetCurrentDateTime(this DateTime dateTime)
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        }

        public static bool HasValue(this DateTime? dateTime)
        {
            return dateTime.HasValue;

        }
      
    }
}
