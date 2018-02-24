var imports = ["test.js"];

angular.module('portalApp')

.controller('suggestCtrl', ['$scope', function($scope) {
    $scope.cog1;
    $scope.cog2;
    $scope.soc1;
    $scope.soc2;
    $scope.int1;
    $scope.int2;
    var centerValues = {
        value: null
    };
    var temp;
    var cogScore;
    var socScore;
    var intScore;
    var distance;
    var clusterBelong = [0, 1000];



    $scope.getPred = function() {
        //alert("Successfully entered the function");
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getCenters',
            uniqueNameId: 'mymProject'
        }).then(function(result) {
            cogScore = 0;
            socScore = 0;
            intScore = 0;
            distance = 0;

            console.log('got data: ', result);
            centerValues.value = result;
            //sourceLoaded();
            //console.log(centerValues.value.length);

            var cog1Edit = 10 - $scope.cog1;
            cogScore = (parseFloat(cog1Edit) + parseFloat($scope.cog2)) / 2;

            var soc1Edit = 10 - $scope.soc1;
            socScore = (parseFloat(soc1Edit) + parseFloat($scope.soc2)) / 2;

            var int2Edit = 10 - $scope.int2;
            intScore = (parseFloat(int2Edit) + parseFloat($scope.int1)) / 2;

            // alert(cogScore);
            // alert(socScore);
            // alert(intScore);

            // cogScore = ((10-$scope.cog1)+$scope.cog2)/2;
            // alert(cogScore);
            for (var key in centerValues.value) {

                temp = centerValues.value[key];

                distance = Math.sqrt(Math.pow(parseFloat(temp.x_coord) - parseFloat(intScore), 2) + Math.pow(parseFloat(temp.y_coord) - parseFloat(cogScore), 2) + Math.pow(parseFloat(temp.z_coord) - parseFloat(socScore), 2));
                alert(clusterBelong[1]);
                if (parseFloat(distance) <= parseFloat(clusterBelong[1])) {
                    clusterBelong = [temp.cluster_number, distance];
                    alert("Changed Distance New Cluster is" + clusterBelong[0]);
                };


            };

            temp = {};
            centerValues = {
                value: null
            };


        });




    };




}])


.controller('profileCtrl', ['$scope', function($scope) {
    $scope.value1 = true;
    $scope.value2 = false;
    $scope.wobname = "";
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

    $scope.testSubmit = function() {
        //alert("Successfully entered the function");
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'registrate',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                id: $scope.sid,
                term: $scope.term,
                name: $scope.name,
                email: $scope.email,
                gender: $scope.gender,
                program: $scope.program,
                date: $scope.date,
                aterm: $scope.aterm,
                wob: $scope.buddy,
                wobname: $scope.wobname,
                surveyid: $scope.surveyid,
                support: $scope.support
            }
        }).then(function(result) {
            alert("inserted");
        })
    };

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
    $scope.centers = [];


    // initialize the service
    mymForm.init($scope);
    var formdata = new FormData();
    // Show main view in the first column
    $scope.portalHelpers.showView('profile.html', 1);


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
                console.log(d);
                // this is the result
                var data = d.activities;
                var centers = d.centers;
                var temp;
                var cNum;
                var c1;
                var c2;
                var c3;

                $scope.portalHelpers.invokeServerFunction({
                    functionName: 'deleteCluster',
                    uniqueNameId: 'mymProject'
                }).then(function(result) {
                    console.log("Data Deleted");
                });

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        //console.log(key + " -> " + $scope.data[key]);
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertResult',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                activity: key,
                                cluster: data[key]
                            }
                        }).then(function(result) {

                        });
                    }
                }

                $scope.portalHelpers.invokeServerFunction({
                    functionName: 'deleteCenter',
                    uniqueNameId: 'mymProject'
                }).then(function(result) {
                    console.log("Data Deleted");
                });

                for (var i = 0; i < centers.length; i++) {
                    temp = centers[i];
                    cNum = i;
                    c1 = parseFloat(temp[0]);
                    c2 = parseFloat(temp[1]);
                    c3 = parseFloat(temp[2]);
                    console.log(cNum);
                    console.log(c1);
                    console.log(c2);
                    console.log(c3);

                    //console.log(cNum + " " + c1 + " " c2 + " " + c3);

                    $scope.portalHelpers.invokeServerFunction({
                        functionName: 'insertCen',
                        uniqueNameId: 'mymProject',
                        sqlArgs: {
                            cNum: cNum,
                            c1: c1,
                            c2: c2,
                            c3: c3
                        }
                    }).then(function(result) {
                        console.log("YAY");
                    });
                }


                data = "";
                d = "";
                centers = [];
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