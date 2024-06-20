using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service
{
    public class OpeningBalanceDetailService
    {
        #region Class Variables
        private OpeningBalanceDetailDAL _openingDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public OpeningBalanceDetailService()
        {
            _openingDAL = new OpeningBalanceDetailDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region  customerreceipts
        public bool ManageOpeningBalanceDetail(OpeningBalanceDetailDE openingBalance)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (openingBalance.DBoperation == DBoperations.Insert)
                    openingBalance.Id = _coreDAL.GetnextId(TableNames.ACC_OpeningBalanceDetail.ToString());
                retVal = _openingDAL.ManageOpeningBalanceDetail(openingBalance, cmd);

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
        public List<OpeningBalanceDetailDE> SearchOpeningBalanceDetail(OpeningBalanceDetailDE openingBalance)
        {
            List<OpeningBalanceDetailDE> retVal = new List<OpeningBalanceDetailDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (openingBalance.ClientId != default)
                    WhereClause += $" AND ClientId={openingBalance.ClientId}";
                if (openingBalance.Id != default)
                    WhereClause += $" AND Id={openingBalance.Id}";
                if (openingBalance.CoaCodeId != default)
                    WhereClause += $" and CoaCodeId like ''" + openingBalance.CoaCodeId + "''";
                if (openingBalance.YearCode != default)
                    WhereClause += $" and YearCode like ''" + openingBalance.YearCode + "''";
                if (openingBalance.CoaDebitAmt != default)
                    WhereClause += $" and CoaDebitAmt like ''" + openingBalance.CoaDebitAmt + "''";
                if (openingBalance.CoaCreditAmt != default)
                    WhereClause += $" and CoaCreditAmt like ''" + openingBalance.CoaCreditAmt + "''";
       
                if (openingBalance.IsActive != default && openingBalance.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _openingDAL.SearchOpeningBalanceDetail(WhereClause, cmd);
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
