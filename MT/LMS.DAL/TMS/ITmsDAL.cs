using MySql.Data.MySqlClient;
using System;
using LMS.Core.Entities.TMS;
using LMS.Core.Constants;

namespace LMS.DAL.TMS
{
    public interface ITmsDAL
    {
        public bool NOT_Manage_Notification_Template(NotificationTemplateDE mod, MySqlCommand? cmd);

        public List<NotificationTemplateDE> NOT_Search_Notification_Template(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE);





    }
}
