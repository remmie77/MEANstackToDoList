console.log('js');


let myApp = angular.module('myApp', []);

myApp.controller('TodoController', function($http){
    console.log('TodoController is ready');
    
    const vm = this;
    vm.choreData = [];
    
    
    function getChoreList() {
        console.log('in getChoreList');
        $http({
            method: 'GET',
            url: '/todo'
        }).then ( function(response){
            console.log('in then', response);
            vm.choreData = response.data;
        }).catch( function( error ) {
            alert('unable to GET from route ', error );
        });
    }


    vm.deleteItem = function (deletedChore) {
        $http({
            method: 'DELETE',
            url: "/todo/" + deletedChore
        }).then(function(response){
            console.log('deleted: ', deletedChore);
            getChoreList();
        }).catch(function(error){
            console.log('error cliend delete:', error);
        });
    }
    
    
    vm.addChore = function (choreInput) {
        console.log('in addChore', choreInput);
        $http({
            method: 'POST',
            url: '/todo',
            data: choreInput
        }).then( function ( response ) {
            vm.choreToAdd.task = '';
            console.log('yup');
            getChoreList();
        }).catch( function( error ) {
            alert('unable to post chore');
        })
    }
    
    vm.toggleTask = function( index ){
        console.log( 'in toggleTask:', vm.tasks[ index ] );
        // $http call to toggle
        $http({
            method: 'PUT',
            url: '/todo',
            data: vm.tasks[ index ]
        }).then( function( response ){
            console.log( 'back from server with:', response );
            getChoreList();
        }).catch( function ( error ){
            console.log( 'error updating chore:', error );
        }) // end $http
    } // end task click
    



    getChoreList();
})