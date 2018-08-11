let myApp = angular.module('myApp', []);

myApp.controller('TodoController', function(){
    let self = this;
    self.message = 'Hello World!';
})