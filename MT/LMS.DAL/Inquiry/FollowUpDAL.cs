using Dapper;
using MySql.Data.MySqlClient;
using System;

using LMS.Core.Entities.Inquiry;
using LMS.Core.Constants;
using LMS.Core.Enums;
using System.Drawing.Printing; 
using System.Drawing;
using System.Data; 
using LMS.DAL.Inquiry;

namespace LMS.DAL.Inquiry 
{ 
    public partial class InquiryDAL : IInqDAL
    {

        #region DbOperations
        public bool INQ_Manage_FollowUp(FollowUpDE mod, MySqlCommand? cmd)
        {
            bool closeConnection = false; 
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = SPNames.INQ_Manage_FollowUp;
                cmd.Parameters.AddWithValue("prm_clientId", mod.ClientId);
                cmd.Parameters.AddWithValue("prm_id", mod.Id);
                cmd.Parameters.AddWithValue("prm_statusId", mod.StatusId);
                cmd.Parameters.AddWithValue("prm_inquiryId", mod.InquiryId);
                cmd.Parameters.AddWithValue("prm_date", mod.Date);
                cmd.Parameters.AddWithValue("prm_nextAppointmentDate", mod.NextAppointmentDate);
                cmd.Parameters.AddWithValue("prm_comment", mod.Comment);
                cmd.Parameters.AddWithValue("prm_createdOn", mod.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", mod.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", mod.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", mod.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", mod.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", mod.DBoperation.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                cmd.Parameters.Clear();
                if (closeConnection)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<FollowUpDE> INQ_Search_FollowUp(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE)
        {
            bool closeConnection = false;
            List<FollowUpDE> follow = new List<FollowUpDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                var parameters = new
                {
                    prm_WhereClause = WhereClause
                ,
                    prm_Start = PageNo
                ,
                    prm_Limit = PageSize
                ,

                };
                follow = cmd.Connection.Query<FollowUpDE>(SPNames.INQ_Search_FollowUp.ToString(), parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
                return follow;
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

    }
    #endregion
}

