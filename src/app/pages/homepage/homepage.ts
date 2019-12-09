import {Component, NgModule, OnInit} from '@angular/core';
import {ComponentPageTitle} from '../page-title/page-title';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html'
})
export class Homepage implements OnInit {

  constructor(public _componentPageTitle: ComponentPageTitle) {}

  ngOnInit(): void {
    this._componentPageTitle.title = '';
  }
}

@NgModule({
  imports: [],
  exports: [Homepage],
  declarations: [Homepage],
})
export class HomepageModule {}
