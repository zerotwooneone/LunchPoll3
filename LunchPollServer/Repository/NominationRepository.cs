using System.Collections.Generic;
using System.Linq;
using LunchPollServer.DataTransfer;

namespace LunchPollServer.Repository
{
    public class NominationRepository : INominationRepository
    {
        private readonly LunchPollContext _lunchPollContext;

        public NominationRepository(LunchPollContext lunchPollContext)
        {
            _lunchPollContext = lunchPollContext;
        }

        public IEnumerable<DataTransfer.Nomination> Get(GetNominationFilters getNominationFilters)
        {
            return (from nomination in _lunchPollContext.Nominations
                    select Convert(nomination, _lunchPollContext.Approves.Count(), _lunchPollContext.Vetoes.Count())
                    //new DataTransfer.Nomination
                    //{
                    //    Approves = _lunchPollContext.Approves.Count(),
                    //    Id = nomination.NominationId,
                    //    Name = nomination.Name,
                    //    Vetoes = _lunchPollContext.Vetoes.Count()
                    //}
                    ).ToArray();
        }

        public DataTransfer.Nomination Create(string name)
        {
            var n = new Nomination { Name = name };
            _lunchPollContext.Nominations.Add(n);
            _lunchPollContext.SaveChanges();
            return Convert(n);
        }

        private static DataTransfer.Nomination Convert(Nomination n, int approves = 0, int vetoes = 0)
        {
            return new DataTransfer.Nomination
            {
                Id = n.NominationId,
                Name = n.Name,
                Approves = approves,
                Vetoes = vetoes
            };
        }
    }
}
