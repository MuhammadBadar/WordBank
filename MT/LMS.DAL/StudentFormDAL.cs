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
    public class StudentFormDAL
    {

        #region Operations

        public bool ManageStudentForm(StudentFormDE StudentForm, MySqlCommand? cmd)
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
                cmd.CommandText = "ManageStudentForm";
                cmd.Parameters.AddWithValue("@prm_id", StudentForm.Id);
                cmd.Parameters.AddWithValue("@prm_studentName", StudentForm.StudentName);
                cmd.Parameters.AddWithValue("@prm_guardianName", StudentForm.GuardianName);
                cmd.Parameters.AddWithValue("@prm_guardianRelationship", StudentForm.GuardianRelationship);
                cmd.Parameters.AddWithValue("@prm_guardianProfession", StudentForm.GuardianProfession);
                cmd.Parameters.AddWithValue("@prm_degree", StudentForm.Degree);
                cmd.Parameters.AddWithValue("@prm_university", StudentForm.University);
                cmd.Parameters.AddWithValue("@prm_cNIC", StudentForm.CNIC);
                cmd.Parameters.AddWithValue("@prm_joiningDate", StudentForm.JoiningDate);
                cmd.Parameters.AddWithValue("@prm_address", StudentForm.Address);
                cmd.Parameters.AddWithValue("@prm_createdBy", StudentForm.CreatedById);
                cmd.Parameters.AddWithValue("@prm_createdOn", StudentForm.CreatedOn);
                cmd.Parameters.AddWithValue("@prm_modifiedBy", StudentForm.ModifiedById);
                cmd.Parameters.AddWithValue("@prm_modifiedOn", StudentForm.ModifiedOn);
                cmd.Parameters.AddWithValue("@prm_isActive", StudentForm.IsActive);
                cmd.Parameters.AddWithValue("@prm_dBoperation", StudentForm.DBoperation.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public bool AlterStudentForm(StudentFormDE StudentForm, int? Id = null, MySqlCommand cmd = null)
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
                cmd.CommandText = "AlterStudentForm";
                cmd.Parameters.AddWithValue("@id", Id);
                cmd.Parameters.AddWithValue("@DBoperation", StudentForm.DBoperation.ToString());
                cmd.ExecuteNonQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<StudentFormDE> SearchStudentForm(string whereClause, MySqlCommand cmd = null)
        {
            List<StudentFormDE> top = new List<StudentFormDE>();
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
                top = cmd.Connection.Query<StudentFormDE>("call lms.SearchStudentForm( '" + whereClause + "')").ToList();
                return top;
            }
            catch (Exception)
            {

                throw;
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
