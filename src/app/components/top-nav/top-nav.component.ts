import { Component, EventEmitter, Output } from '@angular/core';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  @Output() public collapseEvent: EventEmitter<void> = new EventEmitter();

  public faBars: any = faBars;
  public faUser: any = faUser;

  public constructor() { }

  public sendCollapseEvent(): void {
    this.collapseEvent.emit();
  }
}
