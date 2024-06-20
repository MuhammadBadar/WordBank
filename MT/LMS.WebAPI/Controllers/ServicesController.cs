using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LMS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private ServicesService _serSvc;
        public ServicesController()
        {
            _serSvc = new ServicesService();
        }
        // HTTP Methods 
        [HttpGet]
        public IActionResult GetReceipt()
        {
            List<ServicesDE> list = new List<ServicesDE>();
            list = _serSvc.SearchServices(new ServicesDE());
            return Ok(list);
        }

        [HttpPost("{Search}")]
        public IActionResult SaveReceipt(ServicesDE Services)
        {
            List<ServicesDE> list = _serSvc.SearchServices(Services);
            return Ok(list);
        }


        [HttpGet("{id}")]
        public IActionResult GetServicesById(int id)
        {
            List<ServicesDE> list = new List<ServicesDE>();
            list = _serSvc.SearchServices(new ServicesDE { Id = id });
            return Ok(list[0]);

        }

        [HttpPost]
        public IActionResult PostServices(ServicesDE Services)
        {
            Services.DBoperation = DBoperations.Insert;
            _serSvc.ManageServices(Services);
            return Ok();
        }

        [HttpPut]
        public IActionResult PutServices(ServicesDE Services)
        {
            Services.DBoperation = DBoperations.Update;
            _serSvc.ManageServices(Services);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteServices(int id)
        {
            ServicesDE ServicesDE = new ServicesDE();
            ServicesDE.DBoperation = DBoperations.Delete;
            ServicesDE.Id = id;
            _serSvc.ManageServices(ServicesDE);
            return Ok();
        }
    }
}

