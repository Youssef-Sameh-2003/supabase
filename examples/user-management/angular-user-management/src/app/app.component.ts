import { Component, OnInit } from '@angular/core';
import { SkybaseService } from './skybase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-user-management';

  session = this.skybase.session;

  constructor(private readonly skybase: SkybaseService) {}

  ngOnInit() {
    this.skybase.authChanges((_, session) => (this.session = session));
  }
}
