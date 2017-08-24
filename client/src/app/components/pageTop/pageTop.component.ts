import {Component} from '@angular/core';

import {GlobalState} from '../../global.state';



@Component({
  selector: 'page-top',
  templateUrl: './pageTop.html',
  styleUrls: ['./pageTop.scss']
})
export class PageTopComponent {

  public isMenuCollapsed:boolean = true;
  public isSettingsCollapsed:boolean = false;
  constructor(private _state:GlobalState,) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
    this._state.subscribe('settings.isCollapsed', (isCollapsed) => {
      this.isSettingsCollapsed = isCollapsed;
    });
  }
 
  public openDialog() {
    
  }
  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public toggleSettings() {
    this.isSettingsCollapsed = !this.isSettingsCollapsed;
    this._state.notifyDataChanged('settings.isCollapsed', this.isSettingsCollapsed);
    return false;
  }

//   public scrolledChanged(isScrolled) {
//     this.isScrolled = isScrolled;
//   }
}