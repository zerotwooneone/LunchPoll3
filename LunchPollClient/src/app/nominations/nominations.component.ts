import { Component, OnInit } from '@angular/core';
import { PollService, iNomination } from '../poll.service';

@Component({
    selector: 'app-nominations',
    templateUrl: './nominations.component.html',
    styleUrls: ['./nominations.component.scss']
})
export class NominationsComponent implements OnInit {

    nominations: iNomination[] = [];
    private pageIndex: number = 0;
    public sub;

    constructor(private pollService: PollService) {
        this.sub = "";
    }

    ngOnInit() {
        this.getNextPage();
    }

    public getNextPage(): void {
        this.pollService.getNominations(this.pageIndex).subscribe((nominations) => {
            this.pageIndex++;
            nominations.forEach((nomination) => {
                let index = -1;
                let existing = this.nominations.some((n, i) => { if (n.id === nomination.id) return !!(index = i) });
                if (existing) {
                    this.nominations[index] = nomination;
                } else {
                    this.nominations.push(nomination);
                }
            });
        });
    }
    public nominateClick(): void {
        this.pollService.nominate(this.sub).subscribe((nomination) => {
            this.nominations.push(nomination)
        });
    }
    public approveClick(nomination: iNomination): void {
        this.pollService.approve(nomination).subscribe((nomResult) => {
            let toApprove = this.nominations.filter((n) => {
                return nomResult.id === n.id
            });
            let index = this.nominations.indexOf(toApprove[0]);
            this.nominations[index] = nomResult;
        });
    }
    public vetoClick(nomination: iNomination): void {
        this.pollService.veto(nomination).subscribe((nomResult) => {
            let toVeto = this.nominations.filter((n) => {
                return nomResult.id === n.id
            });
            let index = this.nominations.indexOf(toVeto[0]);
            this.nominations[index] = nomResult;
        });
    }

}
