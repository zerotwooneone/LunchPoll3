using System.Collections.Generic;

namespace LunchPollServer.Repository
{
    public class Nomination
    {
        public int NominationId { get; set; }
        public string Name { get; set; }
        public HashSet<Veto> Vetoes { get; set; }
        public HashSet<Approve> Approves { get; set; }

        public Nomination()
        {
            Vetoes = new HashSet<Veto>();
            Approves = new HashSet<Approve>();
        }
    }
}
