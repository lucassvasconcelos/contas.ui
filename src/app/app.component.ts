import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public collapsed: boolean = false;

  public collapseEvent(): void {
    this.collapsed = !this.collapsed;
  }
}
