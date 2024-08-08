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


        public ServicesDE ManageServices(ServicesDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.inq_Services.ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetnextId(_entity);



                if (_inqDAL.INQ_Manage_Services(mod, cmd))
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
        public List<ServicesDE> SearchServices(ServicesDE mod)
        {
            List<ServicesDE> Services = new List<ServicesDE>();
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
                    Whereclause += $" AND Id={mod.Id}";
                if (mod.SerName != default)
                    Whereclause += $" AND SerName={mod.SerName}";
                if (mod.SerTitle != default)
                    Whereclause += $" AND SerTitle={mod.SerTitle}";
                if (mod.IsActive != default && mod.IsActive == true)
                    Whereclause += $" AND IsActive=1";
                if (mod.PageNo != default)
                    Services = _inqDAL.INQ_Search_Services(Whereclause, cmd, mod.PageNo, mod.PageSize);
                else
                    Services = _inqDAL.INQ_Search_Services(Whereclause, cmd);

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
            return Services;
        }

    }
}
