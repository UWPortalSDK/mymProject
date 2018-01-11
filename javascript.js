angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('mymProjectCtrl', ['$scope', '$http', '$q', 'mymForm', function($scope, $http, $q, mymForm) {

    // Import variables and functions from service
    $scope.test = mymForm.test;
    $scope.questions = mymForm.questions;
    $scope.options = mymForm.options;
 



    console.log($scope.items);


    // initialize the service
    mymForm.init($scope);

    // Show main view in the first column
    $scope.portalHelpers.showView('mymProjectMain.html', 1);

    // This function gets called when user clicks an item in the list
    $scope.showDetails = function(item) {
        // Make the item that user clicked available to the template
        $scope.detailsItem.value = item;
        $scope.portalHelpers.showView('mymProjectDetails.html', 2);
    }


}])



// Factory maintains the state of the widget
.factory('mymForm', ['$http', '$rootScope', '$filter', '$q', function($http, $rootScope, $filter, $q) {

        var initialized = {value: false};
    	
    	var test = 1;



        var questions = {value: null};
    
        var options = [];
        options = ["S    D", "DA", "N", "AG", "SA"];

        var init = function($scope) {
            if (initialized.value)
                return;

            initialized.value = true;

            // Place your init code here:

            questions.value = [{
                Order: 1,
                question: "I value the benefits of exercise",
                Type: "Value"

            }, {
                Order: 2,
                question: "It's important to me to exercise regularly",
                Type: "Value"
            }, {
                Order: 3,
                question: "I exercise because it is fun",
                Type: "Value"
            }, {
                Order: 4,
                question: "I feel pleasure and satisfaction from exercising",
                Type: "Value"
            }, {
                Order: 5,
                question: "I feel pressured to exercise",
                Type: "Value"
            }, {
                Order: 6,
                question: "I feel guilty when I don't exercise",
                Type: "Value"
            }, {
                Order: 7,
                question: "I don't see why I should have to exercise",
                Type: "Value"
            }, {
                Order: 8,
                question: "I feel disappointed in myself when I have not exercised in a while",
                Type: "Value"
            }, {
                Order: 9,
                question: "I exercise due to other's expectation",
                Type: "Value"
            }];

        }


        // Expose init(), and variables
        return {
            init: init,
            questions: questions,
            test: test,
            options:options

        };
    }])
    // Custom filter example
    .filter('mymProjectFilterName', function() {
        return function(input, arg1, arg2) {
            // Filter your output here by iterating over input elements
            var output = input;
            return output;
        }
    });