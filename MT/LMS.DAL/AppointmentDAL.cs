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
    public class AppointmentDAL
    {
        #region DbOperations
        public bool ManageAppointment(AppointmentDE _appt, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_Appointment";

               
                cmd.Parameters.AddWithValue("prm_id", _appt.Id);
                cmd.Parameters.AddWithValue("prm_inquiryId", _appt.InquiryId);
                cmd.Parameters.AddWithValue("prm_statusId", _appt.StatusId);
                cmd.Parameters.AddWithValue("prm_nextApptDate", _appt.NextApptDate);
                cmd.Parameters.AddWithValue("prm_comment", _appt.Comment);
                cmd.Parameters.AddWithValue("prm_createdOn", _appt.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _appt.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _appt.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _appt.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _appt.IsActive);
                cmd.Parameters.AddWithValue("prm_DBoperation", _appt.DBoperation.ToString());

                
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
        public List<AppointmentDE> SearchAppointment(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<AppointmentDE> lec = new List<AppointmentDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<AppointmentDE>("call lms.Search_Appointment('" + WhereClause + "')").ToList();
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
