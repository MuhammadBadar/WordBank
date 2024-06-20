using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class StudentFormDE : BaseDomain
    {
        public string StudentName { get; set; }
        public string GuardianName { get; set; }
        public string GuardianRelationship { get; set; }
        public string GuardianProfession { get; set; }
        public string Degree { get; set; }
        public string University { get; set; }
        public string CNIC { get; set; }
        public DateTime JoiningDate { get; set; }
        public string Address { get; set; }

    }
}
