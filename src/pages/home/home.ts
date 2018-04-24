import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BeaconsProvider } from '../../providers/beacons/beacons';

declare var evothings: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  beaconData: any;

  constructor(private change: ChangeDetectorRef, private platform: Platform, private beacons: BeaconsProvider) {

  }
  ionViewWillEnter() {
    this.beacons.init();
  }  
}
