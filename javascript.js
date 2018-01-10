angular.module('portalApp')

// Widget controller - runs every time widget is shown
.controller('mymProjectCtrl', ['$scope', '$http', '$q', 'mymProjectFactory', function ($scope, $http, $q, mymProjectFactory) {

    // Import variables and functions from service
    $scope.data = mymProjectFactory.data;
	$scope.items = mymProjectFactory.items;
	$scope.detailsItem = mymProjectFactory.detailsItem;
    $scope.options = mymProjectFactory.options;
    $scope.counter = 0;
  
    
    console.log($scope.items);
    
	
    // initialize the service
    mymProjectFactory.init($scope);

	// Show main view in the first column
	$scope.portalHelpers.showView('mymProjectMain.html', 1);
	
	// This function gets called when user clicks an item in the list
	$scope.showDetails = function(item){
		// Make the item that user clicked available to the template
		$scope.detailsItem.value = item;		
		$scope.portalHelpers.showView('mymProjectDetails.html', 2);
	}
    $scope.showForm = function(){
        // Make the item that user clicked available to the template
        //$scope.detailsItem.value = item;		
        $scope.portalHelpers.showView('initial.html', 2);
	}
    
    $scope.getValue = function() {
       	counter++;
        return counter;
    }	
}])



// Factory maintains the state of the widget
.factory('mymProjectFactory', ['$http', '$rootScope', '$filter', '$q', function ($http, $rootScope, $filter, $q) {
		
	var initialized = {value: false};

	// Your variable declarations
	var data = {value: null};
	var detailsItem = {value:null};
	// mock data
	var items = {value: null};
    var options = [];
    options = ["S    D", "DA", "N", "AG", "SA"];
	
	var init = function ($scope) {
		if (initialized.value)
			return;
		
		initialized.value = true;

		// Place your init code here:
		data.value={message:"Welcome to Portal SDK!"};
		items.value = [
			{
				title:'Item 1',
				tags: ['tag A', 'tag B', 'tag C'],
				details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
			},
			{
				title:'Item 2',
				tags: ['tag D', 'tag E', 'tag F'],
				details: 'Mauris cursus, sapien et malesuada ultrices, purus sapien iaculis tellus, quis semper magna est at leo.'
			},
			{
				title:'Item 3',
				tags: ['tag A', 'tag H'],
				details: 'Donec id quam eu odio feugiat sagittis. Duis a tempus neque. Praesent elementum quis ante quis commodo. Sed tincidunt aliquet dolor sit amet laoreet. '
			},
			{
				title:'Item 4',
				tags: ['tag I'],
				details: 'Proin sem quam, rutrum id ante id, scelerisque tempor quam. Curabitur pharetra turpis at sem placerat, non vehicula ligula tincidunt.'
			},
			{
				title:'Item 5',
				tags: ['tag C', 'tag K', 'tag B'],
				details: 'Mauris nec ultricies metus. Cras et dictum justo. Nam a ullamcorper dolor. Cras fringilla metus vel facilisis vehicula.'
			},
			{
				title:'Item 6',
				tags: ['tag A', 'tag B', 'tag C'],
				details: 'Curabitur scelerisque lorem risus, in luctus orci hendrerit non. Praesent quis tellus dapibus dolor consectetur volutpat.'
			}
		];
        
	}


	// Expose init(), and variables
	return {
		init: init,
		data: data,
		detailsItem: detailsItem,
		items: items,
        options: options
	};

}])


// Custom directive example
.directive('mymForm', ['$http', function ($http) {
	return {
		restrict: "E",
    	templateUrl: "initial.html"
	};
}])
// Custom filter example
.filter('mymProjectFilterName', function () {
	return function (input, arg1, arg2) {
		// Filter your output here by iterating over input elements
		var output = input;
		return output;
	}
});