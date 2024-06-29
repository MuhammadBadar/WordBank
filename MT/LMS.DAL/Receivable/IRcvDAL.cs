using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LMS.Core.Entities;
using LMS.Core.Entities.Receivable;
using LMS.Core.Constants;

namespace LMS .DAL.Receivable
{
    public interface IRcvDAL
    {
        public bool ManageCustomer(CustomerDE _cust, MySqlCommand? cmd);
        public List<CustomerDE> SearchCustomer(string WhereClause, MySqlCommand cmd);

        public bool ManageInvoice(InvoiceDE _inv, MySqlCommand? cmd);
        public List<InvoiceDE> SearchInvoice(string WhereClause, MySqlCommand cmd);

        public bool ManageReceipt (ReceiptDE _rcpt, MySqlCommand? cmd);
        public List<ReceiptDE> SearchReceipt (string WhereClause, MySqlCommand cmd);


    }
}
