using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;

namespace LMS.Service
{
    public class InquiryService
    {
        #region Class Variables
        private InquiryDAL _InquiryDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public InquiryService()
        {
            _InquiryDAL = new InquiryDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region 
        public bool ManageInquiry(InquiryDE _inquiry)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_inquiry.DBoperation == DBoperations.Insert)
                    _inquiry.Id = _coreDAL.GetnextId(TableNames.Inquiry.ToString());
                retVal = _InquiryDAL.ManageInquiry(_inquiry, cmd);
                return retVal;
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
        }
        public List<InquiryDE> SearchInquiry(InquiryDE _inquiry)
        {
            List<InquiryDE> retVal = new List<InquiryDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_inquiry.Id != default)
                    WhereClause += $" AND Id={_inquiry.Id}";
                if (_inquiry.InquiryName != default)
                    WhereClause += $" and InquiryName  like ''" + _inquiry.InquiryName + "''";
                if (_inquiry.InquiryEmail != default)
                    WhereClause += $" and InquiryEmail like ''" + _inquiry.InquiryEmail + "''";
                if (_inquiry.InquiryCell != default)
                    WhereClause += $" and InquiryCell like ''" + _inquiry.InquiryCell + "''";
                if (_inquiry.InquiryComments != default)
                    WhereClause += $" and InquiryComments like ''" + _inquiry.InquiryComments + "''";
   
                if (_inquiry.IsActive != default && _inquiry.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _InquiryDAL.SearchInquiry(WhereClause, cmd);
                return retVal;
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
        }
        #endregion
    }
}
