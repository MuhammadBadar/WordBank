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
    public class LAB_SpecimenService
    {
        #region Class Variables
        private LAB_SpecimenDAL _lABsDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public LAB_SpecimenService()
        {
            _lABsDAL = new LAB_SpecimenDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region  customerreceipts
        public bool ManageLAB_Specimen(LAB_SpecimenDE _lABs)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_lABs.DBoperation == DBoperations.Insert)
                    _lABs.Id = _coreDAL.GetnextId(TableNames.lAB_Specimen.ToString());
                retVal = _lABsDAL.ManageLAB_Specimen(_lABs, cmd);
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
        public List<LAB_SpecimenDE> SearchLAB_Specimen(LAB_SpecimenDE _lABs)
        {
            List<LAB_SpecimenDE> retVal = new List<LAB_SpecimenDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_lABs.ClientId != default)
                    WhereClause += $" AND Id={_lABs.ClientId}";
                if (_lABs.Id != default)
                    WhereClause += $" and Id like ''" + _lABs.Id + "''";
                if (_lABs.Name != default)
                    WhereClause += $" and Name like ''" + _lABs.Name + "''"; ;


                retVal = _lABsDAL.SearchLAB_Specimen(WhereClause, cmd);
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
