
using LMS.Core.Enums;
using LMS.Core.Entities.Inquiry;
using System.Data;
using LMS.Core.Constants;
using LMS.DAL;

namespace LMS.Service.Inquiry
{
    public partial class InqService
    {


        public ServiceChargesDE ManageServiceCharges(ServiceChargesDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.INQ_ServiceCharges.ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = DAL.LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetnextId(_entity);



                if (_inqDAL.INQ_Manage_ServiceCharges(mod, cmd))
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
        public List<ServiceChargesDE> SearchServiceCharges(ServiceChargesDE mod)
        {
            List<ServiceChargesDE> ServiceCharges = new List<ServiceChargesDE>();
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
                    Whereclause += $" and id={mod.Id}";
                if (mod.InquiryId != default)
                    Whereclause += $" AND InquiryId={mod.InquiryId}";
                if (mod.ServiceCharges != default)
                    Whereclause += $" AND ServiceCharges={mod.ServiceCharges}";
                if (mod.NextDueDate != default)
                    Whereclause += $" AND NextDueDate={mod.NextDueDate}";
                if (mod.Comments != default)
                    Whereclause += $" AND Comments={mod.Comments}";
                if (mod.IsActive != default && mod.IsActive == true)
                    Whereclause += $" AND IsActive=1";
               
                else
                    ServiceCharges = _inqDAL.INQ_Search_ServiceCharges(Whereclause, cmd);

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
            return ServiceCharges;
        }

    }
}
