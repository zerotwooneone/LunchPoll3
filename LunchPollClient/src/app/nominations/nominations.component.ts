import { Component, OnInit } from '@angular/core';
import { PollService, iNomination, IPage } from '../poll.service';
import 'rxjs/add/operator/finally';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.scss']
})
export class NominationsComponent implements OnInit {

  nominations: iNomination[] = [];
  private pageIndex: number = 0;
  public sub;
  private hasMore: boolean;
  private apiBusy: boolean;
  private urlParam: string;

  constructor(private pollService: PollService,
    private route: ActivatedRoute,
    private router: Router) {
    this.sub = "";
  }

  ngOnInit() {
    this
      .route
      .params
      .subscribe(
      (params) => {
        let regex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i;
        let urlParam = params["urlParam"];
        if (regex.test(urlParam)) {
            this.urlParam = urlParam;
          this.getNextPage();
        } else {
          this.router.navigate(["login"]);
        }

      },
      () => this.router.navigate(["login"])
      );

  }

  public getNextPage(): Observable<IPage<iNomination>> {
    this.apiBusy = true;
    let result = this.pollService.getNominations(this.urlParam, this.pageIndex);
    result
      .finally(() => this.apiBusy = false)
      .subscribe((page) => {
        this.pageIndex++;
        page.values.forEach((nomination) => {
          let index = -1;
          let existing = this.nominations.some((n, i) => { if (n.id === nomination.id) return !!(index = i) });
          if (existing) {
            this.nominations[index] = nomination;
          } else {
            this.nominations.push(nomination);
          }
        });
        this.hasMore = page.hasMore;
      });
    return result;
  }
  public nominateClick(): void {
    this.pollService.nominate(this.sub).subscribe((nomination) => {
      this.nominations.push(nomination);
    });
  }
  public approveClick(nomination: iNomination): void {
    this.pollService.approve(nomination).subscribe((nomResult) => {
      let toApprove = this.nominations.filter(n => nomResult.id === n.id);
      let index = this.nominations.indexOf(toApprove[0]);
      this.nominations[index] = nomResult;
    });
  }
  public vetoClick(nomination: iNomination): void {
    this.pollService.veto(nomination).subscribe((nomResult) => {
      let toVeto = this.nominations.filter(n => nomResult.id === n.id);
      let index = this.nominations.indexOf(toVeto[0]);
      this.nominations[index] = nomResult;
    });
  }

  public get nextPageVisible(): boolean {
    return !this.apiBusy && this.hasMore;
  }
}
