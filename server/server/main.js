import { Tasks } from './imports/todo/api/tasks.js';

console.info('Metor version :', Meteor.release)

if(Tasks.find({}).count() == 0) {
  Tasks.insert({_id:'54', text:'iouh'});
  Tasks.insert({_id:'56', text:'54qs56'});
  Tasks.insert({_id:'46', text:'hsdf'});
}
