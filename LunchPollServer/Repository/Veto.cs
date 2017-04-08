using System;

namespace LunchPollServer.Repository
{
    public class Veto
    {
        public int VetoId { get; set; }
        public int NominationId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual Nomination Nomination { get; set; }

        public Veto()
        {
            CreatedOn = DateTime.Now;
        }
    }
}
