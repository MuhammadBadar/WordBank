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
                if (mod.selectedServiceIds != null)
                    mod.ServiceIds = string.Join(",", mod.selectedServiceIds.ToArray());
                if (cmd == null || cmd.Connection.State != ConnectionState.Open)
                {
                    cmd = DAL.LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _coreDAL.GetNextIdByClient(_entity, mod.ClientId, "ClientId");



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
                if (mod.ClientId != default && mod.ClientId != 0)
                    Whereclause += $" AND inq.ClientId={mod.ClientId}";
                if (mod.Id != default)
                    Whereclause += $" and inq.Id={mod.Id}";
                if (mod.CityId != default)
                    Whereclause += $" and inq.CityId={mod.CityId}";
                if (mod.StatusId != default)
                    Whereclause += $" and inq.StatusId={mod.StatusId}";
                if (mod.CompainId != default)
                    Whereclause += $" and inq.CompainId={mod.CompainId}";
                if (mod.InquiryName != default)
                    Whereclause += $" AND inq.InquiryName={mod.InquiryName}";
                if (mod.InquiryEmail != default)
                    Whereclause += $" AND inq.InquiryEmail={mod.InquiryEmail}";
                if (mod.InquiryCell != default)
                    Whereclause += $" AND inq.InquiryCell={mod.InquiryCell}";
                if (mod.Area != default)
                    Whereclause += $" AND inq.Area={mod.Area}";
                if (mod.CNIC != default)
                    Whereclause += $" AND inq.CNIC={mod.CNIC}";
                if (mod.InquiryComments != default)
                    Whereclause += $" AND inq.InquiryComments={mod.InquiryComments}";
                if (mod.IsActive != default && mod.IsActive == true)
                    Whereclause += $" AND inq.IsActive=1";
                if (mod.PageNo != default)
                    Inquiry = _inqDAL.INQ_Search_Inquiry(Whereclause, cmd, mod.PageNo, mod.PageSize);
                else
                   Inquiry = _inqDAL.INQ_Search_Inquiry(Whereclause, cmd);

                foreach (var line in Inquiry)
                {
                    if (line.ServiceIds  != null  && line.ServiceIds != "")
                    {
                        List<string> result = line.ServiceIds.Split(',').ToList();
                        line.selectedServiceIds = new List<int>();
                        foreach (var Ser in result)
                        {
                            line.selectedServiceIds.Add(int.Parse(Ser));
                        }
                    }

                }



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
