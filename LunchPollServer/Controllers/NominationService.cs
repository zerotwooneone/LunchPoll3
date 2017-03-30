using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using LunchPollServer.DataTransfer;
using Microsoft.AspNetCore.Server.Kestrel;

namespace LunchPollServer.Controllers
{
    public class NominationService
    {
        private readonly INominationRepository _nominationRepository;
        private readonly UserService _userService;
        private const int ArbitrarilyLargeValidationValue=1000;

        public NominationService(INominationRepository nominationRepository,
            UserService userService)
        {
            _nominationRepository = nominationRepository;
            _userService = userService;
        }

        public Nomination Create(string name)
        {
            return _nominationRepository.Create(name);
        }

        public Nomination Approve(int nominationId)
        {
            return _nominationRepository.Approve(nominationId, _userService.UserId);
        }

        public Nomination Veto(int nominationId)
        {
            return _nominationRepository.Veto(nominationId, _userService.UserId);
        }

        public IPage<Nomination> Get(GetNominationFilters getNominationFilters)
        {
            if (getNominationFilters.PageIndex.HasValue &&
                (getNominationFilters.PageIndex.Value < 0||
                getNominationFilters.PageIndex.Value > ArbitrarilyLargeValidationValue))
            {
                throw new Exception("Invalid Filter");
            }
            if (getNominationFilters.PageSize.HasValue &&
                (getNominationFilters.PageSize.Value < 0 ||
                getNominationFilters.PageSize.Value > ArbitrarilyLargeValidationValue))
            {
                throw new Exception("Invalid Filter");
            }
            var nominations = _nominationRepository.Get(_userService.UserId,
                getNominationFilters.PageSize,
                getNominationFilters.PageIndex);
            return nominations;
        }

    }
}