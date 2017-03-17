using Microsoft.EntityFrameworkCore;

namespace LunchPollServer.Repository
{
    public class LunchPollContext:DbContext
    {
        public DbSet<Nomination> Nominations { get; set; }
        public DbSet<Veto> Vetoes { get; set; }
        public DbSet<Approve> Approves { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlite("Data Source=lunchPoll.db");
        //}

        public LunchPollContext(DbContextOptions<LunchPollContext> options) : base(options)
        {
        }
    }    
}
