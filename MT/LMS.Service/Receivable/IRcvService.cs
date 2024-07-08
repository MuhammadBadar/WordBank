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
        public CustomerDE ManageCustomer(CustomerDE mod);
        public List<CustomerDE> SearchCustomer (CustomerDE mod );

        public InvoiceDE ManageInvoice(InvoiceDE mod);
        public List<InvoiceDE> SearchInvoice(InvoiceDE mod);

        public ReceiptDE ManageReceipt (ReceiptDE mod);
        public List<ReceiptDE> SearchReceipt (ReceiptDE mod);

       


    }
}
