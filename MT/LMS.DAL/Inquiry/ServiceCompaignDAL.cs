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
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace LMS.DAL.Inquiry
{
    public partial class InquiryDAL : IInqDAL
    {

        #region DbOperation
        public bool INQ_Manage_ServiceCompaign(ServiceCompaignDE mod, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = SPNames.INQ_Manage_ServiceCompaign;
                cmd.Parameters.AddWithValue("prm_id", mod.Id);
                cmd.Parameters.AddWithValue("prm_clientId", mod.ClientId);
                cmd.Parameters.AddWithValue("prm_templateId", mod.TemplateId);
                cmd.Parameters.AddWithValue("prm_serviceId", mod.ServiceId);
                cmd.Parameters.AddWithValue("prm_startDate", mod.StartDate);
                cmd.Parameters.AddWithValue("prm_endDate", mod.EndDate);
                cmd.Parameters.AddWithValue("prm_title", mod.Title);
                cmd.Parameters.AddWithValue("prm_createdOn", mod.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", mod.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", mod.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", mod.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", mod.IsActive);
                cmd.Parameters.AddWithValue("prm_dboperation", mod.DBoperation.ToString());
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


        public List<ServiceCompaignDE> INQ_Search_ServiceCompaign(string WhereClause, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            List<ServiceCompaignDE> cust = new List<ServiceCompaignDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                var Parameters = new
                {
                    prm_WhereClause = WhereClause
                ,
                 

                };
                cust = cmd.Connection.Query<ServiceCompaignDE>(SPNames.INQ_Search_ServiceCompaign.ToString(), Parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
                return cust;
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

