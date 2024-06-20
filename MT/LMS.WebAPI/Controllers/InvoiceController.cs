using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LMS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private InvoiceService _serSvc;
        private InvoiceService _invSvc;

        public InvoiceController()
        {
            _invSvc = new InvoiceService();
        }
        // HTTP Methods 
        [HttpGet]
        public IActionResult GetInvoice()
        {
            List<InvoiceDE> list = new List<InvoiceDE>();
            list = _invSvc.SearchInvoice(new InvoiceDE());
            return Ok(list);
        }

        [HttpPost("{Search}")]
        public IActionResult SaveInvoice(InvoiceDE Invoice)
        {
            List<InvoiceDE> list = _invSvc.SearchInvoice(Invoice);
            return Ok(list);
        }


        [HttpGet("{id}")]
        public IActionResult GetInvoiceById(int id)
        {
            List<InvoiceDE> list = new List<InvoiceDE>();
            list = _invSvc.SearchInvoice(new InvoiceDE { Id = id });
            return Ok(list[0]);

        }

        [HttpPost]
        public IActionResult PostInvoice(InvoiceDE Invoice)
        {
            Invoice.DBoperation = DBoperations.Insert;
            _invSvc.ManageInvoice(Invoice);
            return Ok();
        }

        [HttpPut]
        public IActionResult PutInvoice(InvoiceDE Invoice)
        {
            Invoice.DBoperation = DBoperations.Update;
            _invSvc.ManageInvoice(Invoice);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteInvoice(int id)
        {
            InvoiceDE InvoiceDE = new InvoiceDE();
            InvoiceDE.DBoperation = DBoperations.Delete;
            InvoiceDE.Id = id;
            _serSvc.ManageInvoice(InvoiceDE);
            return Ok();
        }
    }
}


