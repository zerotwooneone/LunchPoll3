import { Component } from '@angular/core';
import { PollService, iNomination } from './poll.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'bag of dicks!';
    insttxt = 'Vote for any number of places you want to go. Veto options if you would refuse to go there';
    nominations = [];
    constructor(private pollService: PollService) {
        this.pollService.getNominations().subscribe((nominations) => {
            this.nominations = nominations
        });
    }
    sub = "";

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
    public clearClick(): void {
        this.nominations = this.pollService.clear();
    }

}


