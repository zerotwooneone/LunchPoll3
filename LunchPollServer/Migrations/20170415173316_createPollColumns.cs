using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LunchPollServer.Migrations
{
    public partial class createPollColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PinnedPoll",
                columns: table => new
                {
                    PinnedPollId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UrlParam = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PinnedPoll", x => x.PinnedPollId);
                });

            migrationBuilder.Sql("INSERT INTO PinnedPoll (UrlParam) VALUES (\"6b648dde-28a1-4d9a-87a4-e350d6444755\")");

            migrationBuilder.Sql("ALTER TABLE Nominations ADD COLUMN PollId INTEGER;");
            migrationBuilder.Sql("ALTER TABLE Nominations ADD COLUMN PinnedPollId INTEGER;");

            migrationBuilder.Sql("ALTER TABLE Approves ADD COLUMN PollId INTEGER;");
            migrationBuilder.Sql("ALTER TABLE Vetoes ADD COLUMN PollId INTEGER;");

            migrationBuilder.Sql("ALTER TABLE Polls ADD COLUMN PinnedPollId INTEGER;");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("ALTER TABLE Polls DROP COLUMN PinnedPollId;");

            migrationBuilder.Sql("ALTER TABLE Approves DROP COLUMN PollId;");
            migrationBuilder.Sql("ALTER TABLE Vetoes DROP COLUMN PollId;");

            migrationBuilder.Sql("ALTER TABLE Nominations DROP COLUMN PollId;");
            migrationBuilder.Sql("ALTER TABLE Nominations DROP COLUMN PinnedPollId;");

            migrationBuilder.DropTable(
                name: "PinnedPoll");
        }
    }
}
