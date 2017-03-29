using System;
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

        public IEnumerable<DataTransfer.Nomination> Get(int userId,
            int? pageSize = NominationDefaults.PageSize,
            int? pageIndex = NominationDefaults.PageIndex)
        {
            var ps = pageSize ?? NominationDefaults.PageSize;
            var pi = pageIndex ?? NominationDefaults.PageIndex;
            return (from nomination in _lunchPollContext.Nominations
                    .Skip(ps * pi)
                    .Take(ps)
                    .Include(n => n.Approves)
                    .Include(n => n.Vetoes)
                    orderby nomination.Approves.Count() descending,
                    nomination.Vetoes.Count()
                    select Convert(nomination,
                         nomination.Approves.Count(),
                         nomination.Vetoes.Count(),
                         nomination.Approves.Any(v => v.UserId == userId),
                         nomination.Vetoes.Any(v => v.UserId == userId),
                         nomination.Approves.OrderByDescending(a => a.CreatedOn).FirstOrDefault() != null ? nomination.Approves.OrderByDescending(a => a.CreatedOn).FirstOrDefault().CreatedOn : (DateTime?)null,
                         nomination.Vetoes.OrderByDescending(v => v.CreatedOn).FirstOrDefault() != null ? nomination.Vetoes.OrderByDescending(v => v.CreatedOn).FirstOrDefault().CreatedOn : (DateTime?)null))
                    .ToArray();
        }

        public DataTransfer.Nomination Create(string name)
        {
            var n = new Nomination { Name = name };
            _lunchPollContext.Nominations.Add(n);
            _lunchPollContext.SaveChanges();
            return Convert(n);
        }

        private static DataTransfer.Nomination Convert(Nomination n,
            int approves = 0,
            int vetoes = 0,
            bool? approved = null,
            bool? vetoed = null,
            DateTime? approvedOn = null,
            DateTime? vetoedOn = null)
        {
            var t = n.CreatedOn.Ticks;
            return new DataTransfer.Nomination
            {
                Id = n.NominationId,
                Name = n.Name,
                Approves = approves,
                Vetoes = vetoes,
                Approved = approved,
                Vetoed = vetoed,
                LastChanged = new DateTime(Math.Max(
                    t,
                    Math.Max(
                        approvedOn?.Ticks ?? t,
                        vetoedOn?.Ticks ?? t)))
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
                    select Convert(nomination,
                    nomination.Approves.Count(),
                    nomination.Vetoes.Count(),
                    true,
                    nomination.Vetoes.Any(v => v.UserId == userId),
                    approve.CreatedOn,
                    nomination.Vetoes.Max(a => a.CreatedOn))).First();
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
                    select Convert(nomination,
                    nomination.Approves.Count(),
                    nomination.Vetoes.Count(),
                    nomination.Approves.Any(v => v.UserId == userId),
                    true,
                    nomination.Approves.Max(a => a.CreatedOn),
                    veto.CreatedOn)).First();
        }


    }
}
