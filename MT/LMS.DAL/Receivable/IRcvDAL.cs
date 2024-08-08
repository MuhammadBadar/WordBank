using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Entities.Receivable;
using LMS.Core.Constants;

namespace LMS.DAL.Receivable
{
    public interface IRcvDAL
    {
        public bool RCV_Manage_Customer(CustomerDE mod, MySqlCommand? cmd);

        public List<CustomerDE> RCV_Search_Customer(string WhereClause, MySqlCommand? cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE);
      

        public bool RCV_Manage_Invoice(InvoiceDE mod, MySqlCommand? cmd);
        public List<InvoiceDE> RCV_Search_Invoice (string WhereClause, MySqlCommand cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE);

        public bool RCV_Manage_Receipt (ReceiptDE mod , MySqlCommand? cmd);
        public List<ReceiptDE> RCV_Search_Receipt (string WhereClause, MySqlCommand cmd, int PageNo = 1, int PageSize = AppConstants.GRID_MAX_PAGE_SIZE);
         

    }
}
