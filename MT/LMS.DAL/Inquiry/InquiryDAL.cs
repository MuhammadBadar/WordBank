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
            public bool INQ_Manage_Inquiry(InquiryDE mod, MySqlCommand? cmd)
            {
                bool closeConnection = false;
                try
                {
                    if (cmd == null)
                    {
                        cmd = LMSDataContext.OpenMySqlConnection();
                        closeConnection = true;
                    }
                    cmd.CommandText = SPNames.INQ_Manage_Inquiry;
                cmd.Parameters.AddWithValue("prm_clientId", mod.ClientId);
                cmd.Parameters.AddWithValue("prm_id", mod.Id);
                cmd.Parameters.AddWithValue("prm_cityId", mod.CityId);
                cmd.Parameters.AddWithValue("prm_statusId", mod.StatusId);
                cmd.Parameters.AddWithValue("prm_compainId", mod.CompainId);
                cmd.Parameters.AddWithValue("prm_serviceIds", mod.ServiceIds);
                cmd.Parameters.AddWithValue("prm_inquiryName", mod.InquiryName);
                cmd.Parameters.AddWithValue("prm_inquiryEmail", mod.InquiryEmail);
                cmd.Parameters.AddWithValue("prm_inquiryCell", mod.InquiryCell);
                cmd.Parameters.AddWithValue("prm_area", mod.Area);
                cmd.Parameters.AddWithValue("prm_cNIC", mod.CNIC);
                cmd.Parameters.AddWithValue("prm_inquiryComments", mod.InquiryComments);
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
            public List<InquiryDE> INQ_Search_Inquiry(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE)
        {
                bool closeConnection = false;
                List<InquiryDE> cust = new List<InquiryDE>();
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
                    cust = cmd.Connection.Query<InquiryDE>(SPNames.INQ_Search_Inquiry.ToString(), parameters, commandType: System.Data.CommandType.StoredProcedure).ToList();
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
