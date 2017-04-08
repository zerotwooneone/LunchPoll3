using System;
using System.ComponentModel.DataAnnotations;

namespace LunchPollServer.Repository
{
    public class Approve
    {
        public int ApproveId { get; set; }
        [Required]
        public int NominationId { get; set; }
        public string UserId { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual Nomination Nomination { get; set; }

        public Approve()
        {
            CreatedOn = DateTime.Now;
        }
    }
}
