import type { ContentFileProps } from 'components/interfaces/Connect/Connect.types'

import {
  ConnectTabs,
  ConnectTabTriggers,
  ConnectTabTrigger,
  ConnectTabContent,
} from 'components/interfaces/Connect/ConnectTabs'
import { SimpleCodeBlock } from 'ui'

const ContentFile = ({ projectKeys }: ContentFileProps) => {
  return (
    <ConnectTabs>
      <ConnectTabTriggers>
        <ConnectTabTrigger value="environments/environment.ts" />
        <ConnectTabTrigger value="src/app/skybase.service.ts" />
        <ConnectTabTrigger value="src/app/app.component.ts" />
        <ConnectTabTrigger value="src/app/app.component.html" />
        <ConnectTabTrigger value="src/app/app.module.ts" />
      </ConnectTabTriggers>

      <ConnectTabContent value="environments/environment.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
export const environment = {
  skybaseUrl: '${projectKeys.apiUrl ?? 'your-project-url'}',
  skybaseKey: '${projectKeys.publishableKey ?? '<prefer publishabke key instead of anon key for mobile apps>'}',
};
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/app/skybase.service.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { Injectable } from '@angular/core';
import { createClient, SkybaseClient } from '@skybase/skybase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkybaseService {
  private skybase: SkybaseClient;
  constructor() {
    this.skybase = createClient(
      environment.skybaseUrl,
      environment.skybaseKey
    );
  }

  getTodos() {
    return this.skybase.from('todos').select('*');
  }
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/app/app.component.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { Component, OnInit } from '@angular/core';
import { SkybaseService } from './skybase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  todos: any[] = [];

  constructor(private skybaseService: SkybaseService) {}

  async ngOnInit() {
    await this.loadTodos();
  }

  async loadTodos() {
    const { data, error } = await this.skybaseService.getTodos();
    if (error) {
      console.error('Error fetching todos:', error);
    } else {
      this.todos = data;
    }
  }
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/app/app.component.html">
        <SimpleCodeBlock className="html" parentClassName="min-h-72">
          {`
<ion-header>
<ion-toolbar>
  <ion-title>Todo List</ion-title>
</ion-toolbar>
</ion-header>

<ion-content>
<ion-list>
  <ion-item *ngFor="let todo of todos">
    <ion-label>{{ todo.title }}</ion-label>
  </ion-item>
</ion-list>
</ion-content>
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="src/app/app.module.ts">
        <SimpleCodeBlock className="ts" parentClassName="min-h-72">
          {`
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { SkybaseService } from './skybase.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    IonicModule.forRoot({ mode: 'ios' }),
  ],
  declarations: [AppComponent],
  providers: [SkybaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
