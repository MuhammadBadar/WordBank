using Dapper;
using MySql.Data.MySqlClient;
using System;

using LMS.Core.Entities.TMS;
using LMS.Core.Constants;
using LMS.Core.Enums;
using System.Drawing.Printing;
using System.Drawing;
using System.Data;
using LMS.DAL.TMS;



namespace LMS.DAL.TMS
{
    public partial class TMSDAL : ITmsDAL
    {

        #region DbOperations
        public bool NOT_Manage_Notification_Template (NotificationTemplateDE mod, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = SPNames.NOT_Manage_Notification_Template;
                cmd.Parameters.AddWithValue("prm_id", mod.Id);
                cmd.Parameters.AddWithValue("prm_keyCode", mod.KeyCode);
                cmd.Parameters.AddWithValue("prm_templateName", mod.TemplateName);
                cmd.Parameters.AddWithValue("prm_body", mod.Body);
                cmd.Parameters.AddWithValue("prm_subject", mod.Subject);
                cmd.Parameters.AddWithValue("prm_sMS", mod.SMS);
                cmd.Parameters.AddWithValue("prm_createdOn", mod.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", mod.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", mod.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", mod.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", mod.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", mod.DBoperation.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cmd.Parameters.Clear();
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<NotificationTemplateDE> NOT_Search_Notification_Template(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE)
        {
            bool closeConnection = false;
            List<NotificationTemplateDE> not = new List<NotificationTemplateDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                var parameters = new
                {
                    prm_WhereClause = WhereClause
                ,

                    prm_Start = PageNo
                ,
                    prm_Limit = PageSize
                ,

                };
                not = cmd.Connection.Query<NotificationTemplateDE>(SPNames.NOT_Search_Notification_Template.ToString(), parameters, commandType: CommandType.StoredProcedure).ToList();
                return not;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        #endregion
    }
}
