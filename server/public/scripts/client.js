console.log('js');


let myApp = angular.module('myApp', []);

myApp.controller('TodoController', function($http){
    console.log('TodoController is ready');
    
    const vm = this;
    vm.choreData = [];
    
    
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
    
    vm.completeChore = function ( choreId ) {
        $http({
            method: 'PUT',
            url: '/todo/choreComplete/' + choreId
        }).then( function ( response ) {
            console.log( 'in conpleteChore', response );
            getChoreList(); 
        }).catch( function ( error ) {
            alert( 'unable to complete chore' );
        })
    }
    
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
    
    vm.deleteChore = function ( choreId ) {
        console.log( 'in deleteChore' );
        $http({
            method: 'DELETE',
            url: '/todo/' + choreId
        }).then( function (response) {
            getChoreList(); 
        }).catch( function ( error ) {
            alert( 'unable to delete chore' );
        })
    }

    getChoreList();


})