namespace LunchPollServer.Repository
{
    public class Veto
    {
        public int VetoId { get; set; }
        public int NominationId { get; set; }

        public virtual Nomination Nomination { get; set; }
    }
}
