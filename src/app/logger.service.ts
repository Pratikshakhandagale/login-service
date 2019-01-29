import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

@Injectable()

export class LoggerService {
    httpOptions: any;
    constructor(public http: HttpClient,public toastCtrl: ToastController) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        }
        this.getConfigs();
    }

    getConfigs() {
        return new Promise(resolve => {
            this.http.get('assets/config/config.json', this.httpOptions).subscribe(data => {
                resolve(data);
            }, err => {
                this.presentToast('Error: ' + err);
            });
        });
    }

    postCall(posturl : string, data : any) {
        return new Promise(resolve => {
            this.http.post(posturl, data, this.httpOptions)
                .subscribe(
                data => {
                    resolve(data);
                },
                err => {
                    this.presentToast('Error: ' + err);
                })
        });
    }

    presentToast(message: string) {
        const toast = this.toastCtrl.create({
          message: message,
          duration: 3000
        });
        toast.present();
      }

}
