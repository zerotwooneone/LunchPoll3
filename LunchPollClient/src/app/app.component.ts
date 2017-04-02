import { Component } from '@angular/core';
import { PollService, iNomination } from './poll.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    nominations: iNomination[] = [];
    private pageIndex: number = 0;
    constructor(private pollService: PollService) {
        this.getNextPage();
    }
    sub = "";

    public getNextPage(): void {
        this.pollService.getNominations(this.pageIndex).subscribe((nominations) => {
            this.pageIndex++;
            this.nominations.push.apply(this.nominations, nominations);
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


