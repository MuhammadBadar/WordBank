using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service
{
    public class StudentFormService
    {
        #region Class Variables
        private StudentFormDAL _stdDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public StudentFormService()
        {
            _stdDAL = new StudentFormDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region  customerreceipts
        public bool ManageStudentForm(StudentFormDE StudentForm)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (StudentForm.DBoperation == DBoperations.Insert)
                    StudentForm.Id = _coreDAL.GetnextId(TableNames.StudentForm.ToString());
                retVal = _stdDAL.ManageStudentForm(StudentForm, cmd);

                return retVal;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<StudentFormDE> SearchStudentForm(StudentFormDE StudentForm)
        {
            List<StudentFormDE> retVal = new List<StudentFormDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";

                if (StudentForm.Id != default)
                    WhereClause += $" AND Id={StudentForm.Id}";
                if (StudentForm.StudentName != default)
                    WhereClause += $" and StudentName like ''" + StudentForm.StudentName + "''";
                if (StudentForm.GuardianName != default)
                    WhereClause += $" and GuardianName like ''" + StudentForm.GuardianName + "''";
                if (StudentForm.GuardianRelationship != default)
                    WhereClause += $" and GuardianRelationship like ''" + StudentForm.GuardianRelationship + "''";
                if (StudentForm.GuardianProfession != default)
                    WhereClause += $" and GuardianProfession like ''" + StudentForm.GuardianProfession + "''";
                if (StudentForm.Degree != default)
                    WhereClause += $" and Degree like ''" + StudentForm.Degree + "''";
                if (StudentForm.University != default)
                    WhereClause += $" and University like ''" + StudentForm.University + "''";
                if (StudentForm.CNIC != default)
                    WhereClause += $" and CNIC like ''" + StudentForm.CNIC + "''";
                if (StudentForm.JoiningDate != default)
                    WhereClause += $" and JoiningDate like ''" + StudentForm.JoiningDate + "''";
                if (StudentForm.Address != default)
                    WhereClause += $" and Address like ''" + StudentForm.Address + "''";

                if (StudentForm.IsActive != default && StudentForm.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _stdDAL.SearchStudentForm(WhereClause, cmd);
                return retVal;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
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
