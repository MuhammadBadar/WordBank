using LMS.Core.Entities.Receivable;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Service.Receivable 
{
    public interface IRcvService
    {
        public bool ManageCustomer (CustomerDE _cust);
        public List<CustomerDE> SearchCustomer (CustomerDE _cust );


        public bool ManageInvoice(InvoiceDE _inv);
        public List<InvoiceDE> SearchInvoice(InvoiceDE _inv);


        public bool ManageReceipt (ReceiptDE _rcpt );
        public List<ReceiptDE> SearchReceipt (ReceiptDE _rcpt );




    }
}
