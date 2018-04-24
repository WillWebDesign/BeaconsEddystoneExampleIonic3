import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

declare var evothings: any;

/*
  Generated class for the BeaconProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeaconsProvider {

  constructor(private platform: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController) {
    console.log('Hello BeaconProvider Provider');
    this.platform.ready().then((rdy) => {
      this.localNotifications.on('click', (notification, state) => {
        let alert = this.alertCtrl.create({
          title: 'Información',
          subTitle: 'Texto informativo📱 🎁',
          buttons: [{
            text: 'Ok',
            role: 'ok',
            handler: () => {
              this.init();
            }
          }]
        });
        alert.present();
      });
    });
  }

  results = [];
  beacons = [];
  timer = null;
  enableEntry = false;

  init() {
    var res = [];
    clearInterval(this.timer);
    this.startScanning();
    this.timer = setInterval(() => {
      res = this.updateList(this.beacons);
      if (res.length > 0) {
        res.forEach((beacon) => {

          this.stopScanning();
          this.localNotifications.schedule({
            id: 1,
            title: 'Hola!!!',
            text: 'Ábreme para informarte📱 🎁🏃� ♀🏃🏽‍♂',
          });

        })
      }
      console.log(res)
    }, 5000);
  }

  private startScanning() {
    this.platform.ready().then(() => {
      evothings.eddystone.startScan((data) => {
        this.beacons.push(data);
      }, error => console.log(error));
    })
  }

  private stopScanning() {
    evothings.eddystone.stopScan();
    clearInterval(this.timer);
    this.beacons = [];
    this.timer = null;
  }

  private updateList(data) {
    for (var i = 0; i < data.length; i++) {
      var result = [];
      if (this.results.length > 0) {
        for (var index = 0; index < this.results.length; index++) {
          var element = this.results[index];
          var dataItem = data[i].address;
          // console.log(element, dataItem);
          if (element === dataItem) {
            result.push(element);
          }
        }
      }
      if (result.length === 0) { this.results.push(data[i].address); }
    }
    // console.log(this.results);
    return this.results;
  }
}
