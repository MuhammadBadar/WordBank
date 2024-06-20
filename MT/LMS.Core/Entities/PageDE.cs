using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class PageDE : BaseDomain
    {
        public int NovelId { get; set; }
        public int ChapterId { get; set; }
        public int PageNo { get; set; }
        public string Content { get; set; }
    }
}
