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


        public ServiceCompaignDE ManageServiceCompaign(ServiceCompaignDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.INQ_ServiceCompaign.ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetNextIdByClient(_entity, mod.ClientId, "ClientId");



                if (_inqDAL.INQ_Manage_ServiceCompaign(mod, cmd))
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
        public List<ServiceCompaignDE> SearchServiceCompaign(ServiceCompaignDE mod)
        {
            List<ServiceCompaignDE> Service = new List<ServiceCompaignDE>();
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
                if (mod.ClientId != default)
                    Whereclause += $" AND inq.ClientId={mod.ClientId}";
                if (mod.TemplateId != default)
                    Whereclause += $" AND inq.TemplateId={mod.TemplateId}";
                if (mod.ServiceId != default)
                    Whereclause += $" AND inq.ServiceId={mod.ServiceId}";
                if (mod.StartDate != default)
                    Whereclause += $" AND inq.StartDate={mod.StartDate}";
                if (mod.EndDate != default)
                    Whereclause += $" AND inq.EndDate={mod.EndDate}";
                if (mod.Title != default)
                    Whereclause += $" AND inq.Title={mod.Title}";
                if (mod.IsActive != default && mod.IsActive == true)
                    Whereclause += $" AND inq.IsActive=1";

                else
                    Service = _inqDAL.INQ_Search_ServiceCompaign(Whereclause, cmd);

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
            return Service;
        }

    }
}
