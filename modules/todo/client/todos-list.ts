import { autoinject } from 'aurelia-framework';
import { Tasks } from './api/tasks';
import { Meteor, reactiveProperty } from 'aurelia-meteor';
import { Tracker } from 'meteor/tracker';

@autoinject
export class TodosList {
  meteor: Meteor;

  tasks: Array<{}>;
  newTask: string;
  @reactiveProperty hideCompleted: boolean;
  incompleteCount: number;

  constructor(meteor: Meteor) {
    this.meteor = meteor;

    Tracker.autorun(() => {
      const selector: any = {};

      if (reactiveProperty(this, 'hideCompleted')) {
        selector.checked = {
          $ne: true
        };
      }

      this.tasks = Tasks.find(selector, {
        sort: {
          createdAt: -1
        }
      }).fetch();

      this.incompleteCount = Tasks.find({
        checked: {
          $ne: true
        }
      }).count();
    });
  }

  addTask() {
    // Insert a task into the collection
    Tasks.insert({
      text: this.newTask,
      createdAt: new Date
    });

    // Clear form
    this.newTask = '';
  }

  setChecked(task) {
    // Set the checked property to its new value
    Tasks.update(task._id, {
      $set: {
        checked: task.checked
      },
    });
  }

  removeTask(task) {
    Tasks.remove(task._id);
  }
}
