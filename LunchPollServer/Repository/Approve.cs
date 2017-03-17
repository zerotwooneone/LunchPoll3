namespace LunchPollServer.Repository
{
    public class Approve
    {
        public int ApproveId { get; set; }
        public int NominationId { get; set; }

        public virtual Nomination Nomination { get; set; }
    }
}
