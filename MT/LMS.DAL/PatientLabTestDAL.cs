using Dapper;
using LMS.Core.Entities;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.DAL
{
    public class PatientLabTestDAL
    {
        #region DbOperations
        public bool ManagePatientLabTest(PatientLabTestDE patientLab, MySqlCommand? cmd)
        {
            bool closeConnection = true;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "ManagePatientLabTest";
                cmd.Parameters.AddWithValue("prm_clientId", patientLab.ClientId);
                cmd.Parameters.AddWithValue("prm_id", patientLab.Id);
                cmd.Parameters.AddWithValue("prm_labTestId", patientLab.LabTestId);
                cmd.Parameters.AddWithValue("prm_sampleTypeId", patientLab.SampleTypeId);
                cmd.Parameters.AddWithValue("prm_patientId", patientLab.PatientId);
                cmd.Parameters.AddWithValue("prm_doctorId", patientLab.DoctorId);
                cmd.Parameters.AddWithValue("prm_testDate", patientLab.TestDate);
                cmd.Parameters.AddWithValue("prm_remarks", patientLab.Remarks);
                cmd.Parameters.AddWithValue("prm_price", patientLab.Price);
                cmd.Parameters.AddWithValue("prm_discountAmt", patientLab.DiscountAmt);
                cmd.Parameters.AddWithValue("prm_paidAmt", patientLab.PaidAmt);
                cmd.Parameters.AddWithValue("prm_resultDate", patientLab.ResultDate);
                cmd.Parameters.AddWithValue("prm_resultValue", patientLab.ResultValue);
                cmd.Parameters.AddWithValue("prm_createdOn", patientLab.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", patientLab.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", patientLab.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", patientLab.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", patientLab.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", patientLab.DBoperation.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<PatientLabTestDE> SearchPatientLabTest(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<PatientLabTestDE> patientLab = new List<PatientLabTestDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                patientLab = cmd.Connection.Query<PatientLabTestDE>("call lms.SearchPatientLabTest('" + WhereClause + "')").ToList();
                return patientLab;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        #endregion
    }


}
