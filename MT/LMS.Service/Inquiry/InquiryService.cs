using LMS.Core.Enums;
using LMS.Core.Entities.Inquiry;
using System.Data;
using LMS.Core.Constants;
using LMS.DAL;

namespace LMS.Service.Inquiry
{
    public partial class InqService
    {


        public InquiryDE ManageInquiry(InquiryDE mod)
        {
            bool closeConnectionFlag = false;
            try
            {
                _entity = TableNames.INQ_Inquiry.ToString();
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = DAL.LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetnextId(_entity);



                if (_inqDAL.INQ_Manage_Inquiry(mod, cmd))
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
        public List<InquiryDE> SearchInquiry(InquiryDE mod)
        {
            List<InquiryDE> Inquiry = new List<InquiryDE>();
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
                if (mod.InquiryName != default)
                    Whereclause += $" AND InquiryName={mod.InquiryName}";
                if (mod.InquiryEmail != default)
                    Whereclause += $" AND InquiryEmail={mod.InquiryEmail}";
                if (mod.InquiryCell != default)
                    Whereclause += $" AND InquiryCell={mod.InquiryCell}";
                if (mod.InquiryComments != default)
                    Whereclause += $" AND InquiryComments={mod.InquiryComments}";
                if (mod.IsActive != default && mod.IsActive == true)
                    Whereclause += $" AND IsActive=1";

                Inquiry = _inqDAL.INQ_Search_Inquiry(Whereclause, cmd);

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
            return Inquiry;
        }

    }
}
