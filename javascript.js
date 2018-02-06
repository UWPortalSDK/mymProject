var imports = ["test.js"];


angular.module('portalApp')

.controller('profileCtrl', ['$scope', function($scope) {

    $scope.studentInfo = {
        value: null
    };
    $scope.terms = {
        value: null
    };
    
    $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
    };

    $scope.portalHelpers.invokeServerFunction({
        functionName: 'getStudents',
        uniqueNameId: 'mymProject'
    }).then(function(result) {
        console.log('got data: ', result);
        $scope.studentInfo.value = result;
        sourceLoaded();
    });

    $scope.selectedItemChanged = function() {
        // Make the item that user clicked available to the template
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getTerms',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                value: $scope.selectedItem.name
            }
        }).then(function(result) {
            console.log('got data: ', result);
            $scope.terms.value = result;
            sourceLoaded();
        });

    }
}])

// Widget controller - runs every time widget is shown
.controller('mymProjectCtrl', ['$scope', '$http', '$q', 'mymForm', function($scope, $http, $q, mymForm) {


    // Import variables and functions from service
    $scope.test = mymForm.test;
    $scope.questions = mymForm.questions;
    $scope.options = mymForm.options;
    $scope.num = square(2);
    $scope.varTest = numTest;
    $scope.logo = mymLogo;
    $scope.UWlogo = UwaterlooLogo;
    $scope.questionsV2 = mymForm.dbQs;
    $scope.testShow = mymForm.testShow;

    $scope.formOne = [];


    // initialize the service
    mymForm.init($scope);

    // Show main view in the first column
    $scope.portalHelpers.showView('profile.html', 1);


    // This function gets called when user clicks an item in the list
    $scope.showDetails = function() {
        // Make the item that user clicked available to the template

        $scope.portalHelpers.showView('mymProjectDetails.html', 1);
    }

    $scope.showDetails2 = function() {
        // Make the item that user clicked available to the template

        $scope.portalHelpers.showView('mymProjectMain.html', 1);
    }

    $scope.testSubmit = function() {
        // Make the item that user clicked available to the template

        console.log($scope.formOne);
    }


}])

.directive('removeMe', ['$http', function($http) {
    return {
        link: function(scope, el, attrs) {
            el.bind("click", function() {
                el.parent().remove();
                scope.testShow.value = false;
            });

        }
    };
}])

// Factory maintains the state of the widget
.factory('mymForm', ['$http', '$rootScope', '$filter', '$q', function($http, $rootScope, $filter, $q) {

    var initialized = {
        value: false
    };

    var test = 1;

    var dbQs = {
        value: null
    };
    var questions = {
        value: null
    };
    var testShow = {
        value: null
    };
    var options = [];
    options = ["1", "2", "3", "4", "5"];

    var init = function($scope) {
        if (initialized.value)
            return;

        initialized.value = true;

        console.log('getting data.. ', $scope.portalHelpers, $scope.portalHelpers.invokeServerFunction);

        // Place your init code here:
        testShow.value = true;
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getQs',
            uniqueNameId: 'mymProject'
        }).then(function(result) {
            console.log('got data: ', result);
            dbQs.value = result;
            sourceLoaded();
        });

        questions.value = [{
            Name: "q1",
            question: "I value the benefits of exercise",
            Type: 1

        }, {
            Name: "q2",
            question: "It's important to me to exercise regularly",
            Type: 1
        }, {
            Name: "q3",
            question: "I exercise because it is fun",
            Type: 1
        }, {
            Name: "q4",
            question: "I feel pleasure and satisfaction from exercising",
            Type: 1
        }, {
            Name: "q5",
            question: "I feel pressured to exercise",
            Type: 0
        }, {
            Name: "q6",
            question: "I feel guilty when I don't exercise",
            Type: 0
        }, {
            Name: "q7",
            question: "I don't see why I should have to exercise",
            Type: 0
        }, {
            Name: "q8",
            question: "I feel disappointed in myself when I have not exercised in a while",
            Type: 0
        }, {
            Name: "q9",
            question: "I exercise due to other's expectation",
            Type: 0
        }];

    }


    // Expose init(), and variables
    return {
        init: init,
        testShow: testShow,
        dbQs: dbQs,
        questions: questions,
        test: test,
        options: options

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

// function GetSliderValue(SliderID, OutputID) {
//     var slider = document.getElementById(SliderID);
// 	var output = document.getElementById(OutputID);
// 	output.innerHTML = slider.value;

// 	slider.oninput = function() {
//   		output.innerHTML = this.value;
// 	}
// }