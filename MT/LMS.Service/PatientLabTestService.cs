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
    public class PatientLabTestService
    {
        #region Class Variables
        private PatientLabTestDAL _plabDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public PatientLabTestService()
        {
            _plabDAL = new PatientLabTestDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region  customerreceipts
        public bool ManagePatientLabTest(PatientLabTestDE patientLab)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (patientLab.DBoperation == DBoperations.Insert)
                    patientLab.Id = _coreDAL.GetnextId(TableNames.patientlabtest.ToString());
                retVal = _plabDAL.ManagePatientLabTest(patientLab, cmd);

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
        public List<PatientLabTestDE> SearchPatientLabTest(PatientLabTestDE patientLab)
        {
            List<PatientLabTestDE> retVal = new List<PatientLabTestDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (patientLab.ClientId != default)
                    WhereClause += $" AND ClientId={patientLab.ClientId}";
                if (patientLab.Id != default)
                    WhereClause += $" AND Id={patientLab.Id}";
                if (patientLab.LabTestId != default)
                    WhereClause += $" and LabTestId like ''" + patientLab.LabTestId + "''";
                if (patientLab.SampleTypeId != default)
                    WhereClause += $" and SampleTypeId like ''" + patientLab.SampleTypeId + "''";
                if (patientLab.PatientId != default)
                    WhereClause += $" and PatientId like ''" + patientLab.PatientId + "''";
                if (patientLab.DoctorId != default)
                    WhereClause += $" and DoctorId like ''" + patientLab.DoctorId + "''";
                if (patientLab.TestDate != default)
                    WhereClause += $" and TestDate like ''" + patientLab.TestDate + "''";
                if (patientLab.Remarks != default)
                    WhereClause += $" and Remarks like ''" + patientLab.Remarks + "''";
                if (patientLab.Price != default)
                    WhereClause += $" and Price like ''" + patientLab.Price + "''";
                if (patientLab.DiscountAmt != default)
                    WhereClause += $" and DiscountAmt like ''" + patientLab.DiscountAmt + "''";
                if (patientLab.PaidAmt != default)
                    WhereClause += $" and PaidAmt like ''" + patientLab.PaidAmt + "''";
                if (patientLab.ResultDate != default)
                    WhereClause += $" and ResultDate like ''" + patientLab.ResultDate + "''";
                if (patientLab.ResultValue != default)
                    WhereClause += $" and ResultValue like ''" + patientLab.ResultValue + "''";
                if (patientLab.IsActive != default && patientLab.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _plabDAL.SearchPatientLabTest(WhereClause, cmd);
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
