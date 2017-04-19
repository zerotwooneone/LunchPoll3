using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LunchPollServer.Migrations
{
    public partial class setupFirstPoll : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Polls SET PinnedPollId = (SELECT PinnedPollId from PinnedPoll where UrlParam =\"6b648dde-28a1-4d9a-87a4-e350d6444755\") where UrlParam =\"2e0b091a-0961-41b7-a8b4-a934f5e7b7b3\"");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE Polls SET PinnedPollId = null where UrlParam =\"2e0b091a-0961-41b7-a8b4-a934f5e7b7b3\"");
        }
    }
}
