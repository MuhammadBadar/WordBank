using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LMS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : ControllerBase
    {
        private ReceiptService _recSvc;
        public ReceiptController()
        {
            _recSvc = new ReceiptService();
        }
        // HTTP Methods 
        [HttpGet]
        public IActionResult GetReceipt()
        {
            List<ReceiptDE> list = new List<ReceiptDE>();
            list = _recSvc.SearchReceipt(new ReceiptDE());
            return Ok(list);
        }

        [HttpPost("{Search}")]
        public IActionResult SaveReceipt(ReceiptDE Receipt)
        {
            List<ReceiptDE> list = _recSvc.SearchReceipt(Receipt);
            return Ok(list);
        }


        [HttpGet("{id}")]
        public IActionResult GetReceiptById(int id)
        {
            List<ReceiptDE> list = new List<ReceiptDE>();
            list = _recSvc.SearchReceipt(new ReceiptDE { Id = id });
            return Ok(list[0]);

        }

        [HttpPost]
        public IActionResult PostReceipt(ReceiptDE Receipt)
        {
            Receipt.DBoperation = DBoperations.Insert;
            _recSvc.ManageReceipt(Receipt);
            return Ok();
        }

        [HttpPut]
        public IActionResult PutReceipt(ReceiptDE Receipt)
        {
            Receipt.DBoperation = DBoperations.Update;
            _recSvc.ManageReceipt(Receipt);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteReceipt(int id)
        {
            ReceiptDE ReceiptDE = new ReceiptDE();
            ReceiptDE.DBoperation = DBoperations.Delete;
            ReceiptDE.Id = id;
            _recSvc.ManageReceipt(ReceiptDE);
            return Ok();
        }
    }
}
