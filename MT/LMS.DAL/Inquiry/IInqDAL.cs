using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Entities.Inquiry;
using LMS.Core.Constants;

namespace LMS.DAL.Inquiry
{
    public interface IInqDAL
    {
        public bool INQ_Manage_ServiceOutline(ServiceOutlineDE mod, MySqlCommand? cmd);
        public List<ServiceOutlineDE> INQ_Search_ServiceOutline(string WhereClause, MySqlCommand? cmd);

        public bool INQ_Manage_ServiceCompaign(ServiceCompaignDE mod, MySqlCommand? cmd);
        public List<ServiceCompaignDE> INQ_Search_ServiceCompaign(string WhereClause, MySqlCommand? cmd);

        public bool INQ_Manage_Services(ServicesDE mod, MySqlCommand? cmd);
        public List<ServicesDE> INQ_Search_Services(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE);

        public bool INQ_Manage_FollowUp(FollowUpDE mod, MySqlCommand? cmd);

        public List<FollowUpDE> INQ_Search_FollowUp(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE);

        public bool INQ_Manage_Inquiry(InquiryDE mod, MySqlCommand? cmd);
        public List<InquiryDE> INQ_Search_Inquiry(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE);

        public bool INQ_Manage_ServiceCharges(ServiceChargesDE mod, MySqlCommand? cmd);
        public List<ServiceChargesDE> INQ_Search_ServiceCharges(string WhereClause, MySqlCommand? cmd);

    }
}
