import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: './welcome',         nav: true, title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: './users',           nav: true, title: 'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: './child-router',    nav: true, title: 'Child Router' },
      { route: 'todo-list',     name: 'todo-list',    moduleId: './todo/todos-list', nav: true, title: 'Todo List' }
    ]);

    this.router = router;
  }
}
