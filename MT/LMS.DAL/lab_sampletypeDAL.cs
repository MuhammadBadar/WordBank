//using Dapper;
//using LMS.Core.Entities;
//using MySql.Data.MySqlClient;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;


//namespace LMS.DAL
//{
//    public class lab_sampletypeDAL
//    {
//        #region DbOperations
//        public bool Managelab_sampletype(lab_sampletypeDE _slab, MySqlCommand? cmd)
//        {
//            bool closeConnection = true;
//            try
//            {
//                if (cmd == null)
//                {
//                    cmd = LMSDataContext.OpenMySqlConnection();
//                    closeConnection = true;
//                }
//                cmd.CommandText = "LAB_Manage_SampleType";
//                cmd.Parameters.AddWithValue("prm_Clientid", _slab.ClientId);
//                cmd.Parameters.AddWithValue("prm_Id", _slab.Id);
//                cmd.Parameters.AddWithValue("prm_SampleTypeName", _slab.SampleTypeName);
//                cmd.Parameters.AddWithValue("prm_createdOn", _slab.CreatedOn);
//                cmd.Parameters.AddWithValue("prm_createdById", _slab.CreatedById);
//                cmd.Parameters.AddWithValue("prm_modifiedOn", _slab.ModifiedOn);
//                cmd.Parameters.AddWithValue("prm_modifiedById", _slab.ModifiedById);
//                cmd.Parameters.AddWithValue("prm_isActive", _slab.IsActive);
//                cmd.Parameters.AddWithValue("prm_dbOperation", _slab.DBoperation.ToString());
//                cmd.ExecuteNonQuery();
//                return true;
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//            finally
//            {
//                if (closeConnection)
//                    LMSDataContext.CloseMySqlConnection(cmd);
//            }
//        }
//        public List<lab_sampletypeDE> Searchlab_sampletype(string WhereClause, MySqlCommand cmd)
//        {
//            bool closeConnection = false;
//            //WhereClause = string.Empty;
//            List<lab_sampletypeDE> lec = new List<lab_sampletypeDE>();
//            try
//            {
//                if (cmd == null)
//                {
//                    cmd = LMSDataContext.OpenMySqlConnection();
//                    closeConnection = true;
//                }
//                lec = cmd.Connection.Query<lab_sampletypeDE>("call lms.LAB_Search_SampleType('" + WhereClause + "')").ToList();
//                return lec;
//            }
//            catch (Exception)
//            {
//                throw;
//            }
//            finally
//            {
//                if (closeConnection)
//                    LMSDataContext.CloseMySqlConnection(cmd);
//            }
//        }
//        #endregion
//    }
//}
