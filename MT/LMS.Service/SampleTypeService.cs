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
    public class SampleTypeService
    {
        #region Class Variables
        private SampleTypeDAL _slabDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public SampleTypeService()
        {
            _slabDAL = new SampleTypeDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region  customerreceipts
        public bool ManageSampleType(SampleTypeDE sampleType)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (sampleType.DBoperation == DBoperations.Insert)
                    sampleType.Id = _coreDAL.GetnextId(TableNames.SampleType.ToString());
                retVal = _slabDAL.ManageSampleType(sampleType, cmd);
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
        public List<SampleTypeDE> SearchSampleType(SampleTypeDE sampleType)
        {
            List<SampleTypeDE> retVal = new List<SampleTypeDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (sampleType.ClientId != default)
                    WhereClause += $" AND ClientId={sampleType.ClientId}";
                if (sampleType.Id != default)
                    WhereClause += $" AND Id={sampleType.Id}";
                if (sampleType.SampleTypeName != default)
                    WhereClause += $" and SampleTypeName like ''" + sampleType.SampleTypeName + "''";
                if (sampleType.IsActive != default && sampleType.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _slabDAL.SearchSampleType(WhereClause, cmd);
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
