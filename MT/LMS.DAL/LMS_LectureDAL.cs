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
//    public class LMSLectureDAL
//    {
//        #region DbOperations
//        public bool ManageLMSLecture(LMSLectureDE lmsLecture, MySqlCommand? cmd)
//        {
//            bool closeConnection = true;
//            try
//            {
//                if (cmd == null)
//                {
//                    cmd = LMSDataContext.OpenMySqlConnection();
//                    closeConnection = true;
//                }
//                cmd.CommandText = "LMS_Manage_Lecture";
//                cmd.Parameters.AddWithValue("prm_Clientid", lmsLecture.ClientId);
//                cmd.Parameters.AddWithValue("prm_Id", lmsLecture.Id);
//                cmd.Parameters.AddWithValue("prm_TopicId", lmsLecture.topicId);
//                cmd.Parameters.AddWithValue("prm_Title", lmsLecture.title);
//                cmd.Parameters.AddWithValue("prm_Description", lmsLecture.description);
//                cmd.Parameters.AddWithValue("prm_URL", lmsLecture.uRL);
//                cmd.Parameters.AddWithValue("prm_CourseId", lmsLecture.courseId);
//                cmd.Parameters.AddWithValue("prm_createdOn", lmsLecture.CreatedOn);
//                cmd.Parameters.AddWithValue("prm_createdById", lmsLecture.CreatedById);
//                cmd.Parameters.AddWithValue("prm_modifiedOn", lmsLecture.ModifiedOn);
//                cmd.Parameters.AddWithValue("prm_modifiedById", lmsLecture.ModifiedById);
//                cmd.Parameters.AddWithValue("prm_isActive", lmsLecture.IsActive);
//                cmd.Parameters.AddWithValue("prm_dbOperation", lmsLecture.DBoperation.ToString());
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
//        public List<LMSLectureDE> SearchLMSLecture(string WhereClause, MySqlCommand cmd)
//        {
//            bool closeConnection = false;
//            //WhereClause = string.Empty;
//            List<LMSLectureDE> lmsLecture = new List<LMSLectureDE>();
//            try
//            {
//                if (cmd == null)
//                {
//                    cmd = LMSDataContext.OpenMySqlConnection();
//                    closeConnection = true;
//                }
//                lmsLecture = cmd.Connection.Query<LMSLectureDE>("call lms.LMS_Search_Lecture('" + WhereClause + "')").ToList();
//                return lmsLecture;
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
