import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lunch Poll';

  constructor() { }

  ngOnInit(): void { }


}
