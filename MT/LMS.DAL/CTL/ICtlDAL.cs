using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Entities.CTL;
using LMS.Core.Constants;


namespace LMS.DAL.CTL 
{
    public interface ICtlDAL 
    {



        public bool CTL_Manage_AdditionalParameter(CTL_AdditionalParameterDE mod, MySqlCommand? cmd);

        public List<CTL_AdditionalParameterDE> CTL_Search_AdditionalParameter(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE);



    }
}
