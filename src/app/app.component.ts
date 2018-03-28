import { Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LifecycleDbFrontend';
  navIsOpened: boolean = false;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private _updateLayoutListener: (e) => void;
  
  public updateLayoutListener(e){
    this.navIsOpened = !e.matches;
    this.changeDetectorRef.detectChanges();
  }

  constructor(public changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this._updateLayoutListener = (e) => this.updateLayoutListener(e);
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.mobileQuery.addListener(this._updateLayoutListener);
    this.navIsOpened = !this.mobileQuery.matches;
  }

  toggle(): void{
    this.navIsOpened = !this.navIsOpened;
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.mobileQuery.removeListener(this._updateLayoutListener);
  }
}
