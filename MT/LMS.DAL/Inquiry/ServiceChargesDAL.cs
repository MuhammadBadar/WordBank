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
        public bool INQ_Manage_ServiceCharges(ServiceChargesDE mod, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = SPNames.INQ_Manage_ServiceCharges;
                cmd.Parameters.AddWithValue("prm_id", mod.Id);
                cmd.Parameters.AddWithValue("prm_inquiryId", mod.InquiryId);
                cmd.Parameters.AddWithValue("prm_serviceCharges", mod.ServiceCharges);
                cmd.Parameters.AddWithValue("prm_nextDueDate", mod.NextDueDate);
                cmd.Parameters.AddWithValue("prm_comments", mod.Comments);
                cmd.Parameters.AddWithValue("prm_createdOn", mod.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", mod.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", mod.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", mod.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", mod.IsActive);
                cmd.Parameters.AddWithValue("prm_DBoperation", mod.DBoperation.ToString());

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
        public List<ServiceChargesDE> INQ_Search_ServiceCharges(string WhereClause, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            List<ServiceChargesDE> inq = new List<ServiceChargesDE>();
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
                

                };
                inq = cmd.Connection.Query<ServiceChargesDE>(SPNames.INQ_Search_ServiceCharges.ToString(), parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
                return inq;
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
