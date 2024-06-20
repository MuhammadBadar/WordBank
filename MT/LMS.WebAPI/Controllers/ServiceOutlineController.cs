using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LMS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceOutlineController : ControllerBase
    {
        private ServiceOutlineService _sevSvc;
        public ServiceOutlineController()
        {
            _sevSvc = new ServiceOutlineService();
        }
        // HTTP Methods 
        [HttpGet]
        public IActionResult GetServiceOutline()
        {
            List<ServiceOutlineDE> list = new List<ServiceOutlineDE>();
            list = _sevSvc.SearchServiceOutline(new ServiceOutlineDE());
            return Ok(list);
        }

        [HttpPost("{Search}")]
        public IActionResult SaveServiceOutline(ServiceOutlineDE ServiceOutline)
        {
            List<ServiceOutlineDE> list = _sevSvc.SearchServiceOutline(ServiceOutline);
            return Ok(list);
        }


        [HttpGet("{id}")]
        public IActionResult GetServiceOutlineById(int id)
        {
            List<ServiceOutlineDE> list = new List<ServiceOutlineDE>();
            list = _sevSvc.SearchServiceOutline(new ServiceOutlineDE { Id = id });
            return Ok(list[0]);

        }

        [HttpPost]
        public IActionResult PostServiceOutline(ServiceOutlineDE ServiceOutline)
        {
            ServiceOutline.DBoperation = DBoperations.Insert;
            _sevSvc.ManageServiceOutline(ServiceOutline);
            return Ok();
        }

        [HttpPut]
        public IActionResult PutServiceOutline(ServiceOutlineDE ServiceOutline)
        {
            ServiceOutline.DBoperation = DBoperations.Update;
            _sevSvc.ManageServiceOutline(ServiceOutline);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteServiceOutline(int id)
        {
            ServiceOutlineDE ServiceOutlineDE = new ServiceOutlineDE();
            ServiceOutlineDE.DBoperation = DBoperations.Delete;
            ServiceOutlineDE.Id = id;
            _sevSvc.ManageServiceOutline(ServiceOutlineDE);
            return Ok();
        }
    }
}
