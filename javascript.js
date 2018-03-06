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

.controller('qCtrl', ['$scope', function($scope) {

    $scope.mym = {

        mainuser: 'UR_72plybg0V8sF3AF',
        shortname: '',
        surveyid: 'SV_a3sfBOgY7fA1Bch',
        mailingid: 'ML_7U1n1bHTDwLvOzH',
        contact_firstName: 'Zhenghan',
        contact_lastName: 'Li',
        contact_email: 'zhenghanli1994@gmail.com',
        //use the extternal data ref for metadata could link to the database column
        contact_externalDataRef: 'This is a test',
        contact_language: 'en',
        contact_id: 'MLRP_78TMwbYOWATtM1v',
        expirationDate: z,
        fromEmail: 'noreply@qemailserver.com',
        replyToEmail: 'je2mcdon@uwaterloo.ca',
        fromName: 'J-Money Spits FIRE',
        subject: 'Email Service test1',
        distributionType: 'Individual',
        sendDate: '',
        message_id: 'MS_6XKJEMe39VyyUp7'
    };

    var yeardate = new Date();
    yeardate = yeardate.getFullYear();
    console.log(yeardate);
    $scope.yeararray = [yeardate - 2, yeardate - 1, yeardate, yeardate + 1, yeardate + 2];
    console.log($scope.yeararray);
    $scope.termarray = ["Fall ", "Winter ", "Spring "];
    console.log($scope.termarray);
    $scope.surveytypearray = ["Mental Health Initial ", "Goals Initial ", "Midterm Evaluation Survey", "Mental Health Final ", "Goals Final ", "Final Exit Survey "];
    console.log($scope.surveytypearray);
    // now you can get the string

    // console.log(isodate);

    var y = new Date(2018, 04, 25);
    var z = y.toISOString();
    //console.log(n);
    //console.log(z);
    $scope.testResults = {
        value: null
    };



    function CheckTerms(QueryResult) {
        var termInfo = QueryResult.value;
        var length = Object.keys(QueryResult).length;
        var foundTerm = false;
        //console.log(QueryResult.value[0].term);
        if (length > 0) {

            var promise = new Promise(function(resolve, reject) {
                // do a thing, possibly async, then…
                for (var key in termInfo) {
                    //alert("Entered loop");
                    alert(termInfo[key].term);
                    var combinedTerm = $scope.selectTerm + $scope.selectYear;
                    //alert($scope.selectTerm + $scope.selectYear);
                    console.log(termInfo[key].term === combinedTerm);
                    if (termInfo[key].term === combinedTerm) {
                        foundTerm = true;
                        alert("Found Term");
                        $scope.mym.mailingid = termInfo[key].mailing_id;
                        alert("Successfully entered the function");
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertSurvey',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                mailing_id: $scope.mym.mailingid,
                                survey_id: $scope.mym.surveyid,
                                type: $scope.selectsurveytype,
                                term: $scope.selectTerm + $scope.selectYear
                            }
                        }).then(function(result) {
                            console.log("entered existing mailing id");
                        });
                        break;
                    }
                }

                if (foundTerm === false || foundTerm === true) {
                    resolve("Stuff worked!");

                } else {
                    reject(Error("It broke"));
                }
            });

            promise.then(function(result) {
                console.log(result); // "Stuff worked!"
                if (foundTerm === false) {
                    console.log("did not find term");
                    $scope.mym.shortname = $scope.selectTerm + $scope.selectYear + " Mailing List";
                    console.log($scope.mym.shortname);
                    $scope.MailinglistCreate();

                }
            }, function(err) {
                console.log(err); // Error: "It broke"
            });


        }

    }

    function AddSurvey() {
        
        var QueryResult = {
            value: null
        };
        
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'SurveyTerms',
            uniqueNameId: 'mymProject',
        }).then(function(result) {
            console.log('got data: ', result);
            QueryResult.value = result;
            CheckTerms(QueryResult);
        });
    };

    $scope.checkExist = function() {
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'checkSurveyExist',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                survey_id: $scope.mym.surveyid
            }
        }).then(function(result) {
            console.log('got data: ', result);
            console.log(Object.keys(result).length);
            if (Object.keys(result).length > 0){
                alert("Survey Already Exists");
            }
            else {
                AddSurvey();
            }
            //CheckTerms(QueryResult);
        });
    };





    $scope.GetMailinglists = function() {
        $scope.portalHelpers.getApiData('Qualtrics/GetMailinglists').then(function(result) {
            console.log(result.data);

        });
    };
    $scope.SurveyDistribution = function() {
        $scope.portalHelpers.getApiData('Qualtrics/SurveyDistribution?surveyid=SV_88qa5GGKuPcI4FD').then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data); // convert from string to json
            console.log(result.data);
        });
    };
    // Create a new mailing list

    $scope.MailinglistCreate = function() {

        // {
        // "category": "Star Wars - Rebels", // hard set to 'invite' at server
        // "libraryId": "UR_1234567890AbCdE",
        // "name": "Rebel Contacts"
        // }
        console.log($scope.mym.mainuser);
        console.log($scope.mym.shortname);
        var jsn = [$scope.mym.mainuser, $scope.mym.shortname];
        $scope.portalHelpers.postApiData('Qualtrics/MailinglistCreate', {
            sources: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
            console.log(result);
            console.log(result.data.result.id);
            $scope.mym.mailingid = result.data.result.id;
            $scope.portalHelpers.invokeServerFunction({
                functionName: 'insertSurvey',
                uniqueNameId: 'mymProject',
                sqlArgs: {
                    mailing_id: $scope.mym.mailingid,
                    survey_id: $scope.mym.surveyid,
                    type: $scope.selectsurveytype,
                    term: $scope.selectTerm + $scope.selectYear
                }
            }).then(function(result) {
                console.log("Query Executed");
            });

        }, function(fail) {
            console.log('MailinglistCreate FAIL', fail);
        }, function(notify) {
            console.log('MailinglistCreate notify');
        });
    };

    // Create export request for this survey
    $scope.ResponseExportPost = function() {
        var jsn = ['SV_eRteDAkIY8P0eOx', "json"];
        $scope.portalHelpers.postApiData('Qualtrics/ResponseExportPost', {
            args: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
        }, function(fail) {
            console.log('ResponseExportPost FAIL', fail);
        }, function(notify) {
            console.log('ResponseExportPost notify');
        });
    };

    // $scope.GetMailinglistContacts = function() {
    //     $scope.portalHelpers.getApiData('Qualtrics/GetMailinglistContacts?mailinglistid=' + $scope.mym.mailinglist.id).then(function(result) {
    //         if (result.data)
    //             result.data = JSON.parse(result.data);
    //         // Example - how to find our contact - store the first id found
    //         var contactsEnum = Enumerable.From(result.data.result.elements);
    //         var filtered = contactsEnum.Where(function(x) {
    //             return x.email ==
    //                 $scope.mym.contact_email
    //         }).ToArray();
    //         if (filtered.length > 0) {
    //             if (filtered[0].id)
    //                 $scope.mym.contact_id = filtered[0].id;
    //         }
    //     });
    // };
    $scope.MailinglistsPostContact = function() {
        // mailing list id (created earlier)
        // contact first, last, email
        // arbitrary external data string
        // contact language - 'en', 'fr'
        var jsn = [$scope.mym.mailingid, $scope.mym.contact_firstName,
            $scope.mym.contact_lastName, $scope.mym.contact_email,
            $scope.mym.contact_externalDataRef, $scope.mym.contact_language
        ];
        $scope.portalHelpers.postApiData('Qualtrics/MailinglistsPostContact', {
            sources: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
            console.log(result.data);
            $scope.testResults.value = result.data;
        }, function(fail) {
            console.log('MailinglistsPostContact FAIL', fail);
        }, function(notify) {
            console.log('MailinglistsPostContact notify');
        });
    };

    // Create a survey distribution
    $scope.CreateSurveyDistribution = function() {
        // String array sources = [surveyId, expirationDate, type, fromEmail,fromName,
        // replyToEmail, subject, libraryId, messageId, mailingListId,contactId, sendDate]
        var date = new Date();
        var isodate = date.toISOString();
        $scope.mym.sendDate = isodate;
        var jsn = [$scope.mym.surveyid, $scope.mym.expirationDate, $scope.mym.distributionType, $scope.mym.fromEmail, $scope.mym.fromName, $scope.mym.replyToEmail, $scope.mym.subject, $scope.mym.mainuser, $scope.mym.message_id, $scope.mym.mailingid, $scope.mym.contact_id, $scope.mym.sendDate];
        console.log(jsn);
        $scope.portalHelpers.postApiData('Qualtrics/CreateSurveyDistribution', {
            sources: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
            console.log(result.data);
        }, function(fail) {
            console.log('CreateSurveyDistribution FAIL', fail);
        }, function(notify) {
            console.log('CreateSurveyDistribution notify');
        });
    };
    // Create new library message
    $scope.CreateLibraryMessage = function() {
        var msg = "<p><strong>FAMMMMMMM STAY LITTTTTTTTT:&nbsp;</strong><br / > $ {l: //SurveyLink?d=Take the Survey}</p><p>Or copy and paste the URL below                        into your internet browser: < br / > $ {l: //SurveyURL}</p><p><small>Follow the link to opt out of future emails: < br / > $ {l: //OptOutLink?d=Click here to   unsubscribe} < /small></p > ";
        // args = [string library id, string category, string description,string message(en)]
        var jsn = [$scope.mym.mainuser, "invite", "1185 Intake", msg];
        $scope.portalHelpers.postApiData('Qualtrics/CreateLibraryMessage', {
            args: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
            console.log(result.data);
        }, function(fail) {
            console.log('CreateLibraryMessage FAIL', fail);
        }, function(notify) {
            console.log('CreateLibraryMessage notify');
        });
    };



}])

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
    $scope.cog1 = 5;
    $scope.cog2 = 5;
    $scope.soc1 = 5;
    $scope.soc2 = 5;
    $scope.int1 = 5;
    $scope.int2 = 5;
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
            //alert(act_Activity);
            $scope.count = $scope.count - 1;

            for (var i = 0; i < $scope.input.length; i++) {
                if ($scope.input[i] === act_Activity) {
                    //alert("found it");
                    $scope.input.splice(i, 1);
                    // break;       //<-- Uncomment  if only the first term has to be removed
                }
            }
            //$scope.input.splice(act_Activity);
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
        //alert("at the distance loop");
        for (var key in centerValues.value) {

            temp = centerValues.value[key];

            distance = Math.sqrt(Math.pow(parseFloat(temp.x_coord) - parseFloat($scope.x_val), 2) + Math.pow(parseFloat(temp.y_coord) - parseFloat($scope.y_val), 2) + Math.pow(parseFloat(temp.z_coord) - parseFloat($scope.z_val), 2));
            //alert("The cluster currently belongs to " + clusterBelong[0]);
            //alert(clusterBelong[1]);
            //alert(parseFloat(distance));
            if (parseFloat(distance) <= parseFloat(clusterBelong[1])) {
                clusterBelong = [temp.cluster_number, distance];
                //alert("Changed Distance New Cluster is " + clusterBelong[0]);
                //alert(clusterBelong[0]);
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


    };
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
    };


    $scope.testSubmit = function() {
        // Make the item that user clicked available to the template
        console.log($scope.formOne);
    };



    $scope.getTheFiles = function($files) {
        angular.forEach($files, function(value, key) {
            formdata.append('file', value);
        });
    };

    function insertCenters(cNum, c1, c2, c3) {

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

    function activiesLoaded(activityLength, centers) {
        //alert("Entered Function");
        $scope.activities++;
        //alert($scope.activities); 

        if ($scope.activities == activityLength) {
            console.log(centers);
            //alert("at the end");
            var c1 = 0;
            var c2 = 0;
            var temp = [];
            var c3 = 0;
            var cNum = 0;
            //alert(centers.length);

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

                insertCenters(cNum, c1, c2, c3);
            }

            centers = "";

            alert("Successfully Wiped and Inserted");

        }

    }

    function insertActivityRow(key, holdTemp, xVal, yVal, zVal, length, centers) {

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
            //alert("got here");
            activiesLoaded(length, centers);

        });
    }

    function insertNewData(data) {

        var act = data.activities;
        //console.log(data);
        var centers = data.centers;
        //console.log(centers);
        var holdTemp = [];
        var scores = [];
        var xVal = 0;
        var yVal = 0;
        var zVal = 0;

        var length = Object.keys(act).length;

        //alert(Object.keys(act).length);
        for (var key in act) {
            if (act.hasOwnProperty(key)) {
                holdTemp = act[key];
                scores = holdTemp[1];
                for (var j = 0; j < scores.length; j++) {

                    xVal = scores[0];
                    yVal = scores[1];
                    zVal = scores[2];

                }

                insertActivityRow(key, holdTemp, xVal, yVal, zVal, length, centers);

            }
        }


    }



    function deleteData(data) {

        $scope.portalHelpers.invokeServerFunction({
            functionName: 'deleteCluster',
            uniqueNameId: 'mymProject'
        }).then(function(result) {
            console.log("Data Deleted");
            insertNewData(data);
        });
    }

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
                //console.log(d.centers);
                $scope.activities = 0;
                deleteData(d);
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