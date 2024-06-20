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
    public class LAB_SpecimenDAL
    {
        #region DbOperations
        public bool ManageLAB_Specimen(LAB_SpecimenDE _lABs, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "LAB_Manage_Specimen";
                cmd.Parameters.AddWithValue("prm_clientId", _lABs.ClientId);
                cmd.Parameters.AddWithValue("prm_id", _lABs.Id);
                cmd.Parameters.AddWithValue("prm_name", _lABs.Name);
                cmd.Parameters.AddWithValue("prm_dbOperation", _lABs.DBoperation.ToString()); ;
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
        public List<LAB_SpecimenDE> SearchLAB_Specimen(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<LAB_SpecimenDE> lec = new List<LAB_SpecimenDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<LAB_SpecimenDE>("call lms.SearchLAB_Specimen('" + WhereClause + "')").ToList();
                return lec;
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
