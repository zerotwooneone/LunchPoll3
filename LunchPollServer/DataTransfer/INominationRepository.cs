using System.Collections.Generic;

namespace LunchPollServer.DataTransfer
{
    public interface INominationRepository
    {
        IPage<Nomination> Get(string userId, 
            int? pageSize,
            int? pageIndex);
        Nomination Create(string name, string userId);
        Nomination Approve(int nominationId, string userId);
        Nomination Veto(int nominationId, string userId);
    }
}