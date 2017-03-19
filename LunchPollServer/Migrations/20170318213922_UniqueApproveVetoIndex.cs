using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LunchPollServer.Migrations
{
    public partial class UniqueApproveVetoIndex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Approves_NominationIdUserId",
                table: "Approves",
                columns: new []{"NominationId", "UserId"}, 
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vetoes_NominationIdUserId",
                table: "Vetoes",
                columns: new[] { "NominationId", "UserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex("IX_Approves_NominationIdUserId");
            migrationBuilder.DropIndex("IX_Vetoes_NominationIdUserId");
        }
    }
}
