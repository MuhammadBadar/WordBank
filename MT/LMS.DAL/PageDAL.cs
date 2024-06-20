using Dapper;
using LMS.Core.Entities;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.DAL
{
    public class PageDAL
    {
        #region DbOperations
        public bool ManagePage(PageDE _page, MySqlCommand? cmd)
        {
            bool closeConnection = true;
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                cmd.CommandText = "Manage_Page";
                cmd.Parameters.AddWithValue("prm_id", _page.Id);
                cmd.Parameters.AddWithValue("prm_novelId", _page.NovelId);
                cmd.Parameters.AddWithValue("prm_chapterId", _page.ChapterId);
                cmd.Parameters.AddWithValue("prm_pageNo", _page.PageNo);
                cmd.Parameters.AddWithValue("prm_content", _page.Content);
                cmd.Parameters.AddWithValue("prm_createdOn", _page.CreatedOn);
                cmd.Parameters.AddWithValue("prm_createdById", _page.CreatedById);
                cmd.Parameters.AddWithValue("prm_modifiedOn", _page.ModifiedOn);
                cmd.Parameters.AddWithValue("prm_modifiedById", _page.ModifiedById);
                cmd.Parameters.AddWithValue("prm_isActive", _page.IsActive);
                cmd.Parameters.AddWithValue("prm_dbOperation", _page.DBoperation.ToString());
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
        public List<PageDE> SearchPage(string WhereClause, MySqlCommand cmd)
        {
            bool closeConnection = false;
            //WhereClause = string.Empty;
            List<PageDE> lec = new List<PageDE>();
            try
            {
                if (cmd == null)
                {
                    cmd = LMSDataContext.OpenMySqlConnection();
                    closeConnection = true;
                }
                lec = cmd.Connection.Query<PageDE>("call lms.Search_Page('" + WhereClause + "')").ToList();
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
