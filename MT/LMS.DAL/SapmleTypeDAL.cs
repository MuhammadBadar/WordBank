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
    public class SampleTypeDAL
    {
        #region DbOperations
        public bool ManageSampleType(SampleTypeDE sampleType, MySqlCommand? cmd)
        {
            bool closeConnection = true;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "ManageSampleType";
                cmd.Parameters.AddWithValue("prm_Clientid", sampleType.ClientId);
                cmd.Parameters.AddWithValue("prm_Id", sampleType.Id);
                cmd.Parameters.AddWithValue("prm_SampleTypeName", sampleType.SampleTypeName);
                cmd.Parameters.AddWithValue("prm_createdOn", sampleType.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", sampleType.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", sampleType.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", sampleType.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", sampleType.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", sampleType.DBoperation.ToString());
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
        public List<SampleTypeDE> SearchSampleType(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<SampleTypeDE> sampleType = new List<SampleTypeDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                sampleType = cmd.Connection.Query<SampleTypeDE>("call lms.SearchSampleType('" + WhereClause + "')").ToList();
                return sampleType;
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
