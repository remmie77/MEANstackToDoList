let myApp = angular.module('myApp', []);

myApp.controller('TodoController', function($http){
    console.log('TodoController is ready');
    
    const vm = this;
    vm.message = 'Hello World!';
})