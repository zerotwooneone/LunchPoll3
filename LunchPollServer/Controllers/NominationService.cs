using System.Collections.Generic;
using LunchPollServer.DataTransfer;

namespace LunchPollServer.Controllers
{
    public class NominationService
    {
        private readonly INominationRepository _nominationRepository;
        private readonly UserService _userService;

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

        public IEnumerable<DataTransfer.Nomination> Get(GetNominationFilters getNominationFilters)
        {
            var nominations = _nominationRepository.Get(_userService.UserId,
                getNominationFilters.PageSize,
                getNominationFilters.PageIndex);
            return nominations;
        }

    }
}