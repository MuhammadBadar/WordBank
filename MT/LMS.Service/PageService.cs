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
    public class PageService
    {
        #region Class Variables
        private PageDAL _pageDAL;
        private CoreDAL _coreDAL;
        private Logger _logger;
        #endregion
        #region Constructor
        public PageService()
        {
            _pageDAL = new PageDAL();
            _coreDAL = new CoreDAL();
            _logger = LogManager.GetLogger("fileLogger");
        }
        #endregion
        #region  customerreceipts
        public bool ManagePage(PageDE _page)
        {
            bool retVal = false;
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;

                if (_page.DBoperation == DBoperations.Insert)
                    _page.Id = _coreDAL.GetnextId(TableNames.page.ToString());
                retVal = _pageDAL.ManagePage(_page, cmd);
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
        public List<PageDE> SearchPage(PageDE _page)
        {
            List<PageDE> retVal = new List<PageDE>();
            bool closeConnectionFlag = false;
            MySqlCommand? cmd = null;
            try
            {
                cmd = LMSDataContext.OpenMySqlConnection();
                closeConnectionFlag = true;
                string WhereClause = " Where 1=1";
                if (_page.Id != default)
                    WhereClause += $" AND Id={_page.Id}";
                if (_page.NovelId != default)
                    WhereClause += $" and NovelId like ''" + _page.NovelId + "''";
                if (_page.ChapterId != default)
                    WhereClause += $" and ChapterId like ''" + _page.ChapterId + "''";
                if (_page.PageNo != default)
                    WhereClause += $" and PageNo like ''" + _page.PageNo + "''";
                if (_page.Content != default)
                    WhereClause += $" and Content like ''" + _page.Content + "''";
                if (_page.IsActive != default && _page.IsActive == true)
                    WhereClause += $" AND IsActive=1";


                retVal = _pageDAL.SearchPage(WhereClause, cmd);
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
