console.log('js');


let myApp = angular.module('myApp', []);

myApp.controller('TodoController', function($http){
    console.log('TodoController is ready');
    
    const vm = this;
    vm.choreData = [];
    vm.choreToAdd = {
        chore: 'mow lawn'
    }

    vm.carToAdd = {
        car: 'Outback',
        miles: 12345,
        repair: 'tires',
        cost: 800
    };
    
    vm.addChore = function (choreInput) {
        console.log('in addChore', choreInput);
        $http({
            method: 'POST',
            url: '/todo',
            data: choreInput
        }).then( function ( response ) {
            console.log('yup');
            getChoreList();
        }).catch( function( error ) {
            alert('unable to post chore');
        })
    }

    getChoreList();


    function getChoreList() {
        $http({
            method: 'GET',
            url: '/todo'
        }).then ( function(response){
            vm.choreData = response.data;
        }).catch( function( error ) {
            alert('unable to GET from route ', error );
        });
    }
})