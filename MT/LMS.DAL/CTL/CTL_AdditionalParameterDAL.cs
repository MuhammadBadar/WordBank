using Dapper;
using MySql.Data.MySqlClient;
using LMS.Core.Entities.CTL;
using LMS.Core.Constants;
using System.Data;


namespace LMS.DAL.CTL 
{
    public partial class CTLDAL : ICtlDAL
    {

        #region DbOperations
        public bool CTL_Manage_AdditionalParameter (CTL_AdditionalParameterDE mod, MySqlCommand? cmd)
        {
            bool closeConnection = false;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = SPNames.CTL_Manage_AdditionalParameter;
                cmd.Parameters.AddWithValue("prm_entityTypeId", mod.EntityTypeId);
                cmd.Parameters.AddWithValue("prm_entityId", mod.EntityId);
                cmd.Parameters.AddWithValue("prm_clientId", mod.ClientId);
                cmd.Parameters.AddWithValue("prm_fieldId", mod.FieldId);
                cmd.Parameters.AddWithValue("prm_fieldValue", mod.FieldValue);
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
        public List<CTL_AdditionalParameterDE> CTL_Search_AdditionalParameter(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE)
        {
            bool closeConnection = false;
            List<CTL_AdditionalParameterDE> Add = new List<CTL_AdditionalParameterDE>();
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
                Add = cmd.Connection.Query<CTL_AdditionalParameterDE>(SPNames.CTL_Search_AdditionalParameter.ToString(), parameters, commandType: CommandType.StoredProcedure).ToList();
                return Add;
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

