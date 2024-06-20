using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using LMS.Core.Entities;
using MySql.Data.MySqlClient;

namespace LMS.DAL
{
    public class FollowUpDAL
    {
        #region DbOperations
        public bool ManageFollowUp(FollowUpDE _follow, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_FollowUp";

                cmd.Parameters.AddWithValue("prm_Id", _follow.Id);
                cmd.Parameters.AddWithValue("prm_statusId", _follow.StatusId);
                cmd.Parameters.AddWithValue("prm_inquiryId", _follow.InquiryId);
                cmd.Parameters.AddWithValue("prm_date", _follow.Date);
                cmd.Parameters.AddWithValue("prm_nextAppointmentDate", _follow.NextAppointmentDate);
                cmd.Parameters.AddWithValue("prm_comment", _follow.Comment);
                cmd.Parameters.AddWithValue("prm_createdOn", _follow.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _follow.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _follow.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _follow.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _follow.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _follow.DBoperation.ToString());
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
        public List<FollowUpDE> SearchFollowUp(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<FollowUpDE> lec = new List<FollowUpDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<FollowUpDE>("call lms.Search_FollowUp('" + WhereClause + "')").ToList();
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
