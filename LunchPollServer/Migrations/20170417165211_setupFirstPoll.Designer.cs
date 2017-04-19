using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using LunchPollServer.Repository;

namespace LunchPollServer.Migrations
{
    [DbContext(typeof(LunchPollContext))]
    [Migration("20170417165211_setupFirstPoll")]
    partial class setupFirstPoll
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1");

            modelBuilder.Entity("LunchPollServer.Poll", b =>
                {
                    b.Property<long>("PollId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("UrlParam");

                    b.HasKey("PollId");

                    b.ToTable("Polls");
                });

            modelBuilder.Entity("LunchPollServer.Repository.Approve", b =>
                {
                    b.Property<int>("ApproveId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("NominationId");

                    b.Property<string>("UserId");

                    b.HasKey("ApproveId");

                    b.HasIndex("NominationId");

                    b.ToTable("Approves");
                });

            modelBuilder.Entity("LunchPollServer.Repository.Nomination", b =>
                {
                    b.Property<int>("NominationId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("Name")
                        .HasMaxLength(140);

                    b.Property<string>("UserId");

                    b.HasKey("NominationId");

                    b.ToTable("Nominations");
                });

            modelBuilder.Entity("LunchPollServer.Repository.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("GoodleOAuth2Sub")
                        .IsRequired();

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LunchPollServer.Repository.Veto", b =>
                {
                    b.Property<int>("VetoId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<int>("NominationId");

                    b.Property<string>("UserId");

                    b.HasKey("VetoId");

                    b.HasIndex("NominationId");

                    b.ToTable("Vetoes");
                });

            modelBuilder.Entity("LunchPollServer.Repository.Approve", b =>
                {
                    b.HasOne("LunchPollServer.Repository.Nomination", "Nomination")
                        .WithMany("Approves")
                        .HasForeignKey("NominationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("LunchPollServer.Repository.Veto", b =>
                {
                    b.HasOne("LunchPollServer.Repository.Nomination", "Nomination")
                        .WithMany("Vetoes")
                        .HasForeignKey("NominationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
