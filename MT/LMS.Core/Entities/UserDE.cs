using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Core.Entities
{
    public class UserDE:BaseDomain
    {
        public string? StudentName { get; set; }
        public string? GuardiaName { get; set; }
        public string? GuardiaRelationship { get; set; }
        public string? GuardiaProfession { get; set; }
        public string? Degree { get; set; }
        public string? University { get; set; }
        public int CNIC { get; set; }
        public DateTime JoiningDate { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public bool RememberMe { get; set; }
    }
}
