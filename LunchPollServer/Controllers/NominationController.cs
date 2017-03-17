using System.Collections.Generic;
using LunchPollServer.DataTransfer;
using Microsoft.AspNetCore.Mvc;

namespace LunchPollServer.Controllers
{
    [Route("api/[controller]")]
    public class NominationController : Controller
    {
        private readonly INominationRepository _nominationRepository;
        public NominationController(INominationRepository nominationRepository)
        {
            _nominationRepository = nominationRepository;
        }

        // GET api/values
        [HttpGet]
        public IEnumerable<Nomination> Get(GetNominationFilters getNominationFilters)
        {

            var nominations = _nominationRepository.Get(getNominationFilters);
            return nominations;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public Nomination Post([FromBody]Nomination nomination)
        {
            return _nominationRepository.Create(nomination.Name);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
