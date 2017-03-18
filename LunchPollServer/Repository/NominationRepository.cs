using System.Collections.Generic;
using System.Linq;
using LunchPollServer.DataTransfer;
using Microsoft.EntityFrameworkCore;

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
                    .Include(n => n.Approves)
                    .Include(n => n.Vetoes)
                    select Convert(nomination,
                        nomination.Approves.Count(),
                        nomination.Vetoes.Count()))
                    .ToArray();
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

        public DataTransfer.Nomination Approve(int nominationId, int userId)
        {
            var approve = new Approve
            {
                NominationId = nominationId,
                UserId = userId
            };
            _lunchPollContext.Approves.Add(approve);
            _lunchPollContext.SaveChanges();
            return (from nomination in _lunchPollContext.Nominations
                .Include(n => n.Approves)
                .Include(n => n.Vetoes)
                    where nomination.NominationId == approve.NominationId
                    select Convert(nomination, nomination.Approves.Count(), nomination.Vetoes.Count())).First();
        }

        public DataTransfer.Nomination Veto(int nominationId, int userId)
        {
            var veto = new Veto
            {
                NominationId = nominationId,
                UserId = userId
            };
            _lunchPollContext.Vetoes.Add(veto);
            _lunchPollContext.SaveChanges();
            return (from nomination in _lunchPollContext.Nominations
                .Include(n => n.Approves)
                .Include(n => n.Vetoes)
                    where nomination.NominationId == veto.NominationId
                    select Convert(nomination, nomination.Approves.Count(), nomination.Vetoes.Count())).First();
        }

        
    }
}
