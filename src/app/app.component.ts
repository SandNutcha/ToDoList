import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { ServiceService } from './services/service.service';
import { faPlus, faCheck, faCircleNotch, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ToDoList';

  faPlus = faPlus;
  faCheck = faCheck;
  faCircle = faCircleNotch;
  faTrash = faTrash;

  toDoListArray!: any[];
  listText!: String;

  constructor(public service: ServiceService) { }

  ngOnInit() {
    this.service.getToDoList().snapshotChanges()
      .subscribe(
        pipe((res: any[]) => {
          this.toDoListArray = [];
          return res.map(element => {
            let data = element.payload.toJSON();
            data["$key"] = element.key;
            this.toDoListArray.push(data);
            // console.log(data)

            this.toDoListArray.sort((a, b) => {
              return a.checked - b.checked;
            })
          })
        })
      )
  }

  onAdd(itemTitle: any) {

    this.service.addList(itemTitle.value);
    itemTitle.value = null;

  }


  onCheck(itemchecked: boolean, key: any) {
    let a = !itemchecked
    this.service.checkList(key, a);
  }

  onRemove(key: any) {
    this.service.removeList(key)
  }

}
