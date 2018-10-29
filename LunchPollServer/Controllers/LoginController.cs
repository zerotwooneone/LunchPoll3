using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using LunchPollServer.Login;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LunchPollServer.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        //// GET: api/Login
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Login/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/Login
        [Route("api/[controller].json")]
        [HttpPost]
        public async Task<ActionResult<LoginUserModel>> Post([FromBody] LoginParamModel loginParamModel)
        {
            if (loginParamModel == null)
            {
                return BadRequest();
            }
            if (loginParamModel.UserName == "username" && loginParamModel.Password == "password")
            {
                return new JsonResult(new LoginUserModel {UserId = "some c# id"});
            }
            else
            {
                return Unauthorized();
            }
        }

        //// PUT: api/Login/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
