var imports = ["test.js"];

angular.module('portalApp')

.factory('myService', function() {
    var savedData = {}

    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }

})

.controller('preferenceCtrl', ['$scope', function($scope) {

    $scope.count = 1;

    $scope.actInfo = {
        value: null
    };
    var allSources = {
        value: null
    };
    $scope.scoreInfo = [];
    $scope.input = [];
    $scope.cog1;
    $scope.cog2;
    $scope.soc1;
    $scope.soc2;
    $scope.int1;
    $scope.int2;
    $scope.clusters = {
        value: null
    };


    $scope.portalHelpers.invokeServerFunction({
        functionName: 'getAct',
        uniqueNameId: 'mymProject'
    }).then(function(result) {
        console.log('got data: ', result);
        $scope.actInfo.value = result;
        //sourceLoaded();
    });

    $scope.checkedItems = function(act_Activity, act_checked) {

        if (act_checked) {
            //alert("selected " + act_Activity);
            if ($scope.count > 5) {
                alert("Please select no more than 5");

            } else {
                $scope.count = $scope.count + 1;
                $scope.input.push(act_Activity);
                act_checked = true;
            }


        } else {

            $scope.count = $scope.count - 1;
            $scope.input.splice(act_Activity, 1);
            act_checked = false;

        }
    };

    function getScores(scores) {
        //alert("Entered getScores Function");
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getScores',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                activity: scores
            }
        }).then(function(result) {
            //alert("ENTERED");
            $scope.x_val = $scope.x_val + result[0].X_val;
            $scope.y_val = $scope.y_val + result[0].Y_val;
            $scope.z_val = $scope.z_val + result[0].Z_val;
            //alert($scope.x_val);
            //$scope.x_val.push(result[0].X_val);
            sourceLoaded();


        });


    }

    function sourceLoaded() {
        $scope.sourcesLoaded++;
        //alert("sourcesLoaded");  
        if ($scope.sourcesLoaded == $scope.input.length) {
            // alert("Triggered");
            // alert($scope.x_val/3);
            // alert($scope.y_val/3);
            // alert($scope.z_val/3);
            $scope.x_val = $scope.x_val / $scope.input.length;
            $scope.y_val = $scope.y_val / $scope.input.length;
            $scope.z_val = $scope.z_val / $scope.input.length;
        }

    }

    function getActivities() {

        //alert("Entered Activity Function");
        $scope.scoreInfo = [];
        $scope.x_val = 0;
        $scope.y_val = 0;
        $scope.z_val = 0;
        if ($scope.input.length > 0) {

            $scope.sourcesLoaded = 0;

            for (var k = 0; k < $scope.input.length; k++) {

                //alert($scope.input[k]);
                getScores($scope.input[k]);
                //$scope.x_val.push(test);

            }

        }

    }

    function calculateScores(result) {
        //alert("Entered Score calculation function");
        var centerValues = {
            value: null
        };
        var temp;
        var cogScore;
        var socScore;
        var intScore;
        var distance;
        cogScore = 0;
        socScore = 0;
        intScore = 0;
        $scope.clusters = {
            value: null
        };
        var centerValues = {
            value: null
        };
        var temp;
        var clusterBelong = [0, 100];


        console.log('got data: ', result);
        centerValues.value = result;

        var cog1Edit = 10 - $scope.cog1;
        cogScore = (parseFloat(cog1Edit) + parseFloat($scope.cog2)) / 2;
        var soc1Edit = 10 - $scope.soc1;
        socScore = (parseFloat(soc1Edit) + parseFloat($scope.soc2)) / 2;
        var int2Edit = 10 - $scope.int2;
        intScore = (parseFloat(int2Edit) + parseFloat($scope.int1)) / 2;

        if ($scope.input.length > 0) {
            //now weighted average calculation
            $scope.y_val = 0.6 * cogScore + 0.4 * $scope.y_val;
            $scope.z_val = 0.6 * socScore + 0.4 * $scope.z_val;
            $scope.x_val = 0.6 * intScore + 0.4 * $scope.x_val;
        } else {
            alert("0 length");
            $scope.y_val = cogScore;
            $scope.z_val = socScore;
            $scope.x_val = intScore;
        }
        alert("at the distance loop");
        for (var key in centerValues.value) {

            temp = centerValues.value[key];

            distance = Math.sqrt(Math.pow(parseFloat(temp.x_coord) - parseFloat($scope.x_val), 2) + Math.pow(parseFloat(temp.y_coord) - parseFloat($scope.y_val), 2) + Math.pow(parseFloat(temp.z_coord) - parseFloat($scope.z_val), 2));
            alert("The cluster currently belongs to " + clusterBelong[0]);
            alert(clusterBelong[1]);
            alert(parseFloat(distance));
            if (parseFloat(distance) <= parseFloat(clusterBelong[1])) {
                clusterBelong = [temp.cluster_number, distance];
                alert("Changed Distance New Cluster is " + clusterBelong[0]);
                alert(clusterBelong[0]);
            }


        };
        
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getClusters',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                cNumber: clusterBelong[0]
            }
        }).then(function(result) {
            console.log('got cluster content: ', result);
            $scope.clusters.value = result;
            //sourceLoaded();
        });


        temp = {};
        centerValues = {
            value: null
        };


    }

    $scope.getPred = function() {

        getActivities();

        var clusterBelong = [0, 100];
        distance = 0;
        //alert("Successfully entered the function");
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getCenters',
            uniqueNameId: 'mymProject'
        }).then(function(result) {

            distance = 0;
            calculateScores(result);

            // for (var key in centerValues.value) {

            //     temp = centerValues.value[key];

            //     distance = Math.sqrt(Math.pow(parseFloat(temp.x_coord) - parseFloat(intScore), 2) + Math.pow(parseFloat(temp.y_coord) - parseFloat(cogScore), 2) + Math.pow(parseFloat(temp.z_coord) - parseFloat(socScore), 2));
            //     //alert("The cluster currently belongs to " + clusterBelong[0]);
            //     //alert(clusterBelong[1]);
            //     //alert(parseFloat(distance));
            //     if (parseFloat(distance) <= parseFloat(clusterBelong[1])) {
            //         clusterBelong = [temp.cluster_number, distance];
            //         //alert("Changed Distance New Cluster is " + clusterBelong[0]);
            //         //alert (clusterBelong[0]);
            //     }


            // };

            // $scope.portalHelpers.invokeServerFunction({
            //     functionName: 'getClusters',
            //     uniqueNameId: 'mymProject',
            //     sqlArgs: {
            //         cNumber: clusterBelong[0]
            //     }
            // }).then(function(result) {
            //     console.log('got cluster content: ', result);
            //     $scope.clusters.value = result;
            //     sourceLoaded();
            // });


            // temp = {};
            // centerValues = {
            //     value: null
            // };


        });


    };


}])

.controller('suggestCtrl', ['$scope', function($scope) {
    $scope.cog1;
    $scope.cog2;
    $scope.soc1;
    $scope.soc2;
    $scope.int1;
    $scope.int2;
    $scope.clusters = {
        value: null
    };
    var centerValues = {
        value: null
    };
    var temp;
    var cogScore;
    var socScore;
    var intScore;
    var distance;

    $scope.getPred = function() {

        var clusterBelong = [0, 100];
        distance = 0;
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
                //alert("The cluster currently belongs to " + clusterBelong[0]);
                //alert(clusterBelong[1]);
                //alert(parseFloat(distance));
                if (parseFloat(distance) <= parseFloat(clusterBelong[1])) {
                    clusterBelong = [temp.cluster_number, distance];
                    //alert("Changed Distance New Cluster is " + clusterBelong[0]);
                    //alert (clusterBelong[0]);
                };


            };

            $scope.portalHelpers.invokeServerFunction({
                functionName: 'getClusters',
                uniqueNameId: 'mymProject',
                sqlArgs: {
                    cNumber: clusterBelong[0]
                }
            }).then(function(result) {
                console.log('got cluster content: ', result);
                $scope.clusters.value = result;
                sourceLoaded();
            });


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
            //sourceLoaded();
        });
        location.reload();
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
                console.log(d);

                // this is the result
                var data = d.activities;
                var centers = d.centers;
                var temp = [];
                var holdTemp = [];
                var scores = [];
                var cNum = 0;
                var xVal = 0;
                var yVal = 0;
                var zVal = 0;
                var c1 = 0;
                var c2 = 0;
                var c3 = 0;

                $scope.portalHelpers.invokeServerFunction({
                    functionName: 'deleteCluster',
                    uniqueNameId: 'mymProject'
                }).then(function(result) {
                    console.log("Data Deleted");
                });

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        holdTemp = data[key];
                        scores = holdTemp[1];
                        for (var j = 0; j < scores.length; j++) {

                            xVal = scores[0];
                            yVal = scores[1];
                            zVal = scores[2];

                        }

                        //console.log(key + " -> " + $scope.data[key]);
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertResult',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                activity: key,
                                cluster: holdTemp[0],
                                xVal: xVal,
                                yVal: yVal,
                                zVal: zVal,
                                category: holdTemp[2]
                            }
                        }).then(function(result) {
                            //console.log(result);

                        });
                    }
                }

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
                centers = "";

                //alert("Successfully Wiped and Inserted");
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