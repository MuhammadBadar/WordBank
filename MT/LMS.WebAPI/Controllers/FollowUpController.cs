using LMS.Core.Entities;
using LMS.Core.Enums;
using LMS.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LMS.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowUpController : ControllerBase
    {
        private FollowUpService _followSvc;
        public FollowUpController()
        {
            _followSvc = new FollowUpService();
        }
        // HTTP Methods 
        [HttpGet]
        public IActionResult GetFollowUp()
        {
            List<FollowUpDE> list = new List<FollowUpDE>();
            list = _followSvc.SearchFollowUp(new FollowUpDE());
            return Ok(list);
        }

        [HttpPost("{Search}")]
        public IActionResult SaveFollowUp(FollowUpDE FollowUp)
        {
            List<FollowUpDE> list = _followSvc.SearchFollowUp(FollowUp);
            return Ok(list);
        }


        [HttpGet("{id}")]
        public IActionResult GetFollowUpyId(int id)
        {
            List<FollowUpDE> list = new List<FollowUpDE>();
            list = _followSvc.SearchFollowUp(new FollowUpDE { Id = id });
            return Ok(list[0]);

        }

        [HttpPost]
        public IActionResult PostFollowUp(FollowUpDE FollowUp)
        {
            FollowUp.DBoperation = DBoperations.Insert;
            _followSvc.ManageFollowUp(FollowUp);
            return Ok();
        }

        [HttpPut]
        public IActionResult PutFollowUp(FollowUpDE FollowUp)
        {
            FollowUp.DBoperation = DBoperations.Update;
            _followSvc.ManageFollowUp(FollowUp);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFollowUp(int id)
        {
            FollowUpDE FollowUpDE = new FollowUpDE();
            FollowUpDE.DBoperation = DBoperations.Delete;
            FollowUpDE.Id = id;
            _followSvc.ManageFollowUp(FollowUpDE);
            return Ok();
        }
    }
}
