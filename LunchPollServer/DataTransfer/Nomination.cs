namespace LunchPollServer.DataTransfer
{
    public class Nomination
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Vetoes { get; set; }
        public int Approves { get; set; }
    }
}
