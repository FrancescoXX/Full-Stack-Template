import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { RxjsService } from './rxjs.service';
import { User } from './user';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public COMP_Version = "COMPDEFAULT";
  private version = '<version>';
  private token = '';
  private _name = '';
  public users: User[];
  public singleUser: User = new User();

  private subscriptionExample: Subscription;
  public source = interval(1000);

  @Input() set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
  get name(): string { return this._name; }

  constructor(private rxjsService: RxjsService) {
    this.COMP_Version = this.rxjsService.versionValue;
  }

  ngOnInit() {
    this.getVersion();
    this.subscriptionExample = this.source
      .subscribe((val: number) => console.log(val));
  }

  getVersion() {
    this.rxjsService.getVersion()
      .subscribe((data: any) => {
        this.version = data.version;
      });
  }

  getToken() {
    const user = {
      'id': 4,
      'name': 'username',
      'password': this.name
    };

    this.rxjsService.getToken(user)
      .subscribe((data: any) => {
        this.token = data.token;
      });
  }

  getOneUser = (userId) => {

    userId = 8;
    console.log('get one user...');
    this.rxjsService
      .getOneUser(userId)
      .subscribe((data: any) => {
        console.log('user is: ', data);
        this.singleUser = data;
      });
  }

  getAllUsers = () => this.rxjsService
    .getAllUsers()
    .subscribe((data: any) => {
      this.users = data;
    })

  // Clear subscriptions
  ngOnDestroy(): void {
    this.subscriptionExample.unsubscribe();
  }
}
