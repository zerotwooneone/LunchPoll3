import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollService, iNomination } from './poll.service';
import { Auth } from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        this.getNextPage();
    }

    nominations: iNomination[] = [];
    private pageIndex: number = 0;
    constructor(private pollService: PollService,
        private auth: Auth,
        private router: Router) {
        
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


