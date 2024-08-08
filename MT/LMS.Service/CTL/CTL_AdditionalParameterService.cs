using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.Core.Entities.CTL;
using LMS.DAL.CTL;
using System.Data;
using K4os.Hash.xxHash;
using LMS.Core.Constants;
using static Dapper.SqlMapper;
using LMS.DAL;

namespace LMS.Service.CTL  
{
    public partial class CtlService
    {

        public CTL_AdditionalParameterDE ManageCTL_AdditionalParameter(CTL_AdditionalParameterDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.ctl_additionalparameter .ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }




                if (_ctlDAL.CTL_Manage_AdditionalParameter(mod, cmd))
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
        public List<CTL_AdditionalParameterDE> SearchCTL_AdditionalParameter(CTL_AdditionalParameterDE mod)
        {
            List<CTL_AdditionalParameterDE> AdditionalParameter = new List<CTL_AdditionalParameterDE>();
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

                if (mod.EntityTypeId != default && mod.EntityTypeId != 0)
                    WhereClause += $" AND ctl.EntityTypeId={mod.EntityTypeId}";
                if (mod.EntityId != default && mod.EntityId != 0)
                    WhereClause += $" AND ctl.EntityId={mod.EntityId}";
                if (mod.ClientId != default && mod.ClientId != 0)
                    WhereClause += $" AND ctl.ClientId={mod.ClientId}";
                if (mod.FieldId != default && mod.FieldId != 0)
                    WhereClause += $" AND ctl.FieldId={mod.FieldId}";
                if (mod.FieldValue != default)
                    WhereClause += $" and ctl.FieldValue like ''" + mod.FieldValue + "''";
                if (mod.IsActive != default && mod.IsActive == true)
                    WhereClause += $" AND ctl.IsActive=1";
                if (mod.PageNo != default)
                    AdditionalParameter = _ctlDAL.CTL_Search_AdditionalParameter(WhereClause, cmd, mod.PageNo, mod.PageSize);
                else
                    AdditionalParameter = _ctlDAL.CTL_Search_AdditionalParameter(WhereClause, cmd);

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
            return AdditionalParameter;
        }

    }
}



