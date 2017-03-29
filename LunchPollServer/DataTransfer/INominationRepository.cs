using System.Collections.Generic;

namespace LunchPollServer.DataTransfer
{
    public interface INominationRepository
    {
        IEnumerable<Nomination> Get(int userId, 
            int? pageSize,
            int? pageIndex);
        Nomination Create(string name);
        Nomination Approve(int nominationId, int userId);
        Nomination Veto(int nominationId, int userId);
    }
}