using Microsoft.EntityFrameworkCore;

namespace LunchPollServer.Repository
{
    public class LunchPollContext:DbContext
    {
        public virtual DbSet<Nomination> Nominations { get; set; }
        public virtual DbSet<Veto> Vetoes { get; set; }
        public virtual DbSet<Approve> Approves { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Poll> Polls { get; set; }
        public virtual DbSet<PinnedPoll> PinnedPoll { get; set; }

        public LunchPollContext(DbContextOptions<LunchPollContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.GoodleOAuth2Sub)
                    .IsRequired();
            });

            //modelBuilder.Entity<Poll>(entity =>
            //{
            //    entity.HasKey(e => e.PollId);

            //    entity.Property(e => e.UrlParam).IsRequired();
            //});

            //modelBuilder.Entity<PinnedPoll>(entity =>
            //{
            //    entity.Property(e => e.UrlParam).IsRequired();
            //});
        }
    }    
}
