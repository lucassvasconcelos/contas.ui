import { Component, Input } from '@angular/core';
import { faChartLine, faThLarge, faWallet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() public collapsed: boolean = false;

  public faWallet: any = faWallet;
  public faThLarge: any = faThLarge;
  public faChartLine: any = faChartLine;
  public year: number;

  public constructor() {
    this.year = (new Date()).getFullYear();
  }
}
