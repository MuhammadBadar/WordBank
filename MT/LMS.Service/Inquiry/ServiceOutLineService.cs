using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;
using LMS.Core.Entities.Inquiry;
using LMS.DAL.Inquiry;
using System.Data;
using K4os.Hash.xxHash;
using LMS.Core.Constants;

using static Dapper.SqlMapper;

namespace LMS.Service.Inquiry
{
    public partial class InqService
    {


        public ServiceOutlineDE ManageServiceOutline(ServiceOutlineDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.inq_serviceoutline .ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetnextId(_entity);



                if (_inqDAL.INQ_Manage_ServiceOutline(mod, cmd))
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
        public List<ServiceOutlineDE> SearchServiceOutline(ServiceOutlineDE mod)
        {
            List<ServiceOutlineDE> ServiceOutline = new List<ServiceOutlineDE>();
            bool closeConnectionFlag = false;
            try
            {
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                #region Search

                string Whereclause = " Where 1=1";
                if (mod.Id != default)
                    Whereclause += $" AND inq.Id={mod.Id}";
                if (mod.ServiceId != default)
                    Whereclause += $" AND inq.ServiceId={mod.ServiceId}";
                if (mod.Content != default)
                    Whereclause += $" AND inq.Content={mod.Content}";
                if (mod.IsActive != default && mod.IsActive == true)
                    Whereclause += $" AND inq.IsActive=1"; 

                ServiceOutline = _inqDAL.INQ_Search_ServiceOutline (Whereclause, cmd);

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
            return ServiceOutline;
        }

    }
}
