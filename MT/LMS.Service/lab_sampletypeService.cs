//using LMS.Core.Entities;
//using LMS.Core.Enums;
//using LMS.DAL;
//using MySql.Data.MySqlClient;
//using NLog;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace LMS.Service
//{
//    public class lab_sampletypeService
//    {
//        #region Class Variables
//        private lab_sampletypeDAL _slabDAL;
//        private CoreDAL _coreDAL;
//        private Logger _logger;
//        #endregion
//        #region Constructor
//        public lab_sampletypeService()
//        {
//            _slabDAL = new lab_sampletypeDAL();
//            _coreDAL = new CoreDAL();
//            _logger = LogManager.GetLogger("fileLogger");
//        }
//        #endregion
//        #region  customerreceipts
//        public bool Managelab_sampletype(lab_sampletypeDE _lab_sampletype)
//        {
//            bool retVal = false;
//            bool closeConnectionFlag = false;
//            MySqlCommand? cmd = null;
//            try
//            {
//                cmd = LMSDataContext.OpenMySqlConnection();
//                closeConnectionFlag = true;

//                if (_lab_sampletype.DBoperation == DBoperations.Insert)
//                    _lab_sampletype.Id = _coreDAL.GetnextId(TableNames.lab_sampletype.ToString());
//                retVal = _slabDAL.Managelab_sampletype(_lab_sampletype, cmd);
//                return retVal;
//            }
//            catch (Exception ex)
//            {
//                _logger.Error(ex);
//                throw;
//            }
//            finally
//            {
//                if (closeConnectionFlag)
//                    LMSDataContext.CloseMySqlConnection(cmd);
//            }
//        }
//        public List<lab_sampletypeDE> Searchlab_sampletype(lab_sampletypeDE _slab)
//        {
//            List<lab_sampletypeDE> retVal = new List<lab_sampletypeDE>();
//            bool closeConnectionFlag = false;
//            MySqlCommand? cmd = null;
//            try
//            {
//                cmd = LMSDataContext.OpenMySqlConnection();
//                closeConnectionFlag = true;
//                string WhereClause = " Where 1=1";
//                if (_slab.ClientId != default)
//                    WhereClause += $" AND ClientId={_slab.ClientId}";
//                if (_slab.Id != default)
//                    WhereClause += $" AND Id={_slab.Id}";
//                if (_slab.SampleTypeName != default)
//                    WhereClause += $" and SampleTypeName like ''" + _slab.SampleTypeName + "''";
//                if (_slab.IsActive != default && _slab.IsActive == true)
//                    WhereClause += $" AND IsActive=1";


//                retVal = _slabDAL.Searchlab_sampletype(WhereClause, cmd);
//                return retVal;
//            }
//            catch (Exception ex)
//            {
//                _logger.Error(ex);
//                throw;
//            }
//            finally
//            {
//                if (closeConnectionFlag)
//                    LMSDataContext.CloseMySqlConnection(cmd);
//            }
//        }
//        #endregion
//    }
//}
