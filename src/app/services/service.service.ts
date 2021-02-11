import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  toDoList!: AngularFireList<any>;
  public isNull!: Boolean

  constructor(private firebase: AngularFireDatabase) { }

  getToDoList() {
    this.toDoList = this.firebase.list('lists');
    return this.toDoList;
  }

  addList(title: string) {
    if (title == '') {
      this.isNull = true
    } else {
      this.isNull = false
      this.toDoList.push({
        title: title,
        checked: false
      });
    }

  }

  checkList($key: string, flag: boolean) {
    this.toDoList.update($key, { checked: flag })
  }

  removeList($key: string) {
    this.toDoList.remove($key);
  }
}
