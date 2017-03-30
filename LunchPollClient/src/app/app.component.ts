import { Component } from '@angular/core';
import { PollService, iNomination } from './poll.service';
import 'rxjs/add/operator/finally';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'bag of dicks!';
    insttxt = 'Vote for any number of places you want to go. Veto options if you would refuse to go there';
    nominations: iNomination[] = [];
    private pageIndex: number = 0;
    private hasMore: boolean;
    private apiBusy: boolean;
    constructor(private pollService: PollService) {
        this.getNextPage();
    }
    sub = "";

    public getNextPage(): void {
        this.apiBusy = true;
        this.pollService.getNominations(this.pageIndex)
            .finally(() => this.apiBusy = false)
            .subscribe((page) => {
                this.pageIndex++;
                this.nominations.push.apply(this.nominations, page.values);
                this.hasMore = page.hasMore;
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
    public clearClick(): void {
        this.nominations = this.pollService.clear();
    }

    public get nextPageVisible(): boolean {
        return !this.apiBusy && this.hasMore;
    }
}


