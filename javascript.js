var imports = ["test.js"];

angular.module('portalApp')


.controller('profileCtrl', ['$scope', function($scope) {
    $scope.value1 = true;
    $scope.value2 = false;

    $scope.studentInfo = {
        value: null
    };
    $scope.selectedStudent = {
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

    $scope.selectedItemChanged = function(id, name) {
        // Make the item that user clicked available to the template
        $scope.value1 = false;
        $scope.value2 = true;
        $scope.selectedStudent.value = name;
        document.getElementById("Studentnamesearchbox").value = id;
        $scope.searchKeyword = id;
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getTerms',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                value: id
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
    $scope.options = mymForm.options;
    $scope.num = square(2);
    $scope.varTest = numTest;
    $scope.MTMLogo = mymLogo;
    $scope.UWlogo = UwaterlooLogo;
    $scope.buddy = false;
    
    
    // initialize the service
    mymForm.init($scope);
    var formdata = new FormData();
    // Show main view in the first column
    $scope.portalHelpers.showView('getSuggestion.html', 1);


    // This function gets called when user clicks an item in the list
    $scope.showDetails = function() {
        // Make the item that user clicked available to the template
        console.log($scope.test);
        $scope.portalHelpers.showView('mymProjectDetails.html', 1);
    }

    $scope.showPage = function(number) {
        // Make the item that user clicked available to the template
        if (number == 1) {

            $scope.portalHelpers.showView('activitySuggestion.html', 1);
        } else if (number == 2) {

            $scope.portalHelpers.showView('profile.html', 1);
        } else if (number == 3) {

            $scope.portalHelpers.showView('activitySuggestion.html', 1);
        }

    }

    $scope.testSubmit = function() {
        // Make the item that user clicked available to the template
        console.log($scope.formOne);
    }



    $scope.getTheFiles = function($files) {
        angular.forEach($files, function(value, key) {
            formdata.append('file', value);
        });
    };

    // UPLOAD THE FILES – that’s my server – please don’t kill it.
    $scope.uploadFiles = function() {
        var request = {
            method: 'POST',
            url: 'https://ml.joeradman.com/',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        $http(request)
            .success(function(d) {
                // this is the result
                $scope.data = d.activities;
                console.log(d);
                $scope.portalHelpers.invokeServerFunction({
                    functionName: 'deleteCluster',
                    uniqueNameId: 'mymProject'
                }).then(function(result) {
                    console.log("Data Deleted");
                });

                for (var key in $scope.data) {
                    if ($scope.data.hasOwnProperty(key)) {
                        //console.log(key + " -> " + $scope.data[key]);
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertResult',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                activity: key,
                                cluster: $scope.data[key]
                            }
                        }).then(function(result) {
                            //console.log("Inserted " + key);
                            // console.log('got data: ', result);
                            // $scope.terms.value = result;
                            // sourceLoaded();
                        });
                    }
                }

                $scope.data = "";
            	d = "";
            	alert("Successfully Wiped and Inserted");
            })
            .error(function(e) {
                alert(e);
            });
    };


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

.directive('ngFiles', ['$parse', function($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function(event) {
            onChange(scope, {
                $files: event.target.files
            });
        });
    };
    return {
        link: fn_link
    }
}])

// Factory maintains the state of the widget
.factory('mymForm', ['$http', '$rootScope', '$filter', '$q', function($http, $rootScope, $filter, $q) {

    var initialized = {
        value: false
    };

    var options = [];
    options = ["1", "2", "3", "4", "5"];

    var init = function($scope) {
        if (initialized.value)
            return;

        initialized.value = true;

        console.log('getting data.. ', $scope.portalHelpers, $scope.portalHelpers.invokeServerFunction);

        // Place your init code here:

    }


    // Expose init(), and variables
    return {
        init: init,
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
// 
// 
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();