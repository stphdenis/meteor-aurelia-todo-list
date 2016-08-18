# meteor-aurelia-todo-list

NOT FINISHED !!!

This a todo-list using aurelia with meteor. The client is made with aurelia, meteor and webpack. The server is fully meteor.

## Installation

```
npm install -g modules-client-server
git clone https://github.com/stphdenis/meteor-aurelia-todos-list.git
cd meteor-aurelia-todos-list
modules-client-server --sync
npm install
cd client
npm install
cd..
npm start
```
and navigate to this page: [http://localhost:9000/](http://localhost:9000/)

## Client

The client side is based on [skeleton-typescript-webpack](https://github.com/aurelia/skeleton-navigation/tree/master/skeleton-typescript-webpack) from [Aurelia](http://aurelia.io/).
The only part added to `src` is the `todo` module for witch we have made an entry in the menu (see `src/app.ts`).

The glue bitween the client, the server and the `todo` module is made via symlinks.
All the plumbing is done by the package [modules-client-server](https://www.npmjs.com/package/modules-client-server).

## server

The server side is based on [Meteor](https://www.meteor.com/).

## Creation of this project
```
npm install -g modules-client-server
mkdir meteor-aurelia-todo-list
cd meteor-aurelia-todo-list
echo { "serverSrcPath": "./server/imports" } > modules-client-server.conf.json
meteor create server
modules-client-server --init --add todo
cd server
erase client
rmdir client
modules-client-server --watch
```