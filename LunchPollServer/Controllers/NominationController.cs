﻿using System.Diagnostics;
using LunchPollServer.DataTransfer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LunchPollServer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class NominationController : Controller
    {
        private readonly NominationService _nominationService;
        public NominationController(NominationService nominationService)
        {
            _nominationService = nominationService;
        }

        // GET api/nomination
        [HttpGet]
        public IPage<Nomination> Get(GetNominationFilters getNominationFilters)
        {
            var nominations = _nominationService.Get(getNominationFilters);
            return nominations;
        }

        //// GET api/nomination/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/nomination
        [HttpPost]
        public Nomination Post([FromBody]Nomination nomination)
        {
            return _nominationService.Create(nomination.Name);
        }

        // Patch api/nomination/approve
        [HttpPatch("approve")]
        public Nomination Approve([FromBody]Nomination nomination)
        {
            return _nominationService.Approve(nomination.Id);
        }

        // Patch api/nomination/veto
        [HttpPatch("veto")]
        public Nomination Veto([FromBody]Nomination nomination)
        {
            return _nominationService.Veto(nomination.Id);
        }

        //// PUT api/nomination/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/nomination/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
