using System;
using System.Linq;

namespace LunchPollServer.DataTransfer
{
    public class Nomination
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Vetoes { get; set; }
        public int Approves { get; set; }
        public DateTime LastChanged { get; set; }
        public bool? Vetoed { get; set; }
        public bool? Approved { get; set; }
        public string UserId { get; set; }
    }
}
