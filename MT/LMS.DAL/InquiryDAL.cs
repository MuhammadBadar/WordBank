using Dapper;
using LMS.Core.Entities;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.DAL
{
   public class InquiryDAL
    {
        #region inq Operations

        public bool ManageInquiry(InquiryDE inq, MySqlCommand cmd = null)
        {
            bool closeConnectionFlag = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (cmd.Connection.State == ConnectionState.Open)
                    Console.WriteLine("Connection  has been created");
                else
                    Console.WriteLine("Connection error");
                cmd.CommandText = "ManageInquiry";
                cmd.Parameters.AddWithValue("prm_id", inq.Id);
                cmd.Parameters.AddWithValue("prm_inquiryName", inq.InquiryName);
                cmd.Parameters.AddWithValue("prm_inquiryEmail", inq.InquiryEmail);
                cmd.Parameters.AddWithValue("prm_inquiryCell", inq.InquiryCell);
                cmd.Parameters.AddWithValue("prm_inquiryComments", inq.InquiryComments);
                cmd.Parameters.AddWithValue("prm_createdOn", inq.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", inq.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", inq.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", inq.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", inq.IsActive);
                cmd.Parameters.AddWithValue("prm_DBoperation", inq.DBoperation.ToString());

                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<InquiryDE> SearchInquiry(string whereClause, MySqlCommand cmd = null)
        {
            List<InquiryDE> top = new List<InquiryDE>();
            bool closeConnectionFlag = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnectionFlag = true;
                }
                if (cmd.Connection.State == ConnectionState.Open)
                    Console.WriteLine("Connection  has been created");
                else
                    Console.WriteLine("Connection error");
                top = cmd.Connection.Query<InquiryDE>("call lms.SearchInquiry( '" + whereClause + "')").ToList();
                return top;
            }
            catch (Exception exp)
            {
                return top;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        #endregion
    }
}
