using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;
using LMS.Core.Entities.TMS;
using LMS.DAL.TMS;
using System.Data;
using K4os.Hash.xxHash;
using LMS.Core.Constants;

using static Dapper.SqlMapper;
using LMS.Service.TMS;
using LMS.DAL.Inquiry;

namespace LMS.Service.TMS
{
    public partial class TmsService 
    {
        public NotificationTemplateDE ManageNotificationTemplate(NotificationTemplateDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.NOT_Notificationtemplate .ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetnextId(_entity);



                if (_tmsDAL.NOT_Manage_Notification_Template(mod, cmd))
                {
                    mod.AddSuccessMessage(string.Format(AppConstants.CRUD_DB_OPERATION, _entity, mod.DBoperation.ToString()));
                    _logger.Info($"Success: " + string.Format(AppConstants.CRUD_DB_OPERATION, _entity, mod.DBoperation.ToString()));
                }
                else
                {
                    mod.AddErrorMessage(string.Format(AppConstants.CRUD_ERROR, _entity));
                    _logger.Info($"Error: " + string.Format(AppConstants.CRUD_ERROR, _entity));
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
            return mod;
        }
        public List<NotificationTemplateDE> SearchNotificationTemplate (NotificationTemplateDE mod)
        {
            List<NotificationTemplateDE> NotificationTemplate = new List<NotificationTemplateDE>();
            bool closeConnectionFlag = false;
            try
            {
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                #region Search

                string WhereClause = " Where 1=1";
                if (mod.Id != default && mod.Id != 0)
                    WhereClause += $" AND notifi.Id={mod.Id}";
                if (mod.KeyCode != default)
                    WhereClause += $" and notifi.KeyCode like ''" + mod.KeyCode + "''";
                if (mod.TemplateName != default)
                    WhereClause += $" and notifi.TemplateName like ''" + mod.TemplateName + "''";
                if (mod.Body != default)
                    WhereClause += $" and notifi.Body like ''" + mod.Body + "''";
                if (mod.Subject != default)
                    WhereClause += $" and notifi.Subject like ''" + mod.Subject + "''";
                if (mod.SMS != default)
                    WhereClause += $" and notifi.SMS like ''" + mod.SMS + "''";
                if (mod.IsActive != default && mod.IsActive == true)
                    WhereClause += $" AND notifi.IsActive=1";
                if (mod.PageNo != default)
                    NotificationTemplate = _tmsDAL.NOT_Search_Notification_Template(WhereClause, cmd, mod.PageNo, mod.PageSize);
                else
                    NotificationTemplate = _tmsDAL. NOT_Search_Notification_Template (WhereClause, cmd);


                #endregion
            }
            catch (Exception exp)
            {
                _logger.Error(exp);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
            return NotificationTemplate;
        }

    }
}
