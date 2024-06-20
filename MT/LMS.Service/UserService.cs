using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.DAL;
using MySql.Data.MySqlClient;
using NLog;

namespace LMS.Service
{
    public class UserService
    {
        #region Class Members/Class Variables

        private UserDAL _userDAL;
        private CoreDAL _corDAL;
        private Logger _logger;

        #endregion
        #region Constructors
        public UserService()
        {
            _userDAL = new UserDAL();
            _corDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region User
        public bool ManagementUser(UserDE mod)
        {
            bool retVal = false;
            MySqlCommand cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                if (mod.DBoperation == DBoperations.Insert)
                    mod.Id = _corDAL.GetnextId(TableNames.user.ToString());
                retVal = _userDAL.ManageUser(mod);
                if (retVal == true)
                    mod.DBoperation = DBoperations.NA;
                return retVal;
            }
            catch (Exception ex)
            {
                _logger.Error(ex);
                throw;
            }
            finally
            {
                if (cmd != null)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
        }
        public List<UserDE> SearchUsers(UserDE mod)
        {
            List<UserDE> Users = new List<UserDE>();
            bool closeConnectionFlag = false;
            MySqlCommand cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                #region Search

                string whereClause = " Where 1=1";
                if (mod.Id != default && mod.Id != 0)
                    whereClause += $" AND Id={mod.Id}";

                if (mod.StudentName != default && mod.StudentName != "")
                    whereClause += $" AND StudentName like ''" +mod.StudentName + "'' ";

                if (mod.GuardiaName != default && mod.GuardiaName != "")
                    whereClause += $" AND GuardiaName like ''" + mod.GuardiaName + "''";
               
                    if (mod.GuardiaRelationship != default && mod.GuardiaRelationship != "")
                        whereClause += $" AND GuardiaRelationship like ''" + mod.GuardiaRelationship + "'' ";

                if (mod.GuardiaProfession != default && mod.GuardiaProfession != "")
                    whereClause += $" AND GuardiaProfession like ''" + mod.GuardiaProfession + "''";
              
                    if (mod.Degree != default && mod.Degree != "")
                        whereClause += $" AND Degree like ''" + mod.Degree + "'' ";

                if (mod.University != default && mod.University != "")
                    whereClause += $" AND University like ''" + mod.University + "''";

                if (mod.CNIC != default)
                    whereClause += $" and CNIC  like ''" + mod.CNIC + "''";


                if (mod.JoiningDate != default)
                    whereClause += $" and JoiningDate  like ''" + mod.JoiningDate + "''";

                  if (mod.Address != default && mod.Address != "")
                    whereClause += $" AND Address like ''" + mod.Address + "'' ";

                if (mod.Email != default && mod.Email != "")
                    whereClause += $" AND Email like ''" + mod.Email + "'' ";

                if (mod.Password != default && mod.Password != "")
                    whereClause += $" AND Password like ''" + mod.Password + "''";


                whereClause += $" AND IsActive ={mod.IsActive}";
                Users = _userDAL.SearchUser(whereClause, cmd);

                #endregion
            }
            catch (Exception exp)
            {
                _logger.Error(exp);
                throw;
            }
            finally
            {
                if (closeConnectionFlag)
                    LMSDataContext.CloseMySqlConnection(cmd);
            }
            return Users;
        }
        #endregion
    }
}
