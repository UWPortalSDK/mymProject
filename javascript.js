angular.module('portalApp').requires.push('nvd3');

var imports = ["test.js"]; 	

angular.module('portalApp', ['nvd3'])
//angular.module('portalApp')

// this controller handles the general report functionality
.controller('generalReportCtrl', ['$scope', function($scope, mymForm) {       
       
        // intitialize the variables
        $scope.terms = {
        	value: null
        };
        
        $scope.numStudents = {
        	value: null
        };
        
        $scope.avgBefore = {
        	value:null
        };
        
        $scope.avgAfter={
        	value:null
        };
        
        $scope.avgGB = {
        	value: null
        };    
        
    	// grab term information
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getTerms',
            uniqueNameId: 'mymProject',
        }).then(function(result) {
            $scope.terms.value = result;
            console.log(result);
        });  
        
         $scope.getTermDisplay = function(term) {
                 console.log('term',term);
            $scope.portalHelpers.invokeServerFunction({
                functionName: 'getNumStudents',
                uniqueNameId: 'mymProject',
                sqlArgs: {
                    term: term
                }
            }).then(function(result) {
                console.log('got student num: ', result);
                $scope.numStudents.value = result;
            });

                 $scope.portalHelpers.invokeServerFunction({
                functionName: 'getAvgBefore',
                uniqueNameId: 'mymProject',
                     sqlArgs: {
                     term: term
                     }
            }).then(function(result) {
                 if (result.length == 0){
                       console.log("Empty Result");
                     $scope.before.value = [mymForm.mhAvgData];
                     console.log($scope.avgBefore.value = result);
                }
                     else {                    
                    $scope.avgBefore.value = result;                    
                } 
                     displayValue();
            });  
             
              $scope.portalHelpers.invokeServerFunction({
                functionName: 'getAvgAfter',
                uniqueNameId: 'mymProject',
                     sqlArgs: {
                     term: term
                     }
            }).then(function(result) {
                if (result.length == 0){
                    console.log("Empty Result");                    
                    $scope.before.value = [mymForm.mhAvgData];
                    console.log($scope.avgAfter.value = result);
                }
                else {                    
                    $scope.avgAfter.value = result;                    
                }                    
                     displayValue();
            });   
             
             $scope.portalHelpers.invokeServerFunction({
                functionName: 'getAvgGBBefore',
                uniqueNameId: 'mymProject',
                     sqlArgs: {
                     term: term
                     }
            }).then(function(result) {
                if (result.length == 0){
                    console.log("Empty Result");                    
                    $scope.before.value = [mymForm.AvgIntakeData];
                    console.log($scope.avgGB.value.value = result);
                }
                else {                    
                    $scope.avgGB.value = result;                    
                }                    
                     displayValue();
            }); 
        
         };
        
   
        //D3 function that displays the charts on the html page
        function displayValue() {
        	 $scope.multiBarChartOptions = {
        "chart": {
            "type": "multiBarChart",
            "height": 500,
            "margin": {
                "top": 45,
                "right": 20,
                "bottom": 45,
                "left": 45
            },
            "clipEdge": true,
            "duration": 500,
            "stacked": false,
            "xAxis": {
                "axisLabel": "Components",
                "showMaxMin": false,
                "dispatch": {}
            },
            "yAxis": {
                "axisLabel": "Ratings",
                "axisLabelDistance": -20,
                "dispatch": {},
                "showMaxMin": true
            },
            "dispatch": {},
            "interactive": true,
            "useInteractiveGuideline": true,
            "tooltip": {
                "duration": 0,
                "gravity": "w",
                "distance": 25,
                "snapDistance": 0,
                "classes": null,
                "chartContainer": null,
                "enabled": true,
                "hideDelay": 200,
                "headerEnabled": true,
                "fixedTop": null,
                "offset": {
                    "left": 0,
                    "top": 0
                },
                "hidden": true,
                "data": null,
                "id": "nvtooltip-40825"
            },
            "interactiveLayer": {
                "dispatch": {},
                "tooltip": {
                    "duration": 0,
                    "gravity": "w",
                    "distance": 25,
                    "snapDistance": 0,
                    "classes": null,
                    "chartContainer": null,
                    "enabled": true,
                    "hideDelay": 0,
                    "headerEnabled": true,
                    "fixedTop": null,
                    "offset": {
                      "left": 0,
                      "top": 0
                    },
                    "hidden": false,
                    "data": null,
                    "id": "nvtooltip-38302"
                },
                "margin": {
                    "left": 0,
                    "top": 0
                },
                "width": null,
                "height": null,
                "showGuideLine": true,
                "svgContainer": null
            },
            "delay": 0,
            "forceY": [0, 10],
            "showLegend": true,
            "showControls": false,
            "reduceXTicks": true
        }
        },

        $scope.pieChartOptions = {
        "chart": {
            "type": "pieChart",
            "height": 500,
            "showLabels": true,
            "duration": 500,
            "showLegend": true,
            "growOnHover": true,
            "pieLabelsOutside": true,
            "legendPosition": "top",
            "labelSunbeamLayout": false,
            "labelType": "percent",
            "interactive": true,
            "useInteractiveGuideline": true,
            "legend": {
                "margin": {
                    "top": 5,
                    "right": 35,
                    "bottom": 5,
                    "left": 0
                }
            },
            "delay": 0,
            "margin": {
                "top": 30,
                "right": 20,
                "bottom": 20,
                "left": 20
            }
        },

        "title": {
            "enable": false,
            "text": "Write Your Title",
            "className": "h4",
            "css": {
                "width": "nullpx",
                "textAlign": "center"
            }
        },

        "subtitle": {
            "enable": false,
            "text": "Write Your Subtitle",
            "css": {
                "width": "nullpx",
                "textAlign": "center"
            }
        },

        "caption": {
            "enable": false,
            "text": "Figure 1. Write Your Caption text.",
            "css": {
                "width": "nullpx",
                "textAlign": "center"
            }
        }
        },

      
                $scope.MotivateAvgBarData = {
                    value: [{
                        key: "Entrance Survey",
                        values: [{
                            x: "Benefit",
                            y: $scope.avgBefore.value[0].benefit
                        }, {
                            x: "Regular",
                            y: $scope.avgBefore.value[0].regular
                        }, {
                            x: "Fun",
                            y: $scope.avgBefore.value[0].fun
                        }, {
                            x: "Satisfaction",
                            y: $scope.avgBefore.value[0].satisfaction
                        }, {
                            x: "Pressure",
                            y: $scope.avgBefore.value[0].pressure
                        }, {
                            x: "Guilt",
                            y: $scope.avgBefore.value[0].guilt
                        }]
                    }, {
                        key: "Exit Survey",
                        values: [{
                            x: "Benefit",
                            y: $scope.avgAfter.value[0].benefit
                        }, {
                            x: "Regular",
                            y: $scope.avgAfter.value[0].regular
                        }, {
                            x: "Fun",
                            y: $scope.avgAfter.value[0].fun
                        }, {
                            x: "Satisfaction",
                            y: $scope.avgAfter.value[0].satisfaction
                        }, {
                            x: "Pressure",
                            y: $scope.avgAfter.value[0].pressure
                        }, {
                            x: "Guilt",
                            y: $scope.avgAfter.value[0].guilt
                        }]
                    }, ]
                },
                
                $scope.MHAvgBarData = {
                    value: [{
                        key: "Entrance Survey",
                        values: [{
                            x: "Life",
                            y: $scope.avgBefore.value[0].life
                        }, {
                            x: "Nervous",
                            y: $scope.avgBefore.value[0].nervous
                        }, {
                            x: "Sleep",
                            y: $scope.avgBefore.value[0].sleep
                        }, {
                            x: "Stress",
                            y: $scope.avgBefore.value[0].stress
                        }, {
                            x: "Concentrate",
                            y: $scope.avgBefore.value[0].concentrate
                        }, {
                            x: "Tired",
                            y: $scope.avgBefore.value[0].tired
                        }]
                    }, {
                        key: "Exit Survey",
                        values: [{
                            x: "Life",
                            y: $scope.avgAfter.value[0].life
                        }, {
                            x: "Nervous",
                            y: $scope.avgAfter.value[0].nervous
                        }, {
                            x: "Sleep",
                            y: $scope.avgAfter.value[0].sleep
                        }, {
                            x: "Stress",
                            y: $scope.avgAfter.value[0].stress
                        }, {
                            x: "Concentrate",
                            y: $scope.avgAfter.value[0].concentrate
                        }, {
                            x: "Tired",
                            y: $scope.avgAfter.value[0].tired
                        }]
                    }, ]
                },              
               


            $scope.pieChartAvgDataGoal = {
        value:[
            {x: "Feel", y: $scope.avgGB.value[0].feel},
            {x: "Look", y: $scope.avgGB.value[0].look},
            {x: "Sleep", y: $scope.avgGB.value[0].sleep},
            {x: "Energy", y: $scope.avgGB.value[0].energy},
            {x: "Memory", y: $scope.avgGB.value[0].memory},
            {x: "Health", y: $scope.avgGB.value[0].health},
            {x: "People", y: $scope.avgGB.value[0].people}
        ]
        },
           $scope.pieChartAvgDataBarrier = {
        value:[
            {x: "Motivate", y: $scope.avgGB.value[0].motivate},
            {x: "Support", y: $scope.avgGB.value[0].support},
            {x: "Account", y: $scope.avgGB.value[0].account},
            {x: "School", y: $scope.avgGB.value[0].school},
            {x: "Job", y: $scope.avgGB.value[0].job},
            {x: "Physical", y: $scope.avgGB.value[0].physical},
            {x: "Finance", y: $scope.avgGB.value[0].finance}
        ]
        };        
        }//closing  displayValue function bracket
        


        // // Show main view in the first column as soon as controller loads
         //$scope.portalHelpers.showView('testChartMYM.html', 1);

         }])

// controller to display the activities that the algorithm suggests
.controller('activityResults', ['$scope', 'mymForm', function($scope, mymForm) {
    $scope.actResults = {
        value: null
    };
	
    // pull the suggested activities from the factory
    $scope.actResults.value = mymForm.getAct();
    //$scope.contact = $scope.editStudent.value[0].contact_id; 
    //

}])

//controller that handles the export of survey results
.controller('exportCtrl', ['$scope', 'mymForm', function($scope, mymForm) {
    
    $scope.mym = mymForm.mym;
    
    $scope.SurveyTerms = {
        value: null
    };

    $scope.SurveyTypes = {
        value: null
    };
    $scope.exportResults = {
        value: null
    };
	
    //This grabs all the terms for active survey and runs on the initialization of the survey export page
    $scope.portalHelpers.invokeServerFunction({
        functionName: 'searchSurveyTerm',
        uniqueNameId: 'mymProject',
    }).then(function(result) {
        console.log('got survey data: ', result);
        $scope.SurveyTerms.value = result;
    });
    
    // Based on the term selected the avaliable survey types will be displayed
    $scope.selecteSurveyType = function() {

        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getSurveyTerms',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                value: $scope.SelectSurveyTerm.term
            }
        }).then(function(result) {
            console.log('got data: ', result);
            $scope.SurveyTypes.value = result;
        });
    };
    

    
    $scope.exportResults = function() {
        //creating functions to insert the data
        
     
        function replaceInfo () {
            
            console.log("Entered Loop");
            var responses = $scope.exportResults.value.responses;
            for (var i = 0; i < responses.length; i++) {
                var temp = responses[i];
                console.log(temp);
               
                if($scope.selectSurveyType.type === "Initial Mental Health/Motivation"){
                   
                        // do a thing, possibly async, then…
                        for (var key in temp) {
                            if (temp.hasOwnProperty(key)) {
                                //console.log(key + " -> " + temp[key]);
                                if(temp[key] === "NOT_APPLICABLE"){
                                    temp[key] = 0;
                                }                                   

                            }
                        }                        


                        console.log("Initial Mental Health/Motivation " + $scope.SelectSurveyTerm.term);
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertInitialMHMotivate',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                survey_id: $scope.selectSurveyType.survey_id,
                                student_id: temp.sid,
                                current_term: $scope.SelectSurveyTerm.term,
                                email: temp.RecipientEmail,
                                mh_life: parseFloat(temp.mh_life_4),
                                mh_nervous: parseFloat(temp.mh_nervous_4),
                                mh_stress: parseFloat(temp.mh_stress_4),
                                mh_sleep: parseFloat(temp.mh_sleep_4),
                                mh_concentrate: parseFloat(temp.mh_concentrate_4),
                                mh_tired: parseFloat(temp.mh_tired_4),
                                mh_eval: parseFloat(temp.mh_eval_4),
                                exercise_benefit: parseFloat(temp.exercise_benefit_1),
                                exercise_regular: parseFloat(temp.exercise_regular_1),
                                exercise_fun: parseFloat(temp.exercise_fun_1),
                                exercise_satisfaction: parseFloat(temp.exercise_satisfactio_1),
                                exercise_pressure: parseFloat(temp.exercise_pressure_1),
                                exercise_guilt: parseFloat(temp.exercise_guilt_1),
                                exercise_other: temp.exercise_other                

                            }
                        }).then(function(result) {
                            console.log('Inserted');
                            //replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });
                                    

                    

                }
                else if ($scope.selectSurveyType.type === "Intake Survey"){                  

                    console.log("Intake Survey");
                    console.log(temp.goals_1);
                    $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertIntakeSurvey',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                survey_id: $scope.selectSurveyType.survey_id,
                                student_id: temp.sid,
                                current_term: $scope.SelectSurveyTerm.term,
                                email: temp.RecipientEmail,
                                gba_feel: parseFloat(temp.goals_1),
                                gba_look: parseFloat(temp.goals_2),
                                gba_sleep: parseFloat(temp.goals_3),
                                gba_energy: parseFloat(temp.goals_4),
                                gba_memory: parseFloat(temp.goals_5),
                                gba_health: parseFloat(temp.goals_6),
                                gba_people: parseFloat(temp.goals_7),
                                gba_other: temp.gba_other,
                                gbb_motivate: parseFloat(temp.Barriers_1),
                                gbb_support: parseFloat(temp.Barriers_2),
                                gbb_account: parseFloat(temp.Barriers_3),
                                gbb_school: parseFloat(temp.Barriers_4),
                                gbb_job: parseFloat(temp.Barriers_5),
                                gbb_physical: parseFloat(temp.Barriers_6),
                                gbb_finance: parseFloat(temp.Barriers_7),
                                gbb_other: temp.gbb_other,
                                gbb_plan: temp.gbb_plan,
                                gbb_notes: temp.gbb_notes
                                
                            }
                        }).then(function(result) {
                            console.log('Inserted');
                            //replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });
                    console.log("WHERE AM I");



                }
                else if ($scope.selectSurveyType.type === "Exit Survey"){
                    console.log("Exit Survey");                   
                    console.log(temp.goals_1);
                    $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertExitSurvey2',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                survey_id: $scope.selectSurveyType.survey_id,
                                student_id: temp.sid,
                                current_term: $scope.SelectSurveyTerm.term,
                                email: temp.RecipientEmail,
                                gba_feel: parseFloat(temp.goals_1),
                                gba_look: parseFloat(temp.goals_2),
                                gba_sleep: parseFloat(temp.goals_3),
                                gba_energy: parseFloat(temp.goals_4),
                                gba_memory: parseFloat(temp.goals_5),
                                gba_health: parseFloat(temp.goals_6),
                                gba_people: parseFloat(temp.goals_7),
                                gba_other: temp.gba_other,
                                gb_goal_change: temp.gb_goal_change,
                                gb_goalchange_other: temp.gb_goalchange_other,
                                gb_achieve: parseFloat(temp.gb_achieve),
                                gb_achieve_other: temp.gb_achieve_other,                             
                                gbb_motivate: parseFloat(temp.barriers_1),
                                gbb_support: parseFloat(temp.barriers_2),
                                gbb_account: parseFloat(temp.barriers_3),
                                gbb_school: parseFloat(temp.barriers_4),
                                gbb_job: parseFloat(temp.barriers_5),
                                gbb_physical: parseFloat(temp.barriers_6),
                                gbb_finance: parseFloat(temp.barriers_7),
                                gbb_other: temp.gbb_other,
                                gbb_notes: temp.gbb_notes,                             
                                f_level: temp.f_level,
                                f_participate: temp.f_participate_1,
                                f_participate_rate: temp.f_participate_rate_1,
                                f_enjoy: temp.f_enjoy_1,
                                f_enjoy_rate: temp.f_enjoy_rate_1,
                                f_not_enjoy_rate: temp.f_not_enjoy_rate_1,
                                f_not_enjoy: temp.f_not_enjoy_1,
                                f_wo_contribute: temp.f_wo_contribute,
                                f_feedback: temp.f_feedback                               
        
                            }
                        }).then(function(result) {
                            console.log('Inserted');
                            //replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });

                }
                else if ($scope.selectSurveyType.type === "Final Feedback Survey"){
                     
                    $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertFinalFeedback',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                survey_id: $scope.selectSurveyType.survey_id,
                                student_id: temp.sid,
                                current_term: $scope.SelectSurveyTerm.term,
                                email: temp.RecipientEmail,
                                scm_cope: temp.scm_cope,
                                scm_other: temp.scm_other,
                                scm_motivate: temp.scm_motivate_1,
                                scm_impact: temp.scm_impact_1,
                                scm_reason: temp.scm_reason,
                                crs_contact: temp.crs_comment,
                                crs_amount: temp.crs_amount_1,
                                crs_improve: temp.crs_improve,
                                crs_confident: temp.crs_confident_1,
                                crs_conf_exp: temp.crs_conf_exp,
                                crs_contact_yn: temp.crs_contact_yn,
                                crs_enjoy: temp.crs_enjoy_1,
                                crs_comment: temp.crs_comment            

                            }
                        }).then(function(result) {
                            console.log('Inserted');
                            //replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });
                   

                }
                else if ($scope.selectSurveyType.type === "Final Mental Health/Motivation"){
                    console.log("Final Mental Health/Motivation");
                    //console.log("Final Feedback Survey");
                    for (var key in temp) {
                            if (temp.hasOwnProperty(key)) {
                                //console.log(key + " -> " + temp[key]);
                                if(temp[key] === "NOT_APPLICABLE"){
                                    temp[key] = 0;
                                }                                   

                            }
                        }
                    	console.log(temp);
                    	


                        // console.log("Initial Mental Health/Motivation " + $scope.SelectSurveyTerm.term);
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'insertFinalMHMotivate',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                survey_id: $scope.selectSurveyType.survey_id,
                                student_id: temp.sid,
                                current_term: $scope.SelectSurveyTerm.term,
                                email: temp.RecipientEmail,
                                mh_life: parseFloat(temp.mh_life_4),
                                mh_nervous: parseFloat(temp.mh_nervous_4),
                                mh_stress: parseFloat(temp.mh_stress_4),
                                mh_sleep: parseFloat(temp.mh_sleep_4),
                                mh_concentrate: parseFloat(temp.mh_concentrate_4),
                                mh_tired: parseFloat(temp.mh_tired_4),
                                mh_eval: parseFloat(temp.mh_eval_4),
                                exercise_benefit: parseFloat(temp.exercise_benefit_1),
                                exercise_regular: parseFloat(temp.exercise_regular_1),
                                exercise_fun: parseFloat(temp.exercise_fun_1),
                                exercise_satisfaction: parseFloat(temp.exercise_satisfactio_1),
                                exercise_pressure: parseFloat(temp.exercise_pressure_1),
                                exercise_guilt: parseFloat(temp.exercise_guilt_1),
                                exercise_other: temp.exercise_other                

                            }
                        }).then(function(result) {
                            console.log('Inserted');
                            //alert("Added");
                            //replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });

                }
                 if(i === responses.length -1){
                    alert("Successfully Entered Survey Data");
                }
                
            }   
            
            
        }
		//function to download the results entered only if there are responses
        function downloadResult() {
            console.log("Entered download function");
            console.log($scope.mym.exportid);
            $scope.portalHelpers.getApiData('Qualtrics/ResponseExportFile?exportid=' + $scope.mym.exportid).then(function(result) {
                console.log(result);
                $scope.exportResults.value = JSON.parse(result.data);
                console.log($scope.exportResults.value.responses.length);                
                if ($scope.exportResults.value.responses.length != 0) {
                    //$scope.exportResults.value = JSON.parse(result.data);
                    if($scope.selectSurveyType.type === "Initial Mental Health/Motivation"){
                        
                        console.log("Initial Mental Health/Motivation " + $scope.SelectSurveyTerm.term);
                        $scope.tableName = "InitialMHMotivate";
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'deleteInitialMHMotivate',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                term: $scope.SelectSurveyTerm.term
                            }
                        }).then(function(result) {
                            console.log('Deleted');
                            replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });
                        
                    }
                    else if ($scope.selectSurveyType.type === "Intake Survey"){
                        
                        console.log("Intake Survey");
                        $scope.tableName = "IntakeSurvey";
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'deleteIntakeSurvey',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                term: $scope.SelectSurveyTerm.term
                            }
                        }).then(function(result) {
                            console.log('Deleted');
                            replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });

                        
                    }
                    else if ($scope.selectSurveyType.type === "Exit Survey"){
                        console.log("Exit Survey");
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'deleteExitSurvey',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                term: $scope.SelectSurveyTerm.term
                            }
                        }).then(function(result) {
                            console.log('Deleted');
                            replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });
                    }
                    else if ($scope.selectSurveyType.type === "Final Feedback Survey"){
                        console.log("Final Feedback Survey");
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'deleteFinalFeedback',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                term: $scope.SelectSurveyTerm.term
                            }
                        }).then(function(result) {
                            console.log('Deleted');
                            replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });
                    }
                    else if ($scope.selectSurveyType.type === "Final Mental Health/Motivation"){
                        console.log("Final Mental Health/Motivation");
                        $scope.portalHelpers.invokeServerFunction({
                            functionName: 'deleteFinalMHMotivate',
                            uniqueNameId: 'mymProject',
                            sqlArgs: {
                                term: $scope.SelectSurveyTerm.term
                            }
                        }).then(function(result) {
                            console.log('Deleted');
                            replaceInfo();
                            //$scope.InitialMHMotivate.value = result;
                        });
                    }
                }
                
                else {
                    alert("Survey Contains No Responses");
                }
            });

        };

        function checkExport() {
            var myVar = setInterval(function() {
                myTimer()
            }, 1000);

            function myStopFunction() {
                clearInterval(myVar);
            }

            function callExport() {

            }

            function myTimer() {
                $scope.portalHelpers.getApiData('Qualtrics/ResponseExportProgress?exportid=' + $scope.mym.exportid).then(function(result) {
                    if (result.data) {
                        result.data = JSON.parse(result.data);
                        console.log(result.data);
                        if (result.data.result.percentComplete === 100) {
                            console.log("100% complete");
                            myStopFunction();
                            downloadResult();
                        }

                    }
                });

            }

           


        }

        var jsn = [$scope.selectSurveyType.survey_id, "json"];
        console.log($scope.selectSurveyType.survey_id);
        $scope.portalHelpers.postApiData('Qualtrics/ResponseExportPost', {
            args: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
            console.log(result.data);
            $scope.mym.exportid = result.data.result.id;
            console.log($scope.mym.exportid);
            checkExport();
        }, function(fail) {
            console.log('ResponseExportPost FAIL', fail);
        }, function(notify) {
            console.log('ResponseExportPost notify');
        });


    };
    


}])

// controller that handles the distribution of the surveys
.controller('distributeCtrl', ['$scope', 'mymForm', function($scope,mymForm) {
    
    
    $scope.terms = {
        value: null
    };

    $scope.student = {
        value: null
    };

    $scope.surveytype = {
        value: null
    };
    var y = new Date(2018, 04, 25);
    var z = y.toISOString();
    
    $scope.mym = mymForm.mym;
    $scope.mym.expirationDate = z;
    
   
    $scope.portalHelpers.invokeServerFunction({
        functionName: 'getTermsDist',
        uniqueNameId: 'mymProject',
    }).then(function(result) {
        console.log('got term data: ', result);
        $scope.terms.value = result;
    });

    $scope.getStudent = function() {
        // alert($scope.selectedTermDis.current_term);
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getStudentDist',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                term: $scope.selectedTermDis.current_term
            }
        }).then(function(result) {
            console.log('got student data: ', result);
            $scope.student.value = result;
        });
    };

    $scope.getType = function() {
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getSurveyType',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                value: $scope.selectedTermDis.current_term
            }
        }).then(function(result) {
            console.log('got survey type: ', result);
            $scope.surveytype.value = result;

        });
    };

    $scope.distributeSurvey = function() {
        var oneYear = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        var oneProper = oneYear.toISOString();
        $scope.mym.expirationDate = oneProper;
        $scope.mym.mailingid = $scope.selectedStudent.mailing_id;
        console.log($scope.mym.mailingid);
        $scope.mym.surveyid = $scope.selectedsurvey.survey_id;
        $scope.mym.contact_id = $scope.selectedStudent.contact_id;

        var jsn = [$scope.mym.surveyid, $scope.mym.expirationDate, $scope.mym.distributionType, $scope.mym.fromEmail, $scope.mym.fromName, $scope.mym.replyToEmail, $scope.mym.subject, $scope.mym.mainuser, $scope.mym.message_id, $scope.mym.mailingid, $scope.mym.contact_id, $scope.mym.sendDate];
        console.log(jsn);
        $scope.CreateSurveyDistribution();


        //console.log($scope.mym.survey_id);
    };

    // Create a survey distribution
    $scope.CreateSurveyDistribution = function() {
        // String array sources = [surveyId, expirationDate, type, fromEmail,fromName,
        // replyToEmail, subject, libraryId, messageId, mailingListId,contactId, sendDate]
        $scope.mym.sendDate = new Date().toISOString();
        var jsn = [$scope.mym.surveyid, $scope.mym.expirationDate, $scope.mym.distributionType, $scope.mym.fromEmail, $scope.mym.fromName, $scope.mym.replyToEmail, $scope.mym.subject, $scope.mym.mainuser, $scope.mym.message_id, $scope.mym.mailingid, $scope.mym.contact_id, $scope.mym.sendDate];
        console.log(jsn);
        $scope.portalHelpers.postApiData('Qualtrics/CreateSurveyDistribution', {
            sources: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
            if (result.data.meta.httpStatus === "200 - OK") {
                alert("Email Successfully Sent");
            }
            else {
                alert(result.data.meta.error.errorMessage);
            }
            console.log(result.data);
        }, function(fail) {
            console.log('CreateSurveyDistribution FAIL', fail);
        }, function(notify) {
            console.log('CreateSurveyDistribution notify');
        });


    };

    $scope.CreateLibraryMessage = function() {

        var message = $scope.mym.message.replace(/\n/g, "<br>");
        console.log($scope.mym.message);
        var msg = "<p>" + message + "</p>" + "<br>" + " Follow this link to the Survey: ${l://SurveyLink?d=Take the Survey} Or copy and paste the URL below into your internet browser: ${l://SurveyURL} Follow the link to opt out of future emails: ${l://OptOutLink?d=Click here to unsubscribe}";
        console.log(msg);
        // args = [string library id, string category, string description,string message(en)]
        var jsn = [$scope.mym.mainuser, "invite", "Custom Test", msg];
        $scope.portalHelpers.postApiData('Qualtrics/CreateLibraryMessage', {
            args: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
            console.log(result.data);
            $scope.mym.message_id = result.data.result.id;
            console.log($scope.mym.message_id);
            $scope.distributeSurvey();
            //console.log("I AM Amazing");
        }, function(fail) {
            console.log('CreateLibraryMessage FAIL', fail);
        }, function(notify) {
            console.log('CreateLibraryMessage notify');
        });
    };


}])

.controller('qCtrl', ['$scope', 'mymForm', function($scope, mymForm) {
    
    var y = new Date(2018, 04, 25);
    var z = y.toISOString();
    $scope.frequency = " ";

    $scope.mym = mymForm.mym;
    $scope.mym.expirationDate = z;

    $scope.QueryResult = {
        value: null
    };
    
    $scope.portalHelpers.invokeServerFunction({
        functionName: 'SurveyTerms',
        uniqueNameId: 'mymProject',
    }).then(function(result) {
        console.log('got term data: ', result);
        $scope.QueryResult.value = result;
        //CheckTerms(QueryResult);
    });

    var yeardate = new Date();
    yeardate = yeardate.getFullYear();
    console.log(yeardate);
    $scope.yeararray = [yeardate - 2, yeardate - 1, yeardate, yeardate + 1, yeardate + 2];
    console.log($scope.yeararray);
    $scope.termarray = ["Fall ", "Winter ", "Spring "];
    console.log($scope.termarray);
    $scope.surveytypearray = ["Initial Mental Health/Motivation", "Intake Survey", "Exit Survey", "Final Feedback Survey", "Final Mental Health/Motivation"];
    console.log($scope.surveytypearray);
    // now you can get the string


    $scope.contactResults = {
        value: null
    };

    function CheckTerms() {
        var termInfo = $scope.QueryResult.value;
        console.log($scope.QueryResult.value);
        var length = Object.keys($scope.QueryResult).length;
        var foundTerm = false;
        //console.log(QueryResult.value[0].term);
        if (length > 0) {
            var promise = new Promise(function(resolve, reject) {
                // do a thing, possibly async, then…
                for (var key in termInfo) {
                    // alert("Entered loop");
                    // alert(termInfo[key].term);
                    var combinedTerm = $scope.selectTerm + $scope.selectYear;
                    //alert($scope.selectTerm + $scope.selectYear);
                    console.log(termInfo[key].term === combinedTerm);
                    if (termInfo[key].term === combinedTerm) {
                        foundTerm = true;
                        // alert("Found Term");
                        $scope.mym.mailingid = termInfo[key].mailing_id;
                        // alert("Successfully entered the function");
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
                            alert("Successfully Added Survey");
                            
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

    // function AddSurvey() {
    //     CheckTerms();
    // };

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
            if (Object.keys(result).length > 0) {
                alert("Survey Already Exists");
            } else {
                 CheckTerms();
            }
            //CheckTerms(QueryResult);
        });
    };

    $scope.submitEnroll = function() {
        console.log($scope.termData.mailing_id);
        $scope.mym.mailingid = $scope.termData.mailing_id;
        //console.log($scope.mym.mailing_id);
        $scope.mym.contact_externalDataRef = $scope.termData.term + " New Student";
        $scope.MailinglistsPostContact();
    };


    $scope.checkStudent = function() {
        console.log('$scope.sid', $scope.sid);
        console.log('$scope.termData', $scope.termData);
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getEditStudent',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                sid: $scope.sid,
                term: $scope.termData.term
            }
        }).then(function(result) {
            console.log(result);
            console.log('result length:', Object.keys(result).length);
            if (Object.keys(result).length > 0) {
                alert("Student is already enrolled");
            } else {
                $scope.submitEnroll();
            }

        });
    }

    $scope.insertStudent = function() {
        console.log($scope.mym.mailingid + " " + $scope.mym.contact_id + " " + $scope.mym.contact_firstName + " " + $scope.mym.contact_lastName + " " + $scope.sid + " " + $scope.termData.term + " " + $scope.program + " " + $scope.mym.contact_email + " " + $scope.gender + " " + $scope.rName + " " + $scope.rType + " " + $scope.rEmail + " " + $scope.rDepartment + " " + $scope.progress + " " + $scope.frequency + " " + $scope.consideration + " " + $scope.date + " " + $scope.aterm);
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'registrate',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                mailing: $scope.mym.mailingid,
                contact: $scope.mym.contact_id,
                fname: $scope.mym.contact_firstName,
                lname: $scope.mym.contact_lastName,
                sid: $scope.sid,
                term: $scope.termData.term,
                program: $scope.program,
                email: $scope.mym.contact_email,
                gender: $scope.gender,
                rName: $scope.rName,
                rType: $scope.rType,
                rEmail: $scope.rEmail,
                rDepartment: $scope.rDepartment,
                progress: $scope.progress,
                frequency: $scope.frequency,
                consideration: $scope.consideration,
                dates: $scope.date,
                aterm: $scope.aterm
            }
        }).then(function(result) {
            //sourceLoaded();
            console.log(result);
            location.reload();
        });

    };

    $scope.GetMailinglists = function() {
        $scope.portalHelpers.getApiData('Qualtrics/GetMailinglists').then(function(result) {
            console.log(result.data);

        });
    };
    
    $scope.MailinglistCreate = function() {
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
                alert("Successfully Added Survey");
            });

        }, function(fail) {
            console.log('MailinglistCreate FAIL', fail);
        }, function(notify) {
            console.log('MailinglistCreate notify');
        });
    };

    
    $scope.MailinglistsPostContact = function() {
        var jsn = [$scope.mym.mailingid, $scope.mym.contact_firstName,
            $scope.mym.contact_lastName, $scope.mym.contact_email,
            $scope.mym.contact_externalDataRef, $scope.mym.contact_language
        ];
        console.log(jsn);
        $scope.portalHelpers.postApiData('Qualtrics/MailinglistsPostContact', {
            sources: JSON.stringify(jsn)
        }).then(function(result) {
            if (result.data)
                result.data = JSON.parse(result.data);
            console.log(result.data);
            $scope.contactResults.value = result.data;
            if ($scope.contactResults.value.meta.httpStatus === "200 - OK") {
                console.log("Entered the if Statement");
                $scope.mym.contact_id = $scope.contactResults.value.result.id;
                $scope.insertStudent();
            }

        }, function(fail) {
            console.log('MailinglistsPostContact FAIL', fail);
        }, function(notify) {
            console.log('MailinglistsPostContact notify');
        });
    };

    // Create a survey distribution
    // $scope.CreateSurveyDistribution = function() {
    //     // String array sources = [surveyId, expirationDate, type, fromEmail,fromName,
    //     // replyToEmail, subject, libraryId, messageId, mailingListId,contactId, sendDate]
    //     var date = new Date();
    //     console.log("entered distribution");
    //     var isodate = date.toISOString();
    //     $scope.mym.sendDate = isodate;
    //     var jsn = [$scope.mym.surveyid, $scope.mym.expirationDate, $scope.mym.distributionType, $scope.mym.fromEmail, $scope.mym.fromName, $scope.mym.replyToEmail, $scope.mym.subject, $scope.mym.mainuser, $scope.mym.message_id, $scope.mym.mailingid, $scope.mym.contact_id, $scope.mym.sendDate];
    //     console.log(jsn);
    //     $scope.portalHelpers.postApiData('Qualtrics/CreateSurveyDistribution', {
    //         sources: JSON.stringify(jsn)
    //     }).then(function(result) {
    //         if (result.data)
    //             result.data = JSON.parse(result.data);
    //         console.log(result.data);
    //     }, function(fail) {
    //         console.log('CreateSurveyDistribution FAIL', fail);
    //     }, function(notify) {
    //         console.log('CreateSurveyDistribution notify');
    //     });
    // };
    // // Create new library message
    // $scope.CreateLibraryMessage = function() {
    //     console.log("WHYYYYY");
    //     var msg = "Follow this link to the Survey: ${l://SurveyLink?d=Take the Survey} Or copy and paste the URL below into your internet browser: ${l://SurveyURL} Follow the link to opt out of future emails: ${l://OptOutLink?d=Click here to unsubscribe}";
    //     // args = [string library id, string category, string description,string message(en)]
    //     var jsn = [$scope.mym.mainuser, "invite", "1185 Test", msg];
    //     $scope.portalHelpers.postApiData('Qualtrics/CreateLibraryMessage', {
    //         args: JSON.stringify(jsn)
    //     }).then(function(result) {
    //         if (result.data)
    //             console.log("Here");
    //             result.data = JSON.parse(result.data);
    //         console.log(result.data);
    //     }, function(fail) {
    //         console.log('CreateLibraryMessage FAIL', fail);
    //     }, function(notify) {
    //         console.log('CreateLibraryMessage notify');
    //     });
    // };

    // Return all distributions for this survey
    $scope.SurveyDistribution = function() {
        $scope.portalHelpers.getApiData('Qualtrics/SurveyDistribution?surveyid=' + $scope.mym.surveyid).then(function(result) {
            if (result.data) {
                result.data = JSON.parse(result.data);
                console.log(result.data);
                if (result.data.meta.httpStatus === "400 - Bad Request") {
                    console.log("Successfully logged the error");
                    alert("Invalid Request Please Verify the Survey ID");

                } else {
                    console.log("Proper Survey ID");
                    $scope.checkExist();
                }

            }
            // convert from string to json
        });
    };



}])

//controller that deals with activity suggestion
.controller('preferenceCtrl', ['$scope','mymForm', function($scope,mymForm) {

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
    $scope.testClusters = {
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
        $scope.done = false;
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
            $scope.y_val = 0.7 * cogScore + 0.3 * $scope.y_val;
            $scope.z_val = 0.7 * socScore + 0.3 * $scope.z_val;
            $scope.x_val = 0.7 * intScore + 0.3 * $scope.x_val;
        } else {
            // alert("0 length");
            $scope.y_val = cogScore;
            $scope.z_val = socScore;
            $scope.x_val = intScore;
        }
        
        var promise3 = new Promise(function(resolve, reject) {
            // do a thing, possibly async, then…
            for (var key in centerValues.value) {
				
                temp = centerValues.value[key];
				console.log(temp);
                
                distance = Math.sqrt(Math.pow(parseFloat(temp.x_coord) - parseFloat($scope.x_val), 2) + Math.pow(parseFloat(temp.y_coord) - parseFloat($scope.y_val), 2) + Math.pow(parseFloat(temp.z_coord) - parseFloat($scope.z_val), 2));
                console.log(distance);
                console.log("The cluster currently belongs to " + clusterBelong[0]);
                //alert(clusterBelong[1]);
                //alert(parseFloat(distance));
                if (parseFloat(distance) <= parseFloat(clusterBelong[1])) {
                    clusterBelong = [temp.cluster_number, distance];
                    console.log("Changed Distance New Cluster is " + clusterBelong[0]);
                    //alert(clusterBelong[0]);
                }


            };
            $scope.done = true;

            if ($scope.done === true) {
                resolve("Stuff worked!");

            } else {
                reject(Error("It broke"));
            }
        });
        
        promise3.then(function(result) {
            console.log(result); // "Stuff worked!"
            if ($scope.done = true) {
                $scope.portalHelpers.invokeServerFunction({
                    functionName: 'getClusters',
                    uniqueNameId: 'mymProject',
                    sqlArgs: {
                        cNumber: clusterBelong[0]
                    }
                }).then(function(result) {
                    console.log('got cluster content: ', result);
                    $scope.clusters.value = result;
                    mymForm.setAct(result);
                    $scope.portalHelpers.showView('activityShow.html', 2);
                    //sourceLoaded();
                });

            }
        }, function(err) {
            console.log(err); // Error: "It broke"
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

//controller that handles the editing of a participant
.controller('editCtrl', ['$scope', 'mymForm', function($scope, mymForm) {
    $scope.editStudent = {
        value: null
    };

    $scope.editStudent.value = mymForm.get();
    $scope.contact = $scope.editStudent.value[0].contact_id;
    

    $scope.updateStudent = function() {
        
        var sid = parseInt($scope.editStudent.value[0].student_id);
        // alert($scope.contact);
        //alert("Successfully entered the function");
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'updateStudent',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                fname: $scope.editStudent.value[0].pname_f,
                lname: $scope.editStudent.value[0].pname_l,
                sid: sid,
                email: $scope.editStudent.value[0].p_email,
                gender: $scope.editStudent.value[0].gender,
                program: $scope.editStudent.value[0].program,
                aterm: $scope.editStudent.value[0].academic_term,
                hbuddy: $scope.editStudent.value[0].workout_buddy,
                bname: $scope.editStudent.value[0].buddy_name,
                confreq: $scope.editStudent.value[0].rfrequent,
                current_term: $scope.editStudent.value[0].current_term,
                contact_id: $scope.contact


            }
        }).then(function(result) {
            //sourceLoaded();
            console.log(result);
            location.reload();
        });
        //location.reload();
    };



}])

//controller that controls the functionality of the profile page
.controller('profileCtrl', ['$scope', 'mymForm', function($scope, mymForm) {
    $scope.value1 = true;
    $scope.value2 = false;
    $scope.frequency = "";

    $scope.before = {
        value: null
    };
    
    $scope.after = {
        value: null
    };
    
    $scope.gb = {
        value: null
    };

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
    $scope.editStudent = {
        value: null
    };
    
    $scope.show = true;
    
     function displayValue() {
     $scope.ChartOptions = {
             "chart": {
                 "type": "multiBarChart",
                 "height": 450,
                 "margin": {
                     "top": 45,
                     "right": 20,
                     "bottom": 45,
                     "left": 45
                 },
                 "clipEdge": true,
                 "duration": 500,
                 "stacked": false,
                 "xAxis": {
                     "axisLabel": "Components",
                     "showMaxMin": false,
                     "dispatch": {}
                 },
                 "yAxis": {
                     "axisLabel": "Ratings",
                     "axisLabelDistance": -20,
                     "dispatch": {},
                     "showMaxMin": true
                 },
                 "dispatch": {},
                 "interactive": true,
                 "useInteractiveGuideline": true,
                 "tooltip": {
                     "duration": 0,
                     "gravity": "w",
                     "distance": 25,
                     "snapDistance": 0,
                     "classes": null,
                     "chartContainer": null,
                     "enabled": true,
                     "hideDelay": 200,
                     "headerEnabled": true,
                     "fixedTop": null,
                     "offset": {
                         "left": 0,
                         "top": 0
                     },
                     "hidden": true,
                     "data": null,
                     "id": "nvtooltip-40825"
                 },
                 "interactiveLayer": {
                     "dispatch": {},
                     "tooltip": {
                         "duration": 0,
                         "gravity": "w",
                         "distance": 25,
                         "snapDistance": 0,
                         "classes": null,
                         "chartContainer": null,
                         "enabled": true,
                         "hideDelay": 0,
                         "headerEnabled": true,
                         "fixedTop": null,
                         "offset": {
                             "left": 0,
                             "top": 0
                         },
                         "hidden": false,
                         "data": null,
                         "id": "nvtooltip-38302"
                     },
                     "margin": {
                         "left": 0,
                         "top": 0
                     },
                     "width": null,
                     "height": null,
                     "showGuideLine": true,
                     "svgContainer": null
                 },
                 "delay": 0,
                 "forceY": [0, 10],
                 "showLegend": true,
                 "showControls": false,
                 "reduceXTicks": true,

             },
             "title": {
                 "enable": false,
                 "text": "Comparison Charts",
                 "className": "h4",
                 "css": {
                     "width": "nullpx",
                     "textAlign": "center"
                 }
             },
             "subtitle": {
                 "enable": false,
                 "text": "Mental Health",
                 "css": {
                     "width": "nullpx",
                     "textAlign": "center"
                 }
             },
             "caption": {
                 "enable": false,
                 "text": "Figure 1. Write Your Caption text.",
                 "css": {
                     "width": "nullpx",
                     "textAlign": "center"
                 }
             }
         },

         $scope.pieChartOptions = {
             "chart": {
                 "type": "pieChart",
                 "height": 500,
                 "showLabels": true,
                 "duration": 500,
                 "showLegend": true,
                 "growOnHover": true,
                 "pieLabelsOutside": true,
                 "legendPosition": "top",
                 "labelSunbeamLayout": false,
                 "labelType": "percent",
                 "interactive": true,
                 "useInteractiveGuideline": true,
                 "legend": {
                     "margin": {
                         "top": 5,
                         "right": 35,
                         "bottom": 5,
                         "left": 0
                     }
                 },
                 "delay": 0,
                 "margin": {
                     "top": 30,
                     "right": 20,
                     "bottom": 20,
                     "left": 20
                 }
             },

             "title": {
                 "enable": false,
                 "text": "Write Your Title",
                 "className": "h4",
                 "css": {
                     "width": "nullpx",
                     "textAlign": "center"
                 }
             },

             "subtitle": {
                 "enable": false,
                 "text": "Write Your Subtitle",
                 "css": {
                     "width": "nullpx",
                     "textAlign": "center"
                 }
             },

             "caption": {
                 "enable": false,
                 "text": "Figure 1. Write Your Caption text.",
                 "css": {
                     "width": "nullpx",
                     "textAlign": "center"
                 }
             }
         },

         $scope.MHBarData = {
             value: [{
                 key: "Entrance Survey",
                 values: [{
                     x: "Life",
                     y: $scope.before.value[0].mh_life
                 }, {
                     x: "Nervous",
                     y: $scope.before.value[0].mh_nervous
                 }, {
                     x: "Sleep",
                     y: $scope.before.value[0].mh_sleep
                 }, {
                     x: "Stress",
                     y: $scope.before.value[0].mh_stress
                 }, {
                     x: "Concentrate",
                     y: $scope.before.value[0].mh_concentrate
                 }, {
                     x: "Tired",
                     y: $scope.before.value[0].mh_tired
                 }]
             }, {
                 key: "Exit Survey",
                 values: [{
                     x: "Life",
                     y: $scope.after.value[0].mh_life
                 }, {
                     x: "Nervous",
                     y: $scope.after.value[0].mh_nervous
                 }, {
                     x: "Sleep",
                     y: $scope.after.value[0].mh_sleep
                 }, {
                     x: "Stress",
                     y: $scope.after.value[0].mh_stress
                 }, {
                     x: "Concentrate",
                     y: $scope.after.value[0].mh_concentrate
                 }, {
                     x: "Tired",
                     y: $scope.after.value[0].mh_tired
                 }]
             }, ]
         },

         $scope.MotivateBarData = {
             value: [{
                 key: "Entrance Survey",
                 values: [{
                     x: "Benefit",
                     y: $scope.before.value[0].exercise_benefit
                 }, {
                     x: "Regular",
                     y: $scope.before.value[0].exercise_regular
                 }, {
                     x: "Fun",
                     y: $scope.before.value[0].exercise_fun
                 }, {
                     x: "Satisfaction",
                     y: $scope.before.value[0].exercise_satisfaction
                 }, {
                     x: "Pressure",
                     y: $scope.before.value[0].exercise_pressure
                 }, {
                     x: "Guilt",
                     y: $scope.before.value[0].exercise_guilt
                 }]
             }, {
                 key: "Exit Survey",
                 values: [{
                     x: "Benefit",
                     y: $scope.after.value[0].exercise_benefit
                 }, {
                     x: "Regular",
                     y: $scope.after.value[0].exercise_regular
                 }, {
                     x: "Fun",
                     y: $scope.after.value[0].exercise_fun
                 }, {
                     x: "Satisfaction",
                     y: $scope.after.value[0].exercise_satisfaction
                 }, {
                     x: "Pressure",
                     y: $scope.after.value[0].exercise_pressure
                 }, {
                     x: "Guilt",
                     y: $scope.after.value[0].exercise_guilt
                 }]
             }, ]
         },


         $scope.pieChartDataGoal = {
             value: [{
                 x: "Feel",
                 y: $scope.gb.value[0].gba_feel
             }, {
                 x: "Look",
                 y: $scope.gb.value[0].gba_look
             }, {
                 x: "Sleep",
                 y: $scope.gb.value[0].gba_sleep
             }, {
                 x: "Energy",
                 y: $scope.gb.value[0].gba_energy
             }, {
                 x: "Memory",
                 y: $scope.gb.value[0].gba_memory
             }, {
                 x: "Health",
                 y: $scope.gb.value[0].gba_health
             }, {
                 x: "People",
                 y: $scope.gb.value[0].gba_people
             }]
         },
         $scope.pieChartDataBarrier = {
             value: [{
                 x: "Motivate",
                 y: $scope.gb.value[0].gbb_motivate
             }, {
                 x: "Support",
                 y: $scope.gb.value[0].gbb_support
             }, {
                 x: "Account",
                 y: $scope.gb.value[0].gbb_account
             }, {
                 x: "School",
                 y: $scope.gb.value[0].gbb_school
             }, {
                 x: "Job",
                 y: $scope.gb.value[0].gbb_job
             }, {
                 x: "Physical",
                 y: $scope.gb.value[0].gbb_physical
             }, {
                 x: "Finance",
                 y: $scope.gb.value[0].gbb_finance
             }]
         };


     }
    // This function gets called when user clicks an item in the list
    $scope.showDetails = function(term, id) {

        console.log(term + id);
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getEditStudent',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                term: term,
                sid: id
            }
        }).then(function(result) {
            //console.log('got data: ', result);
            $scope.editStudent.value = result;
            //console.log($scope.editStudent.value);
            console.log("Ran QUery");
            mymForm.set(result);
            $scope.portalHelpers.showView('profileEdit.html', 2);


        });


    };

    $scope.portalHelpers.invokeServerFunction({
        functionName: 'getStudents',
        uniqueNameId: 'mymProject'
    }).then(function(result) {
        console.log('got data: ', result);
        $scope.studentInfo.value = result;
        //sourceLoaded();
    });

    $scope.testSubmit = function() {
        //alert("Successfully entered the function");
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'registrate',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                mailing: $scope.mailing,
                contact: $scope.contact,
                fname: $scope.fname,
                lname: $scope.lname,
                sid: $scope.sid,
                term: $scope.term,
                program: $scope.program,
                email: $scope.email,
                gender: $scope.gender,
                rName: $scope.rName,
                rType: $scope.rType,
                rEmail: $scope.rEmail,
                rDepartment: $scope.rDepartment,
                progress: $scope.progress,
                frequency: $scope.frequency,
                consideration: $scope.consideration,
                dates: $scope.date,
                aterm: $scope.aterm
            }
        }).then(function(result) {
            //sourceLoaded();
            location.reload();
        });
        
    };

    $scope.updateStudent = function() {
        //alert("Successfully entered the function");
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'updateStudent',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                fname: $scope.selectedTerm.pname_f,
                lname: $scope.selectedTerm.pname_l,
                sid: $scope.selectedTerm.student_id,
                email: $scope.selectedTerm.p_email,
                gender: $scope.selectedTerm.gender,
                program: $scope.selectedTerm.program,
                aterm: $scope.selectedTerm.academic_term,
                hbuddy: $scope.selectedTerm.workout_buddy,
                bname: $scope.selectedTerm.buddy_name,
                confreq: $scope.selectedTerm.rfrequent,
                current_term: $scope.selectedTerm.current_term


            }
        }).then(function(result) {
            //sourceLoaded();
            console.log(result);
            location.reload();
        });
        //location.reload();
    };

    $scope.selectedItemChanged = function(id, name) {
        // Make the item that user clicked available to the template
        $scope.show = true;
        $scope.value1 = false;
        $scope.value2 = true;
        $scope.selectedStudent.value = name;
        document.getElementById("Studentnamesearchbox").value = id;
        $scope.searchKeyword = id;
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getTermsProfile',
            uniqueNameId: 'mymProject',
            sqlArgs: {
                value: id
            }
        }).then(function(result) {
            console.log('got the data data: ', result);
            $scope.terms.value = result;
            //$scope.testFunction();
        });
		

    };
    
    //function to check if student id exists because student did not access survey by link
    function checkBefore(){
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getBefore2',
            uniqueNameId: 'mymProject',
            sqlArgs: {                           
                sid: $scope.selectedTerm.student_id,
                term: $scope.selectedTerm.current_term

            }
        }).then(function(result) {
            // if the result length is zero then the students information is not in the db so we set to default value of 0's
            if (result.length == 0){
                $scope.before.value = [mymForm.mhData];
                console.log("still no before data");
                //console.log( $scope.before.value);
            }
            else{                            
                $scope.before.value = result                            
                //console.log( $scope.before.value);
            }

        });
    }
    
    //function to check if student id exists because student did not access survey by link
    function checkAfter(){
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getAfter2',
            uniqueNameId: 'mymProject',
            sqlArgs: {                           
                sid: $scope.selectedTerm.student_id,
                term: $scope.selectedTerm.current_term

            }
        }).then(function(result) {
            // if the result length is zero then the students information is not in the db so we set to default value of 0's
            if (result.length == 0){
                $scope.after.value = [mymForm.mhData];
                console.log("still no after data");
                //console.log( $scope.after.value);
            }
            else{                            
                $scope.before.value = result                            
                //console.log( $scope.after.value);
            }

        });
    }
    
    //function to check if student id exists because student did not access survey by link
    function checkGB(){
        $scope.portalHelpers.invokeServerFunction({
            functionName: 'getBeforeGB2',
            uniqueNameId: 'mymProject',
            sqlArgs: {                           
                sid: $scope.selectedTerm.student_id,
                term: $scope.selectedTerm.current_term

            }
        }).then(function(result) {
            //console.log(result);
            // if the result length is zero then the students information is not in the db so we set to default value of 0's
            if (result.length == 0){
                
                $scope.gb.value = [mymForm.intakeData];
                console.log("still no gb data");
                //console.log( $scope.gb.value);
                console.log( $scope.before.value);
                console.log( $scope.after.value);
                console.log( $scope.gb.value);
                displayValue();
            }
            else{

                $scope.gb.value = result                            
                //console.log( $scope.gb.value);
                console.log( $scope.before.value);
                console.log( $scope.after.value);
                console.log( $scope.gb.value);
                displayValue();
            }

        });
    }

    $scope.getEmails = function() {
        if($scope.selectedTerm != null)
        {
            $scope.show = false;

            console.log($scope.selectedTerm.p_email);
            
            //get the before information to use in the graphs
            $scope.portalHelpers.invokeServerFunction({
                functionName: 'getBefore',
                uniqueNameId: 'mymProject',
                sqlArgs: {
                    email: $scope.selectedTerm.p_email,
                    term: $scope.selectedTerm.current_term
                }
            }).then(function(result) {
                
                if (result.length == 0){                    
                    // if the result is empty then check if there is a student id to compare to
                    console.log("Empty Result");
                    checkBefore();                   

                }
                else {                    
                    $scope.before.value = result;                    
                }
                
                
                $scope.portalHelpers.invokeServerFunction({
                    functionName: 'getAfter',
                    uniqueNameId: 'mymProject',
                    sqlArgs: {
                        email: $scope.selectedTerm.p_email,
                        term: $scope.selectedTerm.current_term
                    }
                }).then(function(result) {
                    console.log('got after data: ', result);
                    if (result.length == 0){

                        console.log("Empty Result");
                        checkAfter();
                        

                    }
                    else {

                        $scope.after.value = result;
                        //console.log($scope.after.value = result);

                    }
                    //$scope.after.value = result;
                    $scope.portalHelpers.invokeServerFunction({
                        functionName: 'getBeforeGB',
                        uniqueNameId: 'mymProject',
                        sqlArgs: {
                            email: $scope.selectedTerm.p_email,
                            term: $scope.selectedTerm.current_term
                        }
                    }).then(function(result) {
                        //console.log(result);
                        console.log('got gb data: ', result);
                        if (result.length == 0){
                            console.log("Empty Result");
                            checkGB();                          

                        }
                        else {

                            $scope.gb.value = result;
                            //console.log($scope.gb.value = result);
                            console.log( $scope.before.value);
                            console.log( $scope.after.value);
                            console.log( $scope.gb.value);
                            displayValue();

                        }

                    });
                     
                });
                
            });
           

          
        }

    }


}])

// Widget controller - runs every time widget is shown
.controller('mymProjectCtrl', ['$scope', '$http', '$q', 'mymForm', function($scope, $http, $q, mymForm) {


    // Import variables and functions from service
    //$scope.options = mymForm.options;
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

        $scope.portalHelpers.showView('qStuff.html', 2);
    };

    $scope.Qualtrics_Add = function() {

        $scope.portalHelpers.showView('survey_creation.html', 2);
    };

    $scope.Qualtrics_Send = function() {

        $scope.portalHelpers.showView('survey_distribution.html', 2);
    };

    $scope.Qualtrics_Export = function() {

        $scope.portalHelpers.showView('survey_export.html', 2);
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

    var init = function($scope) {
        if (initialized.value)
            return;

        initialized.value = true;

        console.log('getting data.. ', $scope.portalHelpers, $scope.portalHelpers.invokeServerFunction);

        // Place your init code here:

    };
    
    var mym = {

        mainuser: 'UR_2bn6F7kb5V372Jv',
        shortname: '',
        surveyid: '',
        mailingid: '',
        contact_firstName: '',
        contact_lastName: '',
        contact_email: '',
        //use the extternal data ref for metadata could link to the database column
        contact_externalDataRef: '',
        contact_language: 'en',
        contact_id: 'MLRP_78TMwbYOWATtM1v',
        expirationDate: '',
        fromEmail: 'noreply@qemailserver.com',
        replyToEmail: 'je2mcdon@uwaterloo.ca',
        fromName: 'Welcome Move Your Mind',
        subject: '',
        distributionType: 'Individual',
        sendDate: '',
        message: '',
        message_id: ''
    };
    
    var mhData = {
        mh_life: 0,
        mh_nervous: 0,
        mh_sleep: 0,
        mh_stress: 0,
        mh_concentrate: 0,
        mh_tired: 0,
        exercise_benefit: 0,
        exercise_regular:0,
        exercise_fun: 0,
        exercise_satisfaction: 0,
        exercise_pressure: 0,
        exercise_guilt:0                       

    };
    
    var intakeData = {
        gba_feel: 0,
        gba_look: 0,
        gba_sleep: 0,
        gba_energy: 0,
        gba_memory: 0,
        gba_health: 0,
        gba_people: 0,
        gbb_motivate:0,
        gbb_support: 0,
        gbb_account: 0,
        gbb_school: 0,
        gbb_job:0,
        gbb_physical:0,
        gbb_finance:0       

    };
    
    
	var mhAvgData = {
        life: 0,
        nervous: 0,
        sleep: 0,
        stress: 0,
        concentrate: 0,
        tired: 0,
        benefit: 0,
        regular:0,
        fun: 0,
        satisfaction: 0,
        pressure: 0,
        guilt:0                       

    };
    
     var AvgIntakeData = {
        feel: 0,
        look: 0,
        sleep: 0,
        energy: 0,
        memory: 0,
        health: 0,
        people: 0,
        motivate:0,
        support: 0,
        account: 0,
        school: 0,
        job:0,
        physical:0,
        finance:0       

    };

    var savedData = {
        value: null
    };
    
    var activityData = {
        value: null
    };
    
    function setAct(data) {
        activityData = data;
    }

    function getAct() {

        return activityData;
    }

    function set(data) {
        savedData = data;
    }

    function get() {

        return savedData;
    }


    // Expose init(), and variables
    return {
        init: init,
        mym: mym,
        setAct: setAct,
        getAct: getAct,
        set: set,
        get: get,
        mhData: mhData,
        intakeData: intakeData,
        mhAvgData:mhAvgData,
        AvgIntakeData:AvgIntakeData

    };
}])


// Custom filter example
.filter('mymProjectFilterName', function() {
    return function(input, arg1, arg2) {
        // Filter your output here by iterating over input elements
        var output = input;
        return output;
    }
})

.filter('linebreaks', function() {
    return function(text) {
        return text.replace(/\n/g, "<br>");
    }
});


//D3.js v3.5.17
//
//
!function(){function n(n){return n&&(n.ownerDocument||n.document||n).documentElement}function t(n){return n&&(n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView)}function e(n,t){return t>n?-1:n>t?1:n>=t?0:NaN}function r(n){return null===n?NaN:+n}function i(n){return!isNaN(n)}function u(n){return{left:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n(t[u],e)<0?r=u+1:i=u}return r},right:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n(t[u],e)>0?i=u:r=u+1}return r}}}function o(n){return n.length}function a(n){for(var t=1;n*t%1;)t*=10;return t}function l(n,t){for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}function c(){this._=Object.create(null)}function f(n){return(n+="")===bo||n[0]===_o?_o+n:n}function s(n){return(n+="")[0]===_o?n.slice(1):n}function h(n){return f(n)in this._}function p(n){return(n=f(n))in this._&&delete this._[n]}function g(){var n=[];for(var t in this._)n.push(s(t));return n}function v(){var n=0;for(var t in this._)++n;return n}function d(){for(var n in this._)return!1;return!0}function y(){this._=Object.create(null)}function m(n){return n}function M(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function x(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e=0,r=wo.length;r>e;++e){var i=wo[e]+t;if(i in n)return i}}function b(){}function _(){}function w(n){function t(){for(var t,r=e,i=-1,u=r.length;++i<u;)(t=r[i].on)&&t.apply(this,arguments);return n}var e=[],r=new c;return t.on=function(t,i){var u,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,u=e.indexOf(o)).concat(e.slice(u+1)),r.remove(t)),i&&e.push(r.set(t,{on:i})),n)},t}function S(){ao.event.preventDefault()}function k(){for(var n,t=ao.event;n=t.sourceEvent;)t=n;return t}function N(n){for(var t=new _,e=0,r=arguments.length;++e<r;)t[arguments[e]]=w(t);return t.of=function(e,r){return function(i){try{var u=i.sourceEvent=ao.event;i.target=n,ao.event=i,t[i.type].apply(e,r)}finally{ao.event=u}}},t}function E(n){return ko(n,Co),n}function A(n){return"function"==typeof n?n:function(){return No(n,this)}}function C(n){return"function"==typeof n?n:function(){return Eo(n,this)}}function z(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function i(){this.setAttribute(n,t)}function u(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=ao.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?u:i}function L(n){return n.trim().replace(/\s+/g," ")}function q(n){return new RegExp("(?:^|\\s+)"+ao.requote(n)+"(?:\\s+|$)","g")}function T(n){return(n+"").trim().split(/^|\s+/)}function R(n,t){function e(){for(var e=-1;++e<i;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<i;)n[e](this,r)}n=T(n).map(D);var i=n.length;return"function"==typeof t?r:e}function D(n){var t=q(n);return function(e,r){if(i=e.classList)return r?i.add(n):i.remove(n);var i=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(i)||e.setAttribute("class",L(i+" "+n))):e.setAttribute("class",L(i.replace(t," ")))}}function P(n,t,e){function r(){this.style.removeProperty(n)}function i(){this.style.setProperty(n,t,e)}function u(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?u:i}function U(n,t){function e(){delete this[n]}function r(){this[n]=t}function i(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?i:r}function j(n){function t(){var t=this.ownerDocument,e=this.namespaceURI;return e===zo&&t.documentElement.namespaceURI===zo?t.createElement(n):t.createElementNS(e,n)}function e(){return this.ownerDocument.createElementNS(n.space,n.local)}return"function"==typeof n?n:(n=ao.ns.qualify(n)).local?e:t}function F(){var n=this.parentNode;n&&n.removeChild(this)}function H(n){return{__data__:n}}function O(n){return function(){return Ao(this,n)}}function I(n){return arguments.length||(n=e),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function Y(n,t){for(var e=0,r=n.length;r>e;e++)for(var i,u=n[e],o=0,a=u.length;a>o;o++)(i=u[o])&&t(i,o,e);return n}function Z(n){return ko(n,qo),n}function V(n){var t,e;return function(r,i,u){var o,a=n[u].update,l=a.length;for(u!=e&&(e=u,t=0),i>=t&&(t=i+1);!(o=a[t])&&++t<l;);return o}}function X(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function i(){var i=l(t,co(arguments));r.call(this),this.addEventListener(n,this[o]=i,i.$=e),i._=t}function u(){var t,e=new RegExp("^__on([^.]+)"+ao.requote(n)+"$");for(var r in this)if(t=r.match(e)){var i=this[r];this.removeEventListener(t[1],i,i.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),l=$;a>0&&(n=n.slice(0,a));var c=To.get(n);return c&&(n=c,l=B),a?t?i:r:t?b:u}function $(n,t){return function(e){var r=ao.event;ao.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{ao.event=r}}}function B(n,t){var e=$(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function W(e){var r=".dragsuppress-"+ ++Do,i="click"+r,u=ao.select(t(e)).on("touchmove"+r,S).on("dragstart"+r,S).on("selectstart"+r,S);if(null==Ro&&(Ro="onselectstart"in e?!1:x(e.style,"userSelect")),Ro){var o=n(e).style,a=o[Ro];o[Ro]="none"}return function(n){if(u.on(r,null),Ro&&(o[Ro]=a),n){var t=function(){u.on(i,null)};u.on(i,function(){S(),t()},!0),setTimeout(t,0)}}}function J(n,e){e.changedTouches&&(e=e.changedTouches[0]);var r=n.ownerSVGElement||n;if(r.createSVGPoint){var i=r.createSVGPoint();if(0>Po){var u=t(n);if(u.scrollX||u.scrollY){r=ao.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var o=r[0][0].getScreenCTM();Po=!(o.f||o.e),r.remove()}}return Po?(i.x=e.pageX,i.y=e.pageY):(i.x=e.clientX,i.y=e.clientY),i=i.matrixTransform(n.getScreenCTM().inverse()),[i.x,i.y]}var a=n.getBoundingClientRect();return[e.clientX-a.left-n.clientLeft,e.clientY-a.top-n.clientTop]}function G(){return ao.event.changedTouches[0].identifier}function K(n){return n>0?1:0>n?-1:0}function Q(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(t[1]-n[1])*(e[0]-n[0])}function nn(n){return n>1?0:-1>n?Fo:Math.acos(n)}function tn(n){return n>1?Io:-1>n?-Io:Math.asin(n)}function en(n){return((n=Math.exp(n))-1/n)/2}function rn(n){return((n=Math.exp(n))+1/n)/2}function un(n){return((n=Math.exp(2*n))-1)/(n+1)}function on(n){return(n=Math.sin(n/2))*n}function an(){}function ln(n,t,e){return this instanceof ln?(this.h=+n,this.s=+t,void(this.l=+e)):arguments.length<2?n instanceof ln?new ln(n.h,n.s,n.l):_n(""+n,wn,ln):new ln(n,t,e)}function cn(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?u+(o-u)*n/60:180>n?o:240>n?u+(o-u)*(240-n)/60:u}function i(n){return Math.round(255*r(n))}var u,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,u=2*e-o,new mn(i(n+120),i(n),i(n-120))}function fn(n,t,e){return this instanceof fn?(this.h=+n,this.c=+t,void(this.l=+e)):arguments.length<2?n instanceof fn?new fn(n.h,n.c,n.l):n instanceof hn?gn(n.l,n.a,n.b):gn((n=Sn((n=ao.rgb(n)).r,n.g,n.b)).l,n.a,n.b):new fn(n,t,e)}function sn(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),new hn(e,Math.cos(n*=Yo)*t,Math.sin(n)*t)}function hn(n,t,e){return this instanceof hn?(this.l=+n,this.a=+t,void(this.b=+e)):arguments.length<2?n instanceof hn?new hn(n.l,n.a,n.b):n instanceof fn?sn(n.h,n.c,n.l):Sn((n=mn(n)).r,n.g,n.b):new hn(n,t,e)}function pn(n,t,e){var r=(n+16)/116,i=r+t/500,u=r-e/200;return i=vn(i)*na,r=vn(r)*ta,u=vn(u)*ea,new mn(yn(3.2404542*i-1.5371385*r-.4985314*u),yn(-.969266*i+1.8760108*r+.041556*u),yn(.0556434*i-.2040259*r+1.0572252*u))}function gn(n,t,e){return n>0?new fn(Math.atan2(e,t)*Zo,Math.sqrt(t*t+e*e),n):new fn(NaN,NaN,n)}function vn(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function dn(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function yn(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function mn(n,t,e){return this instanceof mn?(this.r=~~n,this.g=~~t,void(this.b=~~e)):arguments.length<2?n instanceof mn?new mn(n.r,n.g,n.b):_n(""+n,mn,cn):new mn(n,t,e)}function Mn(n){return new mn(n>>16,n>>8&255,255&n)}function xn(n){return Mn(n)+""}function bn(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function _n(n,t,e){var r,i,u,o=0,a=0,l=0;if(r=/([a-z]+)\((.*)\)/.exec(n=n.toLowerCase()))switch(i=r[2].split(","),r[1]){case"hsl":return e(parseFloat(i[0]),parseFloat(i[1])/100,parseFloat(i[2])/100);case"rgb":return t(Nn(i[0]),Nn(i[1]),Nn(i[2]))}return(u=ua.get(n))?t(u.r,u.g,u.b):(null==n||"#"!==n.charAt(0)||isNaN(u=parseInt(n.slice(1),16))||(4===n.length?(o=(3840&u)>>4,o=o>>4|o,a=240&u,a=a>>4|a,l=15&u,l=l<<4|l):7===n.length&&(o=(16711680&u)>>16,a=(65280&u)>>8,l=255&u)),t(o,a,l))}function wn(n,t,e){var r,i,u=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-u,l=(o+u)/2;return a?(i=.5>l?a/(o+u):a/(2-o-u),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=NaN,i=l>0&&1>l?0:r),new ln(r,i,l)}function Sn(n,t,e){n=kn(n),t=kn(t),e=kn(e);var r=dn((.4124564*n+.3575761*t+.1804375*e)/na),i=dn((.2126729*n+.7151522*t+.072175*e)/ta),u=dn((.0193339*n+.119192*t+.9503041*e)/ea);return hn(116*i-16,500*(r-i),200*(i-u))}function kn(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function Nn(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function En(n){return"function"==typeof n?n:function(){return n}}function An(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),Cn(t,e,n,r)}}function Cn(n,t,e,r){function i(){var n,t=l.status;if(!t&&Ln(l)||t>=200&&300>t||304===t){try{n=e.call(u,l)}catch(r){return void o.error.call(u,r)}o.load.call(u,n)}else o.error.call(u,l)}var u={},o=ao.dispatch("beforesend","progress","load","error"),a={},l=new XMLHttpRequest,c=null;return!this.XDomainRequest||"withCredentials"in l||!/^(http(s)?:)?\/\//.test(n)||(l=new XDomainRequest),"onload"in l?l.onload=l.onerror=i:l.onreadystatechange=function(){l.readyState>3&&i()},l.onprogress=function(n){var t=ao.event;ao.event=n;try{o.progress.call(u,l)}finally{ao.event=t}},u.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",u)},u.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",u):t},u.responseType=function(n){return arguments.length?(c=n,u):c},u.response=function(n){return e=n,u},["get","post"].forEach(function(n){u[n]=function(){return u.send.apply(u,[n].concat(co(arguments)))}}),u.send=function(e,r,i){if(2===arguments.length&&"function"==typeof r&&(i=r,r=null),l.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),l.setRequestHeader)for(var f in a)l.setRequestHeader(f,a[f]);return null!=t&&l.overrideMimeType&&l.overrideMimeType(t),null!=c&&(l.responseType=c),null!=i&&u.on("error",i).on("load",function(n){i(null,n)}),o.beforesend.call(u,l),l.send(null==r?null:r),u},u.abort=function(){return l.abort(),u},ao.rebind(u,o,"on"),null==r?u:u.get(zn(r))}function zn(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function Ln(n){var t=n.responseType;return t&&"text"!==t?n.response:n.responseText}function qn(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var i=e+t,u={c:n,t:i,n:null};return aa?aa.n=u:oa=u,aa=u,la||(ca=clearTimeout(ca),la=1,fa(Tn)),u}function Tn(){var n=Rn(),t=Dn()-n;t>24?(isFinite(t)&&(clearTimeout(ca),ca=setTimeout(Tn,t)),la=0):(la=1,fa(Tn))}function Rn(){for(var n=Date.now(),t=oa;t;)n>=t.t&&t.c(n-t.t)&&(t.c=null),t=t.n;return n}function Dn(){for(var n,t=oa,e=1/0;t;)t.c?(t.t<e&&(e=t.t),t=(n=t).n):t=n?n.n=t.n:oa=t.n;return aa=n,e}function Pn(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function Un(n,t){var e=Math.pow(10,3*xo(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function jn(n){var t=n.decimal,e=n.thousands,r=n.grouping,i=n.currency,u=r&&e?function(n,t){for(var i=n.length,u=[],o=0,a=r[0],l=0;i>0&&a>0&&(l+a+1>t&&(a=Math.max(1,t-l)),u.push(n.substring(i-=a,i+a)),!((l+=a+1)>t));)a=r[o=(o+1)%r.length];return u.reverse().join(e)}:m;return function(n){var e=ha.exec(n),r=e[1]||" ",o=e[2]||">",a=e[3]||"-",l=e[4]||"",c=e[5],f=+e[6],s=e[7],h=e[8],p=e[9],g=1,v="",d="",y=!1,m=!0;switch(h&&(h=+h.substring(1)),(c||"0"===r&&"="===o)&&(c=r="0",o="="),p){case"n":s=!0,p="g";break;case"%":g=100,d="%",p="f";break;case"p":g=100,d="%",p="r";break;case"b":case"o":case"x":case"X":"#"===l&&(v="0"+p.toLowerCase());case"c":m=!1;case"d":y=!0,h=0;break;case"s":g=-1,p="r"}"$"===l&&(v=i[0],d=i[1]),"r"!=p||h||(p="g"),null!=h&&("g"==p?h=Math.max(1,Math.min(21,h)):"e"!=p&&"f"!=p||(h=Math.max(0,Math.min(20,h)))),p=pa.get(p)||Fn;var M=c&&s;return function(n){var e=d;if(y&&n%1)return"";var i=0>n||0===n&&0>1/n?(n=-n,"-"):"-"===a?"":a;if(0>g){var l=ao.formatPrefix(n,h);n=l.scale(n),e=l.symbol+d}else n*=g;n=p(n,h);var x,b,_=n.lastIndexOf(".");if(0>_){var w=m?n.lastIndexOf("e"):-1;0>w?(x=n,b=""):(x=n.substring(0,w),b=n.substring(w))}else x=n.substring(0,_),b=t+n.substring(_+1);!c&&s&&(x=u(x,1/0));var S=v.length+x.length+b.length+(M?0:i.length),k=f>S?new Array(S=f-S+1).join(r):"";return M&&(x=u(k+x,k.length?f-b.length:1/0)),i+=v,n=x+b,("<"===o?i+n+k:">"===o?k+i+n:"^"===o?k.substring(0,S>>=1)+i+n+k.substring(S):i+(M?n:k+n))+e}}}function Fn(n){return n+""}function Hn(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function On(n,t,e){function r(t){var e=n(t),r=u(e,1);return r-t>t-e?e:r}function i(e){return t(e=n(new va(e-1)),1),e}function u(n,e){return t(n=new va(+n),e),n}function o(n,r,u){var o=i(n),a=[];if(u>1)for(;r>o;)e(o)%u||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{va=Hn;var r=new Hn;return r._=n,o(r,t,e)}finally{va=Date}}n.floor=n,n.round=r,n.ceil=i,n.offset=u,n.range=o;var l=n.utc=In(n);return l.floor=l,l.round=In(r),l.ceil=In(i),l.offset=In(u),l.range=a,n}function In(n){return function(t,e){try{va=Hn;var r=new Hn;return r._=t,n(r,e)._}finally{va=Date}}}function Yn(n){function t(n){function t(t){for(var e,i,u,o=[],a=-1,l=0;++a<r;)37===n.charCodeAt(a)&&(o.push(n.slice(l,a)),null!=(i=ya[e=n.charAt(++a)])&&(e=n.charAt(++a)),(u=A[e])&&(e=u(t,null==i?"e"===e?" ":"0":i)),o.push(e),l=a+1);return o.push(n.slice(l,a)),o.join("")}var r=n.length;return t.parse=function(t){var r={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},i=e(r,n,t,0);if(i!=t.length)return null;"p"in r&&(r.H=r.H%12+12*r.p);var u=null!=r.Z&&va!==Hn,o=new(u?Hn:va);return"j"in r?o.setFullYear(r.y,0,r.j):"W"in r||"U"in r?("w"in r||(r.w="W"in r?1:0),o.setFullYear(r.y,0,1),o.setFullYear(r.y,0,"W"in r?(r.w+6)%7+7*r.W-(o.getDay()+5)%7:r.w+7*r.U-(o.getDay()+6)%7)):o.setFullYear(r.y,r.m,r.d),o.setHours(r.H+(r.Z/100|0),r.M+r.Z%100,r.S,r.L),u?o._:o},t.toString=function(){return n},t}function e(n,t,e,r){for(var i,u,o,a=0,l=t.length,c=e.length;l>a;){if(r>=c)return-1;if(i=t.charCodeAt(a++),37===i){if(o=t.charAt(a++),u=C[o in ya?t.charAt(a++):o],!u||(r=u(n,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function r(n,t,e){_.lastIndex=0;var r=_.exec(t.slice(e));return r?(n.w=w.get(r[0].toLowerCase()),e+r[0].length):-1}function i(n,t,e){x.lastIndex=0;var r=x.exec(t.slice(e));return r?(n.w=b.get(r[0].toLowerCase()),e+r[0].length):-1}function u(n,t,e){N.lastIndex=0;var r=N.exec(t.slice(e));return r?(n.m=E.get(r[0].toLowerCase()),e+r[0].length):-1}function o(n,t,e){S.lastIndex=0;var r=S.exec(t.slice(e));return r?(n.m=k.get(r[0].toLowerCase()),e+r[0].length):-1}function a(n,t,r){return e(n,A.c.toString(),t,r)}function l(n,t,r){return e(n,A.x.toString(),t,r)}function c(n,t,r){return e(n,A.X.toString(),t,r)}function f(n,t,e){var r=M.get(t.slice(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}var s=n.dateTime,h=n.date,p=n.time,g=n.periods,v=n.days,d=n.shortDays,y=n.months,m=n.shortMonths;t.utc=function(n){function e(n){try{va=Hn;var t=new va;return t._=n,r(t)}finally{va=Date}}var r=t(n);return e.parse=function(n){try{va=Hn;var t=r.parse(n);return t&&t._}finally{va=Date}},e.toString=r.toString,e},t.multi=t.utc.multi=ct;var M=ao.map(),x=Vn(v),b=Xn(v),_=Vn(d),w=Xn(d),S=Vn(y),k=Xn(y),N=Vn(m),E=Xn(m);g.forEach(function(n,t){M.set(n.toLowerCase(),t)});var A={a:function(n){return d[n.getDay()]},A:function(n){return v[n.getDay()]},b:function(n){return m[n.getMonth()]},B:function(n){return y[n.getMonth()]},c:t(s),d:function(n,t){return Zn(n.getDate(),t,2)},e:function(n,t){return Zn(n.getDate(),t,2)},H:function(n,t){return Zn(n.getHours(),t,2)},I:function(n,t){return Zn(n.getHours()%12||12,t,2)},j:function(n,t){return Zn(1+ga.dayOfYear(n),t,3)},L:function(n,t){return Zn(n.getMilliseconds(),t,3)},m:function(n,t){return Zn(n.getMonth()+1,t,2)},M:function(n,t){return Zn(n.getMinutes(),t,2)},p:function(n){return g[+(n.getHours()>=12)]},S:function(n,t){return Zn(n.getSeconds(),t,2)},U:function(n,t){return Zn(ga.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Zn(ga.mondayOfYear(n),t,2)},x:t(h),X:t(p),y:function(n,t){return Zn(n.getFullYear()%100,t,2)},Y:function(n,t){return Zn(n.getFullYear()%1e4,t,4)},Z:at,"%":function(){return"%"}},C={a:r,A:i,b:u,B:o,c:a,d:tt,e:tt,H:rt,I:rt,j:et,L:ot,m:nt,M:it,p:f,S:ut,U:Bn,w:$n,W:Wn,x:l,X:c,y:Gn,Y:Jn,Z:Kn,"%":lt};return t}function Zn(n,t,e){var r=0>n?"-":"",i=(r?-n:n)+"",u=i.length;return r+(e>u?new Array(e-u+1).join(t)+i:i)}function Vn(n){return new RegExp("^(?:"+n.map(ao.requote).join("|")+")","i")}function Xn(n){for(var t=new c,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function $n(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function Bn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e));return r?(n.U=+r[0],e+r[0].length):-1}function Wn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e));return r?(n.W=+r[0],e+r[0].length):-1}function Jn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function Gn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.y=Qn(+r[0]),e+r[0].length):-1}function Kn(n,t,e){return/^[+-]\d{4}$/.test(t=t.slice(e,e+5))?(n.Z=-t,e+5):-1}function Qn(n){return n+(n>68?1900:2e3)}function nt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function tt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function et(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function rt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function it(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function ut(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function ot(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function at(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=xo(t)/60|0,i=xo(t)%60;return e+Zn(r,"0",2)+Zn(i,"0",2)}function lt(n,t,e){Ma.lastIndex=0;var r=Ma.exec(t.slice(e,e+1));return r?e+r[0].length:-1}function ct(n){for(var t=n.length,e=-1;++e<t;)n[e][0]=this(n[e][0]);return function(t){for(var e=0,r=n[e];!r[1](t);)r=n[++e];return r[0](t)}}function ft(){}function st(n,t,e){var r=e.s=n+t,i=r-n,u=r-i;e.t=n-u+(t-i)}function ht(n,t){n&&wa.hasOwnProperty(n.type)&&wa[n.type](n,t)}function pt(n,t,e){var r,i=-1,u=n.length-e;for(t.lineStart();++i<u;)r=n[i],t.point(r[0],r[1],r[2]);t.lineEnd()}function gt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)pt(n[e],t,1);t.polygonEnd()}function vt(){function n(n,t){n*=Yo,t=t*Yo/2+Fo/4;var e=n-r,o=e>=0?1:-1,a=o*e,l=Math.cos(t),c=Math.sin(t),f=u*c,s=i*l+f*Math.cos(a),h=f*o*Math.sin(a);ka.add(Math.atan2(h,s)),r=n,i=l,u=c}var t,e,r,i,u;Na.point=function(o,a){Na.point=n,r=(t=o)*Yo,i=Math.cos(a=(e=a)*Yo/2+Fo/4),u=Math.sin(a)},Na.lineEnd=function(){n(t,e)}}function dt(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function yt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function mt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Mt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function xt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function bt(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function _t(n){return[Math.atan2(n[1],n[0]),tn(n[2])]}function wt(n,t){return xo(n[0]-t[0])<Uo&&xo(n[1]-t[1])<Uo}function St(n,t){n*=Yo;var e=Math.cos(t*=Yo);kt(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function kt(n,t,e){++Ea,Ca+=(n-Ca)/Ea,za+=(t-za)/Ea,La+=(e-La)/Ea}function Nt(){function n(n,i){n*=Yo;var u=Math.cos(i*=Yo),o=u*Math.cos(n),a=u*Math.sin(n),l=Math.sin(i),c=Math.atan2(Math.sqrt((c=e*l-r*a)*c+(c=r*o-t*l)*c+(c=t*a-e*o)*c),t*o+e*a+r*l);Aa+=c,qa+=c*(t+(t=o)),Ta+=c*(e+(e=a)),Ra+=c*(r+(r=l)),kt(t,e,r)}var t,e,r;ja.point=function(i,u){i*=Yo;var o=Math.cos(u*=Yo);t=o*Math.cos(i),e=o*Math.sin(i),r=Math.sin(u),ja.point=n,kt(t,e,r)}}function Et(){ja.point=St}function At(){function n(n,t){n*=Yo;var e=Math.cos(t*=Yo),o=e*Math.cos(n),a=e*Math.sin(n),l=Math.sin(t),c=i*l-u*a,f=u*o-r*l,s=r*a-i*o,h=Math.sqrt(c*c+f*f+s*s),p=r*o+i*a+u*l,g=h&&-nn(p)/h,v=Math.atan2(h,p);Da+=g*c,Pa+=g*f,Ua+=g*s,Aa+=v,qa+=v*(r+(r=o)),Ta+=v*(i+(i=a)),Ra+=v*(u+(u=l)),kt(r,i,u)}var t,e,r,i,u;ja.point=function(o,a){t=o,e=a,ja.point=n,o*=Yo;var l=Math.cos(a*=Yo);r=l*Math.cos(o),i=l*Math.sin(o),u=Math.sin(a),kt(r,i,u)},ja.lineEnd=function(){n(t,e),ja.lineEnd=Et,ja.point=St}}function Ct(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function zt(){return!0}function Lt(n,t,e,r,i){var u=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(wt(e,r)){i.lineStart();for(var a=0;t>a;++a)i.point((e=n[a])[0],e[1]);return void i.lineEnd()}var l=new Tt(e,n,null,!0),c=new Tt(e,null,l,!1);l.o=c,u.push(l),o.push(c),l=new Tt(r,n,null,!1),c=new Tt(r,null,l,!0),l.o=c,u.push(l),o.push(c)}}),o.sort(t),qt(u),qt(o),u.length){for(var a=0,l=e,c=o.length;c>a;++a)o[a].e=l=!l;for(var f,s,h=u[0];;){for(var p=h,g=!0;p.v;)if((p=p.n)===h)return;f=p.z,i.lineStart();do{if(p.v=p.o.v=!0,p.e){if(g)for(var a=0,c=f.length;c>a;++a)i.point((s=f[a])[0],s[1]);else r(p.x,p.n.x,1,i);p=p.n}else{if(g){f=p.p.z;for(var a=f.length-1;a>=0;--a)i.point((s=f[a])[0],s[1])}else r(p.x,p.p.x,-1,i);p=p.p}p=p.o,f=p.z,g=!g}while(!p.v);i.lineEnd()}}}function qt(n){if(t=n.length){for(var t,e,r=0,i=n[0];++r<t;)i.n=e=n[r],e.p=i,i=e;i.n=e=n[0],e.p=i}}function Tt(n,t,e,r){this.x=n,this.z=t,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Rt(n,t,e,r){return function(i,u){function o(t,e){var r=i(t,e);n(t=r[0],e=r[1])&&u.point(t,e)}function a(n,t){var e=i(n,t);d.point(e[0],e[1])}function l(){m.point=a,d.lineStart()}function c(){m.point=o,d.lineEnd()}function f(n,t){v.push([n,t]);var e=i(n,t);x.point(e[0],e[1])}function s(){x.lineStart(),v=[]}function h(){f(v[0][0],v[0][1]),x.lineEnd();var n,t=x.clean(),e=M.buffer(),r=e.length;if(v.pop(),g.push(v),v=null,r)if(1&t){n=e[0];var i,r=n.length-1,o=-1;if(r>0){for(b||(u.polygonStart(),b=!0),u.lineStart();++o<r;)u.point((i=n[o])[0],i[1]);u.lineEnd()}}else r>1&&2&t&&e.push(e.pop().concat(e.shift())),p.push(e.filter(Dt))}var p,g,v,d=t(u),y=i.invert(r[0],r[1]),m={point:o,lineStart:l,lineEnd:c,polygonStart:function(){m.point=f,m.lineStart=s,m.lineEnd=h,p=[],g=[]},polygonEnd:function(){m.point=o,m.lineStart=l,m.lineEnd=c,p=ao.merge(p);var n=Ot(y,g);p.length?(b||(u.polygonStart(),b=!0),Lt(p,Ut,n,e,u)):n&&(b||(u.polygonStart(),b=!0),u.lineStart(),e(null,null,1,u),u.lineEnd()),b&&(u.polygonEnd(),b=!1),p=g=null},sphere:function(){u.polygonStart(),u.lineStart(),e(null,null,1,u),u.lineEnd(),u.polygonEnd()}},M=Pt(),x=t(M),b=!1;return m}}function Dt(n){return n.length>1}function Pt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:b,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Ut(n,t){return((n=n.x)[0]<0?n[1]-Io-Uo:Io-n[1])-((t=t.x)[0]<0?t[1]-Io-Uo:Io-t[1])}function jt(n){var t,e=NaN,r=NaN,i=NaN;return{lineStart:function(){n.lineStart(),t=1},point:function(u,o){var a=u>0?Fo:-Fo,l=xo(u-e);xo(l-Fo)<Uo?(n.point(e,r=(r+o)/2>0?Io:-Io),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(u,r),t=0):i!==a&&l>=Fo&&(xo(e-i)<Uo&&(e-=i*Uo),xo(u-a)<Uo&&(u-=a*Uo),r=Ft(e,r,u,o),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=u,r=o),i=a},lineEnd:function(){n.lineEnd(),e=r=NaN},clean:function(){return 2-t}}}function Ft(n,t,e,r){var i,u,o=Math.sin(n-e);return xo(o)>Uo?Math.atan((Math.sin(t)*(u=Math.cos(r))*Math.sin(e)-Math.sin(r)*(i=Math.cos(t))*Math.sin(n))/(i*u*o)):(t+r)/2}function Ht(n,t,e,r){var i;if(null==n)i=e*Io,r.point(-Fo,i),r.point(0,i),r.point(Fo,i),r.point(Fo,0),r.point(Fo,-i),r.point(0,-i),r.point(-Fo,-i),r.point(-Fo,0),r.point(-Fo,i);else if(xo(n[0]-t[0])>Uo){var u=n[0]<t[0]?Fo:-Fo;i=e*u/2,r.point(-u,i),r.point(0,i),r.point(u,i)}else r.point(t[0],t[1])}function Ot(n,t){var e=n[0],r=n[1],i=[Math.sin(e),-Math.cos(e),0],u=0,o=0;ka.reset();for(var a=0,l=t.length;l>a;++a){var c=t[a],f=c.length;if(f)for(var s=c[0],h=s[0],p=s[1]/2+Fo/4,g=Math.sin(p),v=Math.cos(p),d=1;;){d===f&&(d=0),n=c[d];var y=n[0],m=n[1]/2+Fo/4,M=Math.sin(m),x=Math.cos(m),b=y-h,_=b>=0?1:-1,w=_*b,S=w>Fo,k=g*M;if(ka.add(Math.atan2(k*_*Math.sin(w),v*x+k*Math.cos(w))),u+=S?b+_*Ho:b,S^h>=e^y>=e){var N=mt(dt(s),dt(n));bt(N);var E=mt(i,N);bt(E);var A=(S^b>=0?-1:1)*tn(E[2]);(r>A||r===A&&(N[0]||N[1]))&&(o+=S^b>=0?1:-1)}if(!d++)break;h=y,g=M,v=x,s=n}}return(-Uo>u||Uo>u&&-Uo>ka)^1&o}function It(n){function t(n,t){return Math.cos(n)*Math.cos(t)>u}function e(n){var e,u,l,c,f;return{lineStart:function(){c=l=!1,f=1},point:function(s,h){var p,g=[s,h],v=t(s,h),d=o?v?0:i(s,h):v?i(s+(0>s?Fo:-Fo),h):0;if(!e&&(c=l=v)&&n.lineStart(),v!==l&&(p=r(e,g),(wt(e,p)||wt(g,p))&&(g[0]+=Uo,g[1]+=Uo,v=t(g[0],g[1]))),v!==l)f=0,v?(n.lineStart(),p=r(g,e),n.point(p[0],p[1])):(p=r(e,g),n.point(p[0],p[1]),n.lineEnd()),e=p;else if(a&&e&&o^v){var y;d&u||!(y=r(g,e,!0))||(f=0,o?(n.lineStart(),n.point(y[0][0],y[0][1]),n.point(y[1][0],y[1][1]),n.lineEnd()):(n.point(y[1][0],y[1][1]),n.lineEnd(),n.lineStart(),n.point(y[0][0],y[0][1])))}!v||e&&wt(e,g)||n.point(g[0],g[1]),e=g,l=v,u=d},lineEnd:function(){l&&n.lineEnd(),e=null},clean:function(){return f|(c&&l)<<1}}}function r(n,t,e){var r=dt(n),i=dt(t),o=[1,0,0],a=mt(r,i),l=yt(a,a),c=a[0],f=l-c*c;if(!f)return!e&&n;var s=u*l/f,h=-u*c/f,p=mt(o,a),g=xt(o,s),v=xt(a,h);Mt(g,v);var d=p,y=yt(g,d),m=yt(d,d),M=y*y-m*(yt(g,g)-1);if(!(0>M)){var x=Math.sqrt(M),b=xt(d,(-y-x)/m);if(Mt(b,g),b=_t(b),!e)return b;var _,w=n[0],S=t[0],k=n[1],N=t[1];w>S&&(_=w,w=S,S=_);var E=S-w,A=xo(E-Fo)<Uo,C=A||Uo>E;if(!A&&k>N&&(_=k,k=N,N=_),C?A?k+N>0^b[1]<(xo(b[0]-w)<Uo?k:N):k<=b[1]&&b[1]<=N:E>Fo^(w<=b[0]&&b[0]<=S)){var z=xt(d,(-y+x)/m);return Mt(z,g),[b,_t(z)]}}}function i(t,e){var r=o?n:Fo-n,i=0;return-r>t?i|=1:t>r&&(i|=2),-r>e?i|=4:e>r&&(i|=8),i}var u=Math.cos(n),o=u>0,a=xo(u)>Uo,l=ve(n,6*Yo);return Rt(t,e,l,o?[0,-n]:[-Fo,n-Fo])}function Yt(n,t,e,r){return function(i){var u,o=i.a,a=i.b,l=o.x,c=o.y,f=a.x,s=a.y,h=0,p=1,g=f-l,v=s-c;if(u=n-l,g||!(u>0)){if(u/=g,0>g){if(h>u)return;p>u&&(p=u)}else if(g>0){if(u>p)return;u>h&&(h=u)}if(u=e-l,g||!(0>u)){if(u/=g,0>g){if(u>p)return;u>h&&(h=u)}else if(g>0){if(h>u)return;p>u&&(p=u)}if(u=t-c,v||!(u>0)){if(u/=v,0>v){if(h>u)return;p>u&&(p=u)}else if(v>0){if(u>p)return;u>h&&(h=u)}if(u=r-c,v||!(0>u)){if(u/=v,0>v){if(u>p)return;u>h&&(h=u)}else if(v>0){if(h>u)return;p>u&&(p=u)}return h>0&&(i.a={x:l+h*g,y:c+h*v}),1>p&&(i.b={x:l+p*g,y:c+p*v}),i}}}}}}function Zt(n,t,e,r){function i(r,i){return xo(r[0]-n)<Uo?i>0?0:3:xo(r[0]-e)<Uo?i>0?2:1:xo(r[1]-t)<Uo?i>0?1:0:i>0?3:2}function u(n,t){return o(n.x,t.x)}function o(n,t){var e=i(n,1),r=i(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}return function(a){function l(n){for(var t=0,e=d.length,r=n[1],i=0;e>i;++i)for(var u,o=1,a=d[i],l=a.length,c=a[0];l>o;++o)u=a[o],c[1]<=r?u[1]>r&&Q(c,u,n)>0&&++t:u[1]<=r&&Q(c,u,n)<0&&--t,c=u;return 0!==t}function c(u,a,l,c){var f=0,s=0;if(null==u||(f=i(u,l))!==(s=i(a,l))||o(u,a)<0^l>0){do c.point(0===f||3===f?n:e,f>1?r:t);while((f=(f+l+4)%4)!==s)}else c.point(a[0],a[1])}function f(i,u){return i>=n&&e>=i&&u>=t&&r>=u}function s(n,t){f(n,t)&&a.point(n,t)}function h(){C.point=g,d&&d.push(y=[]),S=!0,w=!1,b=_=NaN}function p(){v&&(g(m,M),x&&w&&E.rejoin(),v.push(E.buffer())),C.point=s,w&&a.lineEnd()}function g(n,t){n=Math.max(-Ha,Math.min(Ha,n)),t=Math.max(-Ha,Math.min(Ha,t));var e=f(n,t);if(d&&y.push([n,t]),S)m=n,M=t,x=e,S=!1,e&&(a.lineStart(),a.point(n,t));else if(e&&w)a.point(n,t);else{var r={a:{x:b,y:_},b:{x:n,y:t}};A(r)?(w||(a.lineStart(),a.point(r.a.x,r.a.y)),a.point(r.b.x,r.b.y),e||a.lineEnd(),k=!1):e&&(a.lineStart(),a.point(n,t),k=!1)}b=n,_=t,w=e}var v,d,y,m,M,x,b,_,w,S,k,N=a,E=Pt(),A=Yt(n,t,e,r),C={point:s,lineStart:h,lineEnd:p,polygonStart:function(){a=E,v=[],d=[],k=!0},polygonEnd:function(){a=N,v=ao.merge(v);var t=l([n,r]),e=k&&t,i=v.length;(e||i)&&(a.polygonStart(),e&&(a.lineStart(),c(null,null,1,a),a.lineEnd()),i&&Lt(v,u,t,c,a),a.polygonEnd()),v=d=y=null}};return C}}function Vt(n){var t=0,e=Fo/3,r=ae(n),i=r(t,e);return i.parallels=function(n){return arguments.length?r(t=n[0]*Fo/180,e=n[1]*Fo/180):[t/Fo*180,e/Fo*180]},i}function Xt(n,t){function e(n,t){var e=Math.sqrt(u-2*i*Math.sin(t))/i;return[e*Math.sin(n*=i),o-e*Math.cos(n)]}var r=Math.sin(n),i=(r+Math.sin(t))/2,u=1+r*(2*i-r),o=Math.sqrt(u)/i;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/i,tn((u-(n*n+e*e)*i*i)/(2*i))]},e}function $t(){function n(n,t){Ia+=i*n-r*t,r=n,i=t}var t,e,r,i;$a.point=function(u,o){$a.point=n,t=r=u,e=i=o},$a.lineEnd=function(){n(t,e)}}function Bt(n,t){Ya>n&&(Ya=n),n>Va&&(Va=n),Za>t&&(Za=t),t>Xa&&(Xa=t)}function Wt(){function n(n,t){o.push("M",n,",",t,u)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function i(){o.push("Z")}var u=Jt(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return u=Jt(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function Jt(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function Gt(n,t){Ca+=n,za+=t,++La}function Kt(){function n(n,r){var i=n-t,u=r-e,o=Math.sqrt(i*i+u*u);qa+=o*(t+n)/2,Ta+=o*(e+r)/2,Ra+=o,Gt(t=n,e=r)}var t,e;Wa.point=function(r,i){Wa.point=n,Gt(t=r,e=i)}}function Qt(){Wa.point=Gt}function ne(){function n(n,t){var e=n-r,u=t-i,o=Math.sqrt(e*e+u*u);qa+=o*(r+n)/2,Ta+=o*(i+t)/2,Ra+=o,o=i*n-r*t,Da+=o*(r+n),Pa+=o*(i+t),Ua+=3*o,Gt(r=n,i=t)}var t,e,r,i;Wa.point=function(u,o){Wa.point=n,Gt(t=r=u,e=i=o)},Wa.lineEnd=function(){n(t,e)}}function te(n){function t(t,e){n.moveTo(t+o,e),n.arc(t,e,o,0,Ho)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function i(){a.point=t}function u(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:i,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=i,a.point=t},pointRadius:function(n){return o=n,a},result:b};return a}function ee(n){function t(n){return(a?r:e)(n)}function e(t){return ue(t,function(e,r){e=n(e,r),t.point(e[0],e[1])})}function r(t){function e(e,r){e=n(e,r),t.point(e[0],e[1])}function r(){M=NaN,S.point=u,t.lineStart()}function u(e,r){var u=dt([e,r]),o=n(e,r);i(M,x,m,b,_,w,M=o[0],x=o[1],m=e,b=u[0],_=u[1],w=u[2],a,t),t.point(M,x)}function o(){S.point=e,t.lineEnd()}function l(){
r(),S.point=c,S.lineEnd=f}function c(n,t){u(s=n,h=t),p=M,g=x,v=b,d=_,y=w,S.point=u}function f(){i(M,x,m,b,_,w,p,g,s,v,d,y,a,t),S.lineEnd=o,o()}var s,h,p,g,v,d,y,m,M,x,b,_,w,S={point:e,lineStart:r,lineEnd:o,polygonStart:function(){t.polygonStart(),S.lineStart=l},polygonEnd:function(){t.polygonEnd(),S.lineStart=r}};return S}function i(t,e,r,a,l,c,f,s,h,p,g,v,d,y){var m=f-t,M=s-e,x=m*m+M*M;if(x>4*u&&d--){var b=a+p,_=l+g,w=c+v,S=Math.sqrt(b*b+_*_+w*w),k=Math.asin(w/=S),N=xo(xo(w)-1)<Uo||xo(r-h)<Uo?(r+h)/2:Math.atan2(_,b),E=n(N,k),A=E[0],C=E[1],z=A-t,L=C-e,q=M*z-m*L;(q*q/x>u||xo((m*z+M*L)/x-.5)>.3||o>a*p+l*g+c*v)&&(i(t,e,r,a,l,c,A,C,N,b/=S,_/=S,w,d,y),y.point(A,C),i(A,C,N,b,_,w,f,s,h,p,g,v,d,y))}}var u=.5,o=Math.cos(30*Yo),a=16;return t.precision=function(n){return arguments.length?(a=(u=n*n)>0&&16,t):Math.sqrt(u)},t}function re(n){var t=ee(function(t,e){return n([t*Zo,e*Zo])});return function(n){return le(t(n))}}function ie(n){this.stream=n}function ue(n,t){return{point:t,sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}function oe(n){return ae(function(){return n})()}function ae(n){function t(n){return n=a(n[0]*Yo,n[1]*Yo),[n[0]*h+l,c-n[1]*h]}function e(n){return n=a.invert((n[0]-l)/h,(c-n[1])/h),n&&[n[0]*Zo,n[1]*Zo]}function r(){a=Ct(o=se(y,M,x),u);var n=u(v,d);return l=p-n[0]*h,c=g+n[1]*h,i()}function i(){return f&&(f.valid=!1,f=null),t}var u,o,a,l,c,f,s=ee(function(n,t){return n=u(n,t),[n[0]*h+l,c-n[1]*h]}),h=150,p=480,g=250,v=0,d=0,y=0,M=0,x=0,b=Fa,_=m,w=null,S=null;return t.stream=function(n){return f&&(f.valid=!1),f=le(b(o,s(_(n)))),f.valid=!0,f},t.clipAngle=function(n){return arguments.length?(b=null==n?(w=n,Fa):It((w=+n)*Yo),i()):w},t.clipExtent=function(n){return arguments.length?(S=n,_=n?Zt(n[0][0],n[0][1],n[1][0],n[1][1]):m,i()):S},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(p=+n[0],g=+n[1],r()):[p,g]},t.center=function(n){return arguments.length?(v=n[0]%360*Yo,d=n[1]%360*Yo,r()):[v*Zo,d*Zo]},t.rotate=function(n){return arguments.length?(y=n[0]%360*Yo,M=n[1]%360*Yo,x=n.length>2?n[2]%360*Yo:0,r()):[y*Zo,M*Zo,x*Zo]},ao.rebind(t,s,"precision"),function(){return u=n.apply(this,arguments),t.invert=u.invert&&e,r()}}function le(n){return ue(n,function(t,e){n.point(t*Yo,e*Yo)})}function ce(n,t){return[n,t]}function fe(n,t){return[n>Fo?n-Ho:-Fo>n?n+Ho:n,t]}function se(n,t,e){return n?t||e?Ct(pe(n),ge(t,e)):pe(n):t||e?ge(t,e):fe}function he(n){return function(t,e){return t+=n,[t>Fo?t-Ho:-Fo>t?t+Ho:t,e]}}function pe(n){var t=he(n);return t.invert=he(-n),t}function ge(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,l=Math.sin(n)*e,c=Math.sin(t),f=c*r+a*i;return[Math.atan2(l*u-f*o,a*r-c*i),tn(f*u+l*o)]}var r=Math.cos(n),i=Math.sin(n),u=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,l=Math.sin(n)*e,c=Math.sin(t),f=c*u-l*o;return[Math.atan2(l*u+c*o,a*r+f*i),tn(f*r-a*i)]},e}function ve(n,t){var e=Math.cos(n),r=Math.sin(n);return function(i,u,o,a){var l=o*t;null!=i?(i=de(e,i),u=de(e,u),(o>0?u>i:i>u)&&(i+=o*Ho)):(i=n+o*Ho,u=n-.5*l);for(var c,f=i;o>0?f>u:u>f;f-=l)a.point((c=_t([e,-r*Math.cos(f),-r*Math.sin(f)]))[0],c[1])}}function de(n,t){var e=dt(t);e[0]-=n,bt(e);var r=nn(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Uo)%(2*Math.PI)}function ye(n,t,e){var r=ao.range(n,t-Uo,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function me(n,t,e){var r=ao.range(n,t-Uo,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function Me(n){return n.source}function xe(n){return n.target}function be(n,t,e,r){var i=Math.cos(t),u=Math.sin(t),o=Math.cos(r),a=Math.sin(r),l=i*Math.cos(n),c=i*Math.sin(n),f=o*Math.cos(e),s=o*Math.sin(e),h=2*Math.asin(Math.sqrt(on(r-t)+i*o*on(e-n))),p=1/Math.sin(h),g=h?function(n){var t=Math.sin(n*=h)*p,e=Math.sin(h-n)*p,r=e*l+t*f,i=e*c+t*s,o=e*u+t*a;return[Math.atan2(i,r)*Zo,Math.atan2(o,Math.sqrt(r*r+i*i))*Zo]}:function(){return[n*Zo,t*Zo]};return g.distance=h,g}function _e(){function n(n,i){var u=Math.sin(i*=Yo),o=Math.cos(i),a=xo((n*=Yo)-t),l=Math.cos(a);Ja+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*u-e*o*l)*a),e*u+r*o*l),t=n,e=u,r=o}var t,e,r;Ga.point=function(i,u){t=i*Yo,e=Math.sin(u*=Yo),r=Math.cos(u),Ga.point=n},Ga.lineEnd=function(){Ga.point=Ga.lineEnd=b}}function we(n,t){function e(t,e){var r=Math.cos(t),i=Math.cos(e),u=n(r*i);return[u*i*Math.sin(t),u*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),i=t(r),u=Math.sin(i),o=Math.cos(i);return[Math.atan2(n*u,r*o),Math.asin(r&&e*u/r)]},e}function Se(n,t){function e(n,t){o>0?-Io+Uo>t&&(t=-Io+Uo):t>Io-Uo&&(t=Io-Uo);var e=o/Math.pow(i(t),u);return[e*Math.sin(u*n),o-e*Math.cos(u*n)]}var r=Math.cos(n),i=function(n){return Math.tan(Fo/4+n/2)},u=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(i(t)/i(n)),o=r*Math.pow(i(n),u)/u;return u?(e.invert=function(n,t){var e=o-t,r=K(u)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/u,2*Math.atan(Math.pow(o/r,1/u))-Io]},e):Ne}function ke(n,t){function e(n,t){var e=u-t;return[e*Math.sin(i*n),u-e*Math.cos(i*n)]}var r=Math.cos(n),i=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),u=r/i+n;return xo(i)<Uo?ce:(e.invert=function(n,t){var e=u-t;return[Math.atan2(n,e)/i,u-K(i)*Math.sqrt(n*n+e*e)]},e)}function Ne(n,t){return[n,Math.log(Math.tan(Fo/4+t/2))]}function Ee(n){var t,e=oe(n),r=e.scale,i=e.translate,u=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=i.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=u.apply(e,arguments);if(o===e){if(t=null==n){var a=Fo*r(),l=i();u([[l[0]-a,l[1]-a],[l[0]+a,l[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function Ae(n,t){return[Math.log(Math.tan(Fo/4+t/2)),-n]}function Ce(n){return n[0]}function ze(n){return n[1]}function Le(n){for(var t=n.length,e=[0,1],r=2,i=2;t>i;i++){for(;r>1&&Q(n[e[r-2]],n[e[r-1]],n[i])<=0;)--r;e[r++]=i}return e.slice(0,r)}function qe(n,t){return n[0]-t[0]||n[1]-t[1]}function Te(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function Re(n,t,e,r){var i=n[0],u=e[0],o=t[0]-i,a=r[0]-u,l=n[1],c=e[1],f=t[1]-l,s=r[1]-c,h=(a*(l-c)-s*(i-u))/(s*o-a*f);return[i+h*o,l+h*f]}function De(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function Pe(){rr(this),this.edge=this.site=this.circle=null}function Ue(n){var t=cl.pop()||new Pe;return t.site=n,t}function je(n){Be(n),ol.remove(n),cl.push(n),rr(n)}function Fe(n){var t=n.circle,e=t.x,r=t.cy,i={x:e,y:r},u=n.P,o=n.N,a=[n];je(n);for(var l=u;l.circle&&xo(e-l.circle.x)<Uo&&xo(r-l.circle.cy)<Uo;)u=l.P,a.unshift(l),je(l),l=u;a.unshift(l),Be(l);for(var c=o;c.circle&&xo(e-c.circle.x)<Uo&&xo(r-c.circle.cy)<Uo;)o=c.N,a.push(c),je(c),c=o;a.push(c),Be(c);var f,s=a.length;for(f=1;s>f;++f)c=a[f],l=a[f-1],nr(c.edge,l.site,c.site,i);l=a[0],c=a[s-1],c.edge=Ke(l.site,c.site,null,i),$e(l),$e(c)}function He(n){for(var t,e,r,i,u=n.x,o=n.y,a=ol._;a;)if(r=Oe(a,o)-u,r>Uo)a=a.L;else{if(i=u-Ie(a,o),!(i>Uo)){r>-Uo?(t=a.P,e=a):i>-Uo?(t=a,e=a.N):t=e=a;break}if(!a.R){t=a;break}a=a.R}var l=Ue(n);if(ol.insert(t,l),t||e){if(t===e)return Be(t),e=Ue(t.site),ol.insert(l,e),l.edge=e.edge=Ke(t.site,l.site),$e(t),void $e(e);if(!e)return void(l.edge=Ke(t.site,l.site));Be(t),Be(e);var c=t.site,f=c.x,s=c.y,h=n.x-f,p=n.y-s,g=e.site,v=g.x-f,d=g.y-s,y=2*(h*d-p*v),m=h*h+p*p,M=v*v+d*d,x={x:(d*m-p*M)/y+f,y:(h*M-v*m)/y+s};nr(e.edge,c,g,x),l.edge=Ke(c,n,null,x),e.edge=Ke(n,g,null,x),$e(t),$e(e)}}function Oe(n,t){var e=n.site,r=e.x,i=e.y,u=i-t;if(!u)return r;var o=n.P;if(!o)return-(1/0);e=o.site;var a=e.x,l=e.y,c=l-t;if(!c)return a;var f=a-r,s=1/u-1/c,h=f/c;return s?(-h+Math.sqrt(h*h-2*s*(f*f/(-2*c)-l+c/2+i-u/2)))/s+r:(r+a)/2}function Ie(n,t){var e=n.N;if(e)return Oe(e,t);var r=n.site;return r.y===t?r.x:1/0}function Ye(n){this.site=n,this.edges=[]}function Ze(n){for(var t,e,r,i,u,o,a,l,c,f,s=n[0][0],h=n[1][0],p=n[0][1],g=n[1][1],v=ul,d=v.length;d--;)if(u=v[d],u&&u.prepare())for(a=u.edges,l=a.length,o=0;l>o;)f=a[o].end(),r=f.x,i=f.y,c=a[++o%l].start(),t=c.x,e=c.y,(xo(r-t)>Uo||xo(i-e)>Uo)&&(a.splice(o,0,new tr(Qe(u.site,f,xo(r-s)<Uo&&g-i>Uo?{x:s,y:xo(t-s)<Uo?e:g}:xo(i-g)<Uo&&h-r>Uo?{x:xo(e-g)<Uo?t:h,y:g}:xo(r-h)<Uo&&i-p>Uo?{x:h,y:xo(t-h)<Uo?e:p}:xo(i-p)<Uo&&r-s>Uo?{x:xo(e-p)<Uo?t:s,y:p}:null),u.site,null)),++l)}function Ve(n,t){return t.angle-n.angle}function Xe(){rr(this),this.x=this.y=this.arc=this.site=this.cy=null}function $e(n){var t=n.P,e=n.N;if(t&&e){var r=t.site,i=n.site,u=e.site;if(r!==u){var o=i.x,a=i.y,l=r.x-o,c=r.y-a,f=u.x-o,s=u.y-a,h=2*(l*s-c*f);if(!(h>=-jo)){var p=l*l+c*c,g=f*f+s*s,v=(s*p-c*g)/h,d=(l*g-f*p)/h,s=d+a,y=fl.pop()||new Xe;y.arc=n,y.site=i,y.x=v+o,y.y=s+Math.sqrt(v*v+d*d),y.cy=s,n.circle=y;for(var m=null,M=ll._;M;)if(y.y<M.y||y.y===M.y&&y.x<=M.x){if(!M.L){m=M.P;break}M=M.L}else{if(!M.R){m=M;break}M=M.R}ll.insert(m,y),m||(al=y)}}}}function Be(n){var t=n.circle;t&&(t.P||(al=t.N),ll.remove(t),fl.push(t),rr(t),n.circle=null)}function We(n){for(var t,e=il,r=Yt(n[0][0],n[0][1],n[1][0],n[1][1]),i=e.length;i--;)t=e[i],(!Je(t,n)||!r(t)||xo(t.a.x-t.b.x)<Uo&&xo(t.a.y-t.b.y)<Uo)&&(t.a=t.b=null,e.splice(i,1))}function Je(n,t){var e=n.b;if(e)return!0;var r,i,u=n.a,o=t[0][0],a=t[1][0],l=t[0][1],c=t[1][1],f=n.l,s=n.r,h=f.x,p=f.y,g=s.x,v=s.y,d=(h+g)/2,y=(p+v)/2;if(v===p){if(o>d||d>=a)return;if(h>g){if(u){if(u.y>=c)return}else u={x:d,y:l};e={x:d,y:c}}else{if(u){if(u.y<l)return}else u={x:d,y:c};e={x:d,y:l}}}else if(r=(h-g)/(v-p),i=y-r*d,-1>r||r>1)if(h>g){if(u){if(u.y>=c)return}else u={x:(l-i)/r,y:l};e={x:(c-i)/r,y:c}}else{if(u){if(u.y<l)return}else u={x:(c-i)/r,y:c};e={x:(l-i)/r,y:l}}else if(v>p){if(u){if(u.x>=a)return}else u={x:o,y:r*o+i};e={x:a,y:r*a+i}}else{if(u){if(u.x<o)return}else u={x:a,y:r*a+i};e={x:o,y:r*o+i}}return n.a=u,n.b=e,!0}function Ge(n,t){this.l=n,this.r=t,this.a=this.b=null}function Ke(n,t,e,r){var i=new Ge(n,t);return il.push(i),e&&nr(i,n,t,e),r&&nr(i,t,n,r),ul[n.i].edges.push(new tr(i,n,t)),ul[t.i].edges.push(new tr(i,t,n)),i}function Qe(n,t,e){var r=new Ge(n,null);return r.a=t,r.b=e,il.push(r),r}function nr(n,t,e,r){n.a||n.b?n.l===e?n.b=r:n.a=r:(n.a=r,n.l=t,n.r=e)}function tr(n,t,e){var r=n.a,i=n.b;this.edge=n,this.site=t,this.angle=e?Math.atan2(e.y-t.y,e.x-t.x):n.l===t?Math.atan2(i.x-r.x,r.y-i.y):Math.atan2(r.x-i.x,i.y-r.y)}function er(){this._=null}function rr(n){n.U=n.C=n.L=n.R=n.P=n.N=null}function ir(n,t){var e=t,r=t.R,i=e.U;i?i.L===e?i.L=r:i.R=r:n._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function ur(n,t){var e=t,r=t.L,i=e.U;i?i.L===e?i.L=r:i.R=r:n._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function or(n){for(;n.L;)n=n.L;return n}function ar(n,t){var e,r,i,u=n.sort(lr).pop();for(il=[],ul=new Array(n.length),ol=new er,ll=new er;;)if(i=al,u&&(!i||u.y<i.y||u.y===i.y&&u.x<i.x))u.x===e&&u.y===r||(ul[u.i]=new Ye(u),He(u),e=u.x,r=u.y),u=n.pop();else{if(!i)break;Fe(i.arc)}t&&(We(t),Ze(t));var o={cells:ul,edges:il};return ol=ll=il=ul=null,o}function lr(n,t){return t.y-n.y||t.x-n.x}function cr(n,t,e){return(n.x-e.x)*(t.y-n.y)-(n.x-t.x)*(e.y-n.y)}function fr(n){return n.x}function sr(n){return n.y}function hr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function pr(n,t,e,r,i,u){if(!n(t,e,r,i,u)){var o=.5*(e+i),a=.5*(r+u),l=t.nodes;l[0]&&pr(n,l[0],e,r,o,a),l[1]&&pr(n,l[1],o,r,i,a),l[2]&&pr(n,l[2],e,a,o,u),l[3]&&pr(n,l[3],o,a,i,u)}}function gr(n,t,e,r,i,u,o){var a,l=1/0;return function c(n,f,s,h,p){if(!(f>u||s>o||r>h||i>p)){if(g=n.point){var g,v=t-n.x,d=e-n.y,y=v*v+d*d;if(l>y){var m=Math.sqrt(l=y);r=t-m,i=e-m,u=t+m,o=e+m,a=g}}for(var M=n.nodes,x=.5*(f+h),b=.5*(s+p),_=t>=x,w=e>=b,S=w<<1|_,k=S+4;k>S;++S)if(n=M[3&S])switch(3&S){case 0:c(n,f,s,x,b);break;case 1:c(n,x,s,h,b);break;case 2:c(n,f,b,x,p);break;case 3:c(n,x,b,h,p)}}}(n,r,i,u,o),a}function vr(n,t){n=ao.rgb(n),t=ao.rgb(t);var e=n.r,r=n.g,i=n.b,u=t.r-e,o=t.g-r,a=t.b-i;return function(n){return"#"+bn(Math.round(e+u*n))+bn(Math.round(r+o*n))+bn(Math.round(i+a*n))}}function dr(n,t){var e,r={},i={};for(e in n)e in t?r[e]=Mr(n[e],t[e]):i[e]=n[e];for(e in t)e in n||(i[e]=t[e]);return function(n){for(e in r)i[e]=r[e](n);return i}}function yr(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function mr(n,t){var e,r,i,u=hl.lastIndex=pl.lastIndex=0,o=-1,a=[],l=[];for(n+="",t+="";(e=hl.exec(n))&&(r=pl.exec(t));)(i=r.index)>u&&(i=t.slice(u,i),a[o]?a[o]+=i:a[++o]=i),(e=e[0])===(r=r[0])?a[o]?a[o]+=r:a[++o]=r:(a[++o]=null,l.push({i:o,x:yr(e,r)})),u=pl.lastIndex;return u<t.length&&(i=t.slice(u),a[o]?a[o]+=i:a[++o]=i),a.length<2?l[0]?(t=l[0].x,function(n){return t(n)+""}):function(){return t}:(t=l.length,function(n){for(var e,r=0;t>r;++r)a[(e=l[r]).i]=e.x(n);return a.join("")})}function Mr(n,t){for(var e,r=ao.interpolators.length;--r>=0&&!(e=ao.interpolators[r](n,t)););return e}function xr(n,t){var e,r=[],i=[],u=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(Mr(n[e],t[e]));for(;u>e;++e)i[e]=n[e];for(;o>e;++e)i[e]=t[e];return function(n){for(e=0;a>e;++e)i[e]=r[e](n);return i}}function br(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function _r(n){return function(t){return 1-n(1-t)}}function wr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function Sr(n){return n*n}function kr(n){return n*n*n}function Nr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Er(n){return function(t){return Math.pow(t,n)}}function Ar(n){return 1-Math.cos(n*Io)}function Cr(n){return Math.pow(2,10*(n-1))}function zr(n){return 1-Math.sqrt(1-n*n)}function Lr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/Ho*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,-10*r)*Math.sin((r-e)*Ho/t)}}function qr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Tr(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Rr(n,t){n=ao.hcl(n),t=ao.hcl(t);var e=n.h,r=n.c,i=n.l,u=t.h-e,o=t.c-r,a=t.l-i;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return sn(e+u*n,r+o*n,i+a*n)+""}}function Dr(n,t){n=ao.hsl(n),t=ao.hsl(t);var e=n.h,r=n.s,i=n.l,u=t.h-e,o=t.s-r,a=t.l-i;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return cn(e+u*n,r+o*n,i+a*n)+""}}function Pr(n,t){n=ao.lab(n),t=ao.lab(t);var e=n.l,r=n.a,i=n.b,u=t.l-e,o=t.a-r,a=t.b-i;return function(n){return pn(e+u*n,r+o*n,i+a*n)+""}}function Ur(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function jr(n){var t=[n.a,n.b],e=[n.c,n.d],r=Hr(t),i=Fr(t,e),u=Hr(Or(e,t,-i))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,i*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Zo,this.translate=[n.e,n.f],this.scale=[r,u],this.skew=u?Math.atan2(i,u)*Zo:0}function Fr(n,t){return n[0]*t[0]+n[1]*t[1]}function Hr(n){var t=Math.sqrt(Fr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function Or(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function Ir(n){return n.length?n.pop()+",":""}function Yr(n,t,e,r){if(n[0]!==t[0]||n[1]!==t[1]){var i=e.push("translate(",null,",",null,")");r.push({i:i-4,x:yr(n[0],t[0])},{i:i-2,x:yr(n[1],t[1])})}else(t[0]||t[1])&&e.push("translate("+t+")")}function Zr(n,t,e,r){n!==t?(n-t>180?t+=360:t-n>180&&(n+=360),r.push({i:e.push(Ir(e)+"rotate(",null,")")-2,x:yr(n,t)})):t&&e.push(Ir(e)+"rotate("+t+")")}function Vr(n,t,e,r){n!==t?r.push({i:e.push(Ir(e)+"skewX(",null,")")-2,x:yr(n,t)}):t&&e.push(Ir(e)+"skewX("+t+")")}function Xr(n,t,e,r){if(n[0]!==t[0]||n[1]!==t[1]){var i=e.push(Ir(e)+"scale(",null,",",null,")");r.push({i:i-4,x:yr(n[0],t[0])},{i:i-2,x:yr(n[1],t[1])})}else 1===t[0]&&1===t[1]||e.push(Ir(e)+"scale("+t+")")}function $r(n,t){var e=[],r=[];return n=ao.transform(n),t=ao.transform(t),Yr(n.translate,t.translate,e,r),Zr(n.rotate,t.rotate,e,r),Vr(n.skew,t.skew,e,r),Xr(n.scale,t.scale,e,r),n=t=null,function(n){for(var t,i=-1,u=r.length;++i<u;)e[(t=r[i]).i]=t.x(n);return e.join("")}}function Br(n,t){return t=(t-=n=+n)||1/t,function(e){return(e-n)/t}}function Wr(n,t){return t=(t-=n=+n)||1/t,function(e){return Math.max(0,Math.min(1,(e-n)/t))}}function Jr(n){for(var t=n.source,e=n.target,r=Kr(t,e),i=[t];t!==r;)t=t.parent,i.push(t);for(var u=i.length;e!==r;)i.splice(u,0,e),e=e.parent;return i}function Gr(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Kr(n,t){if(n===t)return n;for(var e=Gr(n),r=Gr(t),i=e.pop(),u=r.pop(),o=null;i===u;)o=i,i=e.pop(),u=r.pop();return o}function Qr(n){n.fixed|=2}function ni(n){n.fixed&=-7}function ti(n){n.fixed|=4,n.px=n.x,n.py=n.y}function ei(n){n.fixed&=-5}function ri(n,t,e){var r=0,i=0;if(n.charge=0,!n.leaf)for(var u,o=n.nodes,a=o.length,l=-1;++l<a;)u=o[l],null!=u&&(ri(u,t,e),n.charge+=u.charge,r+=u.charge*u.cx,i+=u.charge*u.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var c=t*e[n.point.index];n.charge+=n.pointCharge=c,r+=c*n.point.x,i+=c*n.point.y}n.cx=r/n.charge,n.cy=i/n.charge}function ii(n,t){return ao.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=fi,n}function ui(n,t){for(var e=[n];null!=(n=e.pop());)if(t(n),(i=n.children)&&(r=i.length))for(var r,i;--r>=0;)e.push(i[r])}function oi(n,t){for(var e=[n],r=[];null!=(n=e.pop());)if(r.push(n),(u=n.children)&&(i=u.length))for(var i,u,o=-1;++o<i;)e.push(u[o]);for(;null!=(n=r.pop());)t(n)}function ai(n){return n.children}function li(n){return n.value}function ci(n,t){return t.value-n.value}function fi(n){return ao.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function si(n){return n.x}function hi(n){return n.y}function pi(n,t,e){n.y0=t,n.y=e}function gi(n){return ao.range(n.length)}function vi(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function di(n){for(var t,e=1,r=0,i=n[0][1],u=n.length;u>e;++e)(t=n[e][1])>i&&(r=e,i=t);return r}function yi(n){return n.reduce(mi,0)}function mi(n,t){return n+t[1]}function Mi(n,t){return xi(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function xi(n,t){for(var e=-1,r=+n[0],i=(n[1]-r)/t,u=[];++e<=t;)u[e]=i*e+r;return u}function bi(n){return[ao.min(n),ao.max(n)]}function _i(n,t){return n.value-t.value}function wi(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function Si(n,t){n._pack_next=t,t._pack_prev=n}function ki(n,t){var e=t.x-n.x,r=t.y-n.y,i=n.r+t.r;return.999*i*i>e*e+r*r}function Ni(n){function t(n){f=Math.min(n.x-n.r,f),s=Math.max(n.x+n.r,s),h=Math.min(n.y-n.r,h),p=Math.max(n.y+n.r,p)}if((e=n.children)&&(c=e.length)){var e,r,i,u,o,a,l,c,f=1/0,s=-(1/0),h=1/0,p=-(1/0);if(e.forEach(Ei),r=e[0],r.x=-r.r,r.y=0,t(r),c>1&&(i=e[1],i.x=i.r,i.y=0,t(i),c>2))for(u=e[2],zi(r,i,u),t(u),wi(r,u),r._pack_prev=u,wi(u,i),i=r._pack_next,o=3;c>o;o++){zi(r,i,u=e[o]);var g=0,v=1,d=1;for(a=i._pack_next;a!==i;a=a._pack_next,v++)if(ki(a,u)){g=1;break}if(1==g)for(l=r._pack_prev;l!==a._pack_prev&&!ki(l,u);l=l._pack_prev,d++);g?(d>v||v==d&&i.r<r.r?Si(r,i=a):Si(r=l,i),o--):(wi(r,u),i=u,t(u))}var y=(f+s)/2,m=(h+p)/2,M=0;for(o=0;c>o;o++)u=e[o],u.x-=y,u.y-=m,M=Math.max(M,u.r+Math.sqrt(u.x*u.x+u.y*u.y));n.r=M,e.forEach(Ai)}}function Ei(n){n._pack_next=n._pack_prev=n}function Ai(n){delete n._pack_next,delete n._pack_prev}function Ci(n,t,e,r){var i=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,i)for(var u=-1,o=i.length;++u<o;)Ci(i[u],t,e,r)}function zi(n,t,e){var r=n.r+e.r,i=t.x-n.x,u=t.y-n.y;if(r&&(i||u)){var o=t.r+e.r,a=i*i+u*u;o*=o,r*=r;var l=.5+(r-o)/(2*a),c=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+l*i+c*u,e.y=n.y+l*u-c*i}else e.x=n.x+r,e.y=n.y}function Li(n,t){return n.parent==t.parent?1:2}function qi(n){var t=n.children;return t.length?t[0]:n.t}function Ti(n){var t,e=n.children;return(t=e.length)?e[t-1]:n.t}function Ri(n,t,e){var r=e/(t.i-n.i);t.c-=r,t.s+=e,n.c+=r,t.z+=e,t.m+=e}function Di(n){for(var t,e=0,r=0,i=n.children,u=i.length;--u>=0;)t=i[u],t.z+=e,t.m+=e,e+=t.s+(r+=t.c)}function Pi(n,t,e){return n.a.parent===t.parent?n.a:e}function Ui(n){return 1+ao.max(n,function(n){return n.y})}function ji(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Fi(n){var t=n.children;return t&&t.length?Fi(t[0]):n}function Hi(n){var t,e=n.children;return e&&(t=e.length)?Hi(e[t-1]):n}function Oi(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Ii(n,t){var e=n.x+t[3],r=n.y+t[0],i=n.dx-t[1]-t[3],u=n.dy-t[0]-t[2];return 0>i&&(e+=i/2,i=0),0>u&&(r+=u/2,u=0),{x:e,y:r,dx:i,dy:u}}function Yi(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Zi(n){return n.rangeExtent?n.rangeExtent():Yi(n.range())}function Vi(n,t,e,r){var i=e(n[0],n[1]),u=r(t[0],t[1]);return function(n){return u(i(n))}}function Xi(n,t){var e,r=0,i=n.length-1,u=n[r],o=n[i];return u>o&&(e=r,r=i,i=e,e=u,u=o,o=e),n[r]=t.floor(u),n[i]=t.ceil(o),n}function $i(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:Sl}function Bi(n,t,e,r){var i=[],u=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)i.push(e(n[o-1],n[o])),u.push(r(t[o-1],t[o]));return function(t){var e=ao.bisect(n,t,1,a)-1;return u[e](i[e](t))}}function Wi(n,t,e,r){function i(){var i=Math.min(n.length,t.length)>2?Bi:Vi,l=r?Wr:Br;return o=i(n,t,l,e),a=i(t,n,l,Mr),u}function u(n){return o(n)}var o,a;return u.invert=function(n){return a(n)},u.domain=function(t){return arguments.length?(n=t.map(Number),i()):n},u.range=function(n){return arguments.length?(t=n,i()):t},u.rangeRound=function(n){return u.range(n).interpolate(Ur)},u.clamp=function(n){return arguments.length?(r=n,i()):r},u.interpolate=function(n){return arguments.length?(e=n,i()):e},u.ticks=function(t){return Qi(n,t)},u.tickFormat=function(t,e){return nu(n,t,e)},u.nice=function(t){return Gi(n,t),i()},u.copy=function(){return Wi(n,t,e,r)},i()}function Ji(n,t){return ao.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Gi(n,t){return Xi(n,$i(Ki(n,t)[2])),Xi(n,$i(Ki(n,t)[2])),n}function Ki(n,t){null==t&&(t=10);var e=Yi(n),r=e[1]-e[0],i=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),u=t/r*i;return.15>=u?i*=10:.35>=u?i*=5:.75>=u&&(i*=2),e[0]=Math.ceil(e[0]/i)*i,e[1]=Math.floor(e[1]/i)*i+.5*i,e[2]=i,e}function Qi(n,t){return ao.range.apply(ao,Ki(n,t))}function nu(n,t,e){var r=Ki(n,t);if(e){var i=ha.exec(e);if(i.shift(),"s"===i[8]){var u=ao.formatPrefix(Math.max(xo(r[0]),xo(r[1])));return i[7]||(i[7]="."+tu(u.scale(r[2]))),i[8]="f",e=ao.format(i.join("")),function(n){return e(u.scale(n))+u.symbol}}i[7]||(i[7]="."+eu(i[8],r)),e=i.join("")}else e=",."+tu(r[2])+"f";return ao.format(e)}function tu(n){return-Math.floor(Math.log(n)/Math.LN10+.01)}function eu(n,t){var e=tu(t[2]);return n in kl?Math.abs(e-tu(Math.max(xo(t[0]),xo(t[1]))))+ +("e"!==n):e-2*("%"===n)}function ru(n,t,e,r){function i(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function u(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(i(t))}return o.invert=function(t){return u(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(i)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(i)),o):t},o.nice=function(){var t=Xi(r.map(i),e?Math:El);return n.domain(t),r=t.map(u),o},o.ticks=function(){var n=Yi(r),o=[],a=n[0],l=n[1],c=Math.floor(i(a)),f=Math.ceil(i(l)),s=t%1?2:t;if(isFinite(f-c)){if(e){for(;f>c;c++)for(var h=1;s>h;h++)o.push(u(c)*h);o.push(u(c))}else for(o.push(u(c));c++<f;)for(var h=s-1;h>0;h--)o.push(u(c)*h);for(c=0;o[c]<a;c++);for(f=o.length;o[f-1]>l;f--);o=o.slice(c,f)}return o},o.tickFormat=function(n,e){if(!arguments.length)return Nl;arguments.length<2?e=Nl:"function"!=typeof e&&(e=ao.format(e));var r=Math.max(1,t*n/o.ticks().length);return function(n){var o=n/u(Math.round(i(n)));return t-.5>o*t&&(o*=t),r>=o?e(n):""}},o.copy=function(){return ru(n.copy(),t,e,r)},Ji(o,n)}function iu(n,t,e){function r(t){return n(i(t))}var i=uu(t),u=uu(1/t);return r.invert=function(t){return u(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(i)),r):e},r.ticks=function(n){return Qi(e,n)},r.tickFormat=function(n,t){return nu(e,n,t)},r.nice=function(n){return r.domain(Gi(e,n))},r.exponent=function(o){return arguments.length?(i=uu(t=o),u=uu(1/t),n.domain(e.map(i)),r):t},r.copy=function(){return iu(n.copy(),t,e)},Ji(r,n)}function uu(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function ou(n,t){function e(e){return u[((i.get(e)||("range"===t.t?i.set(e,n.push(e)):NaN))-1)%u.length]}function r(t,e){return ao.range(n.length).map(function(n){return t+e*n})}var i,u,o;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new c;for(var u,o=-1,a=r.length;++o<a;)i.has(u=r[o])||i.set(u,n.push(u));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(u=n,o=0,t={t:"range",a:arguments},e):u},e.rangePoints=function(i,a){arguments.length<2&&(a=0);var l=i[0],c=i[1],f=n.length<2?(l=(l+c)/2,0):(c-l)/(n.length-1+a);return u=r(l+f*a/2,f),o=0,t={t:"rangePoints",a:arguments},e},e.rangeRoundPoints=function(i,a){arguments.length<2&&(a=0);var l=i[0],c=i[1],f=n.length<2?(l=c=Math.round((l+c)/2),0):(c-l)/(n.length-1+a)|0;return u=r(l+Math.round(f*a/2+(c-l-(n.length-1+a)*f)/2),f),o=0,t={t:"rangeRoundPoints",a:arguments},e},e.rangeBands=function(i,a,l){arguments.length<2&&(a=0),arguments.length<3&&(l=a);var c=i[1]<i[0],f=i[c-0],s=i[1-c],h=(s-f)/(n.length-a+2*l);return u=r(f+h*l,h),c&&u.reverse(),o=h*(1-a),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(i,a,l){arguments.length<2&&(a=0),arguments.length<3&&(l=a);var c=i[1]<i[0],f=i[c-0],s=i[1-c],h=Math.floor((s-f)/(n.length-a+2*l));return u=r(f+Math.round((s-f-(n.length-a)*h)/2),h),c&&u.reverse(),o=Math.round(h*(1-a)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return o},e.rangeExtent=function(){return Yi(t.a[0])},e.copy=function(){return ou(n,t)},e.domain(n)}function au(n,t){function u(){var e=0,r=t.length;for(a=[];++e<r;)a[e-1]=ao.quantile(n,e/r);return o}function o(n){return isNaN(n=+n)?void 0:t[ao.bisect(a,n)]}var a;return o.domain=function(t){return arguments.length?(n=t.map(r).filter(i).sort(e),u()):n},o.range=function(n){return arguments.length?(t=n,u()):t},o.quantiles=function(){return a},o.invertExtent=function(e){return e=t.indexOf(e),0>e?[NaN,NaN]:[e>0?a[e-1]:n[0],e<a.length?a[e]:n[n.length-1]]},o.copy=function(){return au(n,t)},u()}function lu(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(u*(t-n))))]}function i(){return u=e.length/(t-n),o=e.length-1,r}var u,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],i()):[n,t]},r.range=function(n){return arguments.length?(e=n,i()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?NaN:t/u+n,[t,t+1/u]},r.copy=function(){return lu(n,t,e)},i()}function cu(n,t){function e(e){return e>=e?t[ao.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return cu(n,t)},e}function fu(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return Qi(n,t)},t.tickFormat=function(t,e){return nu(n,t,e)},t.copy=function(){return fu(n)},t}function su(){return 0}function hu(n){return n.innerRadius}function pu(n){return n.outerRadius}function gu(n){return n.startAngle}function vu(n){return n.endAngle}function du(n){return n&&n.padAngle}function yu(n,t,e,r){return(n-e)*t-(t-r)*n>0?0:1}function mu(n,t,e,r,i){var u=n[0]-t[0],o=n[1]-t[1],a=(i?r:-r)/Math.sqrt(u*u+o*o),l=a*o,c=-a*u,f=n[0]+l,s=n[1]+c,h=t[0]+l,p=t[1]+c,g=(f+h)/2,v=(s+p)/2,d=h-f,y=p-s,m=d*d+y*y,M=e-r,x=f*p-h*s,b=(0>y?-1:1)*Math.sqrt(Math.max(0,M*M*m-x*x)),_=(x*y-d*b)/m,w=(-x*d-y*b)/m,S=(x*y+d*b)/m,k=(-x*d+y*b)/m,N=_-g,E=w-v,A=S-g,C=k-v;return N*N+E*E>A*A+C*C&&(_=S,w=k),[[_-l,w-c],[_*e/M,w*e/M]]}function Mu(n){function t(t){function o(){c.push("M",u(n(f),a))}for(var l,c=[],f=[],s=-1,h=t.length,p=En(e),g=En(r);++s<h;)i.call(this,l=t[s],s)?f.push([+p.call(this,l,s),+g.call(this,l,s)]):f.length&&(o(),f=[]);return f.length&&o(),c.length?c.join(""):null}var e=Ce,r=ze,i=zt,u=xu,o=u.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(i=n,t):i},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?u=n:(u=Tl.get(n)||xu).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function xu(n){return n.length>1?n.join("L"):n+"Z"}function bu(n){return n.join("L")+"Z"}function _u(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&i.push("H",r[0]),i.join("")}function wu(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("V",(r=n[t])[1],"H",r[0]);return i.join("")}function Su(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r=n[t])[0],"V",r[1]);return i.join("")}function ku(n,t){return n.length<4?xu(n):n[1]+Au(n.slice(1,-1),Cu(n,t))}function Nu(n,t){return n.length<3?bu(n):n[0]+Au((n.push(n[0]),n),Cu([n[n.length-2]].concat(n,[n[1]]),t))}function Eu(n,t){return n.length<3?xu(n):n[0]+Au(n,Cu(n,t))}function Au(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return xu(n);var e=n.length!=t.length,r="",i=n[0],u=n[1],o=t[0],a=o,l=1;if(e&&(r+="Q"+(u[0]-2*o[0]/3)+","+(u[1]-2*o[1]/3)+","+u[0]+","+u[1],i=n[1],l=2),t.length>1){a=t[1],u=n[l],l++,r+="C"+(i[0]+o[0])+","+(i[1]+o[1])+","+(u[0]-a[0])+","+(u[1]-a[1])+","+u[0]+","+u[1];for(var c=2;c<t.length;c++,l++)u=n[l],a=t[c],r+="S"+(u[0]-a[0])+","+(u[1]-a[1])+","+u[0]+","+u[1]}if(e){var f=n[l];r+="Q"+(u[0]+2*a[0]/3)+","+(u[1]+2*a[1]/3)+","+f[0]+","+f[1]}return r}function Cu(n,t){for(var e,r=[],i=(1-t)/2,u=n[0],o=n[1],a=1,l=n.length;++a<l;)e=u,u=o,o=n[a],r.push([i*(o[0]-e[0]),i*(o[1]-e[1])]);return r}function zu(n){if(n.length<3)return xu(n);var t=1,e=n.length,r=n[0],i=r[0],u=r[1],o=[i,i,i,(r=n[1])[0]],a=[u,u,u,r[1]],l=[i,",",u,"L",Ru(Pl,o),",",Ru(Pl,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),Du(l,o,a);return n.pop(),l.push("L",r),l.join("")}function Lu(n){if(n.length<4)return xu(n);for(var t,e=[],r=-1,i=n.length,u=[0],o=[0];++r<3;)t=n[r],u.push(t[0]),o.push(t[1]);for(e.push(Ru(Pl,u)+","+Ru(Pl,o)),--r;++r<i;)t=n[r],u.shift(),u.push(t[0]),o.shift(),o.push(t[1]),Du(e,u,o);return e.join("")}function qu(n){for(var t,e,r=-1,i=n.length,u=i+4,o=[],a=[];++r<4;)e=n[r%i],o.push(e[0]),a.push(e[1]);for(t=[Ru(Pl,o),",",Ru(Pl,a)],--r;++r<u;)e=n[r%i],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),Du(t,o,a);return t.join("")}function Tu(n,t){var e=n.length-1;if(e)for(var r,i,u=n[0][0],o=n[0][1],a=n[e][0]-u,l=n[e][1]-o,c=-1;++c<=e;)r=n[c],i=c/e,r[0]=t*r[0]+(1-t)*(u+i*a),r[1]=t*r[1]+(1-t)*(o+i*l);return zu(n)}function Ru(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Du(n,t,e){n.push("C",Ru(Rl,t),",",Ru(Rl,e),",",Ru(Dl,t),",",Ru(Dl,e),",",Ru(Pl,t),",",Ru(Pl,e))}function Pu(n,t){return(t[1]-n[1])/(t[0]-n[0])}function Uu(n){for(var t=0,e=n.length-1,r=[],i=n[0],u=n[1],o=r[0]=Pu(i,u);++t<e;)r[t]=(o+(o=Pu(i=u,u=n[t+1])))/2;return r[t]=o,r}function ju(n){for(var t,e,r,i,u=[],o=Uu(n),a=-1,l=n.length-1;++a<l;)t=Pu(n[a],n[a+1]),xo(t)<Uo?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,i=e*e+r*r,i>9&&(i=3*t/Math.sqrt(i),o[a]=i*e,o[a+1]=i*r));for(a=-1;++a<=l;)i=(n[Math.min(l,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),u.push([i||0,o[a]*i||0]);return u}function Fu(n){return n.length<3?xu(n):n[0]+Au(n,ju(n))}function Hu(n){for(var t,e,r,i=-1,u=n.length;++i<u;)t=n[i],e=t[0],r=t[1]-Io,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function Ou(n){function t(t){function l(){v.push("M",a(n(y),s),f,c(n(d.reverse()),s),"Z")}for(var h,p,g,v=[],d=[],y=[],m=-1,M=t.length,x=En(e),b=En(i),_=e===r?function(){
return p}:En(r),w=i===u?function(){return g}:En(u);++m<M;)o.call(this,h=t[m],m)?(d.push([p=+x.call(this,h,m),g=+b.call(this,h,m)]),y.push([+_.call(this,h,m),+w.call(this,h,m)])):d.length&&(l(),d=[],y=[]);return d.length&&l(),v.length?v.join(""):null}var e=Ce,r=Ce,i=0,u=ze,o=zt,a=xu,l=a.key,c=a,f="L",s=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(i=u=n,t):u},t.y0=function(n){return arguments.length?(i=n,t):i},t.y1=function(n){return arguments.length?(u=n,t):u},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(l="function"==typeof n?a=n:(a=Tl.get(n)||xu).key,c=a.reverse||a,f=a.closed?"M":"L",t):l},t.tension=function(n){return arguments.length?(s=n,t):s},t}function Iu(n){return n.radius}function Yu(n){return[n.x,n.y]}function Zu(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]-Io;return[e*Math.cos(r),e*Math.sin(r)]}}function Vu(){return 64}function Xu(){return"circle"}function $u(n){var t=Math.sqrt(n/Fo);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Bu(n){return function(){var t,e,r;(t=this[n])&&(r=t[e=t.active])&&(r.timer.c=null,r.timer.t=NaN,--t.count?delete t[e]:delete this[n],t.active+=.5,r.event&&r.event.interrupt.call(this,this.__data__,r.index))}}function Wu(n,t,e){return ko(n,Yl),n.namespace=t,n.id=e,n}function Ju(n,t,e,r){var i=n.id,u=n.namespace;return Y(n,"function"==typeof e?function(n,o,a){n[u][i].tween.set(t,r(e.call(n,n.__data__,o,a)))}:(e=r(e),function(n){n[u][i].tween.set(t,e)}))}function Gu(n){return null==n&&(n=""),function(){this.textContent=n}}function Ku(n){return null==n?"__transition__":"__transition_"+n+"__"}function Qu(n,t,e,r,i){function u(n){var t=v.delay;return f.t=t+l,n>=t?o(n-t):void(f.c=o)}function o(e){var i=g.active,u=g[i];u&&(u.timer.c=null,u.timer.t=NaN,--g.count,delete g[i],u.event&&u.event.interrupt.call(n,n.__data__,u.index));for(var o in g)if(r>+o){var c=g[o];c.timer.c=null,c.timer.t=NaN,--g.count,delete g[o]}f.c=a,qn(function(){return f.c&&a(e||1)&&(f.c=null,f.t=NaN),1},0,l),g.active=r,v.event&&v.event.start.call(n,n.__data__,t),p=[],v.tween.forEach(function(e,r){(r=r.call(n,n.__data__,t))&&p.push(r)}),h=v.ease,s=v.duration}function a(i){for(var u=i/s,o=h(u),a=p.length;a>0;)p[--a].call(n,o);return u>=1?(v.event&&v.event.end.call(n,n.__data__,t),--g.count?delete g[r]:delete n[e],1):void 0}var l,f,s,h,p,g=n[e]||(n[e]={active:0,count:0}),v=g[r];v||(l=i.time,f=qn(u,0,l),v=g[r]={tween:new c,time:l,timer:f,delay:i.delay,duration:i.duration,ease:i.ease,index:t},i=null,++g.count)}function no(n,t,e){n.attr("transform",function(n){var r=t(n);return"translate("+(isFinite(r)?r:e(n))+",0)"})}function to(n,t,e){n.attr("transform",function(n){var r=t(n);return"translate(0,"+(isFinite(r)?r:e(n))+")"})}function eo(n){return n.toISOString()}function ro(n,t,e){function r(t){return n(t)}function i(n,e){var r=n[1]-n[0],i=r/e,u=ao.bisect(Kl,i);return u==Kl.length?[t.year,Ki(n.map(function(n){return n/31536e6}),e)[2]]:u?t[i/Kl[u-1]<Kl[u]/i?u-1:u]:[tc,Ki(n,e)[2]]}return r.invert=function(t){return io(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(io)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,io(+e+1),t).length}var u=r.domain(),o=Yi(u),a=null==n?i(o,10):"number"==typeof n&&i(o,n);return a&&(n=a[0],t=a[1]),r.domain(Xi(u,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=io(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=io(+t+1);return t}}:n))},r.ticks=function(n,t){var e=Yi(r.domain()),u=null==n?i(e,10):"number"==typeof n?i(e,n):!n.range&&[{range:n},t];return u&&(n=u[0],t=u[1]),n.range(e[0],io(+e[1]+1),1>t?1:t)},r.tickFormat=function(){return e},r.copy=function(){return ro(n.copy(),t,e)},Ji(r,n)}function io(n){return new Date(n)}function uo(n){return JSON.parse(n.responseText)}function oo(n){var t=fo.createRange();return t.selectNode(fo.body),t.createContextualFragment(n.responseText)}var ao={version:"3.5.17"},lo=[].slice,co=function(n){return lo.call(n)},fo=this.document;if(fo)try{co(fo.documentElement.childNodes)[0].nodeType}catch(so){co=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}if(Date.now||(Date.now=function(){return+new Date}),fo)try{fo.createElement("DIV").style.setProperty("opacity",0,"")}catch(ho){var po=this.Element.prototype,go=po.setAttribute,vo=po.setAttributeNS,yo=this.CSSStyleDeclaration.prototype,mo=yo.setProperty;po.setAttribute=function(n,t){go.call(this,n,t+"")},po.setAttributeNS=function(n,t,e){vo.call(this,n,t,e+"")},yo.setProperty=function(n,t,e){mo.call(this,n,t+"",e)}}ao.ascending=e,ao.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:NaN},ao.min=function(n,t){var e,r,i=-1,u=n.length;if(1===arguments.length){for(;++i<u;)if(null!=(r=n[i])&&r>=r){e=r;break}for(;++i<u;)null!=(r=n[i])&&e>r&&(e=r)}else{for(;++i<u;)if(null!=(r=t.call(n,n[i],i))&&r>=r){e=r;break}for(;++i<u;)null!=(r=t.call(n,n[i],i))&&e>r&&(e=r)}return e},ao.max=function(n,t){var e,r,i=-1,u=n.length;if(1===arguments.length){for(;++i<u;)if(null!=(r=n[i])&&r>=r){e=r;break}for(;++i<u;)null!=(r=n[i])&&r>e&&(e=r)}else{for(;++i<u;)if(null!=(r=t.call(n,n[i],i))&&r>=r){e=r;break}for(;++i<u;)null!=(r=t.call(n,n[i],i))&&r>e&&(e=r)}return e},ao.extent=function(n,t){var e,r,i,u=-1,o=n.length;if(1===arguments.length){for(;++u<o;)if(null!=(r=n[u])&&r>=r){e=i=r;break}for(;++u<o;)null!=(r=n[u])&&(e>r&&(e=r),r>i&&(i=r))}else{for(;++u<o;)if(null!=(r=t.call(n,n[u],u))&&r>=r){e=i=r;break}for(;++u<o;)null!=(r=t.call(n,n[u],u))&&(e>r&&(e=r),r>i&&(i=r))}return[e,i]},ao.sum=function(n,t){var e,r=0,u=n.length,o=-1;if(1===arguments.length)for(;++o<u;)i(e=+n[o])&&(r+=e);else for(;++o<u;)i(e=+t.call(n,n[o],o))&&(r+=e);return r},ao.mean=function(n,t){var e,u=0,o=n.length,a=-1,l=o;if(1===arguments.length)for(;++a<o;)i(e=r(n[a]))?u+=e:--l;else for(;++a<o;)i(e=r(t.call(n,n[a],a)))?u+=e:--l;return l?u/l:void 0},ao.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),i=+n[r-1],u=e-r;return u?i+u*(n[r]-i):i},ao.median=function(n,t){var u,o=[],a=n.length,l=-1;if(1===arguments.length)for(;++l<a;)i(u=r(n[l]))&&o.push(u);else for(;++l<a;)i(u=r(t.call(n,n[l],l)))&&o.push(u);return o.length?ao.quantile(o.sort(e),.5):void 0},ao.variance=function(n,t){var e,u,o=n.length,a=0,l=0,c=-1,f=0;if(1===arguments.length)for(;++c<o;)i(e=r(n[c]))&&(u=e-a,a+=u/++f,l+=u*(e-a));else for(;++c<o;)i(e=r(t.call(n,n[c],c)))&&(u=e-a,a+=u/++f,l+=u*(e-a));return f>1?l/(f-1):void 0},ao.deviation=function(){var n=ao.variance.apply(this,arguments);return n?Math.sqrt(n):n};var Mo=u(e);ao.bisectLeft=Mo.left,ao.bisect=ao.bisectRight=Mo.right,ao.bisector=function(n){return u(1===n.length?function(t,r){return e(n(t),r)}:n)},ao.shuffle=function(n,t,e){(u=arguments.length)<3&&(e=n.length,2>u&&(t=0));for(var r,i,u=e-t;u;)i=Math.random()*u--|0,r=n[u+t],n[u+t]=n[i+t],n[i+t]=r;return n},ao.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},ao.pairs=function(n){for(var t,e=0,r=n.length-1,i=n[0],u=new Array(0>r?0:r);r>e;)u[e]=[t=i,i=n[++e]];return u},ao.transpose=function(n){if(!(i=n.length))return[];for(var t=-1,e=ao.min(n,o),r=new Array(e);++t<e;)for(var i,u=-1,a=r[t]=new Array(i);++u<i;)a[u]=n[u][t];return r},ao.zip=function(){return ao.transpose(arguments)},ao.keys=function(n){var t=[];for(var e in n)t.push(e);return t},ao.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},ao.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},ao.merge=function(n){for(var t,e,r,i=n.length,u=-1,o=0;++u<i;)o+=n[u].length;for(e=new Array(o);--i>=0;)for(r=n[i],t=r.length;--t>=0;)e[--o]=r[t];return e};var xo=Math.abs;ao.range=function(n,t,e){if(arguments.length<3&&(e=1,arguments.length<2&&(t=n,n=0)),(t-n)/e===1/0)throw new Error("infinite range");var r,i=[],u=a(xo(e)),o=-1;if(n*=u,t*=u,e*=u,0>e)for(;(r=n+e*++o)>t;)i.push(r/u);else for(;(r=n+e*++o)<t;)i.push(r/u);return i},ao.map=function(n,t){var e=new c;if(n instanceof c)n.forEach(function(n,t){e.set(n,t)});else if(Array.isArray(n)){var r,i=-1,u=n.length;if(1===arguments.length)for(;++i<u;)e.set(i,n[i]);else for(;++i<u;)e.set(t.call(n,r=n[i],i),r)}else for(var o in n)e.set(o,n[o]);return e};var bo="__proto__",_o="\x00";l(c,{has:h,get:function(n){return this._[f(n)]},set:function(n,t){return this._[f(n)]=t},remove:p,keys:g,values:function(){var n=[];for(var t in this._)n.push(this._[t]);return n},entries:function(){var n=[];for(var t in this._)n.push({key:s(t),value:this._[t]});return n},size:v,empty:d,forEach:function(n){for(var t in this._)n.call(this,s(t),this._[t])}}),ao.nest=function(){function n(t,o,a){if(a>=u.length)return r?r.call(i,o):e?o.sort(e):o;for(var l,f,s,h,p=-1,g=o.length,v=u[a++],d=new c;++p<g;)(h=d.get(l=v(f=o[p])))?h.push(f):d.set(l,[f]);return t?(f=t(),s=function(e,r){f.set(e,n(t,r,a))}):(f={},s=function(e,r){f[e]=n(t,r,a)}),d.forEach(s),f}function t(n,e){if(e>=u.length)return n;var r=[],i=o[e++];return n.forEach(function(n,i){r.push({key:n,values:t(i,e)})}),i?r.sort(function(n,t){return i(n.key,t.key)}):r}var e,r,i={},u=[],o=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(ao.map,e,0),0)},i.key=function(n){return u.push(n),i},i.sortKeys=function(n){return o[u.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},ao.set=function(n){var t=new y;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},l(y,{has:h,add:function(n){return this._[f(n+="")]=!0,n},remove:p,values:g,size:v,empty:d,forEach:function(n){for(var t in this._)n.call(this,s(t))}}),ao.behavior={},ao.rebind=function(n,t){for(var e,r=1,i=arguments.length;++r<i;)n[e=arguments[r]]=M(n,t,t[e]);return n};var wo=["webkit","ms","moz","Moz","o","O"];ao.dispatch=function(){for(var n=new _,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=w(n);return n},_.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.slice(e+1),n=n.slice(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},ao.event=null,ao.requote=function(n){return n.replace(So,"\\$&")};var So=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,ko={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},No=function(n,t){return t.querySelector(n)},Eo=function(n,t){return t.querySelectorAll(n)},Ao=function(n,t){var e=n.matches||n[x(n,"matchesSelector")];return(Ao=function(n,t){return e.call(n,t)})(n,t)};"function"==typeof Sizzle&&(No=function(n,t){return Sizzle(n,t)[0]||null},Eo=Sizzle,Ao=Sizzle.matchesSelector),ao.selection=function(){return ao.select(fo.documentElement)};var Co=ao.selection.prototype=[];Co.select=function(n){var t,e,r,i,u=[];n=A(n);for(var o=-1,a=this.length;++o<a;){u.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var l=-1,c=r.length;++l<c;)(i=r[l])?(t.push(e=n.call(i,i.__data__,l,o)),e&&"__data__"in i&&(e.__data__=i.__data__)):t.push(null)}return E(u)},Co.selectAll=function(n){var t,e,r=[];n=C(n);for(var i=-1,u=this.length;++i<u;)for(var o=this[i],a=-1,l=o.length;++a<l;)(e=o[a])&&(r.push(t=co(n.call(e,e.__data__,a,i))),t.parentNode=e);return E(r)};var zo="http://www.w3.org/1999/xhtml",Lo={svg:"http://www.w3.org/2000/svg",xhtml:zo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};ao.ns={prefix:Lo,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&"xmlns"!==(e=n.slice(0,t))&&(n=n.slice(t+1)),Lo.hasOwnProperty(e)?{space:Lo[e],local:n}:n}},Co.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=ao.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(z(t,n[t]));return this}return this.each(z(n,t))},Co.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=T(n)).length,i=-1;if(t=e.classList){for(;++i<r;)if(!t.contains(n[i]))return!1}else for(t=e.getAttribute("class");++i<r;)if(!q(n[i]).test(t))return!1;return!0}for(t in n)this.each(R(t,n[t]));return this}return this.each(R(n,t))},Co.style=function(n,e,r){var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(e="");for(r in n)this.each(P(r,n[r],e));return this}if(2>i){var u=this.node();return t(u).getComputedStyle(u,null).getPropertyValue(n)}r=""}return this.each(P(n,e,r))},Co.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(U(t,n[t]));return this}return this.each(U(n,t))},Co.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},Co.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},Co.append=function(n){return n=j(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},Co.insert=function(n,t){return n=j(n),t=A(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments)||null)})},Co.remove=function(){return this.each(F)},Co.data=function(n,t){function e(n,e){var r,i,u,o=n.length,s=e.length,h=Math.min(o,s),p=new Array(s),g=new Array(s),v=new Array(o);if(t){var d,y=new c,m=new Array(o);for(r=-1;++r<o;)(i=n[r])&&(y.has(d=t.call(i,i.__data__,r))?v[r]=i:y.set(d,i),m[r]=d);for(r=-1;++r<s;)(i=y.get(d=t.call(e,u=e[r],r)))?i!==!0&&(p[r]=i,i.__data__=u):g[r]=H(u),y.set(d,!0);for(r=-1;++r<o;)r in m&&y.get(m[r])!==!0&&(v[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],u=e[r],i?(i.__data__=u,p[r]=i):g[r]=H(u);for(;s>r;++r)g[r]=H(e[r]);for(;o>r;++r)v[r]=n[r]}g.update=p,g.parentNode=p.parentNode=v.parentNode=n.parentNode,a.push(g),l.push(p),f.push(v)}var r,i,u=-1,o=this.length;if(!arguments.length){for(n=new Array(o=(r=this[0]).length);++u<o;)(i=r[u])&&(n[u]=i.__data__);return n}var a=Z([]),l=E([]),f=E([]);if("function"==typeof n)for(;++u<o;)e(r=this[u],n.call(r,r.parentNode.__data__,u));else for(;++u<o;)e(r=this[u],n);return l.enter=function(){return a},l.exit=function(){return f},l},Co.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},Co.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=O(n));for(var u=0,o=this.length;o>u;u++){i.push(t=[]),t.parentNode=(e=this[u]).parentNode;for(var a=0,l=e.length;l>a;a++)(r=e[a])&&n.call(r,r.__data__,a,u)&&t.push(r)}return E(i)},Co.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],i=r.length-1,u=r[i];--i>=0;)(e=r[i])&&(u&&u!==e.nextSibling&&u.parentNode.insertBefore(e,u),u=e);return this},Co.sort=function(n){n=I.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},Co.each=function(n){return Y(this,function(t,e,r){n.call(t,t.__data__,e,r)})},Co.call=function(n){var t=co(arguments);return n.apply(t[0]=this,t),this},Co.empty=function(){return!this.node()},Co.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,i=e.length;i>r;r++){var u=e[r];if(u)return u}return null},Co.size=function(){var n=0;return Y(this,function(){++n}),n};var qo=[];ao.selection.enter=Z,ao.selection.enter.prototype=qo,qo.append=Co.append,qo.empty=Co.empty,qo.node=Co.node,qo.call=Co.call,qo.size=Co.size,qo.select=function(n){for(var t,e,r,i,u,o=[],a=-1,l=this.length;++a<l;){r=(i=this[a]).update,o.push(t=[]),t.parentNode=i.parentNode;for(var c=-1,f=i.length;++c<f;)(u=i[c])?(t.push(r[c]=e=n.call(i.parentNode,u.__data__,c,a)),e.__data__=u.__data__):t.push(null)}return E(o)},qo.insert=function(n,t){return arguments.length<2&&(t=V(this)),Co.insert.call(this,n,t)},ao.select=function(t){var e;return"string"==typeof t?(e=[No(t,fo)],e.parentNode=fo.documentElement):(e=[t],e.parentNode=n(t)),E([e])},ao.selectAll=function(n){var t;return"string"==typeof n?(t=co(Eo(n,fo)),t.parentNode=fo.documentElement):(t=co(n),t.parentNode=null),E([t])},Co.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(X(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(X(n,t,e))};var To=ao.map({mouseenter:"mouseover",mouseleave:"mouseout"});fo&&To.forEach(function(n){"on"+n in fo&&To.remove(n)});var Ro,Do=0;ao.mouse=function(n){return J(n,k())};var Po=this.navigator&&/WebKit/.test(this.navigator.userAgent)?-1:0;ao.touch=function(n,t,e){if(arguments.length<3&&(e=t,t=k().changedTouches),t)for(var r,i=0,u=t.length;u>i;++i)if((r=t[i]).identifier===e)return J(n,r)},ao.behavior.drag=function(){function n(){this.on("mousedown.drag",u).on("touchstart.drag",o)}function e(n,t,e,u,o){return function(){function a(){var n,e,r=t(h,v);r&&(n=r[0]-M[0],e=r[1]-M[1],g|=n|e,M=r,p({type:"drag",x:r[0]+c[0],y:r[1]+c[1],dx:n,dy:e}))}function l(){t(h,v)&&(y.on(u+d,null).on(o+d,null),m(g),p({type:"dragend"}))}var c,f=this,s=ao.event.target.correspondingElement||ao.event.target,h=f.parentNode,p=r.of(f,arguments),g=0,v=n(),d=".drag"+(null==v?"":"-"+v),y=ao.select(e(s)).on(u+d,a).on(o+d,l),m=W(s),M=t(h,v);i?(c=i.apply(f,arguments),c=[c.x-M[0],c.y-M[1]]):c=[0,0],p({type:"dragstart"})}}var r=N(n,"drag","dragstart","dragend"),i=null,u=e(b,ao.mouse,t,"mousemove","mouseup"),o=e(G,ao.touch,m,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},ao.rebind(n,r,"on")},ao.touches=function(n,t){return arguments.length<2&&(t=k().touches),t?co(t).map(function(t){var e=J(n,t);return e.identifier=t.identifier,e}):[]};var Uo=1e-6,jo=Uo*Uo,Fo=Math.PI,Ho=2*Fo,Oo=Ho-Uo,Io=Fo/2,Yo=Fo/180,Zo=180/Fo,Vo=Math.SQRT2,Xo=2,$o=4;ao.interpolateZoom=function(n,t){var e,r,i=n[0],u=n[1],o=n[2],a=t[0],l=t[1],c=t[2],f=a-i,s=l-u,h=f*f+s*s;if(jo>h)r=Math.log(c/o)/Vo,e=function(n){return[i+n*f,u+n*s,o*Math.exp(Vo*n*r)]};else{var p=Math.sqrt(h),g=(c*c-o*o+$o*h)/(2*o*Xo*p),v=(c*c-o*o-$o*h)/(2*c*Xo*p),d=Math.log(Math.sqrt(g*g+1)-g),y=Math.log(Math.sqrt(v*v+1)-v);r=(y-d)/Vo,e=function(n){var t=n*r,e=rn(d),a=o/(Xo*p)*(e*un(Vo*t+d)-en(d));return[i+a*f,u+a*s,o*e/rn(Vo*t+d)]}}return e.duration=1e3*r,e},ao.behavior.zoom=function(){function n(n){n.on(L,s).on(Wo+".zoom",p).on("dblclick.zoom",g).on(R,h)}function e(n){return[(n[0]-k.x)/k.k,(n[1]-k.y)/k.k]}function r(n){return[n[0]*k.k+k.x,n[1]*k.k+k.y]}function i(n){k.k=Math.max(A[0],Math.min(A[1],n))}function u(n,t){t=r(t),k.x+=n[0]-t[0],k.y+=n[1]-t[1]}function o(t,e,r,o){t.__chart__={x:k.x,y:k.y,k:k.k},i(Math.pow(2,o)),u(d=e,r),t=ao.select(t),C>0&&(t=t.transition().duration(C)),t.call(n.event)}function a(){b&&b.domain(x.range().map(function(n){return(n-k.x)/k.k}).map(x.invert)),w&&w.domain(_.range().map(function(n){return(n-k.y)/k.k}).map(_.invert))}function l(n){z++||n({type:"zoomstart"})}function c(n){a(),n({type:"zoom",scale:k.k,translate:[k.x,k.y]})}function f(n){--z||(n({type:"zoomend"}),d=null)}function s(){function n(){a=1,u(ao.mouse(i),h),c(o)}function r(){s.on(q,null).on(T,null),p(a),f(o)}var i=this,o=D.of(i,arguments),a=0,s=ao.select(t(i)).on(q,n).on(T,r),h=e(ao.mouse(i)),p=W(i);Il.call(i),l(o)}function h(){function n(){var n=ao.touches(g);return p=k.k,n.forEach(function(n){n.identifier in d&&(d[n.identifier]=e(n))}),n}function t(){var t=ao.event.target;ao.select(t).on(x,r).on(b,a),_.push(t);for(var e=ao.event.changedTouches,i=0,u=e.length;u>i;++i)d[e[i].identifier]=null;var l=n(),c=Date.now();if(1===l.length){if(500>c-M){var f=l[0];o(g,f,d[f.identifier],Math.floor(Math.log(k.k)/Math.LN2)+1),S()}M=c}else if(l.length>1){var f=l[0],s=l[1],h=f[0]-s[0],p=f[1]-s[1];y=h*h+p*p}}function r(){var n,t,e,r,o=ao.touches(g);Il.call(g);for(var a=0,l=o.length;l>a;++a,r=null)if(e=o[a],r=d[e.identifier]){if(t)break;n=e,t=r}if(r){var f=(f=e[0]-n[0])*f+(f=e[1]-n[1])*f,s=y&&Math.sqrt(f/y);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+r[0])/2,(t[1]+r[1])/2],i(s*p)}M=null,u(n,t),c(v)}function a(){if(ao.event.touches.length){for(var t=ao.event.changedTouches,e=0,r=t.length;r>e;++e)delete d[t[e].identifier];for(var i in d)return void n()}ao.selectAll(_).on(m,null),w.on(L,s).on(R,h),N(),f(v)}var p,g=this,v=D.of(g,arguments),d={},y=0,m=".zoom-"+ao.event.changedTouches[0].identifier,x="touchmove"+m,b="touchend"+m,_=[],w=ao.select(g),N=W(g);t(),l(v),w.on(L,null).on(R,t)}function p(){var n=D.of(this,arguments);m?clearTimeout(m):(Il.call(this),v=e(d=y||ao.mouse(this)),l(n)),m=setTimeout(function(){m=null,f(n)},50),S(),i(Math.pow(2,.002*Bo())*k.k),u(d,v),c(n)}function g(){var n=ao.mouse(this),t=Math.log(k.k)/Math.LN2;o(this,n,e(n),ao.event.shiftKey?Math.ceil(t)-1:Math.floor(t)+1)}var v,d,y,m,M,x,b,_,w,k={x:0,y:0,k:1},E=[960,500],A=Jo,C=250,z=0,L="mousedown.zoom",q="mousemove.zoom",T="mouseup.zoom",R="touchstart.zoom",D=N(n,"zoomstart","zoom","zoomend");return Wo||(Wo="onwheel"in fo?(Bo=function(){return-ao.event.deltaY*(ao.event.deltaMode?120:1)},"wheel"):"onmousewheel"in fo?(Bo=function(){return ao.event.wheelDelta},"mousewheel"):(Bo=function(){return-ao.event.detail},"MozMousePixelScroll")),n.event=function(n){n.each(function(){var n=D.of(this,arguments),t=k;Hl?ao.select(this).transition().each("start.zoom",function(){k=this.__chart__||{x:0,y:0,k:1},l(n)}).tween("zoom:zoom",function(){var e=E[0],r=E[1],i=d?d[0]:e/2,u=d?d[1]:r/2,o=ao.interpolateZoom([(i-k.x)/k.k,(u-k.y)/k.k,e/k.k],[(i-t.x)/t.k,(u-t.y)/t.k,e/t.k]);return function(t){var r=o(t),a=e/r[2];this.__chart__=k={x:i-r[0]*a,y:u-r[1]*a,k:a},c(n)}}).each("interrupt.zoom",function(){f(n)}).each("end.zoom",function(){f(n)}):(this.__chart__=k,l(n),c(n),f(n))})},n.translate=function(t){return arguments.length?(k={x:+t[0],y:+t[1],k:k.k},a(),n):[k.x,k.y]},n.scale=function(t){return arguments.length?(k={x:k.x,y:k.y,k:null},i(+t),a(),n):k.k},n.scaleExtent=function(t){return arguments.length?(A=null==t?Jo:[+t[0],+t[1]],n):A},n.center=function(t){return arguments.length?(y=t&&[+t[0],+t[1]],n):y},n.size=function(t){return arguments.length?(E=t&&[+t[0],+t[1]],n):E},n.duration=function(t){return arguments.length?(C=+t,n):C},n.x=function(t){return arguments.length?(b=t,x=t.copy(),k={x:0,y:0,k:1},n):b},n.y=function(t){return arguments.length?(w=t,_=t.copy(),k={x:0,y:0,k:1},n):w},ao.rebind(n,D,"on")};var Bo,Wo,Jo=[0,1/0];ao.color=an,an.prototype.toString=function(){return this.rgb()+""},ao.hsl=ln;var Go=ln.prototype=new an;Go.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),new ln(this.h,this.s,this.l/n)},Go.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),new ln(this.h,this.s,n*this.l)},Go.rgb=function(){return cn(this.h,this.s,this.l)},ao.hcl=fn;var Ko=fn.prototype=new an;Ko.brighter=function(n){return new fn(this.h,this.c,Math.min(100,this.l+Qo*(arguments.length?n:1)))},Ko.darker=function(n){return new fn(this.h,this.c,Math.max(0,this.l-Qo*(arguments.length?n:1)))},Ko.rgb=function(){return sn(this.h,this.c,this.l).rgb()},ao.lab=hn;var Qo=18,na=.95047,ta=1,ea=1.08883,ra=hn.prototype=new an;ra.brighter=function(n){return new hn(Math.min(100,this.l+Qo*(arguments.length?n:1)),this.a,this.b)},ra.darker=function(n){return new hn(Math.max(0,this.l-Qo*(arguments.length?n:1)),this.a,this.b)},ra.rgb=function(){return pn(this.l,this.a,this.b)},ao.rgb=mn;var ia=mn.prototype=new an;ia.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,i=30;return t||e||r?(t&&i>t&&(t=i),e&&i>e&&(e=i),r&&i>r&&(r=i),new mn(Math.min(255,t/n),Math.min(255,e/n),Math.min(255,r/n))):new mn(i,i,i)},ia.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),new mn(n*this.r,n*this.g,n*this.b)},ia.hsl=function(){return wn(this.r,this.g,this.b)},ia.toString=function(){return"#"+bn(this.r)+bn(this.g)+bn(this.b)};var ua=ao.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});ua.forEach(function(n,t){ua.set(n,Mn(t))}),ao.functor=En,ao.xhr=An(m),ao.dsv=function(n,t){function e(n,e,u){arguments.length<3&&(u=e,e=null);var o=Cn(n,t,null==e?r:i(e),u);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:i(n)):e},o}function r(n){return e.parse(n.responseText)}function i(n){return function(t){return e.parse(t.responseText,n)}}function u(t){return t.map(o).join(n)}function o(n){return a.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var a=new RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var i=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(i(n),e)}:i})},e.parseRows=function(n,t){function e(){if(f>=c)return o;if(i)return i=!1,u;var t=f;if(34===n.charCodeAt(t)){for(var e=t;e++<c;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}f=e+2;var r=n.charCodeAt(e+1);return 13===r?(i=!0,10===n.charCodeAt(e+2)&&++f):10===r&&(i=!0),n.slice(t+1,e).replace(/""/g,'"')}for(;c>f;){var r=n.charCodeAt(f++),a=1;if(10===r)i=!0;else if(13===r)i=!0,10===n.charCodeAt(f)&&(++f,++a);else if(r!==l)continue;return n.slice(t,f-a)}return n.slice(t)}for(var r,i,u={},o={},a=[],c=n.length,f=0,s=0;(r=e())!==o;){for(var h=[];r!==u&&r!==o;)h.push(r),r=e();t&&null==(h=t(h,s++))||a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new y,i=[];return t.forEach(function(n){for(var t in n)r.has(t)||i.push(r.add(t))}),[i.map(o).join(n)].concat(t.map(function(t){return i.map(function(n){return o(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(u).join("\n")},e},ao.csv=ao.dsv(",","text/csv"),ao.tsv=ao.dsv("    ","text/tab-separated-values");var oa,aa,la,ca,fa=this[x(this,"requestAnimationFrame")]||function(n){setTimeout(n,17)};ao.timer=function(){qn.apply(this,arguments)},ao.timer.flush=function(){Rn(),Dn()},ao.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)};var sa=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(Un);ao.formatPrefix=function(n,t){var e=0;return(n=+n)&&(0>n&&(n*=-1),t&&(n=ao.round(n,Pn(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((e-1)/3)))),sa[8+e/3]};var ha=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,pa=ao.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=ao.round(n,Pn(n,t))).toFixed(Math.max(0,Math.min(20,Pn(n*(1+1e-15),t))))}}),ga=ao.time={},va=Date;Hn.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){da.setUTCDate.apply(this._,arguments)},setDay:function(){da.setUTCDay.apply(this._,arguments)},setFullYear:function(){da.setUTCFullYear.apply(this._,arguments)},setHours:function(){da.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){da.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){da.setUTCMinutes.apply(this._,arguments)},setMonth:function(){da.setUTCMonth.apply(this._,arguments)},setSeconds:function(){da.setUTCSeconds.apply(this._,arguments)},setTime:function(){da.setTime.apply(this._,arguments)}};var da=Date.prototype;ga.year=On(function(n){return n=ga.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),ga.years=ga.year.range,ga.years.utc=ga.year.utc.range,ga.day=On(function(n){var t=new va(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),ga.days=ga.day.range,ga.days.utc=ga.day.utc.range,ga.dayOfYear=function(n){var t=ga.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(n,t){t=7-t;var e=ga[n]=On(function(n){return(n=ga.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=ga.year(n).getDay();return Math.floor((ga.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});ga[n+"s"]=e.range,ga[n+"s"].utc=e.utc.range,ga[n+"OfYear"]=function(n){var e=ga.year(n).getDay();return Math.floor((ga.dayOfYear(n)+(e+t)%7)/7)}}),ga.week=ga.sunday,ga.weeks=ga.sunday.range,ga.weeks.utc=ga.sunday.utc.range,ga.weekOfYear=ga.sundayOfYear;var ya={"-":"",_:" ",0:"0"},ma=/^\s*\d+/,Ma=/^%/;ao.locale=function(n){return{numberFormat:jn(n),timeFormat:Yn(n)}};var xa=ao.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});ao.format=xa.numberFormat,ao.geo={},ft.prototype={s:0,t:0,add:function(n){st(n,this.t,ba),st(ba.s,this.s,this),this.s?this.t+=ba.t:this.s=ba.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var ba=new ft;ao.geo.stream=function(n,t){n&&_a.hasOwnProperty(n.type)?_a[n.type](n,t):ht(n,t)};var _a={Feature:function(n,t){ht(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,i=e.length;++r<i;)ht(e[r].geometry,t)}},wa={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){pt(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)pt(e[r],t,0)},Polygon:function(n,t){gt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)gt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,i=e.length;++r<i;)ht(e[r],t)}};ao.geo.area=function(n){return Sa=0,ao.geo.stream(n,Na),Sa};var Sa,ka=new ft,Na={sphere:function(){Sa+=4*Fo},point:b,lineStart:b,lineEnd:b,polygonStart:function(){ka.reset(),Na.lineStart=vt},polygonEnd:function(){var n=2*ka;Sa+=0>n?4*Fo+n:n,Na.lineStart=Na.lineEnd=Na.point=b}};ao.geo.bounds=function(){function n(n,t){M.push(x=[f=n,h=n]),s>t&&(s=t),t>p&&(p=t)}function t(t,e){var r=dt([t*Yo,e*Yo]);if(y){var i=mt(y,r),u=[i[1],-i[0],0],o=mt(u,i);bt(o),o=_t(o);var l=t-g,c=l>0?1:-1,v=o[0]*Zo*c,d=xo(l)>180;if(d^(v>c*g&&c*t>v)){var m=o[1]*Zo;m>p&&(p=m)}else if(v=(v+360)%360-180,d^(v>c*g&&c*t>v)){var m=-o[1]*Zo;s>m&&(s=m)}else s>e&&(s=e),e>p&&(p=e);d?g>t?a(f,t)>a(f,h)&&(h=t):a(t,h)>a(f,h)&&(f=t):h>=f?(f>t&&(f=t),t>h&&(h=t)):t>g?a(f,t)>a(f,h)&&(h=t):a(t,h)>a(f,h)&&(f=t)}else n(t,e);y=r,g=t}function e(){b.point=t}function r(){x[0]=f,x[1]=h,b.point=n,y=null}function i(n,e){if(y){var r=n-g;m+=xo(r)>180?r+(r>0?360:-360):r}else v=n,d=e;Na.point(n,e),t(n,e)}function u(){Na.lineStart()}function o(){i(v,d),Na.lineEnd(),xo(m)>Uo&&(f=-(h=180)),x[0]=f,x[1]=h,y=null}function a(n,t){return(t-=n)<0?t+360:t}function l(n,t){return n[0]-t[0]}function c(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var f,s,h,p,g,v,d,y,m,M,x,b={point:n,lineStart:e,lineEnd:r,polygonStart:function(){b.point=i,b.lineStart=u,b.lineEnd=o,m=0,Na.polygonStart()},polygonEnd:function(){Na.polygonEnd(),b.point=n,b.lineStart=e,b.lineEnd=r,0>ka?(f=-(h=180),s=-(p=90)):m>Uo?p=90:-Uo>m&&(s=-90),x[0]=f,x[1]=h}};return function(n){p=h=-(f=s=1/0),M=[],ao.geo.stream(n,b);var t=M.length;if(t){M.sort(l);for(var e,r=1,i=M[0],u=[i];t>r;++r)e=M[r],c(e[0],i)||c(e[1],i)?(a(i[0],e[1])>a(i[0],i[1])&&(i[1]=e[1]),a(e[0],i[1])>a(i[0],i[1])&&(i[0]=e[0])):u.push(i=e);for(var o,e,g=-(1/0),t=u.length-1,r=0,i=u[t];t>=r;i=e,++r)e=u[r],(o=a(i[1],e[0]))>g&&(g=o,f=e[0],h=i[1])}return M=x=null,f===1/0||s===1/0?[[NaN,NaN],[NaN,NaN]]:[[f,s],[h,p]]}}(),ao.geo.centroid=function(n){Ea=Aa=Ca=za=La=qa=Ta=Ra=Da=Pa=Ua=0,ao.geo.stream(n,ja);var t=Da,e=Pa,r=Ua,i=t*t+e*e+r*r;return jo>i&&(t=qa,e=Ta,r=Ra,Uo>Aa&&(t=Ca,e=za,r=La),i=t*t+e*e+r*r,jo>i)?[NaN,NaN]:[Math.atan2(e,t)*Zo,tn(r/Math.sqrt(i))*Zo]};var Ea,Aa,Ca,za,La,qa,Ta,Ra,Da,Pa,Ua,ja={sphere:b,point:St,lineStart:Nt,lineEnd:Et,polygonStart:function(){ja.lineStart=At},polygonEnd:function(){ja.lineStart=Nt}},Fa=Rt(zt,jt,Ht,[-Fo,-Fo/2]),Ha=1e9;ao.geo.clipExtent=function(){var n,t,e,r,i,u,o={stream:function(n){return i&&(i.valid=!1),i=u(n),i.valid=!0,i},extent:function(a){return arguments.length?(u=Zt(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),i&&(i.valid=!1,i=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(ao.geo.conicEqualArea=function(){return Vt(Xt)}).raw=Xt,ao.geo.albers=function(){return ao.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},ao.geo.albersUsa=function(){function n(n){var u=n[0],o=n[1];return t=null,e(u,o),t||(r(u,o),t)||i(u,o),t}var t,e,r,i,u=ao.geo.albers(),o=ao.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=ao.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=u.scale(),e=u.translate(),r=(n[0]-e[0])/t,i=(n[1]-e[1])/t;return(i>=.12&&.234>i&&r>=-.425&&-.214>r?o:i>=.166&&.234>i&&r>=-.214&&-.115>r?a:u).invert(n)},n.stream=function(n){var t=u.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,i){t.point(n,i),e.point(n,i),r.point(n,i)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(u.precision(t),o.precision(t),a.precision(t),n):u.precision()},n.scale=function(t){return arguments.length?(u.scale(t),o.scale(.35*t),a.scale(t),n.translate(u.translate())):u.scale()},n.translate=function(t){if(!arguments.length)return u.translate();var c=u.scale(),f=+t[0],s=+t[1];return e=u.translate(t).clipExtent([[f-.455*c,s-.238*c],[f+.455*c,s+.238*c]]).stream(l).point,r=o.translate([f-.307*c,s+.201*c]).clipExtent([[f-.425*c+Uo,s+.12*c+Uo],[f-.214*c-Uo,s+.234*c-Uo]]).stream(l).point,i=a.translate([f-.205*c,s+.212*c]).clipExtent([[f-.214*c+Uo,s+.166*c+Uo],[f-.115*c-Uo,s+.234*c-Uo]]).stream(l).point,n},n.scale(1070)};var Oa,Ia,Ya,Za,Va,Xa,$a={point:b,lineStart:b,lineEnd:b,polygonStart:function(){Ia=0,$a.lineStart=$t},polygonEnd:function(){$a.lineStart=$a.lineEnd=$a.point=b,Oa+=xo(Ia/2)}},Ba={point:Bt,lineStart:b,lineEnd:b,polygonStart:b,polygonEnd:b},Wa={point:Gt,lineStart:Kt,lineEnd:Qt,polygonStart:function(){Wa.lineStart=ne},polygonEnd:function(){Wa.point=Gt,Wa.lineStart=Kt,Wa.lineEnd=Qt}};ao.geo.path=function(){function n(n){return n&&("function"==typeof a&&u.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=i(u)),ao.geo.stream(n,o)),u.result()}function t(){return o=null,n}var e,r,i,u,o,a=4.5;return n.area=function(n){return Oa=0,ao.geo.stream(n,i($a)),Oa},n.centroid=function(n){return Ca=za=La=qa=Ta=Ra=Da=Pa=Ua=0,ao.geo.stream(n,i(Wa)),Ua?[Da/Ua,Pa/Ua]:Ra?[qa/Ra,Ta/Ra]:La?[Ca/La,za/La]:[NaN,NaN]},n.bounds=function(n){return Va=Xa=-(Ya=Za=1/0),ao.geo.stream(n,i(Ba)),[[Ya,Za],[Va,Xa]]},n.projection=function(n){return arguments.length?(i=(e=n)?n.stream||re(n):m,t()):e},n.context=function(n){return arguments.length?(u=null==(r=n)?new Wt:new te(n),"function"!=typeof a&&u.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(u.pointRadius(+t),+t),n):a},n.projection(ao.geo.albersUsa()).context(null)},ao.geo.transform=function(n){return{stream:function(t){var e=new ie(t);for(var r in n)e[r]=n[r];return e}}},ie.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},ao.geo.projection=oe,ao.geo.projectionMutator=ae,(ao.geo.equirectangular=function(){return oe(ce)}).raw=ce.invert=ce,ao.geo.rotation=function(n){function t(t){return t=n(t[0]*Yo,t[1]*Yo),t[0]*=Zo,t[1]*=Zo,t}return n=se(n[0]%360*Yo,n[1]*Yo,n.length>2?n[2]*Yo:0),t.invert=function(t){return t=n.invert(t[0]*Yo,t[1]*Yo),t[0]*=Zo,t[1]*=Zo,t},t},fe.invert=ce,ao.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=se(-n[0]*Yo,-n[1]*Yo,0).invert,i=[];return e(null,null,1,{point:function(n,e){i.push(n=t(n,e)),n[0]*=Zo,n[1]*=Zo}}),{type:"Polygon",coordinates:[i]}}var t,e,r=[0,0],i=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=ve((t=+r)*Yo,i*Yo),n):t},n.precision=function(r){return arguments.length?(e=ve(t*Yo,(i=+r)*Yo),n):i},n.angle(90)},ao.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Yo,i=n[1]*Yo,u=t[1]*Yo,o=Math.sin(r),a=Math.cos(r),l=Math.sin(i),c=Math.cos(i),f=Math.sin(u),s=Math.cos(u);return Math.atan2(Math.sqrt((e=s*o)*e+(e=c*f-l*s*a)*e),l*f+c*s*a)},ao.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return ao.range(Math.ceil(u/d)*d,i,d).map(h).concat(ao.range(Math.ceil(c/y)*y,l,y).map(p)).concat(ao.range(Math.ceil(r/g)*g,e,g).filter(function(n){return xo(n%d)>Uo}).map(f)).concat(ao.range(Math.ceil(a/v)*v,o,v).filter(function(n){return xo(n%y)>Uo}).map(s))}var e,r,i,u,o,a,l,c,f,s,h,p,g=10,v=g,d=90,y=360,m=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(u).concat(p(l).slice(1),h(i).reverse().slice(1),p(c).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(u=+t[0][0],i=+t[1][0],c=+t[0][1],l=+t[1][1],u>i&&(t=u,u=i,i=t),c>l&&(t=c,c=l,l=t),n.precision(m)):[[u,c],[i,l]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(m)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(d=+t[0],y=+t[1],n):[d,y]},n.minorStep=function(t){return arguments.length?(g=+t[0],v=+t[1],n):[g,v]},n.precision=function(t){return arguments.length?(m=+t,f=ye(a,o,90),s=me(r,e,m),h=ye(c,l,90),p=me(u,i,m),n):m},n.majorExtent([[-180,-90+Uo],[180,90-Uo]]).minorExtent([[-180,-80-Uo],[180,80+Uo]])},ao.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||i.apply(this,arguments)]}}var t,e,r=Me,i=xe;return n.distance=function(){return ao.geo.distance(t||r.apply(this,arguments),e||i.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(i=t,e="function"==typeof t?null:t,n):i},n.precision=function(){return arguments.length?n:0},n},ao.geo.interpolate=function(n,t){return be(n[0]*Yo,n[1]*Yo,t[0]*Yo,t[1]*Yo)},ao.geo.length=function(n){return Ja=0,ao.geo.stream(n,Ga),Ja};var Ja,Ga={sphere:b,point:b,lineStart:_e,lineEnd:b,polygonStart:b,polygonEnd:b},Ka=we(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(ao.geo.azimuthalEqualArea=function(){return oe(Ka)}).raw=Ka;var Qa=we(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},m);(ao.geo.azimuthalEquidistant=function(){return oe(Qa)}).raw=Qa,(ao.geo.conicConformal=function(){return Vt(Se)}).raw=Se,(ao.geo.conicEquidistant=function(){return Vt(ke)}).raw=ke;var nl=we(function(n){return 1/n},Math.atan);(ao.geo.gnomonic=function(){return oe(nl)}).raw=nl,Ne.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Io]},(ao.geo.mercator=function(){return Ee(Ne)}).raw=Ne;var tl=we(function(){return 1},Math.asin);(ao.geo.orthographic=function(){return oe(tl)}).raw=tl;var el=we(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(ao.geo.stereographic=function(){return oe(el)}).raw=el,Ae.invert=function(n,t){return[-t,2*Math.atan(Math.exp(n))-Io]},(ao.geo.transverseMercator=function(){var n=Ee(Ae),t=n.center,e=n.rotate;return n.center=function(n){return n?t([-n[1],n[0]]):(n=t(),[n[1],-n[0]])},n.rotate=function(n){return n?e([n[0],n[1],n.length>2?n[2]+90:90]):(n=e(),[n[0],n[1],n[2]-90])},e([0,0,90])}).raw=Ae,ao.geom={},ao.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,i=En(e),u=En(r),o=n.length,a=[],l=[];for(t=0;o>t;t++)a.push([+i.call(this,n[t],t),+u.call(this,n[t],t),t]);for(a.sort(qe),t=0;o>t;t++)l.push([a[t][0],-a[t][1]]);var c=Le(a),f=Le(l),s=f[0]===c[0],h=f[f.length-1]===c[c.length-1],p=[];for(t=c.length-1;t>=0;--t)p.push(n[a[c[t]][2]]);for(t=+s;t<f.length-h;++t)p.push(n[a[f[t]][2]]);return p}var e=Ce,r=ze;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},ao.geom.polygon=function(n){return ko(n,rl),n};var rl=ao.geom.polygon.prototype=[];rl.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],i=0;++t<e;)n=r,r=this[t],i+=n[1]*r[0]-n[0]*r[1];return.5*i},rl.centroid=function(n){var t,e,r=-1,i=this.length,u=0,o=0,a=this[i-1];for(arguments.length||(n=-1/(6*this.area()));++r<i;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],u+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[u*n,o*n]},rl.clip=function(n){for(var t,e,r,i,u,o,a=De(n),l=-1,c=this.length-De(this),f=this[c-1];++l<c;){for(t=n.slice(),n.length=0,i=this[l],u=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],Te(o,f,i)?(Te(u,f,i)||n.push(Re(u,o,f,i)),n.push(o)):Te(u,f,i)&&n.push(Re(u,o,f,i)),u=o;a&&n.push(n[0]),f=i}return n};var il,ul,ol,al,ll,cl=[],fl=[];Ye.prototype.prepare=function(){for(var n,t=this.edges,e=t.length;e--;)n=t[e].edge,n.b&&n.a||t.splice(e,1);return t.sort(Ve),t.length},tr.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},er.prototype={insert:function(n,t){var e,r,i;if(n){if(t.P=n,t.N=n.N,n.N&&(n.N.P=t),n.N=t,n.R){for(n=n.R;n.L;)n=n.L;n.L=t}else n.R=t;e=n}else this._?(n=or(this._),t.P=null,t.N=n,n.P=n.L=t,e=n):(t.P=t.N=null,this._=t,e=null);for(t.L=t.R=null,t.U=e,t.C=!0,n=t;e&&e.C;)r=e.U,e===r.L?(i=r.R,i&&i.C?(e.C=i.C=!1,r.C=!0,n=r):(n===e.R&&(ir(this,e),n=e,e=n.U),e.C=!1,r.C=!0,ur(this,r))):(i=r.L,i&&i.C?(e.C=i.C=!1,r.C=!0,n=r):(n===e.L&&(ur(this,e),n=e,e=n.U),e.C=!1,r.C=!0,ir(this,r))),e=n.U;this._.C=!1},remove:function(n){n.N&&(n.N.P=n.P),n.P&&(n.P.N=n.N),n.N=n.P=null;var t,e,r,i=n.U,u=n.L,o=n.R;if(e=u?o?or(o):u:o,i?i.L===n?i.L=e:i.R=e:this._=e,u&&o?(r=e.C,e.C=n.C,e.L=u,u.U=e,e!==o?(i=e.U,e.U=n.U,n=e.R,i.L=n,e.R=o,o.U=e):(e.U=i,i=e,n=e.R)):(r=n.C,n=e),n&&(n.U=i),!r){if(n&&n.C)return void(n.C=!1);do{if(n===this._)break;if(n===i.L){if(t=i.R,t.C&&(t.C=!1,i.C=!0,ir(this,i),t=i.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,ur(this,t),t=i.R),t.C=i.C,i.C=t.R.C=!1,ir(this,i),n=this._;break}}else if(t=i.L,t.C&&(t.C=!1,i.C=!0,ur(this,i),t=i.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,ir(this,t),t=i.L),t.C=i.C,i.C=t.L.C=!1,ur(this,i),n=this._;break}t.C=!0,n=i,i=i.U}while(!n.C);n&&(n.C=!1)}}},ao.geom.voronoi=function(n){function t(n){var t=new Array(n.length),r=a[0][0],i=a[0][1],u=a[1][0],o=a[1][1];return ar(e(n),a).cells.forEach(function(e,a){var l=e.edges,c=e.site,f=t[a]=l.length?l.map(function(n){var t=n.start();return[t.x,t.y]}):c.x>=r&&c.x<=u&&c.y>=i&&c.y<=o?[[r,o],[u,o],[u,i],[r,i]]:[];f.point=n[a]}),t}function e(n){return n.map(function(n,t){return{x:Math.round(u(n,t)/Uo)*Uo,y:Math.round(o(n,t)/Uo)*Uo,i:t}})}var r=Ce,i=ze,u=r,o=i,a=sl;return n?t(n):(t.links=function(n){return ar(e(n)).edges.filter(function(n){return n.l&&n.r}).map(function(t){return{source:n[t.l.i],target:n[t.r.i]}})},t.triangles=function(n){var t=[];return ar(e(n)).cells.forEach(function(e,r){for(var i,u,o=e.site,a=e.edges.sort(Ve),l=-1,c=a.length,f=a[c-1].edge,s=f.l===o?f.r:f.l;++l<c;)i=f,u=s,f=a[l].edge,s=f.l===o?f.r:f.l,r<u.i&&r<s.i&&cr(o,u,s)<0&&t.push([n[r],n[u.i],n[s.i]])}),t},t.x=function(n){return arguments.length?(u=En(r=n),t):r},t.y=function(n){return arguments.length?(o=En(i=n),t):i},t.clipExtent=function(n){return arguments.length?(a=null==n?sl:n,t):a===sl?null:a},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):a===sl?null:a&&a[1]},t)};var sl=[[-1e6,-1e6],[1e6,1e6]];ao.geom.delaunay=function(n){return ao.geom.voronoi().triangles(n)},ao.geom.quadtree=function(n,t,e,r,i){function u(n){function u(n,t,e,r,i,u,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var l=n.x,f=n.y;if(null!=l)if(xo(l-e)+xo(f-r)<.01)c(n,t,e,r,i,u,o,a);else{var s=n.point;n.x=n.y=n.point=null,c(n,s,l,f,i,u,o,a),c(n,t,e,r,i,u,o,a)}else n.x=e,n.y=r,n.point=t}else c(n,t,e,r,i,u,o,a)}function c(n,t,e,r,i,o,a,l){var c=.5*(i+a),f=.5*(o+l),s=e>=c,h=r>=f,p=h<<1|s;n.leaf=!1,n=n.nodes[p]||(n.nodes[p]=hr()),s?i=c:a=c,h?o=f:l=f,u(n,t,e,r,i,o,a,l)}var f,s,h,p,g,v,d,y,m,M=En(a),x=En(l);if(null!=t)v=t,d=e,y=r,m=i;else if(y=m=-(v=d=1/0),s=[],h=[],g=n.length,o)for(p=0;g>p;++p)f=n[p],f.x<v&&(v=f.x),f.y<d&&(d=f.y),f.x>y&&(y=f.x),f.y>m&&(m=f.y),s.push(f.x),h.push(f.y);else for(p=0;g>p;++p){var b=+M(f=n[p],p),_=+x(f,p);v>b&&(v=b),d>_&&(d=_),b>y&&(y=b),_>m&&(m=_),s.push(b),h.push(_)}var w=y-v,S=m-d;w>S?m=d+w:y=v+S;var k=hr();if(k.add=function(n){u(k,n,+M(n,++p),+x(n,p),v,d,y,m)},k.visit=function(n){pr(n,k,v,d,y,m)},k.find=function(n){return gr(k,n[0],n[1],v,d,y,m)},p=-1,null==t){for(;++p<g;)u(k,n[p],s[p],h[p],v,d,y,m);--p}else n.forEach(k.add);return s=h=n=f=null,k}var o,a=Ce,l=ze;return(o=arguments.length)?(a=fr,l=sr,3===o&&(i=e,r=t,e=t=0),u(n)):(u.x=function(n){return arguments.length?(a=n,u):a},u.y=function(n){return arguments.length?(l=n,u):l},u.extent=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],i=+n[1][1]),u):null==t?null:[[t,e],[r,i]]},u.size=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=e=0,r=+n[0],i=+n[1]),u):null==t?null:[r-t,i-e]},u)},ao.interpolateRgb=vr,ao.interpolateObject=dr,ao.interpolateNumber=yr,ao.interpolateString=mr;var hl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,pl=new RegExp(hl.source,"g");ao.interpolate=Mr,ao.interpolators=[function(n,t){var e=typeof t;return("string"===e?ua.has(t.toLowerCase())||/^(#|rgb\(|hsl\()/i.test(t)?vr:mr:t instanceof an?vr:Array.isArray(t)?xr:"object"===e&&isNaN(t)?dr:yr)(n,t)}],ao.interpolateArray=xr;var gl=function(){return m},vl=ao.map({linear:gl,poly:Er,quad:function(){return Sr},cubic:function(){return kr},sin:function(){return Ar},exp:function(){return Cr},circle:function(){return zr},elastic:Lr,back:qr,bounce:function(){return Tr}}),dl=ao.map({"in":m,out:_r,"in-out":wr,"out-in":function(n){return wr(_r(n))}});ao.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.slice(0,t):n,r=t>=0?n.slice(t+1):"in";return e=vl.get(e)||gl,r=dl.get(r)||m,br(r(e.apply(null,lo.call(arguments,1))))},ao.interpolateHcl=Rr,ao.interpolateHsl=Dr,ao.interpolateLab=Pr,ao.interpolateRound=Ur,ao.transform=function(n){var t=fo.createElementNS(ao.ns.prefix.svg,"g");return(ao.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new jr(e?e.matrix:yl)})(n)},jr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var yl={a:1,b:0,c:0,d:1,e:0,f:0};ao.interpolateTransform=$r,ao.layout={},ao.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Jr(n[e]));return t}},ao.layout.chord=function(){function n(){var n,c,s,h,p,g={},v=[],d=ao.range(u),y=[];for(e=[],r=[],n=0,h=-1;++h<u;){for(c=0,p=-1;++p<u;)c+=i[h][p];v.push(c),y.push(ao.range(u)),n+=c}for(o&&d.sort(function(n,t){return o(v[n],v[t])}),a&&y.forEach(function(n,t){n.sort(function(n,e){return a(i[t][n],i[t][e])})}),n=(Ho-f*u)/n,c=0,h=-1;++h<u;){for(s=c,p=-1;++p<u;){var m=d[h],M=y[m][p],x=i[m][M],b=c,_=c+=x*n;g[m+"-"+M]={index:m,subindex:M,startAngle:b,endAngle:_,value:x}}r[m]={index:m,startAngle:s,endAngle:c,value:v[m]},c+=f}for(h=-1;++h<u;)for(p=h-1;++p<u;){var w=g[h+"-"+p],S=g[p+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}l&&t()}function t(){e.sort(function(n,t){return l((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,i,u,o,a,l,c={},f=0;return c.matrix=function(n){return arguments.length?(u=(i=n)&&i.length,e=r=null,c):i},c.padding=function(n){return arguments.length?(f=n,e=r=null,c):f},c.sortGroups=function(n){return arguments.length?(o=n,e=r=null,c):o},c.sortSubgroups=function(n){return arguments.length?(a=n,e=null,c):a},c.sortChords=function(n){return arguments.length?(l=n,e&&t(),c):l},c.chords=function(){return e||n(),e},c.groups=function(){return r||n(),r},c},ao.layout.force=function(){function n(n){return function(t,e,r,i){if(t.point!==n){var u=t.cx-n.x,o=t.cy-n.y,a=i-e,l=u*u+o*o;if(l>a*a/y){if(v>l){var c=t.charge/l;n.px-=u*c,n.py-=o*c}return!0}if(t.point&&l&&v>l){var c=t.pointCharge/l;n.px-=u*c,n.py-=o*c}}return!t.charge}}function t(n){n.px=ao.event.x,n.py=ao.event.y,l.resume()}var e,r,i,u,o,a,l={},c=ao.dispatch("start","tick","end"),f=[1,1],s=.9,h=ml,p=Ml,g=-30,v=xl,d=.1,y=.64,M=[],x=[];return l.tick=function(){if((i*=.99)<.005)return e=null,c.end({type:"end",alpha:i=0}),!0;var t,r,l,h,p,v,y,m,b,_=M.length,w=x.length;for(r=0;w>r;++r)l=x[r],h=l.source,p=l.target,m=p.x-h.x,b=p.y-h.y,(v=m*m+b*b)&&(v=i*o[r]*((v=Math.sqrt(v))-u[r])/v,m*=v,b*=v,p.x-=m*(y=h.weight+p.weight?h.weight/(h.weight+p.weight):.5),p.y-=b*y,h.x+=m*(y=1-y),h.y+=b*y);if((y=i*d)&&(m=f[0]/2,b=f[1]/2,r=-1,y))for(;++r<_;)l=M[r],l.x+=(m-l.x)*y,l.y+=(b-l.y)*y;if(g)for(ri(t=ao.geom.quadtree(M),i,a),r=-1;++r<_;)(l=M[r]).fixed||t.visit(n(l));for(r=-1;++r<_;)l=M[r],l.fixed?(l.x=l.px,l.y=l.py):(l.x-=(l.px-(l.px=l.x))*s,l.y-=(l.py-(l.py=l.y))*s);c.tick({type:"tick",alpha:i})},l.nodes=function(n){return arguments.length?(M=n,l):M},l.links=function(n){return arguments.length?(x=n,l):x},l.size=function(n){return arguments.length?(f=n,l):f},l.linkDistance=function(n){return arguments.length?(h="function"==typeof n?n:+n,l):h},l.distance=l.linkDistance,l.linkStrength=function(n){return arguments.length?(p="function"==typeof n?n:+n,l):p},l.friction=function(n){return arguments.length?(s=+n,l):s},l.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,l):g},l.chargeDistance=function(n){return arguments.length?(v=n*n,l):Math.sqrt(v)},l.gravity=function(n){return arguments.length?(d=+n,l):d},l.theta=function(n){return arguments.length?(y=n*n,l):Math.sqrt(y)},l.alpha=function(n){return arguments.length?(n=+n,i?n>0?i=n:(e.c=null,e.t=NaN,e=null,c.end({type:"end",alpha:i=0})):n>0&&(c.start({type:"start",alpha:i=n}),e=qn(l.tick)),l):i},l.start=function(){function n(n,r){if(!e){for(e=new Array(i),l=0;i>l;++l)e[l]=[];for(l=0;c>l;++l){var u=x[l];e[u.source.index].push(u.target),e[u.target.index].push(u.source)}}for(var o,a=e[t],l=-1,f=a.length;++l<f;)if(!isNaN(o=a[l][n]))return o;return Math.random()*r}var t,e,r,i=M.length,c=x.length,s=f[0],v=f[1];for(t=0;i>t;++t)(r=M[t]).index=t,r.weight=0;for(t=0;c>t;++t)r=x[t],"number"==typeof r.source&&(r.source=M[r.source]),"number"==typeof r.target&&(r.target=M[r.target]),++r.source.weight,++r.target.weight;for(t=0;i>t;++t)r=M[t],isNaN(r.x)&&(r.x=n("x",s)),isNaN(r.y)&&(r.y=n("y",v)),isNaN(r.px)&&(r.px=r.x),isNaN(r.py)&&(r.py=r.y);if(u=[],"function"==typeof h)for(t=0;c>t;++t)u[t]=+h.call(this,x[t],t);else for(t=0;c>t;++t)u[t]=h;if(o=[],"function"==typeof p)for(t=0;c>t;++t)o[t]=+p.call(this,x[t],t);else for(t=0;c>t;++t)o[t]=p;if(a=[],"function"==typeof g)for(t=0;i>t;++t)a[t]=+g.call(this,M[t],t);else for(t=0;i>t;++t)a[t]=g;return l.resume()},l.resume=function(){return l.alpha(.1)},l.stop=function(){return l.alpha(0)},l.drag=function(){return r||(r=ao.behavior.drag().origin(m).on("dragstart.force",Qr).on("drag.force",t).on("dragend.force",ni)),arguments.length?void this.on("mouseover.force",ti).on("mouseout.force",ei).call(r):r},ao.rebind(l,c,"on")};var ml=20,Ml=1,xl=1/0;ao.layout.hierarchy=function(){function n(i){var u,o=[i],a=[];for(i.depth=0;null!=(u=o.pop());)if(a.push(u),(c=e.call(n,u,u.depth))&&(l=c.length)){for(var l,c,f;--l>=0;)o.push(f=c[l]),f.parent=u,f.depth=u.depth+1;r&&(u.value=0),u.children=c}else r&&(u.value=+r.call(n,u,u.depth)||0),delete u.children;return oi(i,function(n){var e,i;t&&(e=n.children)&&e.sort(t),r&&(i=n.parent)&&(i.value+=n.value)}),a}var t=ci,e=ai,r=li;return n.sort=function(e){return arguments.length?(t=e,n):t},n.children=function(t){return arguments.length?(e=t,n):e},n.value=function(t){return arguments.length?(r=t,n):r},n.revalue=function(t){return r&&(ui(t,function(n){n.children&&(n.value=0)}),oi(t,function(t){var e;t.children||(t.value=+r.call(n,t,t.depth)||0),(e=t.parent)&&(e.value+=t.value)})),t},n},ao.layout.partition=function(){function n(t,e,r,i){var u=t.children;if(t.x=e,t.y=t.depth*i,t.dx=r,t.dy=i,u&&(o=u.length)){var o,a,l,c=-1;for(r=t.value?r/t.value:0;++c<o;)n(a=u[c],e,l=a.value*r,i),e+=l}}function t(n){var e=n.children,r=0;if(e&&(i=e.length))for(var i,u=-1;++u<i;)r=Math.max(r,t(e[u]));return 1+r}function e(e,u){var o=r.call(this,e,u);return n(o[0],0,i[0],i[1]/t(o[0])),o}var r=ao.layout.hierarchy(),i=[1,1];return e.size=function(n){return arguments.length?(i=n,e):i},ii(e,r)},ao.layout.pie=function(){function n(o){var a,l=o.length,c=o.map(function(e,r){return+t.call(n,e,r)}),f=+("function"==typeof r?r.apply(this,arguments):r),s=("function"==typeof i?i.apply(this,arguments):i)-f,h=Math.min(Math.abs(s)/l,+("function"==typeof u?u.apply(this,arguments):u)),p=h*(0>s?-1:1),g=ao.sum(c),v=g?(s-l*p)/g:0,d=ao.range(l),y=[];return null!=e&&d.sort(e===bl?function(n,t){return c[t]-c[n]}:function(n,t){return e(o[n],o[t])}),d.forEach(function(n){y[n]={data:o[n],value:a=c[n],startAngle:f,endAngle:f+=a*v+p,padAngle:h}}),y}var t=Number,e=bl,r=0,i=Ho,u=0;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(i=t,n):i},n.padAngle=function(t){return arguments.length?(u=t,n):u},n};var bl={};ao.layout.stack=function(){function n(a,l){if(!(h=a.length))return a;var c=a.map(function(e,r){return t.call(n,e,r)}),f=c.map(function(t){return t.map(function(t,e){return[u.call(n,t,e),o.call(n,t,e)]})}),s=e.call(n,f,l);c=ao.permute(c,s),f=ao.permute(f,s);var h,p,g,v,d=r.call(n,f,l),y=c[0].length;for(g=0;y>g;++g)for(i.call(n,c[0][g],v=d[g],f[0][g][1]),p=1;h>p;++p)i.call(n,c[p][g],v+=f[p-1][g][1],f[p][g][1]);return a}var t=m,e=gi,r=vi,i=pi,u=si,o=hi;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:_l.get(t)||gi,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:wl.get(t)||vi,n):r},n.x=function(t){return arguments.length?(u=t,n):u},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(i=t,n):i},n};var _l=ao.map({"inside-out":function(n){var t,e,r=n.length,i=n.map(di),u=n.map(yi),o=ao.range(r).sort(function(n,t){return i[n]-i[t]}),a=0,l=0,c=[],f=[];for(t=0;r>t;++t)e=o[t],l>a?(a+=u[e],c.push(e)):(l+=u[e],f.push(e));return f.reverse().concat(c)},reverse:function(n){return ao.range(n.length).reverse()},"default":gi}),wl=ao.map({silhouette:function(n){var t,e,r,i=n.length,u=n[0].length,o=[],a=0,l=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;u>e;++e)l[e]=(a-o[e])/2;return l},wiggle:function(n){var t,e,r,i,u,o,a,l,c,f=n.length,s=n[0],h=s.length,p=[];for(p[0]=l=c=0,e=1;h>e;++e){for(t=0,i=0;f>t;++t)i+=n[t][e][1];for(t=0,u=0,a=s[e][0]-s[e-1][0];f>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;u+=o*n[t][e][1]}p[e]=l-=i?u/i*a:0,c>l&&(c=l)}for(e=0;h>e;++e)p[e]-=c;return p},expand:function(n){var t,e,r,i=n.length,u=n[0].length,o=1/i,a=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];if(r)for(t=0;i>t;t++)n[t][e][1]/=r;else for(t=0;i>t;t++)n[t][e][1]=o}for(e=0;u>e;++e)a[e]=0;return a},zero:vi});ao.layout.histogram=function(){function n(n,u){for(var o,a,l=[],c=n.map(e,this),f=r.call(this,c,u),s=i.call(this,f,c,u),u=-1,h=c.length,p=s.length-1,g=t?1:1/h;++u<p;)o=l[u]=[],o.dx=s[u+1]-(o.x=s[u]),o.y=0;if(p>0)for(u=-1;++u<h;)a=c[u],a>=f[0]&&a<=f[1]&&(o=l[ao.bisect(s,a,1,p)-1],o.y+=g,o.push(n[u]));return l}var t=!0,e=Number,r=bi,i=Mi;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=En(t),n):r},n.bins=function(t){return arguments.length?(i="number"==typeof t?function(n){return xi(n,t)}:En(t),n):i},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},ao.layout.pack=function(){function n(n,u){var o=e.call(this,n,u),a=o[0],l=i[0],c=i[1],f=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,oi(a,function(n){n.r=+f(n.value)}),oi(a,Ni),r){var s=r*(t?1:Math.max(2*a.r/l,2*a.r/c))/2;oi(a,function(n){n.r+=s}),oi(a,Ni),oi(a,function(n){n.r-=s})}return Ci(a,l/2,c/2,t?1:1/Math.max(2*a.r/l,2*a.r/c)),o}var t,e=ao.layout.hierarchy().sort(_i),r=0,i=[1,1];return n.size=function(t){return arguments.length?(i=t,n):i},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},ii(n,e)},ao.layout.tree=function(){function n(n,i){var f=o.call(this,n,i),s=f[0],h=t(s);if(oi(h,e),h.parent.m=-h.z,ui(h,r),c)ui(s,u);else{var p=s,g=s,v=s;ui(s,function(n){n.x<p.x&&(p=n),n.x>g.x&&(g=n),n.depth>v.depth&&(v=n)});var d=a(p,g)/2-p.x,y=l[0]/(g.x+a(g,p)/2+d),m=l[1]/(v.depth||1);ui(s,function(n){n.x=(n.x+d)*y,n.y=n.depth*m})}return f}function t(n){for(var t,e={A:null,children:[n]},r=[e];null!=(t=r.pop());)for(var i,u=t.children,o=0,a=u.length;a>o;++o)r.push((u[o]=i={_:u[o],parent:t,children:(i=u[o].children)&&i.slice()||[],A:null,a:null,z:0,m:0,c:0,s:0,t:null,i:o}).a=i);return e.children[0]}function e(n){var t=n.children,e=n.parent.children,r=n.i?e[n.i-1]:null;if(t.length){Di(n);var u=(t[0].z+t[t.length-1].z)/2;r?(n.z=r.z+a(n._,r._),n.m=n.z-u):n.z=u}else r&&(n.z=r.z+a(n._,r._));n.parent.A=i(n,r,n.parent.A||e[0])}function r(n){n._.x=n.z+n.parent.m,n.m+=n.parent.m}function i(n,t,e){if(t){for(var r,i=n,u=n,o=t,l=i.parent.children[0],c=i.m,f=u.m,s=o.m,h=l.m;o=Ti(o),i=qi(i),o&&i;)l=qi(l),u=Ti(u),u.a=n,r=o.z+s-i.z-c+a(o._,i._),r>0&&(Ri(Pi(o,n,e),n,r),c+=r,f+=r),s+=o.m,c+=i.m,h+=l.m,f+=u.m;o&&!Ti(u)&&(u.t=o,u.m+=s-f),i&&!qi(l)&&(l.t=i,l.m+=c-h,e=n)}return e}function u(n){n.x*=l[0],n.y=n.depth*l[1]}var o=ao.layout.hierarchy().sort(null).value(null),a=Li,l=[1,1],c=null;return n.separation=function(t){return arguments.length?(a=t,n):a},n.size=function(t){return arguments.length?(c=null==(l=t)?u:null,n):c?null:l},n.nodeSize=function(t){return arguments.length?(c=null==(l=t)?null:u,n):c?l:null},ii(n,o)},ao.layout.cluster=function(){function n(n,u){var o,a=t.call(this,n,u),l=a[0],c=0;oi(l,function(n){var t=n.children;t&&t.length?(n.x=ji(t),n.y=Ui(t)):(n.x=o?c+=e(n,o):0,n.y=0,o=n)});var f=Fi(l),s=Hi(l),h=f.x-e(f,s)/2,p=s.x+e(s,f)/2;return oi(l,i?function(n){n.x=(n.x-l.x)*r[0],n.y=(l.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(p-h)*r[0],n.y=(1-(l.y?n.y/l.y:1))*r[1]}),a}var t=ao.layout.hierarchy().sort(null).value(null),e=Li,r=[1,1],i=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(i=null==(r=t),n):i?null:r},n.nodeSize=function(t){return arguments.length?(i=null!=(r=t),n):i?r:null},ii(n,t)},ao.layout.treemap=function(){function n(n,t){for(var e,r,i=-1,u=n.length;++i<u;)r=(e=n[i]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var u=e.children;if(u&&u.length){var o,a,l,c=s(e),f=[],h=u.slice(),g=1/0,v="slice"===p?c.dx:"dice"===p?c.dy:"slice-dice"===p?1&e.depth?c.dy:c.dx:Math.min(c.dx,c.dy);for(n(h,c.dx*c.dy/e.value),f.area=0;(l=h.length)>0;)f.push(o=h[l-1]),f.area+=o.area,"squarify"!==p||(a=r(f,v))<=g?(h.pop(),g=a):(f.area-=f.pop().area,i(f,v,c,!1),v=Math.min(c.dx,c.dy),f.length=f.area=0,g=1/0);f.length&&(i(f,v,c,!0),f.length=f.area=0),u.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var u,o=s(t),a=r.slice(),l=[];for(n(a,o.dx*o.dy/t.value),l.area=0;u=a.pop();)l.push(u),l.area+=u.area,null!=u.z&&(i(l,u.z?o.dx:o.dy,o,!a.length),l.length=l.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,i=0,u=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(u>e&&(u=e),e>i&&(i=e));return r*=r,t*=t,r?Math.max(t*i*g/r,r/(t*u*g)):1/0}function i(n,t,e,r){var i,u=-1,o=n.length,a=e.x,c=e.y,f=t?l(n.area/t):0;
if(t==e.dx){for((r||f>e.dy)&&(f=e.dy);++u<o;)i=n[u],i.x=a,i.y=c,i.dy=f,a+=i.dx=Math.min(e.x+e.dx-a,f?l(i.area/f):0);i.z=!0,i.dx+=e.x+e.dx-a,e.y+=f,e.dy-=f}else{for((r||f>e.dx)&&(f=e.dx);++u<o;)i=n[u],i.x=a,i.y=c,i.dx=f,c+=i.dy=Math.min(e.y+e.dy-c,f?l(i.area/f):0);i.z=!1,i.dy+=e.y+e.dy-c,e.x+=f,e.dx-=f}}function u(r){var i=o||a(r),u=i[0];return u.x=u.y=0,u.value?(u.dx=c[0],u.dy=c[1]):u.dx=u.dy=0,o&&a.revalue(u),n([u],u.dx*u.dy/u.value),(o?e:t)(u),h&&(o=i),i}var o,a=ao.layout.hierarchy(),l=Math.round,c=[1,1],f=null,s=Oi,h=!1,p="squarify",g=.5*(1+Math.sqrt(5));return u.size=function(n){return arguments.length?(c=n,u):c},u.padding=function(n){function t(t){var e=n.call(u,t,t.depth);return null==e?Oi(t):Ii(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Ii(t,n)}if(!arguments.length)return f;var r;return s=null==(f=n)?Oi:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,u},u.round=function(n){return arguments.length?(l=n?Math.round:Number,u):l!=Number},u.sticky=function(n){return arguments.length?(h=n,o=null,u):h},u.ratio=function(n){return arguments.length?(g=n,u):g},u.mode=function(n){return arguments.length?(p=n+"",u):p},ii(u,a)},ao.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,i;do e=2*Math.random()-1,r=2*Math.random()-1,i=e*e+r*r;while(!i||i>1);return n+t*e*Math.sqrt(-2*Math.log(i)/i)}},logNormal:function(){var n=ao.random.normal.apply(ao,arguments);return function(){return Math.exp(n())}},bates:function(n){var t=ao.random.irwinHall(n);return function(){return t()/n}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t}}},ao.scale={};var Sl={floor:m,ceil:m};ao.scale.linear=function(){return Wi([0,1],[0,1],Mr,!1)};var kl={s:1,g:1,p:1,r:1,e:1};ao.scale.log=function(){return ru(ao.scale.linear().domain([0,1]),10,!0,[1,10])};var Nl=ao.format(".0e"),El={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};ao.scale.pow=function(){return iu(ao.scale.linear(),1,[0,1])},ao.scale.sqrt=function(){return ao.scale.pow().exponent(.5)},ao.scale.ordinal=function(){return ou([],{t:"range",a:[[]]})},ao.scale.category10=function(){return ao.scale.ordinal().range(Al)},ao.scale.category20=function(){return ao.scale.ordinal().range(Cl)},ao.scale.category20b=function(){return ao.scale.ordinal().range(zl)},ao.scale.category20c=function(){return ao.scale.ordinal().range(Ll)};var Al=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(xn),Cl=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(xn),zl=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(xn),Ll=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(xn);ao.scale.quantile=function(){return au([],[])},ao.scale.quantize=function(){return lu(0,1,[0,1])},ao.scale.threshold=function(){return cu([.5],[0,1])},ao.scale.identity=function(){return fu([0,1])},ao.svg={},ao.svg.arc=function(){function n(){var n=Math.max(0,+e.apply(this,arguments)),c=Math.max(0,+r.apply(this,arguments)),f=o.apply(this,arguments)-Io,s=a.apply(this,arguments)-Io,h=Math.abs(s-f),p=f>s?0:1;if(n>c&&(g=c,c=n,n=g),h>=Oo)return t(c,p)+(n?t(n,1-p):"")+"Z";var g,v,d,y,m,M,x,b,_,w,S,k,N=0,E=0,A=[];if((y=(+l.apply(this,arguments)||0)/2)&&(d=u===ql?Math.sqrt(n*n+c*c):+u.apply(this,arguments),p||(E*=-1),c&&(E=tn(d/c*Math.sin(y))),n&&(N=tn(d/n*Math.sin(y)))),c){m=c*Math.cos(f+E),M=c*Math.sin(f+E),x=c*Math.cos(s-E),b=c*Math.sin(s-E);var C=Math.abs(s-f-2*E)<=Fo?0:1;if(E&&yu(m,M,x,b)===p^C){var z=(f+s)/2;m=c*Math.cos(z),M=c*Math.sin(z),x=b=null}}else m=M=0;if(n){_=n*Math.cos(s-N),w=n*Math.sin(s-N),S=n*Math.cos(f+N),k=n*Math.sin(f+N);var L=Math.abs(f-s+2*N)<=Fo?0:1;if(N&&yu(_,w,S,k)===1-p^L){var q=(f+s)/2;_=n*Math.cos(q),w=n*Math.sin(q),S=k=null}}else _=w=0;if(h>Uo&&(g=Math.min(Math.abs(c-n)/2,+i.apply(this,arguments)))>.001){v=c>n^p?0:1;var T=g,R=g;if(Fo>h){var D=null==S?[_,w]:null==x?[m,M]:Re([m,M],[S,k],[x,b],[_,w]),P=m-D[0],U=M-D[1],j=x-D[0],F=b-D[1],H=1/Math.sin(Math.acos((P*j+U*F)/(Math.sqrt(P*P+U*U)*Math.sqrt(j*j+F*F)))/2),O=Math.sqrt(D[0]*D[0]+D[1]*D[1]);R=Math.min(g,(n-O)/(H-1)),T=Math.min(g,(c-O)/(H+1))}if(null!=x){var I=mu(null==S?[_,w]:[S,k],[m,M],c,T,p),Y=mu([x,b],[_,w],c,T,p);g===T?A.push("M",I[0],"A",T,",",T," 0 0,",v," ",I[1],"A",c,",",c," 0 ",1-p^yu(I[1][0],I[1][1],Y[1][0],Y[1][1]),",",p," ",Y[1],"A",T,",",T," 0 0,",v," ",Y[0]):A.push("M",I[0],"A",T,",",T," 0 1,",v," ",Y[0])}else A.push("M",m,",",M);if(null!=S){var Z=mu([m,M],[S,k],n,-R,p),V=mu([_,w],null==x?[m,M]:[x,b],n,-R,p);g===R?A.push("L",V[0],"A",R,",",R," 0 0,",v," ",V[1],"A",n,",",n," 0 ",p^yu(V[1][0],V[1][1],Z[1][0],Z[1][1]),",",1-p," ",Z[1],"A",R,",",R," 0 0,",v," ",Z[0]):A.push("L",V[0],"A",R,",",R," 0 0,",v," ",Z[0])}else A.push("L",_,",",w)}else A.push("M",m,",",M),null!=x&&A.push("A",c,",",c," 0 ",C,",",p," ",x,",",b),A.push("L",_,",",w),null!=S&&A.push("A",n,",",n," 0 ",L,",",1-p," ",S,",",k);return A.push("Z"),A.join("")}function t(n,t){return"M0,"+n+"A"+n+","+n+" 0 1,"+t+" 0,"+-n+"A"+n+","+n+" 0 1,"+t+" 0,"+n}var e=hu,r=pu,i=su,u=ql,o=gu,a=vu,l=du;return n.innerRadius=function(t){return arguments.length?(e=En(t),n):e},n.outerRadius=function(t){return arguments.length?(r=En(t),n):r},n.cornerRadius=function(t){return arguments.length?(i=En(t),n):i},n.padRadius=function(t){return arguments.length?(u=t==ql?ql:En(t),n):u},n.startAngle=function(t){return arguments.length?(o=En(t),n):o},n.endAngle=function(t){return arguments.length?(a=En(t),n):a},n.padAngle=function(t){return arguments.length?(l=En(t),n):l},n.centroid=function(){var n=(+e.apply(this,arguments)+ +r.apply(this,arguments))/2,t=(+o.apply(this,arguments)+ +a.apply(this,arguments))/2-Io;return[Math.cos(t)*n,Math.sin(t)*n]},n};var ql="auto";ao.svg.line=function(){return Mu(m)};var Tl=ao.map({linear:xu,"linear-closed":bu,step:_u,"step-before":wu,"step-after":Su,basis:zu,"basis-open":Lu,"basis-closed":qu,bundle:Tu,cardinal:Eu,"cardinal-open":ku,"cardinal-closed":Nu,monotone:Fu});Tl.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var Rl=[0,2/3,1/3,0],Dl=[0,1/3,2/3,0],Pl=[0,1/6,2/3,1/6];ao.svg.line.radial=function(){var n=Mu(Hu);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},wu.reverse=Su,Su.reverse=wu,ao.svg.area=function(){return Ou(m)},ao.svg.area.radial=function(){var n=Ou(Hu);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},ao.svg.chord=function(){function n(n,a){var l=t(this,u,n,a),c=t(this,o,n,a);return"M"+l.p0+r(l.r,l.p1,l.a1-l.a0)+(e(l,c)?i(l.r,l.p1,l.r,l.p0):i(l.r,l.p1,c.r,c.p0)+r(c.r,c.p1,c.a1-c.a0)+i(c.r,c.p1,l.r,l.p0))+"Z"}function t(n,t,e,r){var i=t.call(n,e,r),u=a.call(n,i,r),o=l.call(n,i,r)-Io,f=c.call(n,i,r)-Io;return{r:u,a0:o,a1:f,p0:[u*Math.cos(o),u*Math.sin(o)],p1:[u*Math.cos(f),u*Math.sin(f)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Fo)+",1 "+t}function i(n,t,e,r){return"Q 0,0 "+r}var u=Me,o=xe,a=Iu,l=gu,c=vu;return n.radius=function(t){return arguments.length?(a=En(t),n):a},n.source=function(t){return arguments.length?(u=En(t),n):u},n.target=function(t){return arguments.length?(o=En(t),n):o},n.startAngle=function(t){return arguments.length?(l=En(t),n):l},n.endAngle=function(t){return arguments.length?(c=En(t),n):c},n},ao.svg.diagonal=function(){function n(n,i){var u=t.call(this,n,i),o=e.call(this,n,i),a=(u.y+o.y)/2,l=[u,{x:u.x,y:a},{x:o.x,y:a},o];return l=l.map(r),"M"+l[0]+"C"+l[1]+" "+l[2]+" "+l[3]}var t=Me,e=xe,r=Yu;return n.source=function(e){return arguments.length?(t=En(e),n):t},n.target=function(t){return arguments.length?(e=En(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},ao.svg.diagonal.radial=function(){var n=ao.svg.diagonal(),t=Yu,e=n.projection;return n.projection=function(n){return arguments.length?e(Zu(t=n)):t},n},ao.svg.symbol=function(){function n(n,r){return(Ul.get(t.call(this,n,r))||$u)(e.call(this,n,r))}var t=Xu,e=Vu;return n.type=function(e){return arguments.length?(t=En(e),n):t},n.size=function(t){return arguments.length?(e=En(t),n):e},n};var Ul=ao.map({circle:$u,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*Fl)),e=t*Fl;return"M0,"+-t+"L"+e+",0 0,"+t+" "+-e+",0Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/jl),e=t*jl/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/jl),e=t*jl/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});ao.svg.symbolTypes=Ul.keys();var jl=Math.sqrt(3),Fl=Math.tan(30*Yo);Co.transition=function(n){for(var t,e,r=Hl||++Zl,i=Ku(n),u=[],o=Ol||{time:Date.now(),ease:Nr,delay:0,duration:250},a=-1,l=this.length;++a<l;){u.push(t=[]);for(var c=this[a],f=-1,s=c.length;++f<s;)(e=c[f])&&Qu(e,f,i,r,o),t.push(e)}return Wu(u,i,r)},Co.interrupt=function(n){return this.each(null==n?Il:Bu(Ku(n)))};var Hl,Ol,Il=Bu(Ku()),Yl=[],Zl=0;Yl.call=Co.call,Yl.empty=Co.empty,Yl.node=Co.node,Yl.size=Co.size,ao.transition=function(n,t){return n&&n.transition?Hl?n.transition(t):n:ao.selection().transition(n)},ao.transition.prototype=Yl,Yl.select=function(n){var t,e,r,i=this.id,u=this.namespace,o=[];n=A(n);for(var a=-1,l=this.length;++a<l;){o.push(t=[]);for(var c=this[a],f=-1,s=c.length;++f<s;)(r=c[f])&&(e=n.call(r,r.__data__,f,a))?("__data__"in r&&(e.__data__=r.__data__),Qu(e,f,u,i,r[u][i]),t.push(e)):t.push(null)}return Wu(o,u,i)},Yl.selectAll=function(n){var t,e,r,i,u,o=this.id,a=this.namespace,l=[];n=C(n);for(var c=-1,f=this.length;++c<f;)for(var s=this[c],h=-1,p=s.length;++h<p;)if(r=s[h]){u=r[a][o],e=n.call(r,r.__data__,h,c),l.push(t=[]);for(var g=-1,v=e.length;++g<v;)(i=e[g])&&Qu(i,g,a,o,u),t.push(i)}return Wu(l,a,o)},Yl.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=O(n));for(var u=0,o=this.length;o>u;u++){i.push(t=[]);for(var e=this[u],a=0,l=e.length;l>a;a++)(r=e[a])&&n.call(r,r.__data__,a,u)&&t.push(r)}return Wu(i,this.namespace,this.id)},Yl.tween=function(n,t){var e=this.id,r=this.namespace;return arguments.length<2?this.node()[r][e].tween.get(n):Y(this,null==t?function(t){t[r][e].tween.remove(n)}:function(i){i[r][e].tween.set(n,t)})},Yl.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function i(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function u(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?$r:Mr,a=ao.ns.qualify(n);return Ju(this,"attr."+n,t,a.local?u:i)},Yl.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(i));return r&&function(n){this.setAttribute(i,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(i.space,i.local));return r&&function(n){this.setAttributeNS(i.space,i.local,r(n))}}var i=ao.ns.qualify(n);return this.tween("attr."+n,i.local?r:e)},Yl.style=function(n,e,r){function i(){this.style.removeProperty(n)}function u(e){return null==e?i:(e+="",function(){var i,u=t(this).getComputedStyle(this,null).getPropertyValue(n);return u!==e&&(i=Mr(u,e),function(t){this.style.setProperty(n,i(t),r)})})}var o=arguments.length;if(3>o){if("string"!=typeof n){2>o&&(e="");for(r in n)this.style(r,n[r],e);return this}r=""}return Ju(this,"style."+n,e,u)},Yl.styleTween=function(n,e,r){function i(i,u){var o=e.call(this,i,u,t(this).getComputedStyle(this,null).getPropertyValue(n));return o&&function(t){this.style.setProperty(n,o(t),r)}}return arguments.length<3&&(r=""),this.tween("style."+n,i)},Yl.text=function(n){return Ju(this,"text",n,Gu)},Yl.remove=function(){var n=this.namespace;return this.each("end.transition",function(){var t;this[n].count<2&&(t=this.parentNode)&&t.removeChild(this)})},Yl.ease=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].ease:("function"!=typeof n&&(n=ao.ease.apply(ao,arguments)),Y(this,function(r){r[e][t].ease=n}))},Yl.delay=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].delay:Y(this,"function"==typeof n?function(r,i,u){r[e][t].delay=+n.call(r,r.__data__,i,u)}:(n=+n,function(r){r[e][t].delay=n}))},Yl.duration=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].duration:Y(this,"function"==typeof n?function(r,i,u){r[e][t].duration=Math.max(1,n.call(r,r.__data__,i,u))}:(n=Math.max(1,n),function(r){r[e][t].duration=n}))},Yl.each=function(n,t){var e=this.id,r=this.namespace;if(arguments.length<2){var i=Ol,u=Hl;try{Hl=e,Y(this,function(t,i,u){Ol=t[r][e],n.call(t,t.__data__,i,u)})}finally{Ol=i,Hl=u}}else Y(this,function(i){var u=i[r][e];(u.event||(u.event=ao.dispatch("start","end","interrupt"))).on(n,t)});return this},Yl.transition=function(){for(var n,t,e,r,i=this.id,u=++Zl,o=this.namespace,a=[],l=0,c=this.length;c>l;l++){a.push(n=[]);for(var t=this[l],f=0,s=t.length;s>f;f++)(e=t[f])&&(r=e[o][i],Qu(e,f,o,u,{time:r.time,ease:r.ease,delay:r.delay+r.duration,duration:r.duration})),n.push(e)}return Wu(a,o,u)},ao.svg.axis=function(){function n(n){n.each(function(){var n,c=ao.select(this),f=this.__chart__||e,s=this.__chart__=e.copy(),h=null==l?s.ticks?s.ticks.apply(s,a):s.domain():l,p=null==t?s.tickFormat?s.tickFormat.apply(s,a):m:t,g=c.selectAll(".tick").data(h,s),v=g.enter().insert("g",".domain").attr("class","tick").style("opacity",Uo),d=ao.transition(g.exit()).style("opacity",Uo).remove(),y=ao.transition(g.order()).style("opacity",1),M=Math.max(i,0)+o,x=Zi(s),b=c.selectAll(".domain").data([0]),_=(b.enter().append("path").attr("class","domain"),ao.transition(b));v.append("line"),v.append("text");var w,S,k,N,E=v.select("line"),A=y.select("line"),C=g.select("text").text(p),z=v.select("text"),L=y.select("text"),q="top"===r||"left"===r?-1:1;if("bottom"===r||"top"===r?(n=no,w="x",k="y",S="x2",N="y2",C.attr("dy",0>q?"0em":".71em").style("text-anchor","middle"),_.attr("d","M"+x[0]+","+q*u+"V0H"+x[1]+"V"+q*u)):(n=to,w="y",k="x",S="y2",N="x2",C.attr("dy",".32em").style("text-anchor",0>q?"end":"start"),_.attr("d","M"+q*u+","+x[0]+"H0V"+x[1]+"H"+q*u)),E.attr(N,q*i),z.attr(k,q*M),A.attr(S,0).attr(N,q*i),L.attr(w,0).attr(k,q*M),s.rangeBand){var T=s,R=T.rangeBand()/2;f=s=function(n){return T(n)+R}}else f.rangeBand?f=s:d.call(n,s,f);v.call(n,f,s),y.call(n,s,s)})}var t,e=ao.scale.linear(),r=Vl,i=6,u=6,o=3,a=[10],l=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in Xl?t+"":Vl,n):r},n.ticks=function(){return arguments.length?(a=co(arguments),n):a},n.tickValues=function(t){return arguments.length?(l=t,n):l},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(i=+t,u=+arguments[e-1],n):i},n.innerTickSize=function(t){return arguments.length?(i=+t,n):i},n.outerTickSize=function(t){return arguments.length?(u=+t,n):u},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var Vl="bottom",Xl={top:1,right:1,bottom:1,left:1};ao.svg.brush=function(){function n(t){t.each(function(){var t=ao.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=t.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),t.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=t.selectAll(".resize").data(v,m);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return $l[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var l,s=ao.transition(t),h=ao.transition(o);c&&(l=Zi(c),h.attr("x",l[0]).attr("width",l[1]-l[0]),r(s)),f&&(l=Zi(f),h.attr("y",l[0]).attr("height",l[1]-l[0]),i(s)),e(s)})}function e(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)]+","+h[+/^s/.test(n)]+")"})}function r(n){n.select(".extent").attr("x",s[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1]-s[0])}function i(n){n.select(".extent").attr("y",h[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0])}function u(){function u(){32==ao.event.keyCode&&(C||(M=null,L[0]-=s[1],L[1]-=h[1],C=2),S())}function v(){32==ao.event.keyCode&&2==C&&(L[0]+=s[1],L[1]+=h[1],C=0,S())}function d(){var n=ao.mouse(b),t=!1;x&&(n[0]+=x[0],n[1]+=x[1]),C||(ao.event.altKey?(M||(M=[(s[0]+s[1])/2,(h[0]+h[1])/2]),L[0]=s[+(n[0]<M[0])],L[1]=h[+(n[1]<M[1])]):M=null),E&&y(n,c,0)&&(r(k),t=!0),A&&y(n,f,1)&&(i(k),t=!0),t&&(e(k),w({type:"brush",mode:C?"move":"resize"}))}function y(n,t,e){var r,i,u=Zi(t),l=u[0],c=u[1],f=L[e],v=e?h:s,d=v[1]-v[0];return C&&(l-=f,c-=d+f),r=(e?g:p)?Math.max(l,Math.min(c,n[e])):n[e],C?i=(r+=f)+d:(M&&(f=Math.max(l,Math.min(c,2*M[e]-r))),r>f?(i=r,r=f):i=f),v[0]!=r||v[1]!=i?(e?a=null:o=null,v[0]=r,v[1]=i,!0):void 0}function m(){d(),k.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),ao.select("body").style("cursor",null),q.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),z(),w({type:"brushend"})}var M,x,b=this,_=ao.select(ao.event.target),w=l.of(b,arguments),k=ao.select(b),N=_.datum(),E=!/^(n|s)$/.test(N)&&c,A=!/^(e|w)$/.test(N)&&f,C=_.classed("extent"),z=W(b),L=ao.mouse(b),q=ao.select(t(b)).on("keydown.brush",u).on("keyup.brush",v);if(ao.event.changedTouches?q.on("touchmove.brush",d).on("touchend.brush",m):q.on("mousemove.brush",d).on("mouseup.brush",m),k.interrupt().selectAll("*").interrupt(),C)L[0]=s[0]-L[0],L[1]=h[0]-L[1];else if(N){var T=+/w$/.test(N),R=+/^n/.test(N);x=[s[1-T]-L[0],h[1-R]-L[1]],L[0]=s[T],L[1]=h[R]}else ao.event.altKey&&(M=L.slice());k.style("pointer-events","none").selectAll(".resize").style("display",null),ao.select("body").style("cursor",_.style("cursor")),w({type:"brushstart"}),d()}var o,a,l=N(n,"brushstart","brush","brushend"),c=null,f=null,s=[0,0],h=[0,0],p=!0,g=!0,v=Bl[0];return n.event=function(n){n.each(function(){var n=l.of(this,arguments),t={x:s,y:h,i:o,j:a},e=this.__chart__||t;this.__chart__=t,Hl?ao.select(this).transition().each("start.brush",function(){o=e.i,a=e.j,s=e.x,h=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=xr(s,t.x),r=xr(h,t.y);return o=a=null,function(i){s=t.x=e(i),h=t.y=r(i),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){o=t.i,a=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,v=Bl[!c<<1|!f],n):c},n.y=function(t){return arguments.length?(f=t,v=Bl[!c<<1|!f],n):f},n.clamp=function(t){return arguments.length?(c&&f?(p=!!t[0],g=!!t[1]):c?p=!!t:f&&(g=!!t),n):c&&f?[p,g]:c?p:f?g:null},n.extent=function(t){var e,r,i,u,l;return arguments.length?(c&&(e=t[0],r=t[1],f&&(e=e[0],r=r[0]),o=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(l=e,e=r,r=l),e==s[0]&&r==s[1]||(s=[e,r])),f&&(i=t[0],u=t[1],c&&(i=i[1],u=u[1]),a=[i,u],f.invert&&(i=f(i),u=f(u)),i>u&&(l=i,i=u,u=l),i==h[0]&&u==h[1]||(h=[i,u])),n):(c&&(o?(e=o[0],r=o[1]):(e=s[0],r=s[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(l=e,e=r,r=l))),f&&(a?(i=a[0],u=a[1]):(i=h[0],u=h[1],f.invert&&(i=f.invert(i),u=f.invert(u)),i>u&&(l=i,i=u,u=l))),c&&f?[[e,i],[r,u]]:c?[e,r]:f&&[i,u])},n.clear=function(){return n.empty()||(s=[0,0],h=[0,0],o=a=null),n},n.empty=function(){return!!c&&s[0]==s[1]||!!f&&h[0]==h[1]},ao.rebind(n,l,"on")};var $l={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Bl=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Wl=ga.format=xa.timeFormat,Jl=Wl.utc,Gl=Jl("%Y-%m-%dT%H:%M:%S.%LZ");Wl.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?eo:Gl,eo.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},eo.toString=Gl.toString,ga.second=On(function(n){return new va(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),ga.seconds=ga.second.range,ga.seconds.utc=ga.second.utc.range,ga.minute=On(function(n){return new va(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),ga.minutes=ga.minute.range,ga.minutes.utc=ga.minute.utc.range,ga.hour=On(function(n){var t=n.getTimezoneOffset()/60;return new va(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),ga.hours=ga.hour.range,ga.hours.utc=ga.hour.utc.range,ga.month=On(function(n){return n=ga.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),ga.months=ga.month.range,ga.months.utc=ga.month.utc.range;var Kl=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Ql=[[ga.second,1],[ga.second,5],[ga.second,15],[ga.second,30],[ga.minute,1],[ga.minute,5],[ga.minute,15],[ga.minute,30],[ga.hour,1],[ga.hour,3],[ga.hour,6],[ga.hour,12],[ga.day,1],[ga.day,2],[ga.week,1],[ga.month,1],[ga.month,3],[ga.year,1]],nc=Wl.multi([[".%L",function(n){return n.getMilliseconds()}],[":%S",function(n){return n.getSeconds()}],["%I:%M",function(n){return n.getMinutes()}],["%I %p",function(n){return n.getHours()}],["%a %d",function(n){return n.getDay()&&1!=n.getDate()}],["%b %d",function(n){return 1!=n.getDate()}],["%B",function(n){return n.getMonth()}],["%Y",zt]]),tc={range:function(n,t,e){return ao.range(Math.ceil(n/e)*e,+t,e).map(io)},floor:m,ceil:m};Ql.year=ga.year,ga.scale=function(){return ro(ao.scale.linear(),Ql,nc)};var ec=Ql.map(function(n){return[n[0].utc,n[1]]}),rc=Jl.multi([[".%L",function(n){return n.getUTCMilliseconds()}],[":%S",function(n){return n.getUTCSeconds()}],["%I:%M",function(n){return n.getUTCMinutes()}],["%I %p",function(n){return n.getUTCHours()}],["%a %d",function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],["%b %d",function(n){return 1!=n.getUTCDate()}],["%B",function(n){return n.getUTCMonth()}],["%Y",zt]]);ec.year=ga.year.utc,ga.scale.utc=function(){return ro(ao.scale.linear(),ec,rc)},ao.text=An(function(n){return n.responseText}),ao.json=function(n,t){return Cn(n,"application/json",uo,t)},ao.html=function(n,t){return Cn(n,"text/html",oo,t)},ao.xml=An(function(n){return n.responseXML}),"function"==typeof define&&define.amd?(this.d3=ao,define(ao)):"object"==typeof module&&module.exports?module.exports=ao:this.d3=ao}();
/**D3 ends */
/* nvd3 version 1.8.1 (https://github.com/novus/nvd3) 2015-06-15 */
!function(){var a={};a.dev=!1,a.tooltip=a.tooltip||{},a.utils=a.utils||{},a.models=a.models||{},a.charts={},a.logs={},a.dom={},a.dispatch=d3.dispatch("render_start","render_end"),Function.prototype.bind||(Function.prototype.bind=function(a){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var b=Array.prototype.slice.call(arguments,1),c=this,d=function(){},e=function(){return c.apply(this instanceof d&&a?this:a,b.concat(Array.prototype.slice.call(arguments)))};return d.prototype=this.prototype,e.prototype=new d,e}),a.dev&&(a.dispatch.on("render_start",function(){a.logs.startTime=+new Date}),a.dispatch.on("render_end",function(){a.logs.endTime=+new Date,a.logs.totalTime=a.logs.endTime-a.logs.startTime,a.log("total",a.logs.totalTime)})),a.log=function(){if(a.dev&&window.console&&console.log&&console.log.apply)console.log.apply(console,arguments);else if(a.dev&&window.console&&"function"==typeof console.log&&Function.prototype.bind){var b=Function.prototype.bind.call(console.log,console);b.apply(console,arguments)}return arguments[arguments.length-1]},a.deprecated=function(a,b){console&&console.warn&&console.warn("nvd3 warning: `"+a+"` has been deprecated. ",b||"")},a.render=function(b){b=b||1,a.render.active=!0,a.dispatch.render_start();var c=function(){for(var d,e,f=0;b>f&&(e=a.render.queue[f]);f++)d=e.generate(),typeof e.callback==typeof Function&&e.callback(d);a.render.queue.splice(0,f),a.render.queue.length?setTimeout(c):(a.dispatch.render_end(),a.render.active=!1)};setTimeout(c)},a.render.active=!1,a.render.queue=[],a.addGraph=function(b){typeof arguments[0]==typeof Function&&(b={generate:arguments[0],callback:arguments[1]}),a.render.queue.push(b),a.render.active||a.render()},"undefined"!=typeof module&&"undefined"!=typeof exports&&(module.exports=a),"undefined"!=typeof window&&(window.nv=a),a.dom.write=function(a){return void 0!==window.fastdom?fastdom.write(a):a()},a.dom.read=function(a){return void 0!==window.fastdom?fastdom.read(a):a()},a.interactiveGuideline=function(){"use strict";function b(l){l.each(function(l){function m(){var a=d3.mouse(this),d=a[0],e=a[1],i=!0,j=!1;if(k&&(d=d3.event.offsetX,e=d3.event.offsetY,"svg"!==d3.event.target.tagName&&(i=!1),d3.event.target.className.baseVal.match("nv-legend")&&(j=!0)),i&&(d-=f.left,e-=f.top),0>d||0>e||d>o||e>p||d3.event.relatedTarget&&void 0===d3.event.relatedTarget.ownerSVGElement||j){if(k&&d3.event.relatedTarget&&void 0===d3.event.relatedTarget.ownerSVGElement&&(void 0===d3.event.relatedTarget.className||d3.event.relatedTarget.className.match(c.nvPointerEventsClass)))return;return h.elementMouseout({mouseX:d,mouseY:e}),b.renderGuideLine(null),void c.hidden(!0)}c.hidden(!1);var l=g.invert(d);h.elementMousemove({mouseX:d,mouseY:e,pointXValue:l}),"dblclick"===d3.event.type&&h.elementDblclick({mouseX:d,mouseY:e,pointXValue:l}),"click"===d3.event.type&&h.elementClick({mouseX:d,mouseY:e,pointXValue:l})}var n=d3.select(this),o=d||960,p=e||400,q=n.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([l]),r=q.enter().append("g").attr("class"," nv-wrap nv-interactiveLineLayer");r.append("g").attr("class","nv-interactiveGuideLine"),j&&(j.on("touchmove",m).on("mousemove",m,!0).on("mouseout",m,!0).on("dblclick",m).on("click",m),b.guideLine=null,b.renderGuideLine=function(c){i&&(b.guideLine&&b.guideLine.attr("x1")===c||a.dom.write(function(){var b=q.select(".nv-interactiveGuideLine").selectAll("line").data(null!=c?[a.utils.NaNtoZero(c)]:[],String);b.enter().append("line").attr("class","nv-guideline").attr("x1",function(a){return a}).attr("x2",function(a){return a}).attr("y1",p).attr("y2",0),b.exit().remove()}))})})}var c=a.models.tooltip();c.duration(0).hideDelay(0)._isInteractiveLayer(!0).hidden(!1);var d=null,e=null,f={left:0,top:0},g=d3.scale.linear(),h=d3.dispatch("elementMousemove","elementMouseout","elementClick","elementDblclick"),i=!0,j=null,k="ActiveXObject"in window;return b.dispatch=h,b.tooltip=c,b.margin=function(a){return arguments.length?(f.top="undefined"!=typeof a.top?a.top:f.top,f.left="undefined"!=typeof a.left?a.left:f.left,b):f},b.width=function(a){return arguments.length?(d=a,b):d},b.height=function(a){return arguments.length?(e=a,b):e},b.xScale=function(a){return arguments.length?(g=a,b):g},b.showGuideLine=function(a){return arguments.length?(i=a,b):i},b.svgContainer=function(a){return arguments.length?(j=a,b):j},b},a.interactiveBisect=function(a,b,c){"use strict";if(!(a instanceof Array))return null;var d;d="function"!=typeof c?function(a){return a.x}:c;var e=function(a,b){return d(a)-b},f=d3.bisector(e).left,g=d3.max([0,f(a,b)-1]),h=d(a[g]);if("undefined"==typeof h&&(h=g),h===b)return g;var i=d3.min([g+1,a.length-1]),j=d(a[i]);return"undefined"==typeof j&&(j=i),Math.abs(j-b)>=Math.abs(h-b)?g:i},a.nearestValueIndex=function(a,b,c){"use strict";var d=1/0,e=null;return a.forEach(function(a,f){var g=Math.abs(b-a);null!=a&&d>=g&&c>g&&(d=g,e=f)}),e},function(){"use strict";a.models.tooltip=function(){function b(){if(k){var a=d3.select(k);"svg"!==a.node().tagName&&(a=a.select("svg"));var b=a.node()?a.attr("viewBox"):null;if(b){b=b.split(" ");var c=parseInt(a.style("width"),10)/b[2];p.left=p.left*c,p.top=p.top*c}}}function c(){if(!n){var a;a=k?k:document.body,n=d3.select(a).append("div").attr("class","nvtooltip "+(j?j:"xy-tooltip")).attr("id",v),n.style("top",0).style("left",0),n.style("opacity",0),n.selectAll("div, table, td, tr").classed(w,!0),n.classed(w,!0),o=n.node()}}function d(){if(r&&B(e)){b();var f=p.left,g=null!==i?i:p.top;return a.dom.write(function(){c();var b=A(e);b&&(o.innerHTML=b),k&&u?a.dom.read(function(){var a=k.getElementsByTagName("svg")[0],b={left:0,top:0};if(a){var c=a.getBoundingClientRect(),d=k.getBoundingClientRect(),e=c.top;if(0>e){var i=k.getBoundingClientRect();e=Math.abs(e)>i.height?0:e}b.top=Math.abs(e-d.top),b.left=Math.abs(c.left-d.left)}f+=k.offsetLeft+b.left-2*k.scrollLeft,g+=k.offsetTop+b.top-2*k.scrollTop,h&&h>0&&(g=Math.floor(g/h)*h),C([f,g])}):C([f,g])}),d}}var e=null,f="w",g=25,h=0,i=null,j=null,k=null,l=!0,m=400,n=null,o=null,p={left:null,top:null},q={left:0,top:0},r=!0,s=100,t=!0,u=!1,v="nvtooltip-"+Math.floor(1e5*Math.random()),w="nv-pointer-events-none",x=function(a){return a},y=function(a){return a},z=function(a){return a},A=function(a){if(null===a)return"";var b=d3.select(document.createElement("table"));if(t){var c=b.selectAll("thead").data([a]).enter().append("thead");c.append("tr").append("td").attr("colspan",3).append("strong").classed("x-value",!0).html(y(a.value))}var d=b.selectAll("tbody").data([a]).enter().append("tbody"),e=d.selectAll("tr").data(function(a){return a.series}).enter().append("tr").classed("highlight",function(a){return a.highlight});e.append("td").classed("legend-color-guide",!0).append("div").style("background-color",function(a){return a.color}),e.append("td").classed("key",!0).html(function(a,b){return z(a.key,b)}),e.append("td").classed("value",!0).html(function(a,b){return x(a.value,b)}),e.selectAll("td").each(function(a){if(a.highlight){var b=d3.scale.linear().domain([0,1]).range(["#fff",a.color]),c=.6;d3.select(this).style("border-bottom-color",b(c)).style("border-top-color",b(c))}});var f=b.node().outerHTML;return void 0!==a.footer&&(f+="<div class='footer'>"+a.footer+"</div>"),f},B=function(a){if(a&&a.series){if(a.series instanceof Array)return!!a.series.length;if(a.series instanceof Object)return a.series=[a.series],!0}return!1},C=function(b){o&&a.dom.read(function(){var c,d,e=parseInt(o.offsetHeight,10),h=parseInt(o.offsetWidth,10),i=a.utils.windowSize().width,j=a.utils.windowSize().height,k=window.pageYOffset,p=window.pageXOffset;j=window.innerWidth>=document.body.scrollWidth?j:j-16,i=window.innerHeight>=document.body.scrollHeight?i:i-16;var r,t,u=function(a){var b=d;do isNaN(a.offsetTop)||(b+=a.offsetTop),a=a.offsetParent;while(a);return b},v=function(a){var b=c;do isNaN(a.offsetLeft)||(b+=a.offsetLeft),a=a.offsetParent;while(a);return b};switch(f){case"e":c=b[0]-h-g,d=b[1]-e/2,r=v(o),t=u(o),p>r&&(c=b[0]+g>p?b[0]+g:p-r+c),k>t&&(d=k-t+d),t+e>k+j&&(d=k+j-t+d-e);break;case"w":c=b[0]+g,d=b[1]-e/2,r=v(o),t=u(o),r+h>i&&(c=b[0]-h-g),k>t&&(d=k+5),t+e>k+j&&(d=k+j-t+d-e);break;case"n":c=b[0]-h/2-5,d=b[1]+g,r=v(o),t=u(o),p>r&&(c=p+5),r+h>i&&(c=c-h/2+5),t+e>k+j&&(d=k+j-t+d-e);break;case"s":c=b[0]-h/2,d=b[1]-e-g,r=v(o),t=u(o),p>r&&(c=p+5),r+h>i&&(c=c-h/2+5),k>t&&(d=k);break;case"none":c=b[0],d=b[1]-g,r=v(o),t=u(o)}c-=q.left,d-=q.top;var w=o.getBoundingClientRect(),k=window.pageYOffset||document.documentElement.scrollTop,p=window.pageXOffset||document.documentElement.scrollLeft,x="translate("+(w.left+p)+"px, "+(w.top+k)+"px)",y="translate("+c+"px, "+d+"px)",z=d3.interpolateString(x,y),A=n.style("opacity")<.1;l?n.transition().delay(m).duration(0).style("opacity",0):n.interrupt().transition().duration(A?0:s).styleTween("transform",function(){return z},"important").style("-webkit-transform",y).style("opacity",1)})};return d.nvPointerEventsClass=w,d.options=a.utils.optionsFunc.bind(d),d._options=Object.create({},{duration:{get:function(){return s},set:function(a){s=a}},gravity:{get:function(){return f},set:function(a){f=a}},distance:{get:function(){return g},set:function(a){g=a}},snapDistance:{get:function(){return h},set:function(a){h=a}},classes:{get:function(){return j},set:function(a){j=a}},chartContainer:{get:function(){return k},set:function(a){k=a}},fixedTop:{get:function(){return i},set:function(a){i=a}},enabled:{get:function(){return r},set:function(a){r=a}},hideDelay:{get:function(){return m},set:function(a){m=a}},contentGenerator:{get:function(){return A},set:function(a){A=a}},valueFormatter:{get:function(){return x},set:function(a){x=a}},headerFormatter:{get:function(){return y},set:function(a){y=a}},keyFormatter:{get:function(){return z},set:function(a){z=a}},headerEnabled:{get:function(){return t},set:function(a){t=a}},_isInteractiveLayer:{get:function(){return u},set:function(a){u=!!a}},position:{get:function(){return p},set:function(a){p.left=void 0!==a.left?a.left:p.left,p.top=void 0!==a.top?a.top:p.top}},offset:{get:function(){return q},set:function(a){q.left=void 0!==a.left?a.left:q.left,q.top=void 0!==a.top?a.top:q.top}},hidden:{get:function(){return l},set:function(a){l!=a&&(l=!!a,d())}},data:{get:function(){return e},set:function(a){a.point&&(a.value=a.point.x,a.series=a.series||{},a.series.value=a.point.y,a.series.color=a.point.color||a.series.color),e=a}},tooltipElem:{get:function(){return o},set:function(){}},id:{get:function(){return v},set:function(){}}}),a.utils.initOptions(d),d}}(),a.utils.windowSize=function(){var a={width:640,height:480};return window.innerWidth&&window.innerHeight?(a.width=window.innerWidth,a.height=window.innerHeight,a):"CSS1Compat"==document.compatMode&&document.documentElement&&document.documentElement.offsetWidth?(a.width=document.documentElement.offsetWidth,a.height=document.documentElement.offsetHeight,a):document.body&&document.body.offsetWidth?(a.width=document.body.offsetWidth,a.height=document.body.offsetHeight,a):a},a.utils.windowResize=function(b){return window.addEventListener?window.addEventListener("resize",b):a.log("ERROR: Failed to bind to window.resize with: ",b),{callback:b,clear:function(){window.removeEventListener("resize",b)}}},a.utils.getColor=function(b){if(void 0===b)return a.utils.defaultColor();if(Array.isArray(b)){var c=d3.scale.ordinal().range(b);return function(a,b){var d=void 0===b?a:b;return a.color||c(d)}}return b},a.utils.defaultColor=function(){return a.utils.getColor(d3.scale.category20().range())},a.utils.customTheme=function(a,b,c){b=b||function(a){return a.key},c=c||d3.scale.category20().range();var d=c.length;return function(e){var f=b(e);return"function"==typeof a[f]?a[f]():void 0!==a[f]?a[f]:(d||(d=c.length),d-=1,c[d])}},a.utils.pjax=function(b,c){var d=function(d){d3.html(d,function(d){var e=d3.select(c).node();e.parentNode.replaceChild(d3.select(d).select(c).node(),e),a.utils.pjax(b,c)})};d3.selectAll(b).on("click",function(){history.pushState(this.href,this.textContent,this.href),d(this.href),d3.event.preventDefault()}),d3.select(window).on("popstate",function(){d3.event.state&&d(d3.event.state)})},a.utils.calcApproxTextWidth=function(a){if("function"==typeof a.style&&"function"==typeof a.text){var b=parseInt(a.style("font-size").replace("px",""),10),c=a.text().length;return c*b*.5}return 0},a.utils.NaNtoZero=function(a){return"number"!=typeof a||isNaN(a)||null===a||1/0===a||a===-1/0?0:a},d3.selection.prototype.watchTransition=function(a){var b=[this].concat([].slice.call(arguments,1));return a.transition.apply(a,b)},a.utils.renderWatch=function(b,c){if(!(this instanceof a.utils.renderWatch))return new a.utils.renderWatch(b,c);var d=void 0!==c?c:250,e=[],f=this;this.models=function(a){return a=[].slice.call(arguments,0),a.forEach(function(a){a.__rendered=!1,function(a){a.dispatch.on("renderEnd",function(){a.__rendered=!0,f.renderEnd("model")})}(a),e.indexOf(a)<0&&e.push(a)}),this},this.reset=function(a){void 0!==a&&(d=a),e=[]},this.transition=function(a,b,c){if(b=arguments.length>1?[].slice.call(arguments,1):[],c=b.length>1?b.pop():void 0!==d?d:250,a.__rendered=!1,e.indexOf(a)<0&&e.push(a),0===c)return a.__rendered=!0,a.delay=function(){return this},a.duration=function(){return this},a;a.__rendered=0===a.length?!0:a.every(function(a){return!a.length})?!0:!1;var g=0;return a.transition().duration(c).each(function(){++g}).each("end",function(){0===--g&&(a.__rendered=!0,f.renderEnd.apply(this,b))})},this.renderEnd=function(){e.every(function(a){return a.__rendered})&&(e.forEach(function(a){a.__rendered=!1}),b.renderEnd.apply(this,arguments))}},a.utils.deepExtend=function(b){var c=arguments.length>1?[].slice.call(arguments,1):[];c.forEach(function(c){for(var d in c){var e=b[d]instanceof Array,f="object"==typeof b[d],g="object"==typeof c[d];f&&!e&&g?a.utils.deepExtend(b[d],c[d]):b[d]=c[d]}})},a.utils.state=function(){if(!(this instanceof a.utils.state))return new a.utils.state;var b={},c=function(){},d=function(){return{}},e=null,f=null;this.dispatch=d3.dispatch("change","set"),this.dispatch.on("set",function(a){c(a,!0)}),this.getter=function(a){return d=a,this},this.setter=function(a,b){return b||(b=function(){}),c=function(c,d){a(c),d&&b()},this},this.init=function(b){e=e||{},a.utils.deepExtend(e,b)};var g=function(){var a=d();if(JSON.stringify(a)===JSON.stringify(b))return!1;for(var c in a)void 0===b[c]&&(b[c]={}),b[c]=a[c],f=!0;return!0};this.update=function(){e&&(c(e,!1),e=null),g.call(this)&&this.dispatch.change(b)}},a.utils.optionsFunc=function(a){return a&&d3.map(a).forEach(function(a,b){"function"==typeof this[a]&&this[a](b)}.bind(this)),this},a.utils.calcTicksX=function(b,c){var d=1,e=0;for(e;e<c.length;e+=1){var f=c[e]&&c[e].values?c[e].values.length:0;d=f>d?f:d}return a.log("Requested number of ticks: ",b),a.log("Calculated max values to be: ",d),b=b>d?b=d-1:b,b=1>b?1:b,b=Math.floor(b),a.log("Calculating tick count as: ",b),b},a.utils.calcTicksY=function(b,c){return a.utils.calcTicksX(b,c)},a.utils.initOption=function(a,b){a._calls&&a._calls[b]?a[b]=a._calls[b]:(a[b]=function(c){return arguments.length?(a._overrides[b]=!0,a._options[b]=c,a):a._options[b]},a["_"+b]=function(c){return arguments.length?(a._overrides[b]||(a._options[b]=c),a):a._options[b]})},a.utils.initOptions=function(b){b._overrides=b._overrides||{};var c=Object.getOwnPropertyNames(b._options||{}),d=Object.getOwnPropertyNames(b._calls||{});c=c.concat(d);for(var e in c)a.utils.initOption(b,c[e])},a.utils.inheritOptionsD3=function(a,b,c){a._d3options=c.concat(a._d3options||[]),c.unshift(b),c.unshift(a),d3.rebind.apply(this,c)},a.utils.arrayUnique=function(a){return a.sort().filter(function(b,c){return!c||b!=a[c-1]})},a.utils.symbolMap=d3.map(),a.utils.symbol=function(){function b(b,e){var f=c.call(this,b,e),g=d.call(this,b,e);return-1!==d3.svg.symbolTypes.indexOf(f)?d3.svg.symbol().type(f).size(g)():a.utils.symbolMap.get(f)(g)}var c,d=64;return b.type=function(a){return arguments.length?(c=d3.functor(a),b):c},b.size=function(a){return arguments.length?(d=d3.functor(a),b):d},b},a.utils.inheritOptions=function(b,c){var d=Object.getOwnPropertyNames(c._options||{}),e=Object.getOwnPropertyNames(c._calls||{}),f=c._inherited||[],g=c._d3options||[],h=d.concat(e).concat(f).concat(g);h.unshift(c),h.unshift(b),d3.rebind.apply(this,h),b._inherited=a.utils.arrayUnique(d.concat(e).concat(f).concat(d).concat(b._inherited||[])),b._d3options=a.utils.arrayUnique(g.concat(b._d3options||[]))},a.utils.initSVG=function(a){a.classed({"nvd3-svg":!0})},a.utils.sanitizeHeight=function(a,b){return a||parseInt(b.style("height"),10)||400},a.utils.sanitizeWidth=function(a,b){return a||parseInt(b.style("width"),10)||960},a.utils.availableHeight=function(b,c,d){return a.utils.sanitizeHeight(b,c)-d.top-d.bottom},a.utils.availableWidth=function(b,c,d){return a.utils.sanitizeWidth(b,c)-d.left-d.right},a.utils.noData=function(b,c){var d=b.options(),e=d.margin(),f=d.noData(),g=null==f?["No Data Available."]:[f],h=a.utils.availableHeight(d.height(),c,e),i=a.utils.availableWidth(d.width(),c,e),j=e.left+i/2,k=e.top+h/2;c.selectAll("g").remove();var l=c.selectAll(".nv-noData").data(g);l.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),l.attr("x",j).attr("y",k).text(function(a){return a})},a.models.axis=function(){"use strict";function b(g){return s.reset(),g.each(function(b){var g=d3.select(this);a.utils.initSVG(g);var p=g.selectAll("g.nv-wrap.nv-axis").data([b]),q=p.enter().append("g").attr("class","nvd3 nv-wrap nv-axis"),t=(q.append("g"),p.select("g"));null!==n?c.ticks(n):("top"==c.orient()||"bottom"==c.orient())&&c.ticks(Math.abs(d.range()[1]-d.range()[0])/100),t.watchTransition(s,"axis").call(c),r=r||c.scale();var u=c.tickFormat();null==u&&(u=r.tickFormat());var v=t.selectAll("text.nv-axislabel").data([h||null]);v.exit().remove();var w,x,y;switch(c.orient()){case"top":v.enter().append("text").attr("class","nv-axislabel"),y=d.range().length<2?0:2===d.range().length?d.range()[1]:d.range()[d.range().length-1]+(d.range()[1]-d.range()[0]),v.attr("text-anchor","middle").attr("y",0).attr("x",y/2),i&&(x=p.selectAll("g.nv-axisMaxMin").data(d.domain()),x.enter().append("g").attr("class",function(a,b){return["nv-axisMaxMin","nv-axisMaxMin-x",0==b?"nv-axisMin-x":"nv-axisMax-x"].join(" ")}).append("text"),x.exit().remove(),x.attr("transform",function(b){return"translate("+a.utils.NaNtoZero(d(b))+",0)"}).select("text").attr("dy","-0.5em").attr("y",-c.tickPadding()).attr("text-anchor","middle").text(function(a){var b=u(a);return(""+b).match("NaN")?"":b}),x.watchTransition(s,"min-max top").attr("transform",function(b,c){return"translate("+a.utils.NaNtoZero(d.range()[c])+",0)"}));break;case"bottom":w=o+36;var z=30,A=0,B=t.selectAll("g").select("text"),C="";if(j%360){B.each(function(){var a=this.getBoundingClientRect(),b=a.width;A=a.height,b>z&&(z=b)}),C="rotate("+j+" 0,"+(A/2+c.tickPadding())+")";var D=Math.abs(Math.sin(j*Math.PI/180));w=(D?D*z:z)+30,B.attr("transform",C).style("text-anchor",j%360>0?"start":"end")}v.enter().append("text").attr("class","nv-axislabel"),y=d.range().length<2?0:2===d.range().length?d.range()[1]:d.range()[d.range().length-1]+(d.range()[1]-d.range()[0]),v.attr("text-anchor","middle").attr("y",w).attr("x",y/2),i&&(x=p.selectAll("g.nv-axisMaxMin").data([d.domain()[0],d.domain()[d.domain().length-1]]),x.enter().append("g").attr("class",function(a,b){return["nv-axisMaxMin","nv-axisMaxMin-x",0==b?"nv-axisMin-x":"nv-axisMax-x"].join(" ")}).append("text"),x.exit().remove(),x.attr("transform",function(b){return"translate("+a.utils.NaNtoZero(d(b)+(m?d.rangeBand()/2:0))+",0)"}).select("text").attr("dy",".71em").attr("y",c.tickPadding()).attr("transform",C).style("text-anchor",j?j%360>0?"start":"end":"middle").text(function(a){var b=u(a);return(""+b).match("NaN")?"":b}),x.watchTransition(s,"min-max bottom").attr("transform",function(b){return"translate("+a.utils.NaNtoZero(d(b)+(m?d.rangeBand()/2:0))+",0)"})),l&&B.attr("transform",function(a,b){return"translate(0,"+(b%2==0?"0":"12")+")"});break;case"right":v.enter().append("text").attr("class","nv-axislabel"),v.style("text-anchor",k?"middle":"begin").attr("transform",k?"rotate(90)":"").attr("y",k?-Math.max(e.right,f)+12:-10).attr("x",k?d3.max(d.range())/2:c.tickPadding()),i&&(x=p.selectAll("g.nv-axisMaxMin").data(d.domain()),x.enter().append("g").attr("class",function(a,b){return["nv-axisMaxMin","nv-axisMaxMin-y",0==b?"nv-axisMin-y":"nv-axisMax-y"].join(" ")}).append("text").style("opacity",0),x.exit().remove(),x.attr("transform",function(b){return"translate(0,"+a.utils.NaNtoZero(d(b))+")"}).select("text").attr("dy",".32em").attr("y",0).attr("x",c.tickPadding()).style("text-anchor","start").text(function(a){var b=u(a);return(""+b).match("NaN")?"":b}),x.watchTransition(s,"min-max right").attr("transform",function(b,c){return"translate(0,"+a.utils.NaNtoZero(d.range()[c])+")"}).select("text").style("opacity",1));break;case"left":v.enter().append("text").attr("class","nv-axislabel"),v.style("text-anchor",k?"middle":"end").attr("transform",k?"rotate(-90)":"").attr("y",k?-Math.max(e.left,f)+25-(o||0):-10).attr("x",k?-d3.max(d.range())/2:-c.tickPadding()),i&&(x=p.selectAll("g.nv-axisMaxMin").data(d.domain()),x.enter().append("g").attr("class",function(a,b){return["nv-axisMaxMin","nv-axisMaxMin-y",0==b?"nv-axisMin-y":"nv-axisMax-y"].join(" ")}).append("text").style("opacity",0),x.exit().remove(),x.attr("transform",function(b){return"translate(0,"+a.utils.NaNtoZero(r(b))+")"}).select("text").attr("dy",".32em").attr("y",0).attr("x",-c.tickPadding()).attr("text-anchor","end").text(function(a){var b=u(a);return(""+b).match("NaN")?"":b}),x.watchTransition(s,"min-max right").attr("transform",function(b,c){return"translate(0,"+a.utils.NaNtoZero(d.range()[c])+")"}).select("text").style("opacity",1))}if(v.text(function(a){return a}),!i||"left"!==c.orient()&&"right"!==c.orient()||(t.selectAll("g").each(function(a){d3.select(this).select("text").attr("opacity",1),(d(a)<d.range()[1]+10||d(a)>d.range()[0]-10)&&((a>1e-10||-1e-10>a)&&d3.select(this).attr("opacity",0),d3.select(this).select("text").attr("opacity",0))}),d.domain()[0]==d.domain()[1]&&0==d.domain()[0]&&p.selectAll("g.nv-axisMaxMin").style("opacity",function(a,b){return b?0:1})),i&&("top"===c.orient()||"bottom"===c.orient())){var E=[];p.selectAll("g.nv-axisMaxMin").each(function(a,b){try{E.push(b?d(a)-this.getBoundingClientRect().width-4:d(a)+this.getBoundingClientRect().width+4)}catch(c){E.push(b?d(a)-4:d(a)+4)}}),t.selectAll("g").each(function(a){(d(a)<E[0]||d(a)>E[1])&&(a>1e-10||-1e-10>a?d3.select(this).remove():d3.select(this).select("text").remove())})}t.selectAll(".tick").filter(function(a){return!parseFloat(Math.round(1e5*a)/1e6)&&void 0!==a}).classed("zero",!0),r=d.copy()}),s.renderEnd("axis immediate"),b}var c=d3.svg.axis(),d=d3.scale.linear(),e={top:0,right:0,bottom:0,left:0},f=75,g=60,h=null,i=!0,j=0,k=!0,l=!1,m=!1,n=null,o=0,p=250,q=d3.dispatch("renderEnd");c.scale(d).orient("bottom").tickFormat(function(a){return a});var r,s=a.utils.renderWatch(q,p);return b.axis=c,b.dispatch=q,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{axisLabelDistance:{get:function(){return o},set:function(a){o=a}},staggerLabels:{get:function(){return l},set:function(a){l=a}},rotateLabels:{get:function(){return j},set:function(a){j=a}},rotateYLabel:{get:function(){return k},set:function(a){k=a}},showMaxMin:{get:function(){return i},set:function(a){i=a}},axisLabel:{get:function(){return h},set:function(a){h=a}},height:{get:function(){return g},set:function(a){g=a}},ticks:{get:function(){return n},set:function(a){n=a}},width:{get:function(){return f},set:function(a){f=a}},margin:{get:function(){return e},set:function(a){e.top=void 0!==a.top?a.top:e.top,e.right=void 0!==a.right?a.right:e.right,e.bottom=void 0!==a.bottom?a.bottom:e.bottom,e.left=void 0!==a.left?a.left:e.left}},duration:{get:function(){return p},set:function(a){p=a,s.reset(p)}},scale:{get:function(){return d},set:function(e){d=e,c.scale(d),m="function"==typeof d.rangeBands,a.utils.inheritOptionsD3(b,d,["domain","range","rangeBand","rangeBands"])}}}),a.utils.initOptions(b),a.utils.inheritOptionsD3(b,c,["orient","tickValues","tickSubdivide","tickSize","tickPadding","tickFormat"]),a.utils.inheritOptionsD3(b,d,["domain","range","rangeBand","rangeBands"]),b},a.models.boxPlot=function(){"use strict";function b(l){return v.reset(),l.each(function(b){var l=j-i.left-i.right,p=k-i.top-i.bottom;r=d3.select(this),a.utils.initSVG(r),m.domain(c||b.map(function(a,b){return o(a,b)})).rangeBands(e||[0,l],.1);var w=[];if(!d){var x=d3.min(b.map(function(a){var b=[];return b.push(a.values.Q1),a.values.hasOwnProperty("whisker_low")&&null!==a.values.whisker_low&&b.push(a.values.whisker_low),a.values.hasOwnProperty("outliers")&&null!==a.values.outliers&&(b=b.concat(a.values.outliers)),d3.min(b)})),y=d3.max(b.map(function(a){var b=[];return b.push(a.values.Q3),a.values.hasOwnProperty("whisker_high")&&null!==a.values.whisker_high&&b.push(a.values.whisker_high),a.values.hasOwnProperty("outliers")&&null!==a.values.outliers&&(b=b.concat(a.values.outliers)),d3.max(b)}));w=[x,y]}n.domain(d||w),n.range(f||[p,0]),g=g||m,h=h||n.copy().range([n(0),n(0)]);{var z=r.selectAll("g.nv-wrap").data([b]);z.enter().append("g").attr("class","nvd3 nv-wrap")}z.attr("transform","translate("+i.left+","+i.top+")");var A=z.selectAll(".nv-boxplot").data(function(a){return a}),B=A.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6);A.attr("class","nv-boxplot").attr("transform",function(a,b){return"translate("+(m(o(a,b))+.05*m.rangeBand())+", 0)"}).classed("hover",function(a){return a.hover}),A.watchTransition(v,"nv-boxplot: boxplots").style("stroke-opacity",1).style("fill-opacity",.75).delay(function(a,c){return c*t/b.length}).attr("transform",function(a,b){return"translate("+(m(o(a,b))+.05*m.rangeBand())+", 0)"}),A.exit().remove(),B.each(function(a,b){var c=d3.select(this);["low","high"].forEach(function(d){a.values.hasOwnProperty("whisker_"+d)&&null!==a.values["whisker_"+d]&&(c.append("line").style("stroke",a.color?a.color:q(a,b)).attr("class","nv-boxplot-whisker nv-boxplot-"+d),c.append("line").style("stroke",a.color?a.color:q(a,b)).attr("class","nv-boxplot-tick nv-boxplot-"+d))})});var C=A.selectAll(".nv-boxplot-outlier").data(function(a){return a.values.hasOwnProperty("outliers")&&null!==a.values.outliers?a.values.outliers:[]});C.enter().append("circle").style("fill",function(a,b,c){return q(a,c)}).style("stroke",function(a,b,c){return q(a,c)}).on("mouseover",function(a,b,c){d3.select(this).classed("hover",!0),s.elementMouseover({series:{key:a,color:q(a,c)},e:d3.event})}).on("mouseout",function(a,b,c){d3.select(this).classed("hover",!1),s.elementMouseout({series:{key:a,color:q(a,c)},e:d3.event})}).on("mousemove",function(){s.elementMousemove({e:d3.event})}),C.attr("class","nv-boxplot-outlier"),C.watchTransition(v,"nv-boxplot: nv-boxplot-outlier").attr("cx",.45*m.rangeBand()).attr("cy",function(a){return n(a)}).attr("r","3"),C.exit().remove();var D=function(){return null===u?.9*m.rangeBand():Math.min(75,.9*m.rangeBand())},E=function(){return.45*m.rangeBand()-D()/2},F=function(){return.45*m.rangeBand()+D()/2};["low","high"].forEach(function(a){var b="low"===a?"Q1":"Q3";A.select("line.nv-boxplot-whisker.nv-boxplot-"+a).watchTransition(v,"nv-boxplot: boxplots").attr("x1",.45*m.rangeBand()).attr("y1",function(b){return n(b.values["whisker_"+a])}).attr("x2",.45*m.rangeBand()).attr("y2",function(a){return n(a.values[b])}),A.select("line.nv-boxplot-tick.nv-boxplot-"+a).watchTransition(v,"nv-boxplot: boxplots").attr("x1",E).attr("y1",function(b){return n(b.values["whisker_"+a])}).attr("x2",F).attr("y2",function(b){return n(b.values["whisker_"+a])})}),["low","high"].forEach(function(a){B.selectAll(".nv-boxplot-"+a).on("mouseover",function(b,c,d){d3.select(this).classed("hover",!0),s.elementMouseover({series:{key:b.values["whisker_"+a],color:q(b,d)},e:d3.event})}).on("mouseout",function(b,c,d){d3.select(this).classed("hover",!1),s.elementMouseout({series:{key:b.values["whisker_"+a],color:q(b,d)},e:d3.event})}).on("mousemove",function(){s.elementMousemove({e:d3.event})})}),B.append("rect").attr("class","nv-boxplot-box").on("mouseover",function(a,b){d3.select(this).classed("hover",!0),s.elementMouseover({key:a.label,value:a.label,series:[{key:"Q3",value:a.values.Q3,color:a.color||q(a,b)},{key:"Q2",value:a.values.Q2,color:a.color||q(a,b)},{key:"Q1",value:a.values.Q1,color:a.color||q(a,b)}],data:a,index:b,e:d3.event})}).on("mouseout",function(a,b){d3.select(this).classed("hover",!1),s.elementMouseout({key:a.label,value:a.label,series:[{key:"Q3",value:a.values.Q3,color:a.color||q(a,b)},{key:"Q2",value:a.values.Q2,color:a.color||q(a,b)},{key:"Q1",value:a.values.Q1,color:a.color||q(a,b)}],data:a,index:b,e:d3.event})}).on("mousemove",function(){s.elementMousemove({e:d3.event})}),A.select("rect.nv-boxplot-box").watchTransition(v,"nv-boxplot: boxes").attr("y",function(a){return n(a.values.Q3)}).attr("width",D).attr("x",E).attr("height",function(a){return Math.abs(n(a.values.Q3)-n(a.values.Q1))||1}).style("fill",function(a,b){return a.color||q(a,b)}).style("stroke",function(a,b){return a.color||q(a,b)}),B.append("line").attr("class","nv-boxplot-median"),A.select("line.nv-boxplot-median").watchTransition(v,"nv-boxplot: boxplots line").attr("x1",E).attr("y1",function(a){return n(a.values.Q2)}).attr("x2",F).attr("y2",function(a){return n(a.values.Q2)}),g=m.copy(),h=n.copy()}),v.renderEnd("nv-boxplot immediate"),b}var c,d,e,f,g,h,i={top:0,right:0,bottom:0,left:0},j=960,k=500,l=Math.floor(1e4*Math.random()),m=d3.scale.ordinal(),n=d3.scale.linear(),o=function(a){return a.x},p=function(a){return a.y},q=a.utils.defaultColor(),r=null,s=d3.dispatch("elementMouseover","elementMouseout","elementMousemove","renderEnd"),t=250,u=null,v=a.utils.renderWatch(s,t);return b.dispatch=s,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return j},set:function(a){j=a}},height:{get:function(){return k},set:function(a){k=a}},maxBoxWidth:{get:function(){return u},set:function(a){u=a}},x:{get:function(){return o},set:function(a){o=a}},y:{get:function(){return p},set:function(a){p=a}},xScale:{get:function(){return m},set:function(a){m=a}},yScale:{get:function(){return n},set:function(a){n=a}},xDomain:{get:function(){return c},set:function(a){c=a}},yDomain:{get:function(){return d},set:function(a){d=a}},xRange:{get:function(){return e},set:function(a){e=a}},yRange:{get:function(){return f},set:function(a){f=a}},id:{get:function(){return l},set:function(a){l=a}},margin:{get:function(){return i},set:function(a){i.top=void 0!==a.top?a.top:i.top,i.right=void 0!==a.right?a.right:i.right,i.bottom=void 0!==a.bottom?a.bottom:i.bottom,i.left=void 0!==a.left?a.left:i.left}},color:{get:function(){return q},set:function(b){q=a.utils.getColor(b)}},duration:{get:function(){return t},set:function(a){t=a,v.reset(t)}}}),a.utils.initOptions(b),b},a.models.boxPlotChart=function(){"use strict";function b(k){return t.reset(),t.models(e),l&&t.models(f),m&&t.models(g),k.each(function(k){var p=d3.select(this);a.utils.initSVG(p);var t=(i||parseInt(p.style("width"))||960)-h.left-h.right,u=(j||parseInt(p.style("height"))||400)-h.top-h.bottom;if(b.update=function(){r.beforeUpdate(),p.transition().duration(s).call(b)},b.container=this,!(k&&k.length&&k.filter(function(a){return a.values.hasOwnProperty("Q1")&&a.values.hasOwnProperty("Q2")&&a.values.hasOwnProperty("Q3")}).length)){var v=p.selectAll(".nv-noData").data([q]);return v.enter().append("text").attr("class","nvd3 nv-noData").attr("dy","-.7em").style("text-anchor","middle"),v.attr("x",h.left+t/2).attr("y",h.top+u/2).text(function(a){return a}),b}p.selectAll(".nv-noData").remove(),c=e.xScale(),d=e.yScale().clamp(!0);var w=p.selectAll("g.nv-wrap.nv-boxPlotWithAxes").data([k]),x=w.enter().append("g").attr("class","nvd3 nv-wrap nv-boxPlotWithAxes").append("g"),y=x.append("defs"),z=w.select("g");
x.append("g").attr("class","nv-x nv-axis"),x.append("g").attr("class","nv-y nv-axis").append("g").attr("class","nv-zeroLine").append("line"),x.append("g").attr("class","nv-barsWrap"),z.attr("transform","translate("+h.left+","+h.top+")"),n&&z.select(".nv-y.nv-axis").attr("transform","translate("+t+",0)"),e.width(t).height(u);var A=z.select(".nv-barsWrap").datum(k.filter(function(a){return!a.disabled}));if(A.transition().call(e),y.append("clipPath").attr("id","nv-x-label-clip-"+e.id()).append("rect"),z.select("#nv-x-label-clip-"+e.id()+" rect").attr("width",c.rangeBand()*(o?2:1)).attr("height",16).attr("x",-c.rangeBand()/(o?1:2)),l){f.scale(c).ticks(a.utils.calcTicksX(t/100,k)).tickSize(-u,0),z.select(".nv-x.nv-axis").attr("transform","translate(0,"+d.range()[0]+")"),z.select(".nv-x.nv-axis").call(f);var B=z.select(".nv-x.nv-axis").selectAll("g");o&&B.selectAll("text").attr("transform",function(a,b,c){return"translate(0,"+(c%2==0?"5":"17")+")"})}m&&(g.scale(d).ticks(Math.floor(u/36)).tickSize(-t,0),z.select(".nv-y.nv-axis").call(g)),z.select(".nv-zeroLine line").attr("x1",0).attr("x2",t).attr("y1",d(0)).attr("y2",d(0))}),t.renderEnd("nv-boxplot chart immediate"),b}var c,d,e=a.models.boxPlot(),f=a.models.axis(),g=a.models.axis(),h={top:15,right:10,bottom:50,left:60},i=null,j=null,k=a.utils.getColor(),l=!0,m=!0,n=!1,o=!1,p=a.models.tooltip(),q="No Data Available.",r=d3.dispatch("tooltipShow","tooltipHide","beforeUpdate","renderEnd"),s=250;f.orient("bottom").showMaxMin(!1).tickFormat(function(a){return a}),g.orient(n?"right":"left").tickFormat(d3.format(",.1f")),p.duration(0);var t=a.utils.renderWatch(r,s);return e.dispatch.on("elementMouseover.tooltip",function(a){p.data(a).hidden(!1)}),e.dispatch.on("elementMouseout.tooltip",function(a){p.data(a).hidden(!0)}),e.dispatch.on("elementMousemove.tooltip",function(){p.position({top:d3.event.pageY,left:d3.event.pageX})()}),b.dispatch=r,b.boxplot=e,b.xAxis=f,b.yAxis=g,b.tooltip=p,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return i},set:function(a){i=a}},height:{get:function(){return j},set:function(a){j=a}},staggerLabels:{get:function(){return o},set:function(a){o=a}},showXAxis:{get:function(){return l},set:function(a){l=a}},showYAxis:{get:function(){return m},set:function(a){m=a}},tooltips:{get:function(){return tooltips},set:function(a){tooltips=a}},tooltipContent:{get:function(){return p},set:function(a){p=a}},noData:{get:function(){return q},set:function(a){q=a}},margin:{get:function(){return h},set:function(a){h.top=void 0!==a.top?a.top:h.top,h.right=void 0!==a.right?a.right:h.right,h.bottom=void 0!==a.bottom?a.bottom:h.bottom,h.left=void 0!==a.left?a.left:h.left}},duration:{get:function(){return s},set:function(a){s=a,t.reset(s),e.duration(s),f.duration(s),g.duration(s)}},color:{get:function(){return k},set:function(b){k=a.utils.getColor(b),e.color(k)}},rightAlignYAxis:{get:function(){return n},set:function(a){n=a,g.orient(a?"right":"left")}}}),a.utils.inheritOptions(b,e),a.utils.initOptions(b),b},a.models.bullet=function(){"use strict";function b(d){return d.each(function(b,d){var p=m-c.left-c.right,s=n-c.top-c.bottom;o=d3.select(this),a.utils.initSVG(o);{var t=f.call(this,b,d).slice().sort(d3.descending),u=g.call(this,b,d).slice().sort(d3.descending),v=h.call(this,b,d).slice().sort(d3.descending),w=i.call(this,b,d).slice(),x=j.call(this,b,d).slice(),y=k.call(this,b,d).slice(),z=d3.scale.linear().domain(d3.extent(d3.merge([l,t]))).range(e?[p,0]:[0,p]);this.__chart__||d3.scale.linear().domain([0,1/0]).range(z.range())}this.__chart__=z;var A=d3.min(t),B=d3.max(t),C=t[1],D=o.selectAll("g.nv-wrap.nv-bullet").data([b]),E=D.enter().append("g").attr("class","nvd3 nv-wrap nv-bullet"),F=E.append("g"),G=D.select("g");F.append("rect").attr("class","nv-range nv-rangeMax"),F.append("rect").attr("class","nv-range nv-rangeAvg"),F.append("rect").attr("class","nv-range nv-rangeMin"),F.append("rect").attr("class","nv-measure"),D.attr("transform","translate("+c.left+","+c.top+")");var H=function(a){return Math.abs(z(a)-z(0))},I=function(a){return z(0>a?a:0)};G.select("rect.nv-rangeMax").attr("height",s).attr("width",H(B>0?B:A)).attr("x",I(B>0?B:A)).datum(B>0?B:A),G.select("rect.nv-rangeAvg").attr("height",s).attr("width",H(C)).attr("x",I(C)).datum(C),G.select("rect.nv-rangeMin").attr("height",s).attr("width",H(B)).attr("x",I(B)).attr("width",H(B>0?A:B)).attr("x",I(B>0?A:B)).datum(B>0?A:B),G.select("rect.nv-measure").style("fill",q).attr("height",s/3).attr("y",s/3).attr("width",0>v?z(0)-z(v[0]):z(v[0])-z(0)).attr("x",I(v)).on("mouseover",function(){r.elementMouseover({value:v[0],label:y[0]||"Current",color:d3.select(this).style("fill")})}).on("mousemove",function(){r.elementMousemove({value:v[0],label:y[0]||"Current",color:d3.select(this).style("fill")})}).on("mouseout",function(){r.elementMouseout({value:v[0],label:y[0]||"Current",color:d3.select(this).style("fill")})});var J=s/6,K=u.map(function(a,b){return{value:a,label:x[b]}});F.selectAll("path.nv-markerTriangle").data(K).enter().append("path").attr("class","nv-markerTriangle").attr("transform",function(a){return"translate("+z(a.value)+","+s/2+")"}).attr("d","M0,"+J+"L"+J+","+-J+" "+-J+","+-J+"Z").on("mouseover",function(a){r.elementMouseover({value:a.value,label:a.label||"Previous",color:d3.select(this).style("fill"),pos:[z(a.value),s/2]})}).on("mousemove",function(a){r.elementMousemove({value:a.value,label:a.label||"Previous",color:d3.select(this).style("fill")})}).on("mouseout",function(a){r.elementMouseout({value:a.value,label:a.label||"Previous",color:d3.select(this).style("fill")})}),D.selectAll(".nv-range").on("mouseover",function(a,b){var c=w[b]||(b?1==b?"Mean":"Minimum":"Maximum");r.elementMouseover({value:a,label:c,color:d3.select(this).style("fill")})}).on("mousemove",function(){r.elementMousemove({value:v[0],label:y[0]||"Previous",color:d3.select(this).style("fill")})}).on("mouseout",function(a,b){var c=w[b]||(b?1==b?"Mean":"Minimum":"Maximum");r.elementMouseout({value:a,label:c,color:d3.select(this).style("fill")})})}),b}var c={top:0,right:0,bottom:0,left:0},d="left",e=!1,f=function(a){return a.ranges},g=function(a){return a.markers?a.markers:[0]},h=function(a){return a.measures},i=function(a){return a.rangeLabels?a.rangeLabels:[]},j=function(a){return a.markerLabels?a.markerLabels:[]},k=function(a){return a.measureLabels?a.measureLabels:[]},l=[0],m=380,n=30,o=null,p=null,q=a.utils.getColor(["#1f77b4"]),r=d3.dispatch("elementMouseover","elementMouseout","elementMousemove");return b.dispatch=r,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{ranges:{get:function(){return f},set:function(a){f=a}},markers:{get:function(){return g},set:function(a){g=a}},measures:{get:function(){return h},set:function(a){h=a}},forceX:{get:function(){return l},set:function(a){l=a}},width:{get:function(){return m},set:function(a){m=a}},height:{get:function(){return n},set:function(a){n=a}},tickFormat:{get:function(){return p},set:function(a){p=a}},margin:{get:function(){return c},set:function(a){c.top=void 0!==a.top?a.top:c.top,c.right=void 0!==a.right?a.right:c.right,c.bottom=void 0!==a.bottom?a.bottom:c.bottom,c.left=void 0!==a.left?a.left:c.left}},orient:{get:function(){return d},set:function(a){d=a,e="right"==d||"bottom"==d}},color:{get:function(){return q},set:function(b){q=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.bulletChart=function(){"use strict";function b(d){return d.each(function(e,o){var p=d3.select(this);a.utils.initSVG(p);var q=a.utils.availableWidth(k,p,g),r=l-g.top-g.bottom;if(b.update=function(){b(d)},b.container=this,!e||!h.call(this,e,o))return a.utils.noData(b,p),b;p.selectAll(".nv-noData").remove();var s=h.call(this,e,o).slice().sort(d3.descending),t=i.call(this,e,o).slice().sort(d3.descending),u=j.call(this,e,o).slice().sort(d3.descending),v=p.selectAll("g.nv-wrap.nv-bulletChart").data([e]),w=v.enter().append("g").attr("class","nvd3 nv-wrap nv-bulletChart"),x=w.append("g"),y=v.select("g");x.append("g").attr("class","nv-bulletWrap"),x.append("g").attr("class","nv-titles"),v.attr("transform","translate("+g.left+","+g.top+")");var z=d3.scale.linear().domain([0,Math.max(s[0],t[0],u[0])]).range(f?[q,0]:[0,q]),A=this.__chart__||d3.scale.linear().domain([0,1/0]).range(z.range());this.__chart__=z;var B=x.select(".nv-titles").append("g").attr("text-anchor","end").attr("transform","translate(-6,"+(l-g.top-g.bottom)/2+")");B.append("text").attr("class","nv-title").text(function(a){return a.title}),B.append("text").attr("class","nv-subtitle").attr("dy","1em").text(function(a){return a.subtitle}),c.width(q).height(r);var C=y.select(".nv-bulletWrap");d3.transition(C).call(c);var D=m||z.tickFormat(q/100),E=y.selectAll("g.nv-tick").data(z.ticks(n?n:q/50),function(a){return this.textContent||D(a)}),F=E.enter().append("g").attr("class","nv-tick").attr("transform",function(a){return"translate("+A(a)+",0)"}).style("opacity",1e-6);F.append("line").attr("y1",r).attr("y2",7*r/6),F.append("text").attr("text-anchor","middle").attr("dy","1em").attr("y",7*r/6).text(D);var G=d3.transition(E).attr("transform",function(a){return"translate("+z(a)+",0)"}).style("opacity",1);G.select("line").attr("y1",r).attr("y2",7*r/6),G.select("text").attr("y",7*r/6),d3.transition(E.exit()).attr("transform",function(a){return"translate("+z(a)+",0)"}).style("opacity",1e-6).remove()}),d3.timer.flush(),b}var c=a.models.bullet(),d=a.models.tooltip(),e="left",f=!1,g={top:5,right:40,bottom:20,left:120},h=function(a){return a.ranges},i=function(a){return a.markers?a.markers:[0]},j=function(a){return a.measures},k=null,l=55,m=null,n=null,o=null,p=d3.dispatch("tooltipShow","tooltipHide");return d.duration(0).headerEnabled(!1),c.dispatch.on("elementMouseover.tooltip",function(a){a.series={key:a.label,value:a.value,color:a.color},d.data(a).hidden(!1)}),c.dispatch.on("elementMouseout.tooltip",function(){d.hidden(!0)}),c.dispatch.on("elementMousemove.tooltip",function(){d.position({top:d3.event.pageY,left:d3.event.pageX})()}),b.bullet=c,b.dispatch=p,b.tooltip=d,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{ranges:{get:function(){return h},set:function(a){h=a}},markers:{get:function(){return i},set:function(a){i=a}},measures:{get:function(){return j},set:function(a){j=a}},width:{get:function(){return k},set:function(a){k=a}},height:{get:function(){return l},set:function(a){l=a}},tickFormat:{get:function(){return m},set:function(a){m=a}},ticks:{get:function(){return n},set:function(a){n=a}},noData:{get:function(){return o},set:function(a){o=a}},tooltips:{get:function(){return d.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),d.enabled(!!b)}},tooltipContent:{get:function(){return d.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),d.contentGenerator(b)}},margin:{get:function(){return g},set:function(a){g.top=void 0!==a.top?a.top:g.top,g.right=void 0!==a.right?a.right:g.right,g.bottom=void 0!==a.bottom?a.bottom:g.bottom,g.left=void 0!==a.left?a.left:g.left}},orient:{get:function(){return e},set:function(a){e=a,f="right"==e||"bottom"==e}}}),a.utils.inheritOptions(b,c),a.utils.initOptions(b),b},a.models.candlestickBar=function(){"use strict";function b(x){return x.each(function(b){c=d3.select(this);var x=a.utils.availableWidth(i,c,h),y=a.utils.availableHeight(j,c,h);a.utils.initSVG(c);var A=x/b[0].values.length*.45;l.domain(d||d3.extent(b[0].values.map(n).concat(t))),l.range(v?f||[.5*x/b[0].values.length,x*(b[0].values.length-.5)/b[0].values.length]:f||[5+A/2,x-A/2-5]),m.domain(e||[d3.min(b[0].values.map(s).concat(u)),d3.max(b[0].values.map(r).concat(u))]).range(g||[y,0]),l.domain()[0]===l.domain()[1]&&l.domain(l.domain()[0]?[l.domain()[0]-.01*l.domain()[0],l.domain()[1]+.01*l.domain()[1]]:[-1,1]),m.domain()[0]===m.domain()[1]&&m.domain(m.domain()[0]?[m.domain()[0]+.01*m.domain()[0],m.domain()[1]-.01*m.domain()[1]]:[-1,1]);var B=d3.select(this).selectAll("g.nv-wrap.nv-candlestickBar").data([b[0].values]),C=B.enter().append("g").attr("class","nvd3 nv-wrap nv-candlestickBar"),D=C.append("defs"),E=C.append("g"),F=B.select("g");E.append("g").attr("class","nv-ticks"),B.attr("transform","translate("+h.left+","+h.top+")"),c.on("click",function(a,b){z.chartClick({data:a,index:b,pos:d3.event,id:k})}),D.append("clipPath").attr("id","nv-chart-clip-path-"+k).append("rect"),B.select("#nv-chart-clip-path-"+k+" rect").attr("width",x).attr("height",y),F.attr("clip-path",w?"url(#nv-chart-clip-path-"+k+")":"");var G=B.select(".nv-ticks").selectAll(".nv-tick").data(function(a){return a});G.exit().remove();{var H=G.enter().append("g").attr("class",function(a,b,c){return(p(a,b)>q(a,b)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+c+"-"+b});H.append("line").attr("class","nv-candlestick-lines").attr("transform",function(a,b){return"translate("+l(n(a,b))+",0)"}).attr("x1",0).attr("y1",function(a,b){return m(r(a,b))}).attr("x2",0).attr("y2",function(a,b){return m(s(a,b))}),H.append("rect").attr("class","nv-candlestick-rects nv-bars").attr("transform",function(a,b){return"translate("+(l(n(a,b))-A/2)+","+(m(o(a,b))-(p(a,b)>q(a,b)?m(q(a,b))-m(p(a,b)):0))+")"}).attr("x",0).attr("y",0).attr("width",A).attr("height",function(a,b){var c=p(a,b),d=q(a,b);return c>d?m(d)-m(c):m(c)-m(d)})}c.selectAll(".nv-candlestick-lines").transition().attr("transform",function(a,b){return"translate("+l(n(a,b))+",0)"}).attr("x1",0).attr("y1",function(a,b){return m(r(a,b))}).attr("x2",0).attr("y2",function(a,b){return m(s(a,b))}),c.selectAll(".nv-candlestick-rects").transition().attr("transform",function(a,b){return"translate("+(l(n(a,b))-A/2)+","+(m(o(a,b))-(p(a,b)>q(a,b)?m(q(a,b))-m(p(a,b)):0))+")"}).attr("x",0).attr("y",0).attr("width",A).attr("height",function(a,b){var c=p(a,b),d=q(a,b);return c>d?m(d)-m(c):m(c)-m(d)})}),b}var c,d,e,f,g,h={top:0,right:0,bottom:0,left:0},i=null,j=null,k=Math.floor(1e4*Math.random()),l=d3.scale.linear(),m=d3.scale.linear(),n=function(a){return a.x},o=function(a){return a.y},p=function(a){return a.open},q=function(a){return a.close},r=function(a){return a.high},s=function(a){return a.low},t=[],u=[],v=!1,w=!0,x=a.utils.defaultColor(),y=!1,z=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState","renderEnd","chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout","elementMousemove");return b.highlightPoint=function(a,d){b.clearHighlights(),c.select(".nv-candlestickBar .nv-tick-0-"+a).classed("hover",d)},b.clearHighlights=function(){c.select(".nv-candlestickBar .nv-tick.hover").classed("hover",!1)},b.dispatch=z,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return i},set:function(a){i=a}},height:{get:function(){return j},set:function(a){j=a}},xScale:{get:function(){return l},set:function(a){l=a}},yScale:{get:function(){return m},set:function(a){m=a}},xDomain:{get:function(){return d},set:function(a){d=a}},yDomain:{get:function(){return e},set:function(a){e=a}},xRange:{get:function(){return f},set:function(a){f=a}},yRange:{get:function(){return g},set:function(a){g=a}},forceX:{get:function(){return t},set:function(a){t=a}},forceY:{get:function(){return u},set:function(a){u=a}},padData:{get:function(){return v},set:function(a){v=a}},clipEdge:{get:function(){return w},set:function(a){w=a}},id:{get:function(){return k},set:function(a){k=a}},interactive:{get:function(){return y},set:function(a){y=a}},x:{get:function(){return n},set:function(a){n=a}},y:{get:function(){return o},set:function(a){o=a}},open:{get:function(){return p()},set:function(a){p=a}},close:{get:function(){return q()},set:function(a){q=a}},high:{get:function(){return r},set:function(a){r=a}},low:{get:function(){return s},set:function(a){s=a}},margin:{get:function(){return h},set:function(a){h.top=void 0!=a.top?a.top:h.top,h.right=void 0!=a.right?a.right:h.right,h.bottom=void 0!=a.bottom?a.bottom:h.bottom,h.left=void 0!=a.left?a.left:h.left}},color:{get:function(){return x},set:function(b){x=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.cumulativeLineChart=function(){"use strict";function b(l){return H.reset(),H.models(f),r&&H.models(g),s&&H.models(h),l.each(function(l){function A(){d3.select(b.container).style("cursor","ew-resize")}function E(){G.x=d3.event.x,G.i=Math.round(F.invert(G.x)),K()}function H(){d3.select(b.container).style("cursor","auto"),y.index=G.i,C.stateChange(y)}function K(){bb.data([G]);var a=b.duration();b.duration(0),b.update(),b.duration(a)}var L=d3.select(this);a.utils.initSVG(L),L.classed("nv-chart-"+x,!0);var M=this,N=a.utils.availableWidth(o,L,m),O=a.utils.availableHeight(p,L,m);if(b.update=function(){0===D?L.call(b):L.transition().duration(D).call(b)},b.container=this,y.setter(J(l),b.update).getter(I(l)).update(),y.disabled=l.map(function(a){return!!a.disabled}),!z){var P;z={};for(P in y)z[P]=y[P]instanceof Array?y[P].slice(0):y[P]}var Q=d3.behavior.drag().on("dragstart",A).on("drag",E).on("dragend",H);if(!(l&&l.length&&l.filter(function(a){return a.values.length}).length))return a.utils.noData(b,L),b;if(L.selectAll(".nv-noData").remove(),d=f.xScale(),e=f.yScale(),w)f.yDomain(null);else{var R=l.filter(function(a){return!a.disabled}).map(function(a){var b=d3.extent(a.values,f.y());return b[0]<-.95&&(b[0]=-.95),[(b[0]-b[1])/(1+b[1]),(b[1]-b[0])/(1+b[0])]}),S=[d3.min(R,function(a){return a[0]}),d3.max(R,function(a){return a[1]})];f.yDomain(S)}F.domain([0,l[0].values.length-1]).range([0,N]).clamp(!0);var l=c(G.i,l),T=v?"none":"all",U=L.selectAll("g.nv-wrap.nv-cumulativeLine").data([l]),V=U.enter().append("g").attr("class","nvd3 nv-wrap nv-cumulativeLine").append("g"),W=U.select("g");if(V.append("g").attr("class","nv-interactive"),V.append("g").attr("class","nv-x nv-axis").style("pointer-events","none"),V.append("g").attr("class","nv-y nv-axis"),V.append("g").attr("class","nv-background"),V.append("g").attr("class","nv-linesWrap").style("pointer-events",T),V.append("g").attr("class","nv-avgLinesWrap").style("pointer-events","none"),V.append("g").attr("class","nv-legendWrap"),V.append("g").attr("class","nv-controlsWrap"),q&&(i.width(N),W.select(".nv-legendWrap").datum(l).call(i),m.top!=i.height()&&(m.top=i.height(),O=a.utils.availableHeight(p,L,m)),W.select(".nv-legendWrap").attr("transform","translate(0,"+-m.top+")")),u){var X=[{key:"Re-scale y-axis",disabled:!w}];j.width(140).color(["#444","#444","#444"]).rightAlign(!1).margin({top:5,right:0,bottom:5,left:20}),W.select(".nv-controlsWrap").datum(X).attr("transform","translate(0,"+-m.top+")").call(j)}U.attr("transform","translate("+m.left+","+m.top+")"),t&&W.select(".nv-y.nv-axis").attr("transform","translate("+N+",0)");var Y=l.filter(function(a){return a.tempDisabled});U.select(".tempDisabled").remove(),Y.length&&U.append("text").attr("class","tempDisabled").attr("x",N/2).attr("y","-.71em").style("text-anchor","end").text(Y.map(function(a){return a.key}).join(", ")+" values cannot be calculated for this time period."),v&&(k.width(N).height(O).margin({left:m.left,top:m.top}).svgContainer(L).xScale(d),U.select(".nv-interactive").call(k)),V.select(".nv-background").append("rect"),W.select(".nv-background rect").attr("width",N).attr("height",O),f.y(function(a){return a.display.y}).width(N).height(O).color(l.map(function(a,b){return a.color||n(a,b)}).filter(function(a,b){return!l[b].disabled&&!l[b].tempDisabled}));var Z=W.select(".nv-linesWrap").datum(l.filter(function(a){return!a.disabled&&!a.tempDisabled}));Z.call(f),l.forEach(function(a,b){a.seriesIndex=b});var $=l.filter(function(a){return!a.disabled&&!!B(a)}),_=W.select(".nv-avgLinesWrap").selectAll("line").data($,function(a){return a.key}),ab=function(a){var b=e(B(a));return 0>b?0:b>O?O:b};_.enter().append("line").style("stroke-width",2).style("stroke-dasharray","10,10").style("stroke",function(a){return f.color()(a,a.seriesIndex)}).attr("x1",0).attr("x2",N).attr("y1",ab).attr("y2",ab),_.style("stroke-opacity",function(a){var b=e(B(a));return 0>b||b>O?0:1}).attr("x1",0).attr("x2",N).attr("y1",ab).attr("y2",ab),_.exit().remove();var bb=Z.selectAll(".nv-indexLine").data([G]);bb.enter().append("rect").attr("class","nv-indexLine").attr("width",3).attr("x",-2).attr("fill","red").attr("fill-opacity",.5).style("pointer-events","all").call(Q),bb.attr("transform",function(a){return"translate("+F(a.i)+",0)"}).attr("height",O),r&&(g.scale(d)._ticks(a.utils.calcTicksX(N/70,l)).tickSize(-O,0),W.select(".nv-x.nv-axis").attr("transform","translate(0,"+e.range()[0]+")"),W.select(".nv-x.nv-axis").call(g)),s&&(h.scale(e)._ticks(a.utils.calcTicksY(O/36,l)).tickSize(-N,0),W.select(".nv-y.nv-axis").call(h)),W.select(".nv-background rect").on("click",function(){G.x=d3.mouse(this)[0],G.i=Math.round(F.invert(G.x)),y.index=G.i,C.stateChange(y),K()}),f.dispatch.on("elementClick",function(a){G.i=a.pointIndex,G.x=F(G.i),y.index=G.i,C.stateChange(y),K()}),j.dispatch.on("legendClick",function(a){a.disabled=!a.disabled,w=!a.disabled,y.rescaleY=w,C.stateChange(y),b.update()}),i.dispatch.on("stateChange",function(a){for(var c in a)y[c]=a[c];C.stateChange(y),b.update()}),k.dispatch.on("elementMousemove",function(c){f.clearHighlights();var d,e,i,j=[];if(l.filter(function(a,b){return a.seriesIndex=b,!a.disabled}).forEach(function(g,h){e=a.interactiveBisect(g.values,c.pointXValue,b.x()),f.highlightPoint(h,e,!0);var k=g.values[e];"undefined"!=typeof k&&("undefined"==typeof d&&(d=k),"undefined"==typeof i&&(i=b.xScale()(b.x()(k,e))),j.push({key:g.key,value:b.y()(k,e),color:n(g,g.seriesIndex)}))}),j.length>2){var o=b.yScale().invert(c.mouseY),p=Math.abs(b.yScale().domain()[0]-b.yScale().domain()[1]),q=.03*p,r=a.nearestValueIndex(j.map(function(a){return a.value}),o,q);null!==r&&(j[r].highlight=!0)}var s=g.tickFormat()(b.x()(d,e),e);k.tooltip.position({left:i+m.left,top:c.mouseY+m.top}).chartContainer(M.parentNode).valueFormatter(function(a){return h.tickFormat()(a)}).data({value:s,series:j})(),k.renderGuideLine(i)}),k.dispatch.on("elementMouseout",function(){f.clearHighlights()}),C.on("changeState",function(a){"undefined"!=typeof a.disabled&&(l.forEach(function(b,c){b.disabled=a.disabled[c]}),y.disabled=a.disabled),"undefined"!=typeof a.index&&(G.i=a.index,G.x=F(G.i),y.index=a.index,bb.data([G])),"undefined"!=typeof a.rescaleY&&(w=a.rescaleY),b.update()})}),H.renderEnd("cumulativeLineChart immediate"),b}function c(a,b){return K||(K=f.y()),b.map(function(b){if(!b.values)return b;var c=b.values[a];if(null==c)return b;var d=K(c,a);return-.95>d&&!E?(b.tempDisabled=!0,b):(b.tempDisabled=!1,b.values=b.values.map(function(a,b){return a.display={y:(K(a,b)-d)/(1+d)},a}),b)})}var d,e,f=a.models.line(),g=a.models.axis(),h=a.models.axis(),i=a.models.legend(),j=a.models.legend(),k=a.interactiveGuideline(),l=a.models.tooltip(),m={top:30,right:30,bottom:50,left:60},n=a.utils.defaultColor(),o=null,p=null,q=!0,r=!0,s=!0,t=!1,u=!0,v=!1,w=!0,x=f.id(),y=a.utils.state(),z=null,A=null,B=function(a){return a.average},C=d3.dispatch("stateChange","changeState","renderEnd"),D=250,E=!1;y.index=0,y.rescaleY=w,g.orient("bottom").tickPadding(7),h.orient(t?"right":"left"),l.valueFormatter(function(a,b){return h.tickFormat()(a,b)}).headerFormatter(function(a,b){return g.tickFormat()(a,b)}),j.updateState(!1);var F=d3.scale.linear(),G={i:0,x:0},H=a.utils.renderWatch(C,D),I=function(a){return function(){return{active:a.map(function(a){return!a.disabled}),index:G.i,rescaleY:w}}},J=function(a){return function(b){void 0!==b.index&&(G.i=b.index),void 0!==b.rescaleY&&(w=b.rescaleY),void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}};f.dispatch.on("elementMouseover.tooltip",function(a){var c={x:b.x()(a.point),y:b.y()(a.point),color:a.point.color};a.point=c,l.data(a).position(a.pos).hidden(!1)}),f.dispatch.on("elementMouseout.tooltip",function(){l.hidden(!0)});var K=null;return b.dispatch=C,b.lines=f,b.legend=i,b.controls=j,b.xAxis=g,b.yAxis=h,b.interactiveLayer=k,b.state=y,b.tooltip=l,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return o},set:function(a){o=a}},height:{get:function(){return p},set:function(a){p=a}},rescaleY:{get:function(){return w},set:function(a){w=a}},showControls:{get:function(){return u},set:function(a){u=a}},showLegend:{get:function(){return q},set:function(a){q=a}},average:{get:function(){return B},set:function(a){B=a}},defaultState:{get:function(){return z},set:function(a){z=a}},noData:{get:function(){return A},set:function(a){A=a}},showXAxis:{get:function(){return r},set:function(a){r=a}},showYAxis:{get:function(){return s},set:function(a){s=a}},noErrorCheck:{get:function(){return E},set:function(a){E=a}},tooltips:{get:function(){return l.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),l.enabled(!!b)}},tooltipContent:{get:function(){return l.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),l.contentGenerator(b)}},margin:{get:function(){return m},set:function(a){m.top=void 0!==a.top?a.top:m.top,m.right=void 0!==a.right?a.right:m.right,m.bottom=void 0!==a.bottom?a.bottom:m.bottom,m.left=void 0!==a.left?a.left:m.left}},color:{get:function(){return n},set:function(b){n=a.utils.getColor(b),i.color(n)}},useInteractiveGuideline:{get:function(){return v},set:function(a){v=a,a===!0&&(b.interactive(!1),b.useVoronoi(!1))}},rightAlignYAxis:{get:function(){return t},set:function(a){t=a,h.orient(a?"right":"left")}},duration:{get:function(){return D},set:function(a){D=a,f.duration(D),g.duration(D),h.duration(D),H.reset(D)}}}),a.utils.inheritOptions(b,f),a.utils.initOptions(b),b},a.models.discreteBar=function(){"use strict";function b(m){return y.reset(),m.each(function(b){var m=k-j.left-j.right,x=l-j.top-j.bottom;c=d3.select(this),a.utils.initSVG(c),b.forEach(function(a,b){a.values.forEach(function(a){a.series=b})});var z=d&&e?[]:b.map(function(a){return a.values.map(function(a,b){return{x:p(a,b),y:q(a,b),y0:a.y0}})});n.domain(d||d3.merge(z).map(function(a){return a.x})).rangeBands(f||[0,m],.1),o.domain(e||d3.extent(d3.merge(z).map(function(a){return a.y}).concat(r))),o.range(t?g||[x-(o.domain()[0]<0?12:0),o.domain()[1]>0?12:0]:g||[x,0]),h=h||n,i=i||o.copy().range([o(0),o(0)]);{var A=c.selectAll("g.nv-wrap.nv-discretebar").data([b]),B=A.enter().append("g").attr("class","nvd3 nv-wrap nv-discretebar"),C=B.append("g");A.select("g")}C.append("g").attr("class","nv-groups"),A.attr("transform","translate("+j.left+","+j.top+")");var D=A.select(".nv-groups").selectAll(".nv-group").data(function(a){return a},function(a){return a.key});D.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),D.exit().watchTransition(y,"discreteBar: exit groups").style("stroke-opacity",1e-6).style("fill-opacity",1e-6).remove(),D.attr("class",function(a,b){return"nv-group nv-series-"+b}).classed("hover",function(a){return a.hover}),D.watchTransition(y,"discreteBar: groups").style("stroke-opacity",1).style("fill-opacity",.75);var E=D.selectAll("g.nv-bar").data(function(a){return a.values});E.exit().remove();var F=E.enter().append("g").attr("transform",function(a,b){return"translate("+(n(p(a,b))+.05*n.rangeBand())+", "+o(0)+")"}).on("mouseover",function(a,b){d3.select(this).classed("hover",!0),v.elementMouseover({data:a,index:b,color:d3.select(this).style("fill")})}).on("mouseout",function(a,b){d3.select(this).classed("hover",!1),v.elementMouseout({data:a,index:b,color:d3.select(this).style("fill")})}).on("mousemove",function(a,b){v.elementMousemove({data:a,index:b,color:d3.select(this).style("fill")})}).on("click",function(a,b){v.elementClick({data:a,index:b,color:d3.select(this).style("fill")}),d3.event.stopPropagation()}).on("dblclick",function(a,b){v.elementDblClick({data:a,index:b,color:d3.select(this).style("fill")}),d3.event.stopPropagation()});F.append("rect").attr("height",0).attr("width",.9*n.rangeBand()/b.length),t?(F.append("text").attr("text-anchor","middle"),E.select("text").text(function(a,b){return u(q(a,b))}).watchTransition(y,"discreteBar: bars text").attr("x",.9*n.rangeBand()/2).attr("y",function(a,b){return q(a,b)<0?o(q(a,b))-o(0)+12:-4})):E.selectAll("text").remove(),E.attr("class",function(a,b){return q(a,b)<0?"nv-bar negative":"nv-bar positive"}).style("fill",function(a,b){return a.color||s(a,b)}).style("stroke",function(a,b){return a.color||s(a,b)}).select("rect").attr("class",w).watchTransition(y,"discreteBar: bars rect").attr("width",.9*n.rangeBand()/b.length),E.watchTransition(y,"discreteBar: bars").attr("transform",function(a,b){var c=n(p(a,b))+.05*n.rangeBand(),d=q(a,b)<0?o(0):o(0)-o(q(a,b))<1?o(0)-1:o(q(a,b));return"translate("+c+", "+d+")"}).select("rect").attr("height",function(a,b){return Math.max(Math.abs(o(q(a,b))-o(e&&e[0]||0))||1)}),h=n.copy(),i=o.copy()}),y.renderEnd("discreteBar immediate"),b}var c,d,e,f,g,h,i,j={top:0,right:0,bottom:0,left:0},k=960,l=500,m=Math.floor(1e4*Math.random()),n=d3.scale.ordinal(),o=d3.scale.linear(),p=function(a){return a.x},q=function(a){return a.y},r=[0],s=a.utils.defaultColor(),t=!1,u=d3.format(",.2f"),v=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout","elementMousemove","renderEnd"),w="discreteBar",x=250,y=a.utils.renderWatch(v,x);return b.dispatch=v,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return k},set:function(a){k=a}},height:{get:function(){return l},set:function(a){l=a}},forceY:{get:function(){return r},set:function(a){r=a}},showValues:{get:function(){return t},set:function(a){t=a}},x:{get:function(){return p},set:function(a){p=a}},y:{get:function(){return q},set:function(a){q=a}},xScale:{get:function(){return n},set:function(a){n=a}},yScale:{get:function(){return o},set:function(a){o=a}},xDomain:{get:function(){return d},set:function(a){d=a}},yDomain:{get:function(){return e},set:function(a){e=a}},xRange:{get:function(){return f},set:function(a){f=a}},yRange:{get:function(){return g},set:function(a){g=a}},valueFormat:{get:function(){return u},set:function(a){u=a}},id:{get:function(){return m},set:function(a){m=a}},rectClass:{get:function(){return w},set:function(a){w=a}},margin:{get:function(){return j},set:function(a){j.top=void 0!==a.top?a.top:j.top,j.right=void 0!==a.right?a.right:j.right,j.bottom=void 0!==a.bottom?a.bottom:j.bottom,j.left=void 0!==a.left?a.left:j.left}},color:{get:function(){return s},set:function(b){s=a.utils.getColor(b)}},duration:{get:function(){return x},set:function(a){x=a,y.reset(x)}}}),a.utils.initOptions(b),b},a.models.discreteBarChart=function(){"use strict";function b(h){return t.reset(),t.models(e),m&&t.models(f),n&&t.models(g),h.each(function(h){var l=d3.select(this);a.utils.initSVG(l);var q=a.utils.availableWidth(j,l,i),t=a.utils.availableHeight(k,l,i);if(b.update=function(){r.beforeUpdate(),l.transition().duration(s).call(b)},b.container=this,!(h&&h.length&&h.filter(function(a){return a.values.length}).length))return a.utils.noData(b,l),b;l.selectAll(".nv-noData").remove(),c=e.xScale(),d=e.yScale().clamp(!0);var u=l.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([h]),v=u.enter().append("g").attr("class","nvd3 nv-wrap nv-discreteBarWithAxes").append("g"),w=v.append("defs"),x=u.select("g");v.append("g").attr("class","nv-x nv-axis"),v.append("g").attr("class","nv-y nv-axis").append("g").attr("class","nv-zeroLine").append("line"),v.append("g").attr("class","nv-barsWrap"),x.attr("transform","translate("+i.left+","+i.top+")"),o&&x.select(".nv-y.nv-axis").attr("transform","translate("+q+",0)"),e.width(q).height(t);var y=x.select(".nv-barsWrap").datum(h.filter(function(a){return!a.disabled}));if(y.transition().call(e),w.append("clipPath").attr("id","nv-x-label-clip-"+e.id()).append("rect"),x.select("#nv-x-label-clip-"+e.id()+" rect").attr("width",c.rangeBand()*(p?2:1)).attr("height",16).attr("x",-c.rangeBand()/(p?1:2)),m){f.scale(c)._ticks(a.utils.calcTicksX(q/100,h)).tickSize(-t,0),x.select(".nv-x.nv-axis").attr("transform","translate(0,"+(d.range()[0]+(e.showValues()&&d.domain()[0]<0?16:0))+")"),x.select(".nv-x.nv-axis").call(f);
var z=x.select(".nv-x.nv-axis").selectAll("g");p&&z.selectAll("text").attr("transform",function(a,b,c){return"translate(0,"+(c%2==0?"5":"17")+")"})}n&&(g.scale(d)._ticks(a.utils.calcTicksY(t/36,h)).tickSize(-q,0),x.select(".nv-y.nv-axis").call(g)),x.select(".nv-zeroLine line").attr("x1",0).attr("x2",q).attr("y1",d(0)).attr("y2",d(0))}),t.renderEnd("discreteBar chart immediate"),b}var c,d,e=a.models.discreteBar(),f=a.models.axis(),g=a.models.axis(),h=a.models.tooltip(),i={top:15,right:10,bottom:50,left:60},j=null,k=null,l=a.utils.getColor(),m=!0,n=!0,o=!1,p=!1,q=null,r=d3.dispatch("beforeUpdate","renderEnd"),s=250;f.orient("bottom").showMaxMin(!1).tickFormat(function(a){return a}),g.orient(o?"right":"left").tickFormat(d3.format(",.1f")),h.duration(0).headerEnabled(!1).valueFormatter(function(a,b){return g.tickFormat()(a,b)}).keyFormatter(function(a,b){return f.tickFormat()(a,b)});var t=a.utils.renderWatch(r,s);return e.dispatch.on("elementMouseover.tooltip",function(a){a.series={key:b.x()(a.data),value:b.y()(a.data),color:a.color},h.data(a).hidden(!1)}),e.dispatch.on("elementMouseout.tooltip",function(){h.hidden(!0)}),e.dispatch.on("elementMousemove.tooltip",function(){h.position({top:d3.event.pageY,left:d3.event.pageX})()}),b.dispatch=r,b.discretebar=e,b.xAxis=f,b.yAxis=g,b.tooltip=h,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return j},set:function(a){j=a}},height:{get:function(){return k},set:function(a){k=a}},staggerLabels:{get:function(){return p},set:function(a){p=a}},showXAxis:{get:function(){return m},set:function(a){m=a}},showYAxis:{get:function(){return n},set:function(a){n=a}},noData:{get:function(){return q},set:function(a){q=a}},tooltips:{get:function(){return h.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),h.enabled(!!b)}},tooltipContent:{get:function(){return h.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),h.contentGenerator(b)}},margin:{get:function(){return i},set:function(a){i.top=void 0!==a.top?a.top:i.top,i.right=void 0!==a.right?a.right:i.right,i.bottom=void 0!==a.bottom?a.bottom:i.bottom,i.left=void 0!==a.left?a.left:i.left}},duration:{get:function(){return s},set:function(a){s=a,t.reset(s),e.duration(s),f.duration(s),g.duration(s)}},color:{get:function(){return l},set:function(b){l=a.utils.getColor(b),e.color(l)}},rightAlignYAxis:{get:function(){return o},set:function(a){o=a,g.orient(a?"right":"left")}}}),a.utils.inheritOptions(b,e),a.utils.initOptions(b),b},a.models.distribution=function(){"use strict";function b(k){return m.reset(),k.each(function(b){var k=(e-("x"===g?d.left+d.right:d.top+d.bottom),"x"==g?"y":"x"),l=d3.select(this);a.utils.initSVG(l),c=c||j;var n=l.selectAll("g.nv-distribution").data([b]),o=n.enter().append("g").attr("class","nvd3 nv-distribution"),p=(o.append("g"),n.select("g"));n.attr("transform","translate("+d.left+","+d.top+")");var q=p.selectAll("g.nv-dist").data(function(a){return a},function(a){return a.key});q.enter().append("g"),q.attr("class",function(a,b){return"nv-dist nv-series-"+b}).style("stroke",function(a,b){return i(a,b)});var r=q.selectAll("line.nv-dist"+g).data(function(a){return a.values});r.enter().append("line").attr(g+"1",function(a,b){return c(h(a,b))}).attr(g+"2",function(a,b){return c(h(a,b))}),m.transition(q.exit().selectAll("line.nv-dist"+g),"dist exit").attr(g+"1",function(a,b){return j(h(a,b))}).attr(g+"2",function(a,b){return j(h(a,b))}).style("stroke-opacity",0).remove(),r.attr("class",function(a,b){return"nv-dist"+g+" nv-dist"+g+"-"+b}).attr(k+"1",0).attr(k+"2",f),m.transition(r,"dist").attr(g+"1",function(a,b){return j(h(a,b))}).attr(g+"2",function(a,b){return j(h(a,b))}),c=j.copy()}),m.renderEnd("distribution immediate"),b}var c,d={top:0,right:0,bottom:0,left:0},e=400,f=8,g="x",h=function(a){return a[g]},i=a.utils.defaultColor(),j=d3.scale.linear(),k=250,l=d3.dispatch("renderEnd"),m=a.utils.renderWatch(l,k);return b.options=a.utils.optionsFunc.bind(b),b.dispatch=l,b.margin=function(a){return arguments.length?(d.top="undefined"!=typeof a.top?a.top:d.top,d.right="undefined"!=typeof a.right?a.right:d.right,d.bottom="undefined"!=typeof a.bottom?a.bottom:d.bottom,d.left="undefined"!=typeof a.left?a.left:d.left,b):d},b.width=function(a){return arguments.length?(e=a,b):e},b.axis=function(a){return arguments.length?(g=a,b):g},b.size=function(a){return arguments.length?(f=a,b):f},b.getData=function(a){return arguments.length?(h=d3.functor(a),b):h},b.scale=function(a){return arguments.length?(j=a,b):j},b.color=function(c){return arguments.length?(i=a.utils.getColor(c),b):i},b.duration=function(a){return arguments.length?(k=a,m.reset(k),b):k},b},a.models.furiousLegend=function(){"use strict";function b(p){function q(a,b){return"furious"!=o?"#000":m?a.disengaged?g(a,b):"#fff":m?void 0:a.disabled?g(a,b):"#fff"}function r(a,b){return m&&"furious"==o?a.disengaged?"#fff":g(a,b):a.disabled?"#fff":g(a,b)}return p.each(function(b){var p=d-c.left-c.right,s=d3.select(this);a.utils.initSVG(s);var t=s.selectAll("g.nv-legend").data([b]),u=(t.enter().append("g").attr("class","nvd3 nv-legend").append("g"),t.select("g"));t.attr("transform","translate("+c.left+","+c.top+")");var v,w=u.selectAll(".nv-series").data(function(a){return"furious"!=o?a:a.filter(function(a){return m?!0:!a.disengaged})}),x=w.enter().append("g").attr("class","nv-series");if("classic"==o)x.append("circle").style("stroke-width",2).attr("class","nv-legend-symbol").attr("r",5),v=w.select("circle");else if("furious"==o){x.append("rect").style("stroke-width",2).attr("class","nv-legend-symbol").attr("rx",3).attr("ry",3),v=w.select("rect"),x.append("g").attr("class","nv-check-box").property("innerHTML",'<path d="M0.5,5 L22.5,5 L22.5,26.5 L0.5,26.5 L0.5,5 Z" class="nv-box"></path><path d="M5.5,12.8618467 L11.9185089,19.2803556 L31,0.198864511" class="nv-check"></path>').attr("transform","translate(-10,-8)scale(0.5)");var y=w.select(".nv-check-box");y.each(function(a,b){d3.select(this).selectAll("path").attr("stroke",q(a,b))})}x.append("text").attr("text-anchor","start").attr("class","nv-legend-text").attr("dy",".32em").attr("dx","8");var z=w.select("text.nv-legend-text");w.on("mouseover",function(a,b){n.legendMouseover(a,b)}).on("mouseout",function(a,b){n.legendMouseout(a,b)}).on("click",function(a,b){n.legendClick(a,b);var c=w.data();if(k){if("classic"==o)l?(c.forEach(function(a){a.disabled=!0}),a.disabled=!1):(a.disabled=!a.disabled,c.every(function(a){return a.disabled})&&c.forEach(function(a){a.disabled=!1}));else if("furious"==o)if(m)a.disengaged=!a.disengaged,a.userDisabled=void 0==a.userDisabled?!!a.disabled:a.userDisabled,a.disabled=a.disengaged||a.userDisabled;else if(!m){a.disabled=!a.disabled,a.userDisabled=a.disabled;var d=c.filter(function(a){return!a.disengaged});d.every(function(a){return a.userDisabled})&&c.forEach(function(a){a.disabled=a.userDisabled=!1})}n.stateChange({disabled:c.map(function(a){return!!a.disabled}),disengaged:c.map(function(a){return!!a.disengaged})})}}).on("dblclick",function(a,b){if(("furious"!=o||!m)&&(n.legendDblclick(a,b),k)){var c=w.data();c.forEach(function(a){a.disabled=!0,"furious"==o&&(a.userDisabled=a.disabled)}),a.disabled=!1,"furious"==o&&(a.userDisabled=a.disabled),n.stateChange({disabled:c.map(function(a){return!!a.disabled})})}}),w.classed("nv-disabled",function(a){return a.userDisabled}),w.exit().remove(),z.attr("fill",q).text(f);var A;switch(o){case"furious":A=23;break;case"classic":A=20}if(h){var B=[];w.each(function(){var b,c=d3.select(this).select("text");try{if(b=c.node().getComputedTextLength(),0>=b)throw Error()}catch(d){b=a.utils.calcApproxTextWidth(c)}B.push(b+i)});for(var C=0,D=0,E=[];p>D&&C<B.length;)E[C]=B[C],D+=B[C++];for(0===C&&(C=1);D>p&&C>1;){E=[],C--;for(var F=0;F<B.length;F++)B[F]>(E[F%C]||0)&&(E[F%C]=B[F]);D=E.reduce(function(a,b){return a+b})}for(var G=[],H=0,I=0;C>H;H++)G[H]=I,I+=E[H];w.attr("transform",function(a,b){return"translate("+G[b%C]+","+(5+Math.floor(b/C)*A)+")"}),j?u.attr("transform","translate("+(d-c.right-D)+","+c.top+")"):u.attr("transform","translate(0,"+c.top+")"),e=c.top+c.bottom+Math.ceil(B.length/C)*A}else{var J,K=5,L=5,M=0;w.attr("transform",function(){var a=d3.select(this).select("text").node().getComputedTextLength()+i;return J=L,d<c.left+c.right+J+a&&(L=J=5,K+=A),L+=a,L>M&&(M=L),"translate("+J+","+K+")"}),u.attr("transform","translate("+(d-c.right-M)+","+c.top+")"),e=c.top+c.bottom+K+15}"furious"==o&&v.attr("width",function(a,b){return z[0][b].getComputedTextLength()+27}).attr("height",18).attr("y",-9).attr("x",-15),v.style("fill",r).style("stroke",function(a,b){return a.color||g(a,b)})}),b}var c={top:5,right:0,bottom:5,left:0},d=400,e=20,f=function(a){return a.key},g=a.utils.getColor(),h=!0,i=28,j=!0,k=!0,l=!1,m=!1,n=d3.dispatch("legendClick","legendDblclick","legendMouseover","legendMouseout","stateChange"),o="classic";return b.dispatch=n,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return d},set:function(a){d=a}},height:{get:function(){return e},set:function(a){e=a}},key:{get:function(){return f},set:function(a){f=a}},align:{get:function(){return h},set:function(a){h=a}},rightAlign:{get:function(){return j},set:function(a){j=a}},padding:{get:function(){return i},set:function(a){i=a}},updateState:{get:function(){return k},set:function(a){k=a}},radioButtonMode:{get:function(){return l},set:function(a){l=a}},expanded:{get:function(){return m},set:function(a){m=a}},vers:{get:function(){return o},set:function(a){o=a}},margin:{get:function(){return c},set:function(a){c.top=void 0!==a.top?a.top:c.top,c.right=void 0!==a.right?a.right:c.right,c.bottom=void 0!==a.bottom?a.bottom:c.bottom,c.left=void 0!==a.left?a.left:c.left}},color:{get:function(){return g},set:function(b){g=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.historicalBar=function(){"use strict";function b(x){return x.each(function(b){w.reset(),k=d3.select(this);var x=a.utils.availableWidth(h,k,g),y=a.utils.availableHeight(i,k,g);a.utils.initSVG(k),l.domain(c||d3.extent(b[0].values.map(n).concat(p))),l.range(r?e||[.5*x/b[0].values.length,x*(b[0].values.length-.5)/b[0].values.length]:e||[0,x]),m.domain(d||d3.extent(b[0].values.map(o).concat(q))).range(f||[y,0]),l.domain()[0]===l.domain()[1]&&l.domain(l.domain()[0]?[l.domain()[0]-.01*l.domain()[0],l.domain()[1]+.01*l.domain()[1]]:[-1,1]),m.domain()[0]===m.domain()[1]&&m.domain(m.domain()[0]?[m.domain()[0]+.01*m.domain()[0],m.domain()[1]-.01*m.domain()[1]]:[-1,1]);var z=k.selectAll("g.nv-wrap.nv-historicalBar-"+j).data([b[0].values]),A=z.enter().append("g").attr("class","nvd3 nv-wrap nv-historicalBar-"+j),B=A.append("defs"),C=A.append("g"),D=z.select("g");C.append("g").attr("class","nv-bars"),z.attr("transform","translate("+g.left+","+g.top+")"),k.on("click",function(a,b){u.chartClick({data:a,index:b,pos:d3.event,id:j})}),B.append("clipPath").attr("id","nv-chart-clip-path-"+j).append("rect"),z.select("#nv-chart-clip-path-"+j+" rect").attr("width",x).attr("height",y),D.attr("clip-path",s?"url(#nv-chart-clip-path-"+j+")":"");var E=z.select(".nv-bars").selectAll(".nv-bar").data(function(a){return a},function(a,b){return n(a,b)});E.exit().remove(),E.enter().append("rect").attr("x",0).attr("y",function(b,c){return a.utils.NaNtoZero(m(Math.max(0,o(b,c))))}).attr("height",function(b,c){return a.utils.NaNtoZero(Math.abs(m(o(b,c))-m(0)))}).attr("transform",function(a,c){return"translate("+(l(n(a,c))-x/b[0].values.length*.45)+",0)"}).on("mouseover",function(a,b){v&&(d3.select(this).classed("hover",!0),u.elementMouseover({data:a,index:b,color:d3.select(this).style("fill")}))}).on("mouseout",function(a,b){v&&(d3.select(this).classed("hover",!1),u.elementMouseout({data:a,index:b,color:d3.select(this).style("fill")}))}).on("mousemove",function(a,b){v&&u.elementMousemove({data:a,index:b,color:d3.select(this).style("fill")})}).on("click",function(a,b){v&&(u.elementClick({data:a,index:b,color:d3.select(this).style("fill")}),d3.event.stopPropagation())}).on("dblclick",function(a,b){v&&(u.elementDblClick({data:a,index:b,color:d3.select(this).style("fill")}),d3.event.stopPropagation())}),E.attr("fill",function(a,b){return t(a,b)}).attr("class",function(a,b,c){return(o(a,b)<0?"nv-bar negative":"nv-bar positive")+" nv-bar-"+c+"-"+b}).watchTransition(w,"bars").attr("transform",function(a,c){return"translate("+(l(n(a,c))-x/b[0].values.length*.45)+",0)"}).attr("width",x/b[0].values.length*.9),E.watchTransition(w,"bars").attr("y",function(b,c){var d=o(b,c)<0?m(0):m(0)-m(o(b,c))<1?m(0)-1:m(o(b,c));return a.utils.NaNtoZero(d)}).attr("height",function(b,c){return a.utils.NaNtoZero(Math.max(Math.abs(m(o(b,c))-m(0)),1))})}),w.renderEnd("historicalBar immediate"),b}var c,d,e,f,g={top:0,right:0,bottom:0,left:0},h=null,i=null,j=Math.floor(1e4*Math.random()),k=null,l=d3.scale.linear(),m=d3.scale.linear(),n=function(a){return a.x},o=function(a){return a.y},p=[],q=[0],r=!1,s=!0,t=a.utils.defaultColor(),u=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout","elementMousemove","renderEnd"),v=!0,w=a.utils.renderWatch(u,0);return b.highlightPoint=function(a,b){k.select(".nv-bars .nv-bar-0-"+a).classed("hover",b)},b.clearHighlights=function(){k.select(".nv-bars .nv-bar.hover").classed("hover",!1)},b.dispatch=u,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return h},set:function(a){h=a}},height:{get:function(){return i},set:function(a){i=a}},forceX:{get:function(){return p},set:function(a){p=a}},forceY:{get:function(){return q},set:function(a){q=a}},padData:{get:function(){return r},set:function(a){r=a}},x:{get:function(){return n},set:function(a){n=a}},y:{get:function(){return o},set:function(a){o=a}},xScale:{get:function(){return l},set:function(a){l=a}},yScale:{get:function(){return m},set:function(a){m=a}},xDomain:{get:function(){return c},set:function(a){c=a}},yDomain:{get:function(){return d},set:function(a){d=a}},xRange:{get:function(){return e},set:function(a){e=a}},yRange:{get:function(){return f},set:function(a){f=a}},clipEdge:{get:function(){return s},set:function(a){s=a}},id:{get:function(){return j},set:function(a){j=a}},interactive:{get:function(){return v},set:function(a){v=a}},margin:{get:function(){return g},set:function(a){g.top=void 0!==a.top?a.top:g.top,g.right=void 0!==a.right?a.right:g.right,g.bottom=void 0!==a.bottom?a.bottom:g.bottom,g.left=void 0!==a.left?a.left:g.left}},color:{get:function(){return t},set:function(b){t=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.historicalBarChart=function(b){"use strict";function c(b){return b.each(function(k){z.reset(),z.models(f),q&&z.models(g),r&&z.models(h);var w=d3.select(this),A=this;a.utils.initSVG(w);var B=a.utils.availableWidth(n,w,l),C=a.utils.availableHeight(o,w,l);if(c.update=function(){w.transition().duration(y).call(c)},c.container=this,u.disabled=k.map(function(a){return!!a.disabled}),!v){var D;v={};for(D in u)v[D]=u[D]instanceof Array?u[D].slice(0):u[D]}if(!(k&&k.length&&k.filter(function(a){return a.values.length}).length))return a.utils.noData(c,w),c;w.selectAll(".nv-noData").remove(),d=f.xScale(),e=f.yScale();var E=w.selectAll("g.nv-wrap.nv-historicalBarChart").data([k]),F=E.enter().append("g").attr("class","nvd3 nv-wrap nv-historicalBarChart").append("g"),G=E.select("g");F.append("g").attr("class","nv-x nv-axis"),F.append("g").attr("class","nv-y nv-axis"),F.append("g").attr("class","nv-barsWrap"),F.append("g").attr("class","nv-legendWrap"),F.append("g").attr("class","nv-interactive"),p&&(i.width(B),G.select(".nv-legendWrap").datum(k).call(i),l.top!=i.height()&&(l.top=i.height(),C=a.utils.availableHeight(o,w,l)),E.select(".nv-legendWrap").attr("transform","translate(0,"+-l.top+")")),E.attr("transform","translate("+l.left+","+l.top+")"),s&&G.select(".nv-y.nv-axis").attr("transform","translate("+B+",0)"),t&&(j.width(B).height(C).margin({left:l.left,top:l.top}).svgContainer(w).xScale(d),E.select(".nv-interactive").call(j)),f.width(B).height(C).color(k.map(function(a,b){return a.color||m(a,b)}).filter(function(a,b){return!k[b].disabled}));var H=G.select(".nv-barsWrap").datum(k.filter(function(a){return!a.disabled}));H.transition().call(f),q&&(g.scale(d)._ticks(a.utils.calcTicksX(B/100,k)).tickSize(-C,0),G.select(".nv-x.nv-axis").attr("transform","translate(0,"+e.range()[0]+")"),G.select(".nv-x.nv-axis").transition().call(g)),r&&(h.scale(e)._ticks(a.utils.calcTicksY(C/36,k)).tickSize(-B,0),G.select(".nv-y.nv-axis").transition().call(h)),j.dispatch.on("elementMousemove",function(b){f.clearHighlights();var d,e,i,n=[];k.filter(function(a,b){return a.seriesIndex=b,!a.disabled}).forEach(function(g){e=a.interactiveBisect(g.values,b.pointXValue,c.x()),f.highlightPoint(e,!0);var h=g.values[e];void 0!==h&&(void 0===d&&(d=h),void 0===i&&(i=c.xScale()(c.x()(h,e))),n.push({key:g.key,value:c.y()(h,e),color:m(g,g.seriesIndex),data:g.values[e]}))});var o=g.tickFormat()(c.x()(d,e));j.tooltip.position({left:i+l.left,top:b.mouseY+l.top}).chartContainer(A.parentNode).valueFormatter(function(a){return h.tickFormat()(a)}).data({value:o,index:e,series:n})(),j.renderGuideLine(i)}),j.dispatch.on("elementMouseout",function(){x.tooltipHide(),f.clearHighlights()}),i.dispatch.on("legendClick",function(a){a.disabled=!a.disabled,k.filter(function(a){return!a.disabled}).length||k.map(function(a){return a.disabled=!1,E.selectAll(".nv-series").classed("disabled",!1),a}),u.disabled=k.map(function(a){return!!a.disabled}),x.stateChange(u),b.transition().call(c)}),i.dispatch.on("legendDblclick",function(a){k.forEach(function(a){a.disabled=!0}),a.disabled=!1,u.disabled=k.map(function(a){return!!a.disabled}),x.stateChange(u),c.update()}),x.on("changeState",function(a){"undefined"!=typeof a.disabled&&(k.forEach(function(b,c){b.disabled=a.disabled[c]}),u.disabled=a.disabled),c.update()})}),z.renderEnd("historicalBarChart immediate"),c}var d,e,f=b||a.models.historicalBar(),g=a.models.axis(),h=a.models.axis(),i=a.models.legend(),j=a.interactiveGuideline(),k=a.models.tooltip(),l={top:30,right:90,bottom:50,left:90},m=a.utils.defaultColor(),n=null,o=null,p=!1,q=!0,r=!0,s=!1,t=!1,u={},v=null,w=null,x=d3.dispatch("tooltipHide","stateChange","changeState","renderEnd"),y=250;g.orient("bottom").tickPadding(7),h.orient(s?"right":"left"),k.duration(0).headerEnabled(!1).valueFormatter(function(a,b){return h.tickFormat()(a,b)}).headerFormatter(function(a,b){return g.tickFormat()(a,b)});var z=a.utils.renderWatch(x,0);return f.dispatch.on("elementMouseover.tooltip",function(a){a.series={key:c.x()(a.data),value:c.y()(a.data),color:a.color},k.data(a).hidden(!1)}),f.dispatch.on("elementMouseout.tooltip",function(){k.hidden(!0)}),f.dispatch.on("elementMousemove.tooltip",function(){k.position({top:d3.event.pageY,left:d3.event.pageX})()}),c.dispatch=x,c.bars=f,c.legend=i,c.xAxis=g,c.yAxis=h,c.interactiveLayer=j,c.tooltip=k,c.options=a.utils.optionsFunc.bind(c),c._options=Object.create({},{width:{get:function(){return n},set:function(a){n=a}},height:{get:function(){return o},set:function(a){o=a}},showLegend:{get:function(){return p},set:function(a){p=a}},showXAxis:{get:function(){return q},set:function(a){q=a}},showYAxis:{get:function(){return r},set:function(a){r=a}},defaultState:{get:function(){return v},set:function(a){v=a}},noData:{get:function(){return w},set:function(a){w=a}},tooltips:{get:function(){return k.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),k.enabled(!!b)}},tooltipContent:{get:function(){return k.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),k.contentGenerator(b)}},margin:{get:function(){return l},set:function(a){l.top=void 0!==a.top?a.top:l.top,l.right=void 0!==a.right?a.right:l.right,l.bottom=void 0!==a.bottom?a.bottom:l.bottom,l.left=void 0!==a.left?a.left:l.left}},color:{get:function(){return m},set:function(b){m=a.utils.getColor(b),i.color(m),f.color(m)}},duration:{get:function(){return y},set:function(a){y=a,z.reset(y),h.duration(y),g.duration(y)}},rightAlignYAxis:{get:function(){return s},set:function(a){s=a,h.orient(a?"right":"left")}},useInteractiveGuideline:{get:function(){return t},set:function(a){t=a,a===!0&&c.interactive(!1)}}}),a.utils.inheritOptions(c,f),a.utils.initOptions(c),c},a.models.ohlcBarChart=function(){var b=a.models.historicalBarChart(a.models.ohlcBar());return b.useInteractiveGuideline(!0),b.interactiveLayer.tooltip.contentGenerator(function(a){var c=a.series[0].data,d=c.open<c.close?"2ca02c":"d62728";return'<h3 style="color: #'+d+'">'+a.value+"</h3><table><tr><td>open:</td><td>"+b.yAxis.tickFormat()(c.open)+"</td></tr><tr><td>close:</td><td>"+b.yAxis.tickFormat()(c.close)+"</td></tr><tr><td>high</td><td>"+b.yAxis.tickFormat()(c.high)+"</td></tr><tr><td>low:</td><td>"+b.yAxis.tickFormat()(c.low)+"</td></tr></table>"}),b},a.models.candlestickBarChart=function(){var b=a.models.historicalBarChart(a.models.candlestickBar());return b.useInteractiveGuideline(!0),b.interactiveLayer.tooltip.contentGenerator(function(a){var c=a.series[0].data,d=c.open<c.close?"2ca02c":"d62728";return'<h3 style="color: #'+d+'">'+a.value+"</h3><table><tr><td>open:</td><td>"+b.yAxis.tickFormat()(c.open)+"</td></tr><tr><td>close:</td><td>"+b.yAxis.tickFormat()(c.close)+"</td></tr><tr><td>high</td><td>"+b.yAxis.tickFormat()(c.high)+"</td></tr><tr><td>low:</td><td>"+b.yAxis.tickFormat()(c.low)+"</td></tr></table>"}),b},a.models.legend=function(){"use strict";function b(p){function q(a,b){return"furious"!=o?"#000":m?a.disengaged?"#000":"#fff":m?void 0:(a.color||(a.color=g(a,b)),a.disabled?a.color:"#fff")}function r(a,b){return m&&"furious"==o&&a.disengaged?"#eee":a.color||g(a,b)}function s(a){return m&&"furious"==o?1:a.disabled?0:1}return p.each(function(b){var g=d-c.left-c.right,p=d3.select(this);a.utils.initSVG(p);var t=p.selectAll("g.nv-legend").data([b]),u=t.enter().append("g").attr("class","nvd3 nv-legend").append("g"),v=t.select("g");t.attr("transform","translate("+c.left+","+c.top+")");var w,x,y=v.selectAll(".nv-series").data(function(a){return"furious"!=o?a:a.filter(function(a){return m?!0:!a.disengaged})}),z=y.enter().append("g").attr("class","nv-series");switch(o){case"furious":x=23;break;case"classic":x=20}if("classic"==o)z.append("circle").style("stroke-width",2).attr("class","nv-legend-symbol").attr("r",5),w=y.select("circle");else if("furious"==o){z.append("rect").style("stroke-width",2).attr("class","nv-legend-symbol").attr("rx",3).attr("ry",3),w=y.select(".nv-legend-symbol"),z.append("g").attr("class","nv-check-box").property("innerHTML",'<path d="M0.5,5 L22.5,5 L22.5,26.5 L0.5,26.5 L0.5,5 Z" class="nv-box"></path><path d="M5.5,12.8618467 L11.9185089,19.2803556 L31,0.198864511" class="nv-check"></path>').attr("transform","translate(-10,-8)scale(0.5)");var A=y.select(".nv-check-box");A.each(function(a,b){d3.select(this).selectAll("path").attr("stroke",q(a,b))})}z.append("text").attr("text-anchor","start").attr("class","nv-legend-text").attr("dy",".32em").attr("dx","8");var B=y.select("text.nv-legend-text");y.on("mouseover",function(a,b){n.legendMouseover(a,b)}).on("mouseout",function(a,b){n.legendMouseout(a,b)}).on("click",function(a,b){n.legendClick(a,b);var c=y.data();if(k){if("classic"==o)l?(c.forEach(function(a){a.disabled=!0}),a.disabled=!1):(a.disabled=!a.disabled,c.every(function(a){return a.disabled})&&c.forEach(function(a){a.disabled=!1}));else if("furious"==o)if(m)a.disengaged=!a.disengaged,a.userDisabled=void 0==a.userDisabled?!!a.disabled:a.userDisabled,a.disabled=a.disengaged||a.userDisabled;else if(!m){a.disabled=!a.disabled,a.userDisabled=a.disabled;var d=c.filter(function(a){return!a.disengaged});d.every(function(a){return a.userDisabled})&&c.forEach(function(a){a.disabled=a.userDisabled=!1})}n.stateChange({disabled:c.map(function(a){return!!a.disabled}),disengaged:c.map(function(a){return!!a.disengaged})})}}).on("dblclick",function(a,b){if(("furious"!=o||!m)&&(n.legendDblclick(a,b),k)){var c=y.data();c.forEach(function(a){a.disabled=!0,"furious"==o&&(a.userDisabled=a.disabled)}),a.disabled=!1,"furious"==o&&(a.userDisabled=a.disabled),n.stateChange({disabled:c.map(function(a){return!!a.disabled})})}}),y.classed("nv-disabled",function(a){return a.userDisabled}),y.exit().remove(),B.attr("fill",q).text(f);var C=0;if(h){var D=[];y.each(function(){var b,c=d3.select(this).select("text");try{if(b=c.node().getComputedTextLength(),0>=b)throw Error()}catch(d){b=a.utils.calcApproxTextWidth(c)}D.push(b+i)});var E=0,F=[];for(C=0;g>C&&E<D.length;)F[E]=D[E],C+=D[E++];for(0===E&&(E=1);C>g&&E>1;){F=[],E--;for(var G=0;G<D.length;G++)D[G]>(F[G%E]||0)&&(F[G%E]=D[G]);C=F.reduce(function(a,b){return a+b})}for(var H=[],I=0,J=0;E>I;I++)H[I]=J,J+=F[I];y.attr("transform",function(a,b){return"translate("+H[b%E]+","+(5+Math.floor(b/E)*x)+")"}),j?v.attr("transform","translate("+(d-c.right-C)+","+c.top+")"):v.attr("transform","translate(0,"+c.top+")"),e=c.top+c.bottom+Math.ceil(D.length/E)*x}else{var K,L=5,M=5,N=0;y.attr("transform",function(){var a=d3.select(this).select("text").node().getComputedTextLength()+i;return K=M,d<c.left+c.right+K+a&&(M=K=5,L+=x),M+=a,M>N&&(N=M),K+N>C&&(C=K+N),"translate("+K+","+L+")"}),v.attr("transform","translate("+(d-c.right-N)+","+c.top+")"),e=c.top+c.bottom+L+15}if("furious"==o){w.attr("width",function(a,b){return B[0][b].getComputedTextLength()+27}).attr("height",18).attr("y",-9).attr("x",-15),u.insert("rect",":first-child").attr("class","nv-legend-bg").attr("fill","#eee").attr("opacity",0);var O=v.select(".nv-legend-bg");O.transition().duration(300).attr("x",-x).attr("width",C+x-12).attr("height",e+10).attr("y",-c.top-10).attr("opacity",m?1:0)}w.style("fill",r).style("fill-opacity",s).style("stroke",r)}),b}var c={top:5,right:0,bottom:5,left:0},d=400,e=20,f=function(a){return a.key},g=a.utils.getColor(),h=!0,i=32,j=!0,k=!0,l=!1,m=!1,n=d3.dispatch("legendClick","legendDblclick","legendMouseover","legendMouseout","stateChange"),o="classic";return b.dispatch=n,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return d},set:function(a){d=a}},height:{get:function(){return e},set:function(a){e=a}},key:{get:function(){return f},set:function(a){f=a}},align:{get:function(){return h},set:function(a){h=a}},rightAlign:{get:function(){return j},set:function(a){j=a}},padding:{get:function(){return i},set:function(a){i=a}},updateState:{get:function(){return k},set:function(a){k=a}},radioButtonMode:{get:function(){return l},set:function(a){l=a}},expanded:{get:function(){return m},set:function(a){m=a}},vers:{get:function(){return o},set:function(a){o=a}},margin:{get:function(){return c},set:function(a){c.top=void 0!==a.top?a.top:c.top,c.right=void 0!==a.right?a.right:c.right,c.bottom=void 0!==a.bottom?a.bottom:c.bottom,c.left=void 0!==a.left?a.left:c.left}},color:{get:function(){return g},set:function(b){g=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.line=function(){"use strict";function b(r){return v.reset(),v.models(e),r.each(function(b){i=d3.select(this);var r=a.utils.availableWidth(g,i,f),s=a.utils.availableHeight(h,i,f);a.utils.initSVG(i),c=e.xScale(),d=e.yScale(),t=t||c,u=u||d;var w=i.selectAll("g.nv-wrap.nv-line").data([b]),x=w.enter().append("g").attr("class","nvd3 nv-wrap nv-line"),y=x.append("defs"),z=x.append("g"),A=w.select("g");z.append("g").attr("class","nv-groups"),z.append("g").attr("class","nv-scatterWrap"),w.attr("transform","translate("+f.left+","+f.top+")"),e.width(r).height(s);var B=w.select(".nv-scatterWrap");B.call(e),y.append("clipPath").attr("id","nv-edge-clip-"+e.id()).append("rect"),w.select("#nv-edge-clip-"+e.id()+" rect").attr("width",r).attr("height",s>0?s:0),A.attr("clip-path",p?"url(#nv-edge-clip-"+e.id()+")":""),B.attr("clip-path",p?"url(#nv-edge-clip-"+e.id()+")":"");var C=w.select(".nv-groups").selectAll(".nv-group").data(function(a){return a},function(a){return a.key});C.enter().append("g").style("stroke-opacity",1e-6).style("stroke-width",function(a){return a.strokeWidth||j}).style("fill-opacity",1e-6),C.exit().remove(),C.attr("class",function(a,b){return(a.classed||"")+" nv-group nv-series-"+b}).classed("hover",function(a){return a.hover}).style("fill",function(a,b){return k(a,b)}).style("stroke",function(a,b){return k(a,b)}),C.watchTransition(v,"line: groups").style("stroke-opacity",1).style("fill-opacity",function(a){return a.fillOpacity||.5});var D=C.selectAll("path.nv-area").data(function(a){return o(a)?[a]:[]});D.enter().append("path").attr("class","nv-area").attr("d",function(b){return d3.svg.area().interpolate(q).defined(n).x(function(b,c){return a.utils.NaNtoZero(t(l(b,c)))}).y0(function(b,c){return a.utils.NaNtoZero(u(m(b,c)))}).y1(function(){return u(d.domain()[0]<=0?d.domain()[1]>=0?0:d.domain()[1]:d.domain()[0])}).apply(this,[b.values])}),C.exit().selectAll("path.nv-area").remove(),D.watchTransition(v,"line: areaPaths").attr("d",function(b){return d3.svg.area().interpolate(q).defined(n).x(function(b,d){return a.utils.NaNtoZero(c(l(b,d)))}).y0(function(b,c){return a.utils.NaNtoZero(d(m(b,c)))}).y1(function(){return d(d.domain()[0]<=0?d.domain()[1]>=0?0:d.domain()[1]:d.domain()[0])}).apply(this,[b.values])});var E=C.selectAll("path.nv-line").data(function(a){return[a.values]});E.enter().append("path").attr("class","nv-line").attr("d",d3.svg.line().interpolate(q).defined(n).x(function(b,c){return a.utils.NaNtoZero(t(l(b,c)))}).y(function(b,c){return a.utils.NaNtoZero(u(m(b,c)))})),E.watchTransition(v,"line: linePaths").attr("d",d3.svg.line().interpolate(q).defined(n).x(function(b,d){return a.utils.NaNtoZero(c(l(b,d)))}).y(function(b,c){return a.utils.NaNtoZero(d(m(b,c)))})),t=c.copy(),u=d.copy()}),v.renderEnd("line immediate"),b}var c,d,e=a.models.scatter(),f={top:0,right:0,bottom:0,left:0},g=960,h=500,i=null,j=1.5,k=a.utils.defaultColor(),l=function(a){return a.x},m=function(a){return a.y},n=function(a,b){return!isNaN(m(a,b))&&null!==m(a,b)},o=function(a){return a.area},p=!1,q="linear",r=250,s=d3.dispatch("elementClick","elementMouseover","elementMouseout","renderEnd");e.pointSize(16).pointDomain([16,256]);var t,u,v=a.utils.renderWatch(s,r);return b.dispatch=s,b.scatter=e,e.dispatch.on("elementClick",function(){s.elementClick.apply(this,arguments)}),e.dispatch.on("elementMouseover",function(){s.elementMouseover.apply(this,arguments)}),e.dispatch.on("elementMouseout",function(){s.elementMouseout.apply(this,arguments)}),b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return g},set:function(a){g=a}},height:{get:function(){return h},set:function(a){h=a}},defined:{get:function(){return n},set:function(a){n=a}},interpolate:{get:function(){return q},set:function(a){q=a}},clipEdge:{get:function(){return p},set:function(a){p=a}},margin:{get:function(){return f},set:function(a){f.top=void 0!==a.top?a.top:f.top,f.right=void 0!==a.right?a.right:f.right,f.bottom=void 0!==a.bottom?a.bottom:f.bottom,f.left=void 0!==a.left?a.left:f.left}},duration:{get:function(){return r},set:function(a){r=a,v.reset(r),e.duration(r)}},isArea:{get:function(){return o},set:function(a){o=d3.functor(a)}},x:{get:function(){return l},set:function(a){l=a,e.x(a)}},y:{get:function(){return m},set:function(a){m=a,e.y(a)}},color:{get:function(){return k},set:function(b){k=a.utils.getColor(b),e.color(k)}}}),a.utils.inheritOptions(b,e),a.utils.initOptions(b),b},a.models.lineChart=function(){"use strict";function b(j){return y.reset(),y.models(e),p&&y.models(f),q&&y.models(g),j.each(function(j){var v=d3.select(this),y=this;a.utils.initSVG(v);var B=a.utils.availableWidth(m,v,k),C=a.utils.availableHeight(n,v,k);if(b.update=function(){0===x?v.call(b):v.transition().duration(x).call(b)},b.container=this,t.setter(A(j),b.update).getter(z(j)).update(),t.disabled=j.map(function(a){return!!a.disabled}),!u){var D;u={};for(D in t)u[D]=t[D]instanceof Array?t[D].slice(0):t[D]
}if(!(j&&j.length&&j.filter(function(a){return a.values.length}).length))return a.utils.noData(b,v),b;v.selectAll(".nv-noData").remove(),c=e.xScale(),d=e.yScale();var E=v.selectAll("g.nv-wrap.nv-lineChart").data([j]),F=E.enter().append("g").attr("class","nvd3 nv-wrap nv-lineChart").append("g"),G=E.select("g");F.append("rect").style("opacity",0),F.append("g").attr("class","nv-x nv-axis"),F.append("g").attr("class","nv-y nv-axis"),F.append("g").attr("class","nv-linesWrap"),F.append("g").attr("class","nv-legendWrap"),F.append("g").attr("class","nv-interactive"),G.select("rect").attr("width",B).attr("height",C>0?C:0),o&&(h.width(B),G.select(".nv-legendWrap").datum(j).call(h),k.top!=h.height()&&(k.top=h.height(),C=a.utils.availableHeight(n,v,k)),E.select(".nv-legendWrap").attr("transform","translate(0,"+-k.top+")")),E.attr("transform","translate("+k.left+","+k.top+")"),r&&G.select(".nv-y.nv-axis").attr("transform","translate("+B+",0)"),s&&(i.width(B).height(C).margin({left:k.left,top:k.top}).svgContainer(v).xScale(c),E.select(".nv-interactive").call(i)),e.width(B).height(C).color(j.map(function(a,b){return a.color||l(a,b)}).filter(function(a,b){return!j[b].disabled}));var H=G.select(".nv-linesWrap").datum(j.filter(function(a){return!a.disabled}));H.call(e),p&&(f.scale(c)._ticks(a.utils.calcTicksX(B/100,j)).tickSize(-C,0),G.select(".nv-x.nv-axis").attr("transform","translate(0,"+d.range()[0]+")"),G.select(".nv-x.nv-axis").call(f)),q&&(g.scale(d)._ticks(a.utils.calcTicksY(C/36,j)).tickSize(-B,0),G.select(".nv-y.nv-axis").call(g)),h.dispatch.on("stateChange",function(a){for(var c in a)t[c]=a[c];w.stateChange(t),b.update()}),i.dispatch.on("elementMousemove",function(c){e.clearHighlights();var d,h,m,n=[];if(j.filter(function(a,b){return a.seriesIndex=b,!a.disabled}).forEach(function(f,g){h=a.interactiveBisect(f.values,c.pointXValue,b.x());var i=f.values[h],j=b.y()(i,h);null!=j&&e.highlightPoint(g,h,!0),void 0!==i&&(void 0===d&&(d=i),void 0===m&&(m=b.xScale()(b.x()(i,h))),n.push({key:f.key,value:j,color:l(f,f.seriesIndex)}))}),n.length>2){var o=b.yScale().invert(c.mouseY),p=Math.abs(b.yScale().domain()[0]-b.yScale().domain()[1]),q=.03*p,r=a.nearestValueIndex(n.map(function(a){return a.value}),o,q);null!==r&&(n[r].highlight=!0)}var s=f.tickFormat()(b.x()(d,h));i.tooltip.position({left:c.mouseX+k.left,top:c.mouseY+k.top}).chartContainer(y.parentNode).valueFormatter(function(a){return null==a?"N/A":g.tickFormat()(a)}).data({value:s,index:h,series:n})(),i.renderGuideLine(m)}),i.dispatch.on("elementClick",function(c){var d,f=[];j.filter(function(a,b){return a.seriesIndex=b,!a.disabled}).forEach(function(e){var g=a.interactiveBisect(e.values,c.pointXValue,b.x()),h=e.values[g];if("undefined"!=typeof h){"undefined"==typeof d&&(d=b.xScale()(b.x()(h,g)));var i=b.yScale()(b.y()(h,g));f.push({point:h,pointIndex:g,pos:[d,i],seriesIndex:e.seriesIndex,series:e})}}),e.dispatch.elementClick(f)}),i.dispatch.on("elementMouseout",function(){e.clearHighlights()}),w.on("changeState",function(a){"undefined"!=typeof a.disabled&&j.length===a.disabled.length&&(j.forEach(function(b,c){b.disabled=a.disabled[c]}),t.disabled=a.disabled),b.update()})}),y.renderEnd("lineChart immediate"),b}var c,d,e=a.models.line(),f=a.models.axis(),g=a.models.axis(),h=a.models.legend(),i=a.interactiveGuideline(),j=a.models.tooltip(),k={top:30,right:20,bottom:50,left:60},l=a.utils.defaultColor(),m=null,n=null,o=!0,p=!0,q=!0,r=!1,s=!1,t=a.utils.state(),u=null,v=null,w=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState","renderEnd"),x=250;f.orient("bottom").tickPadding(7),g.orient(r?"right":"left"),j.valueFormatter(function(a,b){return g.tickFormat()(a,b)}).headerFormatter(function(a,b){return f.tickFormat()(a,b)});var y=a.utils.renderWatch(w,x),z=function(a){return function(){return{active:a.map(function(a){return!a.disabled})}}},A=function(a){return function(b){void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}};return e.dispatch.on("elementMouseover.tooltip",function(a){j.data(a).position(a.pos).hidden(!1)}),e.dispatch.on("elementMouseout.tooltip",function(){j.hidden(!0)}),b.dispatch=w,b.lines=e,b.legend=h,b.xAxis=f,b.yAxis=g,b.interactiveLayer=i,b.tooltip=j,b.dispatch=w,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return m},set:function(a){m=a}},height:{get:function(){return n},set:function(a){n=a}},showLegend:{get:function(){return o},set:function(a){o=a}},showXAxis:{get:function(){return p},set:function(a){p=a}},showYAxis:{get:function(){return q},set:function(a){q=a}},defaultState:{get:function(){return u},set:function(a){u=a}},noData:{get:function(){return v},set:function(a){v=a}},tooltips:{get:function(){return j.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),j.enabled(!!b)}},tooltipContent:{get:function(){return j.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),j.contentGenerator(b)}},margin:{get:function(){return k},set:function(a){k.top=void 0!==a.top?a.top:k.top,k.right=void 0!==a.right?a.right:k.right,k.bottom=void 0!==a.bottom?a.bottom:k.bottom,k.left=void 0!==a.left?a.left:k.left}},duration:{get:function(){return x},set:function(a){x=a,y.reset(x),e.duration(x),f.duration(x),g.duration(x)}},color:{get:function(){return l},set:function(b){l=a.utils.getColor(b),h.color(l),e.color(l)}},rightAlignYAxis:{get:function(){return r},set:function(a){r=a,g.orient(r?"right":"left")}},useInteractiveGuideline:{get:function(){return s},set:function(a){s=a,s&&(e.interactive(!1),e.useVoronoi(!1))}}}),a.utils.inheritOptions(b,e),a.utils.initOptions(b),b},a.models.linePlusBarChart=function(){"use strict";function b(v){return v.each(function(v){function J(a){var b=+("e"==a),c=b?1:-1,d=X/3;return"M"+.5*c+","+d+"A6,6 0 0 "+b+" "+6.5*c+","+(d+6)+"V"+(2*d-6)+"A6,6 0 0 "+b+" "+.5*c+","+2*d+"ZM"+2.5*c+","+(d+8)+"V"+(2*d-8)+"M"+4.5*c+","+(d+8)+"V"+(2*d-8)}function S(){u.empty()||u.extent(I),kb.data([u.empty()?e.domain():I]).each(function(a){var b=e(a[0])-e.range()[0],c=e.range()[1]-e(a[1]);d3.select(this).select(".left").attr("width",0>b?0:b),d3.select(this).select(".right").attr("x",e(a[1])).attr("width",0>c?0:c)})}function T(){I=u.empty()?null:u.extent(),c=u.empty()?e.domain():u.extent(),K.brush({extent:c,brush:u}),S(),l.width(V).height(W).color(v.map(function(a,b){return a.color||C(a,b)}).filter(function(a,b){return!v[b].disabled&&v[b].bar})),j.width(V).height(W).color(v.map(function(a,b){return a.color||C(a,b)}).filter(function(a,b){return!v[b].disabled&&!v[b].bar}));var b=db.select(".nv-focus .nv-barsWrap").datum(Z.length?Z.map(function(a){return{key:a.key,values:a.values.filter(function(a,b){return l.x()(a,b)>=c[0]&&l.x()(a,b)<=c[1]})}}):[{values:[]}]),h=db.select(".nv-focus .nv-linesWrap").datum($[0].disabled?[{values:[]}]:$.map(function(a){return{area:a.area,fillOpacity:a.fillOpacity,key:a.key,values:a.values.filter(function(a,b){return j.x()(a,b)>=c[0]&&j.x()(a,b)<=c[1]})}}));d=Z.length?l.xScale():j.xScale(),n.scale(d)._ticks(a.utils.calcTicksX(V/100,v)).tickSize(-W,0),n.domain([Math.ceil(c[0]),Math.floor(c[1])]),db.select(".nv-x.nv-axis").transition().duration(L).call(n),b.transition().duration(L).call(l),h.transition().duration(L).call(j),db.select(".nv-focus .nv-x.nv-axis").attr("transform","translate(0,"+f.range()[0]+")"),p.scale(f)._ticks(a.utils.calcTicksY(W/36,v)).tickSize(-V,0),q.scale(g)._ticks(a.utils.calcTicksY(W/36,v)).tickSize(Z.length?0:-V,0),db.select(".nv-focus .nv-y1.nv-axis").style("opacity",Z.length?1:0),db.select(".nv-focus .nv-y2.nv-axis").style("opacity",$.length&&!$[0].disabled?1:0).attr("transform","translate("+d.range()[1]+",0)"),db.select(".nv-focus .nv-y1.nv-axis").transition().duration(L).call(p),db.select(".nv-focus .nv-y2.nv-axis").transition().duration(L).call(q)}var U=d3.select(this);a.utils.initSVG(U);var V=a.utils.availableWidth(y,U,w),W=a.utils.availableHeight(z,U,w)-(E?H:0),X=H-x.top-x.bottom;if(b.update=function(){U.transition().duration(L).call(b)},b.container=this,M.setter(R(v),b.update).getter(Q(v)).update(),M.disabled=v.map(function(a){return!!a.disabled}),!N){var Y;N={};for(Y in M)N[Y]=M[Y]instanceof Array?M[Y].slice(0):M[Y]}if(!(v&&v.length&&v.filter(function(a){return a.values.length}).length))return a.utils.noData(b,U),b;U.selectAll(".nv-noData").remove();var Z=v.filter(function(a){return!a.disabled&&a.bar}),$=v.filter(function(a){return!a.bar});d=l.xScale(),e=o.scale(),f=l.yScale(),g=j.yScale(),h=m.yScale(),i=k.yScale();var _=v.filter(function(a){return!a.disabled&&a.bar}).map(function(a){return a.values.map(function(a,b){return{x:A(a,b),y:B(a,b)}})}),ab=v.filter(function(a){return!a.disabled&&!a.bar}).map(function(a){return a.values.map(function(a,b){return{x:A(a,b),y:B(a,b)}})});d.range([0,V]),e.domain(d3.extent(d3.merge(_.concat(ab)),function(a){return a.x})).range([0,V]);var bb=U.selectAll("g.nv-wrap.nv-linePlusBar").data([v]),cb=bb.enter().append("g").attr("class","nvd3 nv-wrap nv-linePlusBar").append("g"),db=bb.select("g");cb.append("g").attr("class","nv-legendWrap");var eb=cb.append("g").attr("class","nv-focus");eb.append("g").attr("class","nv-x nv-axis"),eb.append("g").attr("class","nv-y1 nv-axis"),eb.append("g").attr("class","nv-y2 nv-axis"),eb.append("g").attr("class","nv-barsWrap"),eb.append("g").attr("class","nv-linesWrap");var fb=cb.append("g").attr("class","nv-context");if(fb.append("g").attr("class","nv-x nv-axis"),fb.append("g").attr("class","nv-y1 nv-axis"),fb.append("g").attr("class","nv-y2 nv-axis"),fb.append("g").attr("class","nv-barsWrap"),fb.append("g").attr("class","nv-linesWrap"),fb.append("g").attr("class","nv-brushBackground"),fb.append("g").attr("class","nv-x nv-brush"),D){var gb=t.align()?V/2:V,hb=t.align()?gb:0;t.width(gb),db.select(".nv-legendWrap").datum(v.map(function(a){return a.originalKey=void 0===a.originalKey?a.key:a.originalKey,a.key=a.originalKey+(a.bar?O:P),a})).call(t),w.top!=t.height()&&(w.top=t.height(),W=a.utils.availableHeight(z,U,w)-H),db.select(".nv-legendWrap").attr("transform","translate("+hb+","+-w.top+")")}bb.attr("transform","translate("+w.left+","+w.top+")"),db.select(".nv-context").style("display",E?"initial":"none"),m.width(V).height(X).color(v.map(function(a,b){return a.color||C(a,b)}).filter(function(a,b){return!v[b].disabled&&v[b].bar})),k.width(V).height(X).color(v.map(function(a,b){return a.color||C(a,b)}).filter(function(a,b){return!v[b].disabled&&!v[b].bar}));var ib=db.select(".nv-context .nv-barsWrap").datum(Z.length?Z:[{values:[]}]),jb=db.select(".nv-context .nv-linesWrap").datum($[0].disabled?[{values:[]}]:$);db.select(".nv-context").attr("transform","translate(0,"+(W+w.bottom+x.top)+")"),ib.transition().call(m),jb.transition().call(k),G&&(o._ticks(a.utils.calcTicksX(V/100,v)).tickSize(-X,0),db.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+h.range()[0]+")"),db.select(".nv-context .nv-x.nv-axis").transition().call(o)),F&&(r.scale(h)._ticks(X/36).tickSize(-V,0),s.scale(i)._ticks(X/36).tickSize(Z.length?0:-V,0),db.select(".nv-context .nv-y3.nv-axis").style("opacity",Z.length?1:0).attr("transform","translate(0,"+e.range()[0]+")"),db.select(".nv-context .nv-y2.nv-axis").style("opacity",$.length?1:0).attr("transform","translate("+e.range()[1]+",0)"),db.select(".nv-context .nv-y1.nv-axis").transition().call(r),db.select(".nv-context .nv-y2.nv-axis").transition().call(s)),u.x(e).on("brush",T),I&&u.extent(I);var kb=db.select(".nv-brushBackground").selectAll("g").data([I||u.extent()]),lb=kb.enter().append("g");lb.append("rect").attr("class","left").attr("x",0).attr("y",0).attr("height",X),lb.append("rect").attr("class","right").attr("x",0).attr("y",0).attr("height",X);var mb=db.select(".nv-x.nv-brush").call(u);mb.selectAll("rect").attr("height",X),mb.selectAll(".resize").append("path").attr("d",J),t.dispatch.on("stateChange",function(a){for(var c in a)M[c]=a[c];K.stateChange(M),b.update()}),K.on("changeState",function(a){"undefined"!=typeof a.disabled&&(v.forEach(function(b,c){b.disabled=a.disabled[c]}),M.disabled=a.disabled),b.update()}),T()}),b}var c,d,e,f,g,h,i,j=a.models.line(),k=a.models.line(),l=a.models.historicalBar(),m=a.models.historicalBar(),n=a.models.axis(),o=a.models.axis(),p=a.models.axis(),q=a.models.axis(),r=a.models.axis(),s=a.models.axis(),t=a.models.legend(),u=d3.svg.brush(),v=a.models.tooltip(),w={top:30,right:30,bottom:30,left:60},x={top:0,right:30,bottom:20,left:60},y=null,z=null,A=function(a){return a.x},B=function(a){return a.y},C=a.utils.defaultColor(),D=!0,E=!0,F=!1,G=!0,H=50,I=null,J=null,K=d3.dispatch("brush","stateChange","changeState"),L=0,M=a.utils.state(),N=null,O=" (left axis)",P=" (right axis)";j.clipEdge(!0),k.interactive(!1),n.orient("bottom").tickPadding(5),p.orient("left"),q.orient("right"),o.orient("bottom").tickPadding(5),r.orient("left"),s.orient("right"),v.headerEnabled(!0).headerFormatter(function(a,b){return n.tickFormat()(a,b)});var Q=function(a){return function(){return{active:a.map(function(a){return!a.disabled})}}},R=function(a){return function(b){void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}};return j.dispatch.on("elementMouseover.tooltip",function(a){v.duration(100).valueFormatter(function(a,b){return q.tickFormat()(a,b)}).data(a).position(a.pos).hidden(!1)}),j.dispatch.on("elementMouseout.tooltip",function(){v.hidden(!0)}),l.dispatch.on("elementMouseover.tooltip",function(a){a.value=b.x()(a.data),a.series={value:b.y()(a.data),color:a.color},v.duration(0).valueFormatter(function(a,b){return p.tickFormat()(a,b)}).data(a).hidden(!1)}),l.dispatch.on("elementMouseout.tooltip",function(){v.hidden(!0)}),l.dispatch.on("elementMousemove.tooltip",function(){v.position({top:d3.event.pageY,left:d3.event.pageX})()}),b.dispatch=K,b.legend=t,b.lines=j,b.lines2=k,b.bars=l,b.bars2=m,b.xAxis=n,b.x2Axis=o,b.y1Axis=p,b.y2Axis=q,b.y3Axis=r,b.y4Axis=s,b.tooltip=v,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return y},set:function(a){y=a}},height:{get:function(){return z},set:function(a){z=a}},showLegend:{get:function(){return D},set:function(a){D=a}},brushExtent:{get:function(){return I},set:function(a){I=a}},noData:{get:function(){return J},set:function(a){J=a}},focusEnable:{get:function(){return E},set:function(a){E=a}},focusHeight:{get:function(){return H},set:function(a){H=a}},focusShowAxisX:{get:function(){return G},set:function(a){G=a}},focusShowAxisY:{get:function(){return F},set:function(a){F=a}},legendLeftAxisHint:{get:function(){return O},set:function(a){O=a}},legendRightAxisHint:{get:function(){return P},set:function(a){P=a}},tooltips:{get:function(){return v.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),v.enabled(!!b)}},tooltipContent:{get:function(){return v.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),v.contentGenerator(b)}},margin:{get:function(){return w},set:function(a){w.top=void 0!==a.top?a.top:w.top,w.right=void 0!==a.right?a.right:w.right,w.bottom=void 0!==a.bottom?a.bottom:w.bottom,w.left=void 0!==a.left?a.left:w.left}},duration:{get:function(){return L},set:function(a){L=a}},color:{get:function(){return C},set:function(b){C=a.utils.getColor(b),t.color(C)}},x:{get:function(){return A},set:function(a){A=a,j.x(a),k.x(a),l.x(a),m.x(a)}},y:{get:function(){return B},set:function(a){B=a,j.y(a),k.y(a),l.y(a),m.y(a)}}}),a.utils.inheritOptions(b,j),a.utils.initOptions(b),b},a.models.lineWithFocusChart=function(){"use strict";function b(o){return o.each(function(o){function z(a){var b=+("e"==a),c=b?1:-1,d=M/3;return"M"+.5*c+","+d+"A6,6 0 0 "+b+" "+6.5*c+","+(d+6)+"V"+(2*d-6)+"A6,6 0 0 "+b+" "+.5*c+","+2*d+"ZM"+2.5*c+","+(d+8)+"V"+(2*d-8)+"M"+4.5*c+","+(d+8)+"V"+(2*d-8)}function G(){n.empty()||n.extent(y),U.data([n.empty()?e.domain():y]).each(function(a){var b=e(a[0])-c.range()[0],d=K-e(a[1]);d3.select(this).select(".left").attr("width",0>b?0:b),d3.select(this).select(".right").attr("x",e(a[1])).attr("width",0>d?0:d)})}function H(){y=n.empty()?null:n.extent();var a=n.empty()?e.domain():n.extent();if(!(Math.abs(a[0]-a[1])<=1)){A.brush({extent:a,brush:n}),G();var b=Q.select(".nv-focus .nv-linesWrap").datum(o.filter(function(a){return!a.disabled}).map(function(b){return{key:b.key,area:b.area,values:b.values.filter(function(b,c){return g.x()(b,c)>=a[0]&&g.x()(b,c)<=a[1]})}}));b.transition().duration(B).call(g),Q.select(".nv-focus .nv-x.nv-axis").transition().duration(B).call(i),Q.select(".nv-focus .nv-y.nv-axis").transition().duration(B).call(j)}}var I=d3.select(this),J=this;a.utils.initSVG(I);var K=a.utils.availableWidth(t,I,q),L=a.utils.availableHeight(u,I,q)-v,M=v-r.top-r.bottom;if(b.update=function(){I.transition().duration(B).call(b)},b.container=this,C.setter(F(o),b.update).getter(E(o)).update(),C.disabled=o.map(function(a){return!!a.disabled}),!D){var N;D={};for(N in C)D[N]=C[N]instanceof Array?C[N].slice(0):C[N]}if(!(o&&o.length&&o.filter(function(a){return a.values.length}).length))return a.utils.noData(b,I),b;I.selectAll(".nv-noData").remove(),c=g.xScale(),d=g.yScale(),e=h.xScale(),f=h.yScale();var O=I.selectAll("g.nv-wrap.nv-lineWithFocusChart").data([o]),P=O.enter().append("g").attr("class","nvd3 nv-wrap nv-lineWithFocusChart").append("g"),Q=O.select("g");P.append("g").attr("class","nv-legendWrap");var R=P.append("g").attr("class","nv-focus");R.append("g").attr("class","nv-x nv-axis"),R.append("g").attr("class","nv-y nv-axis"),R.append("g").attr("class","nv-linesWrap"),R.append("g").attr("class","nv-interactive");var S=P.append("g").attr("class","nv-context");S.append("g").attr("class","nv-x nv-axis"),S.append("g").attr("class","nv-y nv-axis"),S.append("g").attr("class","nv-linesWrap"),S.append("g").attr("class","nv-brushBackground"),S.append("g").attr("class","nv-x nv-brush"),x&&(m.width(K),Q.select(".nv-legendWrap").datum(o).call(m),q.top!=m.height()&&(q.top=m.height(),L=a.utils.availableHeight(u,I,q)-v),Q.select(".nv-legendWrap").attr("transform","translate(0,"+-q.top+")")),O.attr("transform","translate("+q.left+","+q.top+")"),w&&(p.width(K).height(L).margin({left:q.left,top:q.top}).svgContainer(I).xScale(c),O.select(".nv-interactive").call(p)),g.width(K).height(L).color(o.map(function(a,b){return a.color||s(a,b)}).filter(function(a,b){return!o[b].disabled})),h.defined(g.defined()).width(K).height(M).color(o.map(function(a,b){return a.color||s(a,b)}).filter(function(a,b){return!o[b].disabled})),Q.select(".nv-context").attr("transform","translate(0,"+(L+q.bottom+r.top)+")");var T=Q.select(".nv-context .nv-linesWrap").datum(o.filter(function(a){return!a.disabled}));d3.transition(T).call(h),i.scale(c)._ticks(a.utils.calcTicksX(K/100,o)).tickSize(-L,0),j.scale(d)._ticks(a.utils.calcTicksY(L/36,o)).tickSize(-K,0),Q.select(".nv-focus .nv-x.nv-axis").attr("transform","translate(0,"+L+")"),n.x(e).on("brush",function(){H()}),y&&n.extent(y);var U=Q.select(".nv-brushBackground").selectAll("g").data([y||n.extent()]),V=U.enter().append("g");V.append("rect").attr("class","left").attr("x",0).attr("y",0).attr("height",M),V.append("rect").attr("class","right").attr("x",0).attr("y",0).attr("height",M);var W=Q.select(".nv-x.nv-brush").call(n);W.selectAll("rect").attr("height",M),W.selectAll(".resize").append("path").attr("d",z),H(),k.scale(e)._ticks(a.utils.calcTicksX(K/100,o)).tickSize(-M,0),Q.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+f.range()[0]+")"),d3.transition(Q.select(".nv-context .nv-x.nv-axis")).call(k),l.scale(f)._ticks(a.utils.calcTicksY(M/36,o)).tickSize(-K,0),d3.transition(Q.select(".nv-context .nv-y.nv-axis")).call(l),Q.select(".nv-context .nv-x.nv-axis").attr("transform","translate(0,"+f.range()[0]+")"),m.dispatch.on("stateChange",function(a){for(var c in a)C[c]=a[c];A.stateChange(C),b.update()}),p.dispatch.on("elementMousemove",function(c){g.clearHighlights();var d,f,h,k=[];if(o.filter(function(a,b){return a.seriesIndex=b,!a.disabled}).forEach(function(i,j){var l=n.empty()?e.domain():n.extent(),m=i.values.filter(function(a,b){return g.x()(a,b)>=l[0]&&g.x()(a,b)<=l[1]});f=a.interactiveBisect(m,c.pointXValue,g.x());var o=m[f],p=b.y()(o,f);null!=p&&g.highlightPoint(j,f,!0),void 0!==o&&(void 0===d&&(d=o),void 0===h&&(h=b.xScale()(b.x()(o,f))),k.push({key:i.key,value:b.y()(o,f),color:s(i,i.seriesIndex)}))}),k.length>2){var l=b.yScale().invert(c.mouseY),m=Math.abs(b.yScale().domain()[0]-b.yScale().domain()[1]),r=.03*m,t=a.nearestValueIndex(k.map(function(a){return a.value}),l,r);null!==t&&(k[t].highlight=!0)}var u=i.tickFormat()(b.x()(d,f));p.tooltip.position({left:c.mouseX+q.left,top:c.mouseY+q.top}).chartContainer(J.parentNode).valueFormatter(function(a){return null==a?"N/A":j.tickFormat()(a)}).data({value:u,index:f,series:k})(),p.renderGuideLine(h)}),p.dispatch.on("elementMouseout",function(){g.clearHighlights()}),A.on("changeState",function(a){"undefined"!=typeof a.disabled&&o.forEach(function(b,c){b.disabled=a.disabled[c]}),b.update()})}),b}var c,d,e,f,g=a.models.line(),h=a.models.line(),i=a.models.axis(),j=a.models.axis(),k=a.models.axis(),l=a.models.axis(),m=a.models.legend(),n=d3.svg.brush(),o=a.models.tooltip(),p=a.interactiveGuideline(),q={top:30,right:30,bottom:30,left:60},r={top:0,right:30,bottom:20,left:60},s=a.utils.defaultColor(),t=null,u=null,v=50,w=!1,x=!0,y=null,z=null,A=d3.dispatch("brush","stateChange","changeState"),B=250,C=a.utils.state(),D=null;g.clipEdge(!0).duration(0),h.interactive(!1),i.orient("bottom").tickPadding(5),j.orient("left"),k.orient("bottom").tickPadding(5),l.orient("left"),o.valueFormatter(function(a,b){return j.tickFormat()(a,b)}).headerFormatter(function(a,b){return i.tickFormat()(a,b)});var E=function(a){return function(){return{active:a.map(function(a){return!a.disabled})}}},F=function(a){return function(b){void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}};return g.dispatch.on("elementMouseover.tooltip",function(a){o.data(a).position(a.pos).hidden(!1)}),g.dispatch.on("elementMouseout.tooltip",function(){o.hidden(!0)}),b.dispatch=A,b.legend=m,b.lines=g,b.lines2=h,b.xAxis=i,b.yAxis=j,b.x2Axis=k,b.y2Axis=l,b.interactiveLayer=p,b.tooltip=o,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return t},set:function(a){t=a}},height:{get:function(){return u},set:function(a){u=a}},focusHeight:{get:function(){return v},set:function(a){v=a}},showLegend:{get:function(){return x},set:function(a){x=a}},brushExtent:{get:function(){return y},set:function(a){y=a}},defaultState:{get:function(){return D},set:function(a){D=a}},noData:{get:function(){return z},set:function(a){z=a}},tooltips:{get:function(){return o.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),o.enabled(!!b)}},tooltipContent:{get:function(){return o.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),o.contentGenerator(b)}},margin:{get:function(){return q},set:function(a){q.top=void 0!==a.top?a.top:q.top,q.right=void 0!==a.right?a.right:q.right,q.bottom=void 0!==a.bottom?a.bottom:q.bottom,q.left=void 0!==a.left?a.left:q.left}},color:{get:function(){return s},set:function(b){s=a.utils.getColor(b),m.color(s)}},interpolate:{get:function(){return g.interpolate()},set:function(a){g.interpolate(a),h.interpolate(a)}},xTickFormat:{get:function(){return i.tickFormat()},set:function(a){i.tickFormat(a),k.tickFormat(a)}},yTickFormat:{get:function(){return j.tickFormat()},set:function(a){j.tickFormat(a),l.tickFormat(a)}},duration:{get:function(){return B},set:function(a){B=a,j.duration(B),l.duration(B),i.duration(B),k.duration(B)}},x:{get:function(){return g.x()},set:function(a){g.x(a),h.x(a)}},y:{get:function(){return g.y()},set:function(a){g.y(a),h.y(a)}},useInteractiveGuideline:{get:function(){return w},set:function(a){w=a,w&&(g.interactive(!1),g.useVoronoi(!1))}}}),a.utils.inheritOptions(b,g),a.utils.initOptions(b),b},a.models.multiBar=function(){"use strict";function b(E){return C.reset(),E.each(function(b){var E=k-j.left-j.right,F=l-j.top-j.bottom;p=d3.select(this),a.utils.initSVG(p);var G=0;if(x&&b.length&&(x=[{values:b[0].values.map(function(a){return{x:a.x,y:0,series:a.series,size:.01}})}]),u){var H=d3.layout.stack().offset(v).values(function(a){return a.values}).y(r)(!b.length&&x?x:b);H.forEach(function(a,c){a.nonStackable?(b[c].nonStackableSeries=G++,H[c]=b[c]):c>0&&H[c-1].nonStackable&&H[c].values.map(function(a,b){a.y0-=H[c-1].values[b].y,a.y1=a.y0+a.y})}),b=H}b.forEach(function(a,b){a.values.forEach(function(c){c.series=b,c.key=a.key})}),u&&b[0].values.map(function(a,c){var d=0,e=0;b.map(function(a,f){if(!b[f].nonStackable){var g=a.values[c];g.size=Math.abs(g.y),g.y<0?(g.y1=e,e-=g.size):(g.y1=g.size+d,d+=g.size)}})});var I=d&&e?[]:b.map(function(a,b){return a.values.map(function(a,c){return{x:q(a,c),y:r(a,c),y0:a.y0,y1:a.y1,idx:b}})});m.domain(d||d3.merge(I).map(function(a){return a.x})).rangeBands(f||[0,E],A),n.domain(e||d3.extent(d3.merge(I).map(function(a){var c=a.y;return u&&!b[a.idx].nonStackable&&(c=a.y>0?a.y1:a.y1+a.y),c}).concat(s))).range(g||[F,0]),m.domain()[0]===m.domain()[1]&&m.domain(m.domain()[0]?[m.domain()[0]-.01*m.domain()[0],m.domain()[1]+.01*m.domain()[1]]:[-1,1]),n.domain()[0]===n.domain()[1]&&n.domain(n.domain()[0]?[n.domain()[0]+.01*n.domain()[0],n.domain()[1]-.01*n.domain()[1]]:[-1,1]),h=h||m,i=i||n;var J=p.selectAll("g.nv-wrap.nv-multibar").data([b]),K=J.enter().append("g").attr("class","nvd3 nv-wrap nv-multibar"),L=K.append("defs"),M=K.append("g"),N=J.select("g");M.append("g").attr("class","nv-groups"),J.attr("transform","translate("+j.left+","+j.top+")"),L.append("clipPath").attr("id","nv-edge-clip-"+o).append("rect"),J.select("#nv-edge-clip-"+o+" rect").attr("width",E).attr("height",F),N.attr("clip-path",t?"url(#nv-edge-clip-"+o+")":"");var O=J.select(".nv-groups").selectAll(".nv-group").data(function(a){return a},function(a,b){return b});O.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6);var P=C.transition(O.exit().selectAll("rect.nv-bar"),"multibarExit",Math.min(100,z)).attr("y",function(a){var c=i(0)||0;return u&&b[a.series]&&!b[a.series].nonStackable&&(c=i(a.y0)),c}).attr("height",0).remove();P.delay&&P.delay(function(a,b){var c=b*(z/(D+1))-b;return c}),O.attr("class",function(a,b){return"nv-group nv-series-"+b}).classed("hover",function(a){return a.hover}).style("fill",function(a,b){return w(a,b)}).style("stroke",function(a,b){return w(a,b)}),O.style("stroke-opacity",1).style("fill-opacity",.75);var Q=O.selectAll("rect.nv-bar").data(function(a){return x&&!b.length?x.values:a.values});Q.exit().remove();Q.enter().append("rect").attr("class",function(a,b){return r(a,b)<0?"nv-bar negative":"nv-bar positive"}).attr("x",function(a,c,d){return u&&!b[d].nonStackable?0:d*m.rangeBand()/b.length}).attr("y",function(a,c,d){return i(u&&!b[d].nonStackable?a.y0:0)||0}).attr("height",0).attr("width",function(a,c,d){return m.rangeBand()/(u&&!b[d].nonStackable?1:b.length)}).attr("transform",function(a,b){return"translate("+m(q(a,b))+",0)"});Q.style("fill",function(a,b,c){return w(a,c,b)}).style("stroke",function(a,b,c){return w(a,c,b)}).on("mouseover",function(a,b){d3.select(this).classed("hover",!0),B.elementMouseover({data:a,index:b,color:d3.select(this).style("fill")})}).on("mouseout",function(a,b){d3.select(this).classed("hover",!1),B.elementMouseout({data:a,index:b,color:d3.select(this).style("fill")})}).on("mousemove",function(a,b){B.elementMousemove({data:a,index:b,color:d3.select(this).style("fill")})}).on("click",function(a,b){B.elementClick({data:a,index:b,color:d3.select(this).style("fill")}),d3.event.stopPropagation()}).on("dblclick",function(a,b){B.elementDblClick({data:a,index:b,color:d3.select(this).style("fill")}),d3.event.stopPropagation()}),Q.attr("class",function(a,b){return r(a,b)<0?"nv-bar negative":"nv-bar positive"}).attr("transform",function(a,b){return"translate("+m(q(a,b))+",0)"}),y&&(c||(c=b.map(function(){return!0})),Q.style("fill",function(a,b,d){return d3.rgb(y(a,b)).darker(c.map(function(a,b){return b}).filter(function(a,b){return!c[b]})[d]).toString()}).style("stroke",function(a,b,d){return d3.rgb(y(a,b)).darker(c.map(function(a,b){return b}).filter(function(a,b){return!c[b]})[d]).toString()}));var R=Q.watchTransition(C,"multibar",Math.min(250,z)).delay(function(a,c){return c*z/b[0].values.length});u?R.attr("y",function(a,c,d){var e=0;return e=b[d].nonStackable?r(a,c)<0?n(0):n(0)-n(r(a,c))<-1?n(0)-1:n(r(a,c))||0:n(a.y1)}).attr("height",function(a,c,d){return b[d].nonStackable?Math.max(Math.abs(n(r(a,c))-n(0)),1)||0:Math.max(Math.abs(n(a.y+a.y0)-n(a.y0)),1)}).attr("x",function(a,c,d){var e=0;return b[d].nonStackable&&(e=a.series*m.rangeBand()/b.length,b.length!==G&&(e=b[d].nonStackableSeries*m.rangeBand()/(2*G))),e}).attr("width",function(a,c,d){if(b[d].nonStackable){var e=m.rangeBand()/G;return b.length!==G&&(e=m.rangeBand()/(2*G)),e}return m.rangeBand()}):R.attr("x",function(a){return a.series*m.rangeBand()/b.length}).attr("width",m.rangeBand()/b.length).attr("y",function(a,b){return r(a,b)<0?n(0):n(0)-n(r(a,b))<1?n(0)-1:n(r(a,b))||0}).attr("height",function(a,b){return Math.max(Math.abs(n(r(a,b))-n(0)),1)||0}),h=m.copy(),i=n.copy(),b[0]&&b[0].values&&(D=b[0].values.length)}),C.renderEnd("multibar immediate"),b}var c,d,e,f,g,h,i,j={top:0,right:0,bottom:0,left:0},k=960,l=500,m=d3.scale.ordinal(),n=d3.scale.linear(),o=Math.floor(1e4*Math.random()),p=null,q=function(a){return a.x},r=function(a){return a.y},s=[0],t=!0,u=!1,v="zero",w=a.utils.defaultColor(),x=!1,y=null,z=500,A=.1,B=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout","elementMousemove","renderEnd"),C=a.utils.renderWatch(B,z),D=0;return b.dispatch=B,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return k},set:function(a){k=a}},height:{get:function(){return l},set:function(a){l=a}},x:{get:function(){return q},set:function(a){q=a}},y:{get:function(){return r},set:function(a){r=a}},xScale:{get:function(){return m},set:function(a){m=a}},yScale:{get:function(){return n},set:function(a){n=a}},xDomain:{get:function(){return d},set:function(a){d=a}},yDomain:{get:function(){return e},set:function(a){e=a}},xRange:{get:function(){return f},set:function(a){f=a}},yRange:{get:function(){return g},set:function(a){g=a}},forceY:{get:function(){return s},set:function(a){s=a}},stacked:{get:function(){return u},set:function(a){u=a}},stackOffset:{get:function(){return v},set:function(a){v=a}},clipEdge:{get:function(){return t},set:function(a){t=a}},disabled:{get:function(){return c},set:function(a){c=a}},id:{get:function(){return o},set:function(a){o=a}},hideable:{get:function(){return x},set:function(a){x=a}},groupSpacing:{get:function(){return A},set:function(a){A=a}},margin:{get:function(){return j},set:function(a){j.top=void 0!==a.top?a.top:j.top,j.right=void 0!==a.right?a.right:j.right,j.bottom=void 0!==a.bottom?a.bottom:j.bottom,j.left=void 0!==a.left?a.left:j.left}},duration:{get:function(){return z},set:function(a){z=a,C.reset(z)}},color:{get:function(){return w},set:function(b){w=a.utils.getColor(b)}},barColor:{get:function(){return y},set:function(b){y=b?a.utils.getColor(b):null}}}),a.utils.initOptions(b),b},a.models.multiBarChart=function(){"use strict";function b(j){return D.reset(),D.models(e),r&&D.models(f),s&&D.models(g),j.each(function(j){var z=d3.select(this);a.utils.initSVG(z);var D=a.utils.availableWidth(l,z,k),H=a.utils.availableHeight(m,z,k);if(b.update=function(){0===C?z.call(b):z.transition().duration(C).call(b)},b.container=this,x.setter(G(j),b.update).getter(F(j)).update(),x.disabled=j.map(function(a){return!!a.disabled}),!y){var I;y={};for(I in x)y[I]=x[I]instanceof Array?x[I].slice(0):x[I]}if(!(j&&j.length&&j.filter(function(a){return a.values.length}).length))return a.utils.noData(b,z),b;z.selectAll(".nv-noData").remove(),c=e.xScale(),d=e.yScale();
var J=z.selectAll("g.nv-wrap.nv-multiBarWithLegend").data([j]),K=J.enter().append("g").attr("class","nvd3 nv-wrap nv-multiBarWithLegend").append("g"),L=J.select("g");if(K.append("g").attr("class","nv-x nv-axis"),K.append("g").attr("class","nv-y nv-axis"),K.append("g").attr("class","nv-barsWrap"),K.append("g").attr("class","nv-legendWrap"),K.append("g").attr("class","nv-controlsWrap"),q&&(h.width(D-B()),L.select(".nv-legendWrap").datum(j).call(h),k.top!=h.height()&&(k.top=h.height(),H=a.utils.availableHeight(m,z,k)),L.select(".nv-legendWrap").attr("transform","translate("+B()+","+-k.top+")")),o){var M=[{key:p.grouped||"Grouped",disabled:e.stacked()},{key:p.stacked||"Stacked",disabled:!e.stacked()}];i.width(B()).color(["#444","#444","#444"]),L.select(".nv-controlsWrap").datum(M).attr("transform","translate(0,"+-k.top+")").call(i)}J.attr("transform","translate("+k.left+","+k.top+")"),t&&L.select(".nv-y.nv-axis").attr("transform","translate("+D+",0)"),e.disabled(j.map(function(a){return a.disabled})).width(D).height(H).color(j.map(function(a,b){return a.color||n(a,b)}).filter(function(a,b){return!j[b].disabled}));var N=L.select(".nv-barsWrap").datum(j.filter(function(a){return!a.disabled}));if(N.call(e),r){f.scale(c)._ticks(a.utils.calcTicksX(D/100,j)).tickSize(-H,0),L.select(".nv-x.nv-axis").attr("transform","translate(0,"+d.range()[0]+")"),L.select(".nv-x.nv-axis").call(f);var O=L.select(".nv-x.nv-axis > g").selectAll("g");if(O.selectAll("line, text").style("opacity",1),v){var P=function(a,b){return"translate("+a+","+b+")"},Q=5,R=17;O.selectAll("text").attr("transform",function(a,b,c){return P(0,c%2==0?Q:R)});var S=d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;L.selectAll(".nv-x.nv-axis .nv-axisMaxMin text").attr("transform",function(a,b){return P(0,0===b||S%2!==0?R:Q)})}u&&O.filter(function(a,b){return b%Math.ceil(j[0].values.length/(D/100))!==0}).selectAll("text, line").style("opacity",0),w&&O.selectAll(".tick text").attr("transform","rotate("+w+" 0,0)").style("text-anchor",w>0?"start":"end"),L.select(".nv-x.nv-axis").selectAll("g.nv-axisMaxMin text").style("opacity",1)}s&&(g.scale(d)._ticks(a.utils.calcTicksY(H/36,j)).tickSize(-D,0),L.select(".nv-y.nv-axis").call(g)),h.dispatch.on("stateChange",function(a){for(var c in a)x[c]=a[c];A.stateChange(x),b.update()}),i.dispatch.on("legendClick",function(a){if(a.disabled){switch(M=M.map(function(a){return a.disabled=!0,a}),a.disabled=!1,a.key){case"Grouped":case p.grouped:e.stacked(!1);break;case"Stacked":case p.stacked:e.stacked(!0)}x.stacked=e.stacked(),A.stateChange(x),b.update()}}),A.on("changeState",function(a){"undefined"!=typeof a.disabled&&(j.forEach(function(b,c){b.disabled=a.disabled[c]}),x.disabled=a.disabled),"undefined"!=typeof a.stacked&&(e.stacked(a.stacked),x.stacked=a.stacked,E=a.stacked),b.update()})}),D.renderEnd("multibarchart immediate"),b}var c,d,e=a.models.multiBar(),f=a.models.axis(),g=a.models.axis(),h=a.models.legend(),i=a.models.legend(),j=a.models.tooltip(),k={top:30,right:20,bottom:50,left:60},l=null,m=null,n=a.utils.defaultColor(),o=!0,p={},q=!0,r=!0,s=!0,t=!1,u=!0,v=!1,w=0,x=a.utils.state(),y=null,z=null,A=d3.dispatch("stateChange","changeState","renderEnd"),B=function(){return o?180:0},C=250;x.stacked=!1,e.stacked(!1),f.orient("bottom").tickPadding(7).showMaxMin(!1).tickFormat(function(a){return a}),g.orient(t?"right":"left").tickFormat(d3.format(",.1f")),j.duration(0).valueFormatter(function(a,b){return g.tickFormat()(a,b)}).headerFormatter(function(a,b){return f.tickFormat()(a,b)}),i.updateState(!1);var D=a.utils.renderWatch(A),E=!1,F=function(a){return function(){return{active:a.map(function(a){return!a.disabled}),stacked:E}}},G=function(a){return function(b){void 0!==b.stacked&&(E=b.stacked),void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}};return e.dispatch.on("elementMouseover.tooltip",function(a){a.value=b.x()(a.data),a.series={key:a.data.key,value:b.y()(a.data),color:a.color},j.data(a).hidden(!1)}),e.dispatch.on("elementMouseout.tooltip",function(){j.hidden(!0)}),e.dispatch.on("elementMousemove.tooltip",function(){j.position({top:d3.event.pageY,left:d3.event.pageX})()}),b.dispatch=A,b.multibar=e,b.legend=h,b.controls=i,b.xAxis=f,b.yAxis=g,b.state=x,b.tooltip=j,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return l},set:function(a){l=a}},height:{get:function(){return m},set:function(a){m=a}},showLegend:{get:function(){return q},set:function(a){q=a}},showControls:{get:function(){return o},set:function(a){o=a}},controlLabels:{get:function(){return p},set:function(a){p=a}},showXAxis:{get:function(){return r},set:function(a){r=a}},showYAxis:{get:function(){return s},set:function(a){s=a}},defaultState:{get:function(){return y},set:function(a){y=a}},noData:{get:function(){return z},set:function(a){z=a}},reduceXTicks:{get:function(){return u},set:function(a){u=a}},rotateLabels:{get:function(){return w},set:function(a){w=a}},staggerLabels:{get:function(){return v},set:function(a){v=a}},tooltips:{get:function(){return j.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),j.enabled(!!b)}},tooltipContent:{get:function(){return j.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),j.contentGenerator(b)}},margin:{get:function(){return k},set:function(a){k.top=void 0!==a.top?a.top:k.top,k.right=void 0!==a.right?a.right:k.right,k.bottom=void 0!==a.bottom?a.bottom:k.bottom,k.left=void 0!==a.left?a.left:k.left}},duration:{get:function(){return C},set:function(a){C=a,e.duration(C),f.duration(C),g.duration(C),D.reset(C)}},color:{get:function(){return n},set:function(b){n=a.utils.getColor(b),h.color(n)}},rightAlignYAxis:{get:function(){return t},set:function(a){t=a,g.orient(t?"right":"left")}},barColor:{get:function(){return e.barColor},set:function(a){e.barColor(a),h.color(function(a,b){return d3.rgb("#ccc").darker(1.5*b).toString()})}}}),a.utils.inheritOptions(b,e),a.utils.initOptions(b),b},a.models.multiBarHorizontal=function(){"use strict";function b(m){return E.reset(),m.each(function(b){var m=k-j.left-j.right,C=l-j.top-j.bottom;n=d3.select(this),a.utils.initSVG(n),w&&(b=d3.layout.stack().offset("zero").values(function(a){return a.values}).y(r)(b)),b.forEach(function(a,b){a.values.forEach(function(c){c.series=b,c.key=a.key})}),w&&b[0].values.map(function(a,c){var d=0,e=0;b.map(function(a){var b=a.values[c];b.size=Math.abs(b.y),b.y<0?(b.y1=e-b.size,e-=b.size):(b.y1=d,d+=b.size)})});var F=d&&e?[]:b.map(function(a){return a.values.map(function(a,b){return{x:q(a,b),y:r(a,b),y0:a.y0,y1:a.y1}})});o.domain(d||d3.merge(F).map(function(a){return a.x})).rangeBands(f||[0,C],A),p.domain(e||d3.extent(d3.merge(F).map(function(a){return w?a.y>0?a.y1+a.y:a.y1:a.y}).concat(t))),p.range(x&&!w?g||[p.domain()[0]<0?z:0,m-(p.domain()[1]>0?z:0)]:g||[0,m]),h=h||o,i=i||d3.scale.linear().domain(p.domain()).range([p(0),p(0)]);{var G=d3.select(this).selectAll("g.nv-wrap.nv-multibarHorizontal").data([b]),H=G.enter().append("g").attr("class","nvd3 nv-wrap nv-multibarHorizontal"),I=(H.append("defs"),H.append("g"));G.select("g")}I.append("g").attr("class","nv-groups"),G.attr("transform","translate("+j.left+","+j.top+")");var J=G.select(".nv-groups").selectAll(".nv-group").data(function(a){return a},function(a,b){return b});J.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),J.exit().watchTransition(E,"multibarhorizontal: exit groups").style("stroke-opacity",1e-6).style("fill-opacity",1e-6).remove(),J.attr("class",function(a,b){return"nv-group nv-series-"+b}).classed("hover",function(a){return a.hover}).style("fill",function(a,b){return u(a,b)}).style("stroke",function(a,b){return u(a,b)}),J.watchTransition(E,"multibarhorizontal: groups").style("stroke-opacity",1).style("fill-opacity",.75);var K=J.selectAll("g.nv-bar").data(function(a){return a.values});K.exit().remove();var L=K.enter().append("g").attr("transform",function(a,c,d){return"translate("+i(w?a.y0:0)+","+(w?0:d*o.rangeBand()/b.length+o(q(a,c)))+")"});L.append("rect").attr("width",0).attr("height",o.rangeBand()/(w?1:b.length)),K.on("mouseover",function(a,b){d3.select(this).classed("hover",!0),D.elementMouseover({data:a,index:b,color:d3.select(this).style("fill")})}).on("mouseout",function(a,b){d3.select(this).classed("hover",!1),D.elementMouseout({data:a,index:b,color:d3.select(this).style("fill")})}).on("mouseout",function(a,b){D.elementMouseout({data:a,index:b,color:d3.select(this).style("fill")})}).on("mousemove",function(a,b){D.elementMousemove({data:a,index:b,color:d3.select(this).style("fill")})}).on("click",function(a,b){D.elementClick({data:a,index:b,color:d3.select(this).style("fill")}),d3.event.stopPropagation()}).on("dblclick",function(a,b){D.elementDblClick({data:a,index:b,color:d3.select(this).style("fill")}),d3.event.stopPropagation()}),s(b[0],0)&&(L.append("polyline"),K.select("polyline").attr("fill","none").attr("points",function(a,c){var d=s(a,c),e=.8*o.rangeBand()/(2*(w?1:b.length));d=d.length?d:[-Math.abs(d),Math.abs(d)],d=d.map(function(a){return p(a)-p(0)});var f=[[d[0],-e],[d[0],e],[d[0],0],[d[1],0],[d[1],-e],[d[1],e]];return f.map(function(a){return a.join(",")}).join(" ")}).attr("transform",function(a,c){var d=o.rangeBand()/(2*(w?1:b.length));return"translate("+(r(a,c)<0?0:p(r(a,c))-p(0))+", "+d+")"})),L.append("text"),x&&!w?(K.select("text").attr("text-anchor",function(a,b){return r(a,b)<0?"end":"start"}).attr("y",o.rangeBand()/(2*b.length)).attr("dy",".32em").text(function(a,b){var c=B(r(a,b)),d=s(a,b);return void 0===d?c:d.length?c+"+"+B(Math.abs(d[1]))+"-"+B(Math.abs(d[0])):c+"Â±"+B(Math.abs(d))}),K.watchTransition(E,"multibarhorizontal: bars").select("text").attr("x",function(a,b){return r(a,b)<0?-4:p(r(a,b))-p(0)+4})):K.selectAll("text").text(""),y&&!w?(L.append("text").classed("nv-bar-label",!0),K.select("text.nv-bar-label").attr("text-anchor",function(a,b){return r(a,b)<0?"start":"end"}).attr("y",o.rangeBand()/(2*b.length)).attr("dy",".32em").text(function(a,b){return q(a,b)}),K.watchTransition(E,"multibarhorizontal: bars").select("text.nv-bar-label").attr("x",function(a,b){return r(a,b)<0?p(0)-p(r(a,b))+4:-4})):K.selectAll("text.nv-bar-label").text(""),K.attr("class",function(a,b){return r(a,b)<0?"nv-bar negative":"nv-bar positive"}),v&&(c||(c=b.map(function(){return!0})),K.style("fill",function(a,b,d){return d3.rgb(v(a,b)).darker(c.map(function(a,b){return b}).filter(function(a,b){return!c[b]})[d]).toString()}).style("stroke",function(a,b,d){return d3.rgb(v(a,b)).darker(c.map(function(a,b){return b}).filter(function(a,b){return!c[b]})[d]).toString()})),w?K.watchTransition(E,"multibarhorizontal: bars").attr("transform",function(a,b){return"translate("+p(a.y1)+","+o(q(a,b))+")"}).select("rect").attr("width",function(a,b){return Math.abs(p(r(a,b)+a.y0)-p(a.y0))}).attr("height",o.rangeBand()):K.watchTransition(E,"multibarhorizontal: bars").attr("transform",function(a,c){return"translate("+p(r(a,c)<0?r(a,c):0)+","+(a.series*o.rangeBand()/b.length+o(q(a,c)))+")"}).select("rect").attr("height",o.rangeBand()/b.length).attr("width",function(a,b){return Math.max(Math.abs(p(r(a,b))-p(0)),1)}),h=o.copy(),i=p.copy()}),E.renderEnd("multibarHorizontal immediate"),b}var c,d,e,f,g,h,i,j={top:0,right:0,bottom:0,left:0},k=960,l=500,m=Math.floor(1e4*Math.random()),n=null,o=d3.scale.ordinal(),p=d3.scale.linear(),q=function(a){return a.x},r=function(a){return a.y},s=function(a){return a.yErr},t=[0],u=a.utils.defaultColor(),v=null,w=!1,x=!1,y=!1,z=60,A=.1,B=d3.format(",.2f"),C=250,D=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout","elementMousemove","renderEnd"),E=a.utils.renderWatch(D,C);return b.dispatch=D,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return k},set:function(a){k=a}},height:{get:function(){return l},set:function(a){l=a}},x:{get:function(){return q},set:function(a){q=a}},y:{get:function(){return r},set:function(a){r=a}},yErr:{get:function(){return s},set:function(a){s=a}},xScale:{get:function(){return o},set:function(a){o=a}},yScale:{get:function(){return p},set:function(a){p=a}},xDomain:{get:function(){return d},set:function(a){d=a}},yDomain:{get:function(){return e},set:function(a){e=a}},xRange:{get:function(){return f},set:function(a){f=a}},yRange:{get:function(){return g},set:function(a){g=a}},forceY:{get:function(){return t},set:function(a){t=a}},stacked:{get:function(){return w},set:function(a){w=a}},showValues:{get:function(){return x},set:function(a){x=a}},disabled:{get:function(){return c},set:function(a){c=a}},id:{get:function(){return m},set:function(a){m=a}},valueFormat:{get:function(){return B},set:function(a){B=a}},valuePadding:{get:function(){return z},set:function(a){z=a}},groupSpacing:{get:function(){return A},set:function(a){A=a}},margin:{get:function(){return j},set:function(a){j.top=void 0!==a.top?a.top:j.top,j.right=void 0!==a.right?a.right:j.right,j.bottom=void 0!==a.bottom?a.bottom:j.bottom,j.left=void 0!==a.left?a.left:j.left}},duration:{get:function(){return C},set:function(a){C=a,E.reset(C)}},color:{get:function(){return u},set:function(b){u=a.utils.getColor(b)}},barColor:{get:function(){return v},set:function(b){v=b?a.utils.getColor(b):null}}}),a.utils.initOptions(b),b},a.models.multiBarHorizontalChart=function(){"use strict";function b(j){return C.reset(),C.models(e),r&&C.models(f),s&&C.models(g),j.each(function(j){var w=d3.select(this);a.utils.initSVG(w);var C=a.utils.availableWidth(l,w,k),D=a.utils.availableHeight(m,w,k);if(b.update=function(){w.transition().duration(z).call(b)},b.container=this,t=e.stacked(),u.setter(B(j),b.update).getter(A(j)).update(),u.disabled=j.map(function(a){return!!a.disabled}),!v){var E;v={};for(E in u)v[E]=u[E]instanceof Array?u[E].slice(0):u[E]}if(!(j&&j.length&&j.filter(function(a){return a.values.length}).length))return a.utils.noData(b,w),b;w.selectAll(".nv-noData").remove(),c=e.xScale(),d=e.yScale();var F=w.selectAll("g.nv-wrap.nv-multiBarHorizontalChart").data([j]),G=F.enter().append("g").attr("class","nvd3 nv-wrap nv-multiBarHorizontalChart").append("g"),H=F.select("g");if(G.append("g").attr("class","nv-x nv-axis"),G.append("g").attr("class","nv-y nv-axis").append("g").attr("class","nv-zeroLine").append("line"),G.append("g").attr("class","nv-barsWrap"),G.append("g").attr("class","nv-legendWrap"),G.append("g").attr("class","nv-controlsWrap"),q&&(h.width(C-y()),H.select(".nv-legendWrap").datum(j).call(h),k.top!=h.height()&&(k.top=h.height(),D=a.utils.availableHeight(m,w,k)),H.select(".nv-legendWrap").attr("transform","translate("+y()+","+-k.top+")")),o){var I=[{key:p.grouped||"Grouped",disabled:e.stacked()},{key:p.stacked||"Stacked",disabled:!e.stacked()}];i.width(y()).color(["#444","#444","#444"]),H.select(".nv-controlsWrap").datum(I).attr("transform","translate(0,"+-k.top+")").call(i)}F.attr("transform","translate("+k.left+","+k.top+")"),e.disabled(j.map(function(a){return a.disabled})).width(C).height(D).color(j.map(function(a,b){return a.color||n(a,b)}).filter(function(a,b){return!j[b].disabled}));var J=H.select(".nv-barsWrap").datum(j.filter(function(a){return!a.disabled}));if(J.transition().call(e),r){f.scale(c)._ticks(a.utils.calcTicksY(D/24,j)).tickSize(-C,0),H.select(".nv-x.nv-axis").call(f);var K=H.select(".nv-x.nv-axis").selectAll("g");K.selectAll("line, text")}s&&(g.scale(d)._ticks(a.utils.calcTicksX(C/100,j)).tickSize(-D,0),H.select(".nv-y.nv-axis").attr("transform","translate(0,"+D+")"),H.select(".nv-y.nv-axis").call(g)),H.select(".nv-zeroLine line").attr("x1",d(0)).attr("x2",d(0)).attr("y1",0).attr("y2",-D),h.dispatch.on("stateChange",function(a){for(var c in a)u[c]=a[c];x.stateChange(u),b.update()}),i.dispatch.on("legendClick",function(a){if(a.disabled){switch(I=I.map(function(a){return a.disabled=!0,a}),a.disabled=!1,a.key){case"Grouped":e.stacked(!1);break;case"Stacked":e.stacked(!0)}u.stacked=e.stacked(),x.stateChange(u),t=e.stacked(),b.update()}}),x.on("changeState",function(a){"undefined"!=typeof a.disabled&&(j.forEach(function(b,c){b.disabled=a.disabled[c]}),u.disabled=a.disabled),"undefined"!=typeof a.stacked&&(e.stacked(a.stacked),u.stacked=a.stacked,t=a.stacked),b.update()})}),C.renderEnd("multibar horizontal chart immediate"),b}var c,d,e=a.models.multiBarHorizontal(),f=a.models.axis(),g=a.models.axis(),h=a.models.legend().height(30),i=a.models.legend().height(30),j=a.models.tooltip(),k={top:30,right:20,bottom:50,left:60},l=null,m=null,n=a.utils.defaultColor(),o=!0,p={},q=!0,r=!0,s=!0,t=!1,u=a.utils.state(),v=null,w=null,x=d3.dispatch("stateChange","changeState","renderEnd"),y=function(){return o?180:0},z=250;u.stacked=!1,e.stacked(t),f.orient("left").tickPadding(5).showMaxMin(!1).tickFormat(function(a){return a}),g.orient("bottom").tickFormat(d3.format(",.1f")),j.duration(0).valueFormatter(function(a,b){return g.tickFormat()(a,b)}).headerFormatter(function(a,b){return f.tickFormat()(a,b)}),i.updateState(!1);var A=function(a){return function(){return{active:a.map(function(a){return!a.disabled}),stacked:t}}},B=function(a){return function(b){void 0!==b.stacked&&(t=b.stacked),void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}},C=a.utils.renderWatch(x,z);return e.dispatch.on("elementMouseover.tooltip",function(a){a.value=b.x()(a.data),a.series={key:a.data.key,value:b.y()(a.data),color:a.color},j.data(a).hidden(!1)}),e.dispatch.on("elementMouseout.tooltip",function(){j.hidden(!0)}),e.dispatch.on("elementMousemove.tooltip",function(){j.position({top:d3.event.pageY,left:d3.event.pageX})()}),b.dispatch=x,b.multibar=e,b.legend=h,b.controls=i,b.xAxis=f,b.yAxis=g,b.state=u,b.tooltip=j,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return l},set:function(a){l=a}},height:{get:function(){return m},set:function(a){m=a}},showLegend:{get:function(){return q},set:function(a){q=a}},showControls:{get:function(){return o},set:function(a){o=a}},controlLabels:{get:function(){return p},set:function(a){p=a}},showXAxis:{get:function(){return r},set:function(a){r=a}},showYAxis:{get:function(){return s},set:function(a){s=a}},defaultState:{get:function(){return v},set:function(a){v=a}},noData:{get:function(){return w},set:function(a){w=a}},tooltips:{get:function(){return j.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),j.enabled(!!b)}},tooltipContent:{get:function(){return j.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),j.contentGenerator(b)}},margin:{get:function(){return k},set:function(a){k.top=void 0!==a.top?a.top:k.top,k.right=void 0!==a.right?a.right:k.right,k.bottom=void 0!==a.bottom?a.bottom:k.bottom,k.left=void 0!==a.left?a.left:k.left}},duration:{get:function(){return z},set:function(a){z=a,C.reset(z),e.duration(z),f.duration(z),g.duration(z)}},color:{get:function(){return n},set:function(b){n=a.utils.getColor(b),h.color(n)}},barColor:{get:function(){return e.barColor},set:function(a){e.barColor(a),h.color(function(a,b){return d3.rgb("#ccc").darker(1.5*b).toString()})}}}),a.utils.inheritOptions(b,e),a.utils.initOptions(b),b},a.models.multiChart=function(){"use strict";function b(j){return j.each(function(j){function k(a){var b=2===j[a.seriesIndex].yAxis?z:y;a.value=a.point.x,a.series={value:a.point.y,color:a.point.color},B.duration(100).valueFormatter(function(a,c){return b.tickFormat()(a,c)}).data(a).position(a.pos).hidden(!1)}function l(a){var b=2===j[a.seriesIndex].yAxis?z:y;a.point.x=v.x()(a.point),a.point.y=v.y()(a.point),B.duration(100).valueFormatter(function(a,c){return b.tickFormat()(a,c)}).data(a).position(a.pos).hidden(!1)}function n(a){var b=2===j[a.data.series].yAxis?z:y;a.value=t.x()(a.data),a.series={value:t.y()(a.data),color:a.color},B.duration(0).valueFormatter(function(a,c){return b.tickFormat()(a,c)}).data(a).hidden(!1)}var C=d3.select(this);a.utils.initSVG(C),b.update=function(){C.transition().call(b)},b.container=this;var D=a.utils.availableWidth(g,C,e),E=a.utils.availableHeight(h,C,e),F=j.filter(function(a){return"line"==a.type&&1==a.yAxis}),G=j.filter(function(a){return"line"==a.type&&2==a.yAxis}),H=j.filter(function(a){return"bar"==a.type&&1==a.yAxis}),I=j.filter(function(a){return"bar"==a.type&&2==a.yAxis}),J=j.filter(function(a){return"area"==a.type&&1==a.yAxis}),K=j.filter(function(a){return"area"==a.type&&2==a.yAxis});if(!(j&&j.length&&j.filter(function(a){return a.values.length}).length))return a.utils.noData(b,C),b;C.selectAll(".nv-noData").remove();var L=j.filter(function(a){return!a.disabled&&1==a.yAxis}).map(function(a){return a.values.map(function(a){return{x:a.x,y:a.y}})}),M=j.filter(function(a){return!a.disabled&&2==a.yAxis}).map(function(a){return a.values.map(function(a){return{x:a.x,y:a.y}})});o.domain(d3.extent(d3.merge(L.concat(M)),function(a){return a.x})).range([0,D]);var N=C.selectAll("g.wrap.multiChart").data([j]),O=N.enter().append("g").attr("class","wrap nvd3 multiChart").append("g");O.append("g").attr("class","nv-x nv-axis"),O.append("g").attr("class","nv-y1 nv-axis"),O.append("g").attr("class","nv-y2 nv-axis"),O.append("g").attr("class","lines1Wrap"),O.append("g").attr("class","lines2Wrap"),O.append("g").attr("class","bars1Wrap"),O.append("g").attr("class","bars2Wrap"),O.append("g").attr("class","stack1Wrap"),O.append("g").attr("class","stack2Wrap"),O.append("g").attr("class","legendWrap");var P=N.select("g"),Q=j.map(function(a,b){return j[b].color||f(a,b)});if(i){var R=A.align()?D/2:D,S=A.align()?R:0;A.width(R),A.color(Q),P.select(".legendWrap").datum(j.map(function(a){return a.originalKey=void 0===a.originalKey?a.key:a.originalKey,a.key=a.originalKey+(1==a.yAxis?"":" (right axis)"),a})).call(A),e.top!=A.height()&&(e.top=A.height(),E=a.utils.availableHeight(h,C,e)),P.select(".legendWrap").attr("transform","translate("+S+","+-e.top+")")}r.width(D).height(E).interpolate(m).color(Q.filter(function(a,b){return!j[b].disabled&&1==j[b].yAxis&&"line"==j[b].type})),s.width(D).height(E).interpolate(m).color(Q.filter(function(a,b){return!j[b].disabled&&2==j[b].yAxis&&"line"==j[b].type})),t.width(D).height(E).color(Q.filter(function(a,b){return!j[b].disabled&&1==j[b].yAxis&&"bar"==j[b].type})),u.width(D).height(E).color(Q.filter(function(a,b){return!j[b].disabled&&2==j[b].yAxis&&"bar"==j[b].type})),v.width(D).height(E).color(Q.filter(function(a,b){return!j[b].disabled&&1==j[b].yAxis&&"area"==j[b].type})),w.width(D).height(E).color(Q.filter(function(a,b){return!j[b].disabled&&2==j[b].yAxis&&"area"==j[b].type})),P.attr("transform","translate("+e.left+","+e.top+")");var T=P.select(".lines1Wrap").datum(F.filter(function(a){return!a.disabled})),U=P.select(".bars1Wrap").datum(H.filter(function(a){return!a.disabled})),V=P.select(".stack1Wrap").datum(J.filter(function(a){return!a.disabled})),W=P.select(".lines2Wrap").datum(G.filter(function(a){return!a.disabled})),X=P.select(".bars2Wrap").datum(I.filter(function(a){return!a.disabled})),Y=P.select(".stack2Wrap").datum(K.filter(function(a){return!a.disabled})),Z=J.length?J.map(function(a){return a.values}).reduce(function(a,b){return a.map(function(a,c){return{x:a.x,y:a.y+b[c].y}})}).concat([{x:0,y:0}]):[],$=K.length?K.map(function(a){return a.values}).reduce(function(a,b){return a.map(function(a,c){return{x:a.x,y:a.y+b[c].y}})}).concat([{x:0,y:0}]):[];p.domain(c||d3.extent(d3.merge(L).concat(Z),function(a){return a.y})).range([0,E]),q.domain(d||d3.extent(d3.merge(M).concat($),function(a){return a.y})).range([0,E]),r.yDomain(p.domain()),t.yDomain(p.domain()),v.yDomain(p.domain()),s.yDomain(q.domain()),u.yDomain(q.domain()),w.yDomain(q.domain()),J.length&&d3.transition(V).call(v),K.length&&d3.transition(Y).call(w),H.length&&d3.transition(U).call(t),I.length&&d3.transition(X).call(u),F.length&&d3.transition(T).call(r),G.length&&d3.transition(W).call(s),x._ticks(a.utils.calcTicksX(D/100,j)).tickSize(-E,0),P.select(".nv-x.nv-axis").attr("transform","translate(0,"+E+")"),d3.transition(P.select(".nv-x.nv-axis")).call(x),y._ticks(a.utils.calcTicksY(E/36,j)).tickSize(-D,0),d3.transition(P.select(".nv-y1.nv-axis")).call(y),z._ticks(a.utils.calcTicksY(E/36,j)).tickSize(-D,0),d3.transition(P.select(".nv-y2.nv-axis")).call(z),P.select(".nv-y1.nv-axis").classed("nv-disabled",L.length?!1:!0).attr("transform","translate("+o.range()[0]+",0)"),P.select(".nv-y2.nv-axis").classed("nv-disabled",M.length?!1:!0).attr("transform","translate("+o.range()[1]+",0)"),A.dispatch.on("stateChange",function(){b.update()}),r.dispatch.on("elementMouseover.tooltip",k),s.dispatch.on("elementMouseover.tooltip",k),r.dispatch.on("elementMouseout.tooltip",function(){B.hidden(!0)}),s.dispatch.on("elementMouseout.tooltip",function(){B.hidden(!0)}),v.dispatch.on("elementMouseover.tooltip",l),w.dispatch.on("elementMouseover.tooltip",l),v.dispatch.on("elementMouseout.tooltip",function(){B.hidden(!0)}),w.dispatch.on("elementMouseout.tooltip",function(){B.hidden(!0)}),t.dispatch.on("elementMouseover.tooltip",n),u.dispatch.on("elementMouseover.tooltip",n),t.dispatch.on("elementMouseout.tooltip",function(){B.hidden(!0)}),u.dispatch.on("elementMouseout.tooltip",function(){B.hidden(!0)}),t.dispatch.on("elementMousemove.tooltip",function(){B.position({top:d3.event.pageY,left:d3.event.pageX})()}),u.dispatch.on("elementMousemove.tooltip",function(){B.position({top:d3.event.pageY,left:d3.event.pageX})()})}),b}var c,d,e={top:30,right:20,bottom:50,left:60},f=a.utils.defaultColor(),g=null,h=null,i=!0,j=null,k=function(a){return a.x},l=function(a){return a.y},m="monotone",n=!0,o=d3.scale.linear(),p=d3.scale.linear(),q=d3.scale.linear(),r=a.models.line().yScale(p),s=a.models.line().yScale(q),t=a.models.multiBar().stacked(!1).yScale(p),u=a.models.multiBar().stacked(!1).yScale(q),v=a.models.stackedArea().yScale(p),w=a.models.stackedArea().yScale(q),x=a.models.axis().scale(o).orient("bottom").tickPadding(5),y=a.models.axis().scale(p).orient("left"),z=a.models.axis().scale(q).orient("right"),A=a.models.legend().height(30),B=a.models.tooltip(),C=d3.dispatch();return b.dispatch=C,b.lines1=r,b.lines2=s,b.bars1=t,b.bars2=u,b.stack1=v,b.stack2=w,b.xAxis=x,b.yAxis1=y,b.yAxis2=z,b.tooltip=B,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return g},set:function(a){g=a}},height:{get:function(){return h},set:function(a){h=a}},showLegend:{get:function(){return i},set:function(a){i=a}},yDomain1:{get:function(){return c},set:function(a){c=a}},yDomain2:{get:function(){return d},set:function(a){d=a}},noData:{get:function(){return j},set:function(a){j=a}},interpolate:{get:function(){return m},set:function(a){m=a}},tooltips:{get:function(){return B.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),B.enabled(!!b)}},tooltipContent:{get:function(){return B.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),B.contentGenerator(b)}},margin:{get:function(){return e},set:function(a){e.top=void 0!==a.top?a.top:e.top,e.right=void 0!==a.right?a.right:e.right,e.bottom=void 0!==a.bottom?a.bottom:e.bottom,e.left=void 0!==a.left?a.left:e.left}},color:{get:function(){return f},set:function(b){f=a.utils.getColor(b)}},x:{get:function(){return k},set:function(a){k=a,r.x(a),s.x(a),t.x(a),u.x(a),v.x(a),w.x(a)}},y:{get:function(){return l},set:function(a){l=a,r.y(a),s.y(a),v.y(a),w.y(a),t.y(a),u.y(a)}},useVoronoi:{get:function(){return n},set:function(a){n=a,r.useVoronoi(a),s.useVoronoi(a),v.useVoronoi(a),w.useVoronoi(a)}}}),a.utils.initOptions(b),b},a.models.ohlcBar=function(){"use strict";function b(y){return y.each(function(b){k=d3.select(this);var y=a.utils.availableWidth(h,k,g),A=a.utils.availableHeight(i,k,g);a.utils.initSVG(k);var B=y/b[0].values.length*.9;l.domain(c||d3.extent(b[0].values.map(n).concat(t))),l.range(v?e||[.5*y/b[0].values.length,y*(b[0].values.length-.5)/b[0].values.length]:e||[5+B/2,y-B/2-5]),m.domain(d||[d3.min(b[0].values.map(s).concat(u)),d3.max(b[0].values.map(r).concat(u))]).range(f||[A,0]),l.domain()[0]===l.domain()[1]&&l.domain(l.domain()[0]?[l.domain()[0]-.01*l.domain()[0],l.domain()[1]+.01*l.domain()[1]]:[-1,1]),m.domain()[0]===m.domain()[1]&&m.domain(m.domain()[0]?[m.domain()[0]+.01*m.domain()[0],m.domain()[1]-.01*m.domain()[1]]:[-1,1]);var C=d3.select(this).selectAll("g.nv-wrap.nv-ohlcBar").data([b[0].values]),D=C.enter().append("g").attr("class","nvd3 nv-wrap nv-ohlcBar"),E=D.append("defs"),F=D.append("g"),G=C.select("g");F.append("g").attr("class","nv-ticks"),C.attr("transform","translate("+g.left+","+g.top+")"),k.on("click",function(a,b){z.chartClick({data:a,index:b,pos:d3.event,id:j})}),E.append("clipPath").attr("id","nv-chart-clip-path-"+j).append("rect"),C.select("#nv-chart-clip-path-"+j+" rect").attr("width",y).attr("height",A),G.attr("clip-path",w?"url(#nv-chart-clip-path-"+j+")":"");var H=C.select(".nv-ticks").selectAll(".nv-tick").data(function(a){return a});H.exit().remove(),H.enter().append("path").attr("class",function(a,b,c){return(p(a,b)>q(a,b)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+c+"-"+b}).attr("d",function(a,b){return"m0,0l0,"+(m(p(a,b))-m(r(a,b)))+"l"+-B/2+",0l"+B/2+",0l0,"+(m(s(a,b))-m(p(a,b)))+"l0,"+(m(q(a,b))-m(s(a,b)))+"l"+B/2+",0l"+-B/2+",0z"}).attr("transform",function(a,b){return"translate("+l(n(a,b))+","+m(r(a,b))+")"}).attr("fill",function(){return x[0]}).attr("stroke",function(){return x[0]}).attr("x",0).attr("y",function(a,b){return m(Math.max(0,o(a,b)))}).attr("height",function(a,b){return Math.abs(m(o(a,b))-m(0))}),H.attr("class",function(a,b,c){return(p(a,b)>q(a,b)?"nv-tick negative":"nv-tick positive")+" nv-tick-"+c+"-"+b}),d3.transition(H).attr("transform",function(a,b){return"translate("+l(n(a,b))+","+m(r(a,b))+")"}).attr("d",function(a,c){var d=y/b[0].values.length*.9;return"m0,0l0,"+(m(p(a,c))-m(r(a,c)))+"l"+-d/2+",0l"+d/2+",0l0,"+(m(s(a,c))-m(p(a,c)))+"l0,"+(m(q(a,c))-m(s(a,c)))+"l"+d/2+",0l"+-d/2+",0z"})}),b}var c,d,e,f,g={top:0,right:0,bottom:0,left:0},h=null,i=null,j=Math.floor(1e4*Math.random()),k=null,l=d3.scale.linear(),m=d3.scale.linear(),n=function(a){return a.x},o=function(a){return a.y},p=function(a){return a.open},q=function(a){return a.close},r=function(a){return a.high},s=function(a){return a.low},t=[],u=[],v=!1,w=!0,x=a.utils.defaultColor(),y=!1,z=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState","renderEnd","chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout","elementMousemove");return b.highlightPoint=function(a,c){b.clearHighlights(),k.select(".nv-ohlcBar .nv-tick-0-"+a).classed("hover",c)},b.clearHighlights=function(){k.select(".nv-ohlcBar .nv-tick.hover").classed("hover",!1)},b.dispatch=z,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return h},set:function(a){h=a}},height:{get:function(){return i},set:function(a){i=a}},xScale:{get:function(){return l},set:function(a){l=a}},yScale:{get:function(){return m},set:function(a){m=a}},xDomain:{get:function(){return c},set:function(a){c=a}},yDomain:{get:function(){return d},set:function(a){d=a}},xRange:{get:function(){return e},set:function(a){e=a}},yRange:{get:function(){return f},set:function(a){f=a}},forceX:{get:function(){return t},set:function(a){t=a}},forceY:{get:function(){return u},set:function(a){u=a}},padData:{get:function(){return v},set:function(a){v=a}},clipEdge:{get:function(){return w},set:function(a){w=a}},id:{get:function(){return j},set:function(a){j=a}},interactive:{get:function(){return y},set:function(a){y=a}},x:{get:function(){return n},set:function(a){n=a}},y:{get:function(){return o},set:function(a){o=a}},open:{get:function(){return p()},set:function(a){p=a}},close:{get:function(){return q()},set:function(a){q=a}},high:{get:function(){return r},set:function(a){r=a}},low:{get:function(){return s},set:function(a){s=a}},margin:{get:function(){return g},set:function(a){g.top=void 0!=a.top?a.top:g.top,g.right=void 0!=a.right?a.right:g.right,g.bottom=void 0!=a.bottom?a.bottom:g.bottom,g.left=void 0!=a.left?a.left:g.left
}},color:{get:function(){return x},set:function(b){x=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.parallelCoordinates=function(){"use strict";function b(p){return p.each(function(b){function p(a){return F(h.map(function(b){if(isNaN(a[b])||isNaN(parseFloat(a[b]))){var c=g[b].domain(),d=g[b].range(),e=c[0]-(c[1]-c[0])/9;if(J.indexOf(b)<0){var h=d3.scale.linear().domain([e,c[1]]).range([x-12,d[1]]);g[b].brush.y(h),J.push(b)}return[f(b),g[b](e)]}return J.length>0?(D.style("display","inline"),E.style("display","inline")):(D.style("display","none"),E.style("display","none")),[f(b),g[b](a[b])]}))}function q(){var a=h.filter(function(a){return!g[a].brush.empty()}),b=a.map(function(a){return g[a].brush.extent()});k=[],a.forEach(function(a,c){k[c]={dimension:a,extent:b[c]}}),l=[],M.style("display",function(c){var d=a.every(function(a,d){return isNaN(c[a])&&b[d][0]==g[a].brush.y().domain()[0]?!0:b[d][0]<=c[a]&&c[a]<=b[d][1]});return d&&l.push(c),d?null:"none"}),o.brush({filters:k,active:l})}function r(a){m[a]=this.parentNode.__origin__=f(a),L.attr("visibility","hidden")}function s(a){m[a]=Math.min(w,Math.max(0,this.parentNode.__origin__+=d3.event.x)),M.attr("d",p),h.sort(function(a,b){return u(a)-u(b)}),f.domain(h),N.attr("transform",function(a){return"translate("+u(a)+")"})}function t(a){delete this.parentNode.__origin__,delete m[a],d3.select(this.parentNode).attr("transform","translate("+f(a)+")"),M.attr("d",p),L.attr("d",p).attr("visibility",null)}function u(a){var b=m[a];return null==b?f(a):b}var v=d3.select(this),w=a.utils.availableWidth(d,v,c),x=a.utils.availableHeight(e,v,c);a.utils.initSVG(v),l=b,f.rangePoints([0,w],1).domain(h);var y={};h.forEach(function(a){var c=d3.extent(b,function(b){return+b[a]});return y[a]=!1,void 0===c[0]&&(y[a]=!0,c[0]=0,c[1]=0),c[0]===c[1]&&(c[0]=c[0]-1,c[1]=c[1]+1),g[a]=d3.scale.linear().domain(c).range([.9*(x-12),0]),g[a].brush=d3.svg.brush().y(g[a]).on("brush",q),"name"!=a});var z=v.selectAll("g.nv-wrap.nv-parallelCoordinates").data([b]),A=z.enter().append("g").attr("class","nvd3 nv-wrap nv-parallelCoordinates"),B=A.append("g"),C=z.select("g");B.append("g").attr("class","nv-parallelCoordinates background"),B.append("g").attr("class","nv-parallelCoordinates foreground"),B.append("g").attr("class","nv-parallelCoordinates missingValuesline"),z.attr("transform","translate("+c.left+","+c.top+")");var D,E,F=d3.svg.line().interpolate("cardinal").tension(n),G=d3.svg.axis().orient("left"),H=d3.behavior.drag().on("dragstart",r).on("drag",s).on("dragend",t),I=f.range()[1]-f.range()[0],J=[],K=[0+I/2,x-12,w-I/2,x-12];D=z.select(".missingValuesline").selectAll("line").data([K]),D.enter().append("line"),D.exit().remove(),D.attr("x1",function(a){return a[0]}).attr("y1",function(a){return a[1]}).attr("x2",function(a){return a[2]}).attr("y2",function(a){return a[3]}),E=z.select(".missingValuesline").selectAll("text").data(["undefined values"]),E.append("text").data(["undefined values"]),E.enter().append("text"),E.exit().remove(),E.attr("y",x).attr("x",w-92-I/2).text(function(a){return a});var L=z.select(".background").selectAll("path").data(b);L.enter().append("path"),L.exit().remove(),L.attr("d",p);var M=z.select(".foreground").selectAll("path").data(b);M.enter().append("path"),M.exit().remove(),M.attr("d",p).attr("stroke",j),M.on("mouseover",function(a,b){d3.select(this).classed("hover",!0),o.elementMouseover({label:a.name,data:a.data,index:b,pos:[d3.mouse(this.parentNode)[0],d3.mouse(this.parentNode)[1]]})}),M.on("mouseout",function(a,b){d3.select(this).classed("hover",!1),o.elementMouseout({label:a.name,data:a.data,index:b})});var N=C.selectAll(".dimension").data(h),O=N.enter().append("g").attr("class","nv-parallelCoordinates dimension");O.append("g").attr("class","nv-parallelCoordinates nv-axis"),O.append("g").attr("class","nv-parallelCoordinates-brush"),O.append("text").attr("class","nv-parallelCoordinates nv-label"),N.attr("transform",function(a){return"translate("+f(a)+",0)"}),N.exit().remove(),N.select(".nv-label").style("cursor","move").attr("dy","-1em").attr("text-anchor","middle").text(String).on("mouseover",function(a){o.elementMouseover({dim:a,pos:[d3.mouse(this.parentNode.parentNode)[0],d3.mouse(this.parentNode.parentNode)[1]]})}).on("mouseout",function(a){o.elementMouseout({dim:a})}).call(H),N.select(".nv-axis").each(function(a,b){d3.select(this).call(G.scale(g[a]).tickFormat(d3.format(i[b])))}),N.select(".nv-parallelCoordinates-brush").each(function(a){d3.select(this).call(g[a].brush)}).selectAll("rect").attr("x",-8).attr("width",16)}),b}var c={top:30,right:0,bottom:10,left:0},d=null,e=null,f=d3.scale.ordinal(),g={},h=[],i=[],j=a.utils.defaultColor(),k=[],l=[],m=[],n=1,o=d3.dispatch("brush","elementMouseover","elementMouseout");return b.dispatch=o,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return d},set:function(a){d=a}},height:{get:function(){return e},set:function(a){e=a}},dimensionNames:{get:function(){return h},set:function(a){h=a}},dimensionFormats:{get:function(){return i},set:function(a){i=a}},lineTension:{get:function(){return n},set:function(a){n=a}},dimensions:{get:function(){return h},set:function(b){a.deprecated("dimensions","use dimensionNames instead"),h=b}},margin:{get:function(){return c},set:function(a){c.top=void 0!==a.top?a.top:c.top,c.right=void 0!==a.right?a.right:c.right,c.bottom=void 0!==a.bottom?a.bottom:c.bottom,c.left=void 0!==a.left?a.left:c.left}},color:{get:function(){return j},set:function(b){j=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.pie=function(){"use strict";function b(E){return D.reset(),E.each(function(b){function E(a,b){a.endAngle=isNaN(a.endAngle)?0:a.endAngle,a.startAngle=isNaN(a.startAngle)?0:a.startAngle,p||(a.innerRadius=0);var c=d3.interpolate(this._current,a);return this._current=c(0),function(a){return B[b](c(a))}}var F=d-c.left-c.right,G=e-c.top-c.bottom,H=Math.min(F,G)/2,I=[],J=[];if(i=d3.select(this),0===z.length)for(var K=H-H/5,L=y*H,M=0;M<b[0].length;M++)I.push(K),J.push(L);else I=z.map(function(a){return(a.outer-a.outer/5)*H}),J=z.map(function(a){return(a.inner-a.inner/5)*H}),y=d3.min(z.map(function(a){return a.inner-a.inner/5}));a.utils.initSVG(i);var N=i.selectAll(".nv-wrap.nv-pie").data(b),O=N.enter().append("g").attr("class","nvd3 nv-wrap nv-pie nv-chart-"+h),P=O.append("g"),Q=N.select("g"),R=P.append("g").attr("class","nv-pie");P.append("g").attr("class","nv-pieLabels"),N.attr("transform","translate("+c.left+","+c.top+")"),Q.select(".nv-pie").attr("transform","translate("+F/2+","+G/2+")"),Q.select(".nv-pieLabels").attr("transform","translate("+F/2+","+G/2+")"),i.on("click",function(a,b){A.chartClick({data:a,index:b,pos:d3.event,id:h})}),B=[],C=[];for(var M=0;M<b[0].length;M++){var S=d3.svg.arc().outerRadius(I[M]),T=d3.svg.arc().outerRadius(I[M]+5);u!==!1&&(S.startAngle(u),T.startAngle(u)),w!==!1&&(S.endAngle(w),T.endAngle(w)),p&&(S.innerRadius(J[M]),T.innerRadius(J[M])),S.cornerRadius&&x&&(S.cornerRadius(x),T.cornerRadius(x)),B.push(S),C.push(T)}var U=d3.layout.pie().sort(null).value(function(a){return a.disabled?0:g(a)});U.padAngle&&v&&U.padAngle(v),p&&q&&(R.append("text").attr("class","nv-pie-title"),N.select(".nv-pie-title").style("text-anchor","middle").text(function(){return q}).style("font-size",Math.min(F,G)*y*2/(q.length+2)+"px").attr("dy","0.35em").attr("transform",function(){return"translate(0, "+s+")"}));var V=N.select(".nv-pie").selectAll(".nv-slice").data(U),W=N.select(".nv-pieLabels").selectAll(".nv-label").data(U);V.exit().remove(),W.exit().remove();var X=V.enter().append("g");X.attr("class","nv-slice"),X.on("mouseover",function(a,b){d3.select(this).classed("hover",!0),r&&d3.select(this).select("path").transition().duration(70).attr("d",C[b]),A.elementMouseover({data:a.data,index:b,color:d3.select(this).style("fill")})}),X.on("mouseout",function(a,b){d3.select(this).classed("hover",!1),r&&d3.select(this).select("path").transition().duration(50).attr("d",B[b]),A.elementMouseout({data:a.data,index:b})}),X.on("mousemove",function(a,b){A.elementMousemove({data:a.data,index:b})}),X.on("click",function(a,b){A.elementClick({data:a.data,index:b,color:d3.select(this).style("fill")})}),X.on("dblclick",function(a,b){A.elementDblClick({data:a.data,index:b,color:d3.select(this).style("fill")})}),V.attr("fill",function(a,b){return j(a.data,b)}),V.attr("stroke",function(a,b){return j(a.data,b)});X.append("path").each(function(a){this._current=a});if(V.select("path").transition().attr("d",function(a,b){return B[b](a)}).attrTween("d",E),l){for(var Y=[],M=0;M<b[0].length;M++)Y.push(B[M]),m?p&&(Y[M]=d3.svg.arc().outerRadius(B[M].outerRadius()),u!==!1&&Y[M].startAngle(u),w!==!1&&Y[M].endAngle(w)):p||Y[M].innerRadius(0);W.enter().append("g").classed("nv-label",!0).each(function(a){var b=d3.select(this);b.attr("transform",function(a,b){if(t){a.outerRadius=I[b]+10,a.innerRadius=I[b]+15;var c=(a.startAngle+a.endAngle)/2*(180/Math.PI);return(a.startAngle+a.endAngle)/2<Math.PI?c-=90:c+=90,"translate("+Y[b].centroid(a)+") rotate("+c+")"}return a.outerRadius=H+10,a.innerRadius=H+15,"translate("+Y[b].centroid(a)+")"}),b.append("rect").style("stroke","#fff").style("fill","#fff").attr("rx",3).attr("ry",3),b.append("text").style("text-anchor",t?(a.startAngle+a.endAngle)/2<Math.PI?"start":"end":"middle").style("fill","#000")});var Z={},$=14,_=140,ab=function(a){return Math.floor(a[0]/_)*_+","+Math.floor(a[1]/$)*$};W.watchTransition(D,"pie labels").attr("transform",function(a,b){if(t){a.outerRadius=I[b]+10,a.innerRadius=I[b]+15;var c=(a.startAngle+a.endAngle)/2*(180/Math.PI);return(a.startAngle+a.endAngle)/2<Math.PI?c-=90:c+=90,"translate("+Y[b].centroid(a)+") rotate("+c+")"}a.outerRadius=H+10,a.innerRadius=H+15;var d=Y[b].centroid(a);if(a.value){var e=ab(d);Z[e]&&(d[1]-=$),Z[ab(d)]=!0}return"translate("+d+")"}),W.select(".nv-label text").style("text-anchor",function(a){return t?(a.startAngle+a.endAngle)/2<Math.PI?"start":"end":"middle"}).text(function(a,b){var c=(a.endAngle-a.startAngle)/(2*Math.PI),d="";if(!a.value||o>c)return"";if("function"==typeof n)d=n(a,b,{key:f(a.data),value:g(a.data),percent:k(c)});else switch(n){case"key":d=f(a.data);break;case"value":d=k(g(a.data));break;case"percent":d=d3.format("%")(c)}return d})}}),D.renderEnd("pie immediate"),b}var c={top:0,right:0,bottom:0,left:0},d=500,e=500,f=function(a){return a.x},g=function(a){return a.y},h=Math.floor(1e4*Math.random()),i=null,j=a.utils.defaultColor(),k=d3.format(",.2f"),l=!0,m=!1,n="key",o=.02,p=!1,q=!1,r=!0,s=0,t=!1,u=!1,v=!1,w=!1,x=0,y=.5,z=[],A=d3.dispatch("chartClick","elementClick","elementDblClick","elementMouseover","elementMouseout","elementMousemove","renderEnd"),B=[],C=[],D=a.utils.renderWatch(A);return b.dispatch=A,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{arcsRadius:{get:function(){return z},set:function(a){z=a}},width:{get:function(){return d},set:function(a){d=a}},height:{get:function(){return e},set:function(a){e=a}},showLabels:{get:function(){return l},set:function(a){l=a}},title:{get:function(){return q},set:function(a){q=a}},titleOffset:{get:function(){return s},set:function(a){s=a}},labelThreshold:{get:function(){return o},set:function(a){o=a}},valueFormat:{get:function(){return k},set:function(a){k=a}},x:{get:function(){return f},set:function(a){f=a}},id:{get:function(){return h},set:function(a){h=a}},endAngle:{get:function(){return w},set:function(a){w=a}},startAngle:{get:function(){return u},set:function(a){u=a}},padAngle:{get:function(){return v},set:function(a){v=a}},cornerRadius:{get:function(){return x},set:function(a){x=a}},donutRatio:{get:function(){return y},set:function(a){y=a}},labelsOutside:{get:function(){return m},set:function(a){m=a}},labelSunbeamLayout:{get:function(){return t},set:function(a){t=a}},donut:{get:function(){return p},set:function(a){p=a}},growOnHover:{get:function(){return r},set:function(a){r=a}},pieLabelsOutside:{get:function(){return m},set:function(b){m=b,a.deprecated("pieLabelsOutside","use labelsOutside instead")}},donutLabelsOutside:{get:function(){return m},set:function(b){m=b,a.deprecated("donutLabelsOutside","use labelsOutside instead")}},labelFormat:{get:function(){return k},set:function(b){k=b,a.deprecated("labelFormat","use valueFormat instead")}},margin:{get:function(){return c},set:function(a){c.top="undefined"!=typeof a.top?a.top:c.top,c.right="undefined"!=typeof a.right?a.right:c.right,c.bottom="undefined"!=typeof a.bottom?a.bottom:c.bottom,c.left="undefined"!=typeof a.left?a.left:c.left}},y:{get:function(){return g},set:function(a){g=d3.functor(a)}},color:{get:function(){return j},set:function(b){j=a.utils.getColor(b)}},labelType:{get:function(){return n},set:function(a){n=a||"key"}}}),a.utils.initOptions(b),b},a.models.pieChart=function(){"use strict";function b(e){return q.reset(),q.models(c),e.each(function(e){var k=d3.select(this);a.utils.initSVG(k);var n=a.utils.availableWidth(g,k,f),o=a.utils.availableHeight(h,k,f);if(b.update=function(){k.transition().call(b)},b.container=this,l.setter(s(e),b.update).getter(r(e)).update(),l.disabled=e.map(function(a){return!!a.disabled}),!m){var q;m={};for(q in l)m[q]=l[q]instanceof Array?l[q].slice(0):l[q]}if(!e||!e.length)return a.utils.noData(b,k),b;k.selectAll(".nv-noData").remove();var t=k.selectAll("g.nv-wrap.nv-pieChart").data([e]),u=t.enter().append("g").attr("class","nvd3 nv-wrap nv-pieChart").append("g"),v=t.select("g");if(u.append("g").attr("class","nv-pieWrap"),u.append("g").attr("class","nv-legendWrap"),i)if("top"===j)d.width(n).key(c.x()),t.select(".nv-legendWrap").datum(e).call(d),f.top!=d.height()&&(f.top=d.height(),o=a.utils.availableHeight(h,k,f)),t.select(".nv-legendWrap").attr("transform","translate(0,"+-f.top+")");else if("right"===j){var w=a.models.legend().width();w>n/2&&(w=n/2),d.height(o).key(c.x()),d.width(w),n-=d.width(),t.select(".nv-legendWrap").datum(e).call(d).attr("transform","translate("+n+",0)")}t.attr("transform","translate("+f.left+","+f.top+")"),c.width(n).height(o);var x=v.select(".nv-pieWrap").datum([e]);d3.transition(x).call(c),d.dispatch.on("stateChange",function(a){for(var c in a)l[c]=a[c];p.stateChange(l),b.update()}),p.on("changeState",function(a){"undefined"!=typeof a.disabled&&(e.forEach(function(b,c){b.disabled=a.disabled[c]}),l.disabled=a.disabled),b.update()})}),q.renderEnd("pieChart immediate"),b}var c=a.models.pie(),d=a.models.legend(),e=a.models.tooltip(),f={top:30,right:20,bottom:20,left:20},g=null,h=null,i=!0,j="top",k=a.utils.defaultColor(),l=a.utils.state(),m=null,n=null,o=250,p=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState","renderEnd");e.headerEnabled(!1).duration(0).valueFormatter(function(a,b){return c.valueFormat()(a,b)});var q=a.utils.renderWatch(p),r=function(a){return function(){return{active:a.map(function(a){return!a.disabled})}}},s=function(a){return function(b){void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}};return c.dispatch.on("elementMouseover.tooltip",function(a){a.series={key:b.x()(a.data),value:b.y()(a.data),color:a.color},e.data(a).hidden(!1)}),c.dispatch.on("elementMouseout.tooltip",function(){e.hidden(!0)}),c.dispatch.on("elementMousemove.tooltip",function(){e.position({top:d3.event.pageY,left:d3.event.pageX})()}),b.legend=d,b.dispatch=p,b.pie=c,b.tooltip=e,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{noData:{get:function(){return n},set:function(a){n=a}},showLegend:{get:function(){return i},set:function(a){i=a}},legendPosition:{get:function(){return j},set:function(a){j=a}},defaultState:{get:function(){return m},set:function(a){m=a}},tooltips:{get:function(){return e.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),e.enabled(!!b)}},tooltipContent:{get:function(){return e.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),e.contentGenerator(b)}},color:{get:function(){return k},set:function(a){k=a,d.color(k),c.color(k)}},duration:{get:function(){return o},set:function(a){o=a,q.reset(o)}},margin:{get:function(){return f},set:function(a){f.top=void 0!==a.top?a.top:f.top,f.right=void 0!==a.right?a.right:f.right,f.bottom=void 0!==a.bottom?a.bottom:f.bottom,f.left=void 0!==a.left?a.left:f.left}}}),a.utils.inheritOptions(b,c),a.utils.initOptions(b),b},a.models.scatter=function(){"use strict";function b(N){return P.reset(),N.each(function(b){function N(){if(O=!1,!w)return!1;if(M===!0){var a=d3.merge(b.map(function(a,b){return a.values.map(function(a,c){var d=p(a,c),e=q(a,c);return[m(d)+1e-4*Math.random(),n(e)+1e-4*Math.random(),b,c,a]}).filter(function(a,b){return x(a[4],b)})}));if(0==a.length)return!1;a.length<3&&(a.push([m.range()[0]-20,n.range()[0]-20,null,null]),a.push([m.range()[1]+20,n.range()[1]+20,null,null]),a.push([m.range()[0]-20,n.range()[0]+20,null,null]),a.push([m.range()[1]+20,n.range()[1]-20,null,null]));var c=d3.geom.polygon([[-10,-10],[-10,i+10],[h+10,i+10],[h+10,-10]]),d=d3.geom.voronoi(a).map(function(b,d){return{data:c.clip(b),series:a[d][2],point:a[d][3]}});U.select(".nv-point-paths").selectAll("path").remove();var e=U.select(".nv-point-paths").selectAll("path").data(d),f=e.enter().append("svg:path").attr("d",function(a){return a&&a.data&&0!==a.data.length?"M"+a.data.join(",")+"Z":"M 0 0"}).attr("id",function(a,b){return"nv-path-"+b}).attr("clip-path",function(a,b){return"url(#nv-clip-"+b+")"});C&&f.style("fill",d3.rgb(230,230,230)).style("fill-opacity",.4).style("stroke-opacity",1).style("stroke",d3.rgb(200,200,200)),B&&(U.select(".nv-point-clips").selectAll("clipPath").remove(),U.select(".nv-point-clips").selectAll("clipPath").data(a).enter().append("svg:clipPath").attr("id",function(a,b){return"nv-clip-"+b}).append("svg:circle").attr("cx",function(a){return a[0]}).attr("cy",function(a){return a[1]}).attr("r",D));var k=function(a,c){if(O)return 0;var d=b[a.series];if(void 0!==d){var e=d.values[a.point];e.color=j(d,a.series),e.x=p(e),e.y=q(e);var f=l.node().getBoundingClientRect(),h=window.pageYOffset||document.documentElement.scrollTop,i=window.pageXOffset||document.documentElement.scrollLeft,k={left:m(p(e,a.point))+f.left+i+g.left+10,top:n(q(e,a.point))+f.top+h+g.top+10};c({point:e,series:d,pos:k,seriesIndex:a.series,pointIndex:a.point})}};e.on("click",function(a){k(a,L.elementClick)}).on("dblclick",function(a){k(a,L.elementDblClick)}).on("mouseover",function(a){k(a,L.elementMouseover)}).on("mouseout",function(a){k(a,L.elementMouseout)})}else U.select(".nv-groups").selectAll(".nv-group").selectAll(".nv-point").on("click",function(a,c){if(O||!b[a.series])return 0;var d=b[a.series],e=d.values[c];L.elementClick({point:e,series:d,pos:[m(p(e,c))+g.left,n(q(e,c))+g.top],seriesIndex:a.series,pointIndex:c})}).on("dblclick",function(a,c){if(O||!b[a.series])return 0;var d=b[a.series],e=d.values[c];L.elementDblClick({point:e,series:d,pos:[m(p(e,c))+g.left,n(q(e,c))+g.top],seriesIndex:a.series,pointIndex:c})}).on("mouseover",function(a,c){if(O||!b[a.series])return 0;var d=b[a.series],e=d.values[c];L.elementMouseover({point:e,series:d,pos:[m(p(e,c))+g.left,n(q(e,c))+g.top],seriesIndex:a.series,pointIndex:c,color:j(a,c)})}).on("mouseout",function(a,c){if(O||!b[a.series])return 0;var d=b[a.series],e=d.values[c];L.elementMouseout({point:e,series:d,seriesIndex:a.series,pointIndex:c,color:j(a,c)})})}l=d3.select(this);var R=a.utils.availableWidth(h,l,g),S=a.utils.availableHeight(i,l,g);a.utils.initSVG(l),b.forEach(function(a,b){a.values.forEach(function(a){a.series=b})});var T=E&&F&&I?[]:d3.merge(b.map(function(a){return a.values.map(function(a,b){return{x:p(a,b),y:q(a,b),size:r(a,b)}})}));m.domain(E||d3.extent(T.map(function(a){return a.x}).concat(t))),m.range(y&&b[0]?G||[(R*z+R)/(2*b[0].values.length),R-R*(1+z)/(2*b[0].values.length)]:G||[0,R]),n.domain(F||d3.extent(T.map(function(a){return a.y}).concat(u))).range(H||[S,0]),o.domain(I||d3.extent(T.map(function(a){return a.size}).concat(v))).range(J||Q),K=m.domain()[0]===m.domain()[1]||n.domain()[0]===n.domain()[1],m.domain()[0]===m.domain()[1]&&m.domain(m.domain()[0]?[m.domain()[0]-.01*m.domain()[0],m.domain()[1]+.01*m.domain()[1]]:[-1,1]),n.domain()[0]===n.domain()[1]&&n.domain(n.domain()[0]?[n.domain()[0]-.01*n.domain()[0],n.domain()[1]+.01*n.domain()[1]]:[-1,1]),isNaN(m.domain()[0])&&m.domain([-1,1]),isNaN(n.domain()[0])&&n.domain([-1,1]),c=c||m,d=d||n,e=e||o;var U=l.selectAll("g.nv-wrap.nv-scatter").data([b]),V=U.enter().append("g").attr("class","nvd3 nv-wrap nv-scatter nv-chart-"+k),W=V.append("defs"),X=V.append("g"),Y=U.select("g");U.classed("nv-single-point",K),X.append("g").attr("class","nv-groups"),X.append("g").attr("class","nv-point-paths"),V.append("g").attr("class","nv-point-clips"),U.attr("transform","translate("+g.left+","+g.top+")"),W.append("clipPath").attr("id","nv-edge-clip-"+k).append("rect"),U.select("#nv-edge-clip-"+k+" rect").attr("width",R).attr("height",S>0?S:0),Y.attr("clip-path",A?"url(#nv-edge-clip-"+k+")":""),O=!0;var Z=U.select(".nv-groups").selectAll(".nv-group").data(function(a){return a},function(a){return a.key});Z.enter().append("g").style("stroke-opacity",1e-6).style("fill-opacity",1e-6),Z.exit().remove(),Z.attr("class",function(a,b){return"nv-group nv-series-"+b}).classed("hover",function(a){return a.hover}),Z.watchTransition(P,"scatter: groups").style("fill",function(a,b){return j(a,b)}).style("stroke",function(a,b){return j(a,b)}).style("stroke-opacity",1).style("fill-opacity",.5);var $=Z.selectAll("path.nv-point").data(function(a){return a.values.map(function(a,b){return[a,b]}).filter(function(a,b){return x(a[0],b)})});$.enter().append("path").style("fill",function(a){return a.color}).style("stroke",function(a){return a.color}).attr("transform",function(a){return"translate("+c(p(a[0],a[1]))+","+d(q(a[0],a[1]))+")"}).attr("d",a.utils.symbol().type(function(a){return s(a[0])}).size(function(a){return o(r(a[0],a[1]))})),$.exit().remove(),Z.exit().selectAll("path.nv-point").watchTransition(P,"scatter exit").attr("transform",function(a){return"translate("+m(p(a[0],a[1]))+","+n(q(a[0],a[1]))+")"}).remove(),$.each(function(a){d3.select(this).classed("nv-point",!0).classed("nv-point-"+a[1],!0).classed("nv-noninteractive",!w).classed("hover",!1)}),$.watchTransition(P,"scatter points").attr("transform",function(a){return"translate("+m(p(a[0],a[1]))+","+n(q(a[0],a[1]))+")"}).attr("d",a.utils.symbol().type(function(a){return s(a[0])}).size(function(a){return o(r(a[0],a[1]))})),clearTimeout(f),f=setTimeout(N,300),c=m.copy(),d=n.copy(),e=o.copy()}),P.renderEnd("scatter immediate"),b}var c,d,e,f,g={top:0,right:0,bottom:0,left:0},h=null,i=null,j=a.utils.defaultColor(),k=Math.floor(1e5*Math.random()),l=null,m=d3.scale.linear(),n=d3.scale.linear(),o=d3.scale.linear(),p=function(a){return a.x},q=function(a){return a.y},r=function(a){return a.size||1},s=function(a){return a.shape||"circle"},t=[],u=[],v=[],w=!0,x=function(a){return!a.notActive},y=!1,z=.1,A=!1,B=!0,C=!1,D=function(){return 25},E=null,F=null,G=null,H=null,I=null,J=null,K=!1,L=d3.dispatch("elementClick","elementDblClick","elementMouseover","elementMouseout","renderEnd"),M=!0,N=250,O=!1,P=a.utils.renderWatch(L,N),Q=[16,256];return b.dispatch=L,b.options=a.utils.optionsFunc.bind(b),b._calls=new function(){this.clearHighlights=function(){return a.dom.write(function(){l.selectAll(".nv-point.hover").classed("hover",!1)}),null},this.highlightPoint=function(b,c,d){a.dom.write(function(){l.select(" .nv-series-"+b+" .nv-point-"+c).classed("hover",d)})}},L.on("elementMouseover.point",function(a){w&&b._calls.highlightPoint(a.seriesIndex,a.pointIndex,!0)}),L.on("elementMouseout.point",function(a){w&&b._calls.highlightPoint(a.seriesIndex,a.pointIndex,!1)}),b._options=Object.create({},{width:{get:function(){return h},set:function(a){h=a}},height:{get:function(){return i},set:function(a){i=a}},xScale:{get:function(){return m},set:function(a){m=a}},yScale:{get:function(){return n},set:function(a){n=a}},pointScale:{get:function(){return o},set:function(a){o=a}},xDomain:{get:function(){return E},set:function(a){E=a}},yDomain:{get:function(){return F},set:function(a){F=a}},pointDomain:{get:function(){return I},set:function(a){I=a}},xRange:{get:function(){return G},set:function(a){G=a}},yRange:{get:function(){return H},set:function(a){H=a}},pointRange:{get:function(){return J},set:function(a){J=a}},forceX:{get:function(){return t},set:function(a){t=a}},forceY:{get:function(){return u},set:function(a){u=a}},forcePoint:{get:function(){return v},set:function(a){v=a}},interactive:{get:function(){return w},set:function(a){w=a}},pointActive:{get:function(){return x},set:function(a){x=a}},padDataOuter:{get:function(){return z},set:function(a){z=a}},padData:{get:function(){return y},set:function(a){y=a}},clipEdge:{get:function(){return A},set:function(a){A=a}},clipVoronoi:{get:function(){return B},set:function(a){B=a}},clipRadius:{get:function(){return D},set:function(a){D=a}},showVoronoi:{get:function(){return C},set:function(a){C=a}},id:{get:function(){return k},set:function(a){k=a}},x:{get:function(){return p},set:function(a){p=d3.functor(a)}},y:{get:function(){return q},set:function(a){q=d3.functor(a)}},pointSize:{get:function(){return r},set:function(a){r=d3.functor(a)}},pointShape:{get:function(){return s},set:function(a){s=d3.functor(a)}},margin:{get:function(){return g},set:function(a){g.top=void 0!==a.top?a.top:g.top,g.right=void 0!==a.right?a.right:g.right,g.bottom=void 0!==a.bottom?a.bottom:g.bottom,g.left=void 0!==a.left?a.left:g.left}},duration:{get:function(){return N},set:function(a){N=a,P.reset(N)}},color:{get:function(){return j},set:function(b){j=a.utils.getColor(b)}},useVoronoi:{get:function(){return M},set:function(a){M=a,M===!1&&(B=!1)}}}),a.utils.initOptions(b),b},a.models.scatterChart=function(){"use strict";function b(z){return D.reset(),D.models(c),t&&D.models(d),u&&D.models(e),q&&D.models(g),r&&D.models(h),z.each(function(z){m=d3.select(this),a.utils.initSVG(m);var G=a.utils.availableWidth(k,m,j),H=a.utils.availableHeight(l,m,j);if(b.update=function(){0===A?m.call(b):m.transition().duration(A).call(b)},b.container=this,w.setter(F(z),b.update).getter(E(z)).update(),w.disabled=z.map(function(a){return!!a.disabled}),!x){var I;x={};for(I in w)x[I]=w[I]instanceof Array?w[I].slice(0):w[I]}if(!(z&&z.length&&z.filter(function(a){return a.values.length}).length))return a.utils.noData(b,m),D.renderEnd("scatter immediate"),b;m.selectAll(".nv-noData").remove(),o=c.xScale(),p=c.yScale();var J=m.selectAll("g.nv-wrap.nv-scatterChart").data([z]),K=J.enter().append("g").attr("class","nvd3 nv-wrap nv-scatterChart nv-chart-"+c.id()),L=K.append("g"),M=J.select("g");if(L.append("rect").attr("class","nvd3 nv-background").style("pointer-events","none"),L.append("g").attr("class","nv-x nv-axis"),L.append("g").attr("class","nv-y nv-axis"),L.append("g").attr("class","nv-scatterWrap"),L.append("g").attr("class","nv-regressionLinesWrap"),L.append("g").attr("class","nv-distWrap"),L.append("g").attr("class","nv-legendWrap"),v&&M.select(".nv-y.nv-axis").attr("transform","translate("+G+",0)"),s){var N=G;f.width(N),J.select(".nv-legendWrap").datum(z).call(f),j.top!=f.height()&&(j.top=f.height(),H=a.utils.availableHeight(l,m,j)),J.select(".nv-legendWrap").attr("transform","translate(0,"+-j.top+")")}J.attr("transform","translate("+j.left+","+j.top+")"),c.width(G).height(H).color(z.map(function(a,b){return a.color=a.color||n(a,b),a.color}).filter(function(a,b){return!z[b].disabled})),J.select(".nv-scatterWrap").datum(z.filter(function(a){return!a.disabled})).call(c),J.select(".nv-regressionLinesWrap").attr("clip-path","url(#nv-edge-clip-"+c.id()+")");var O=J.select(".nv-regressionLinesWrap").selectAll(".nv-regLines").data(function(a){return a});O.enter().append("g").attr("class","nv-regLines");var P=O.selectAll(".nv-regLine").data(function(a){return[a]});P.enter().append("line").attr("class","nv-regLine").style("stroke-opacity",0),P.filter(function(a){return a.intercept&&a.slope}).watchTransition(D,"scatterPlusLineChart: regline").attr("x1",o.range()[0]).attr("x2",o.range()[1]).attr("y1",function(a){return p(o.domain()[0]*a.slope+a.intercept)}).attr("y2",function(a){return p(o.domain()[1]*a.slope+a.intercept)}).style("stroke",function(a,b,c){return n(a,c)}).style("stroke-opacity",function(a){return a.disabled||"undefined"==typeof a.slope||"undefined"==typeof a.intercept?0:1}),t&&(d.scale(o)._ticks(a.utils.calcTicksX(G/100,z)).tickSize(-H,0),M.select(".nv-x.nv-axis").attr("transform","translate(0,"+p.range()[0]+")").call(d)),u&&(e.scale(p)._ticks(a.utils.calcTicksY(H/36,z)).tickSize(-G,0),M.select(".nv-y.nv-axis").call(e)),q&&(g.getData(c.x()).scale(o).width(G).color(z.map(function(a,b){return a.color||n(a,b)}).filter(function(a,b){return!z[b].disabled})),L.select(".nv-distWrap").append("g").attr("class","nv-distributionX"),M.select(".nv-distributionX").attr("transform","translate(0,"+p.range()[0]+")").datum(z.filter(function(a){return!a.disabled})).call(g)),r&&(h.getData(c.y()).scale(p).width(H).color(z.map(function(a,b){return a.color||n(a,b)}).filter(function(a,b){return!z[b].disabled})),L.select(".nv-distWrap").append("g").attr("class","nv-distributionY"),M.select(".nv-distributionY").attr("transform","translate("+(v?G:-h.size())+",0)").datum(z.filter(function(a){return!a.disabled})).call(h)),f.dispatch.on("stateChange",function(a){for(var c in a)w[c]=a[c];y.stateChange(w),b.update()}),y.on("changeState",function(a){"undefined"!=typeof a.disabled&&(z.forEach(function(b,c){b.disabled=a.disabled[c]}),w.disabled=a.disabled),b.update()}),c.dispatch.on("elementMouseout.tooltip",function(a){i.hidden(!0),m.select(".nv-chart-"+c.id()+" .nv-series-"+a.seriesIndex+" .nv-distx-"+a.pointIndex).attr("y1",0),m.select(".nv-chart-"+c.id()+" .nv-series-"+a.seriesIndex+" .nv-disty-"+a.pointIndex).attr("x2",h.size())}),c.dispatch.on("elementMouseover.tooltip",function(a){m.select(".nv-series-"+a.seriesIndex+" .nv-distx-"+a.pointIndex).attr("y1",a.pos.top-H-j.top),m.select(".nv-series-"+a.seriesIndex+" .nv-disty-"+a.pointIndex).attr("x2",a.pos.left+g.size()-j.left),i.position(a.pos).data(a).hidden(!1)}),B=o.copy(),C=p.copy()}),D.renderEnd("scatter with line immediate"),b}var c=a.models.scatter(),d=a.models.axis(),e=a.models.axis(),f=a.models.legend(),g=a.models.distribution(),h=a.models.distribution(),i=a.models.tooltip(),j={top:30,right:20,bottom:50,left:75},k=null,l=null,m=null,n=a.utils.defaultColor(),o=c.xScale(),p=c.yScale(),q=!1,r=!1,s=!0,t=!0,u=!0,v=!1,w=a.utils.state(),x=null,y=d3.dispatch("stateChange","changeState","renderEnd"),z=null,A=250;c.xScale(o).yScale(p),d.orient("bottom").tickPadding(10),e.orient(v?"right":"left").tickPadding(10),g.axis("x"),h.axis("y"),i.headerFormatter(function(a,b){return d.tickFormat()(a,b)}).valueFormatter(function(a,b){return e.tickFormat()(a,b)});var B,C,D=a.utils.renderWatch(y,A),E=function(a){return function(){return{active:a.map(function(a){return!a.disabled})}}},F=function(a){return function(b){void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}};return b.dispatch=y,b.scatter=c,b.legend=f,b.xAxis=d,b.yAxis=e,b.distX=g,b.distY=h,b.tooltip=i,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return k},set:function(a){k=a}},height:{get:function(){return l},set:function(a){l=a}},container:{get:function(){return m},set:function(a){m=a}},showDistX:{get:function(){return q},set:function(a){q=a}},showDistY:{get:function(){return r},set:function(a){r=a}},showLegend:{get:function(){return s},set:function(a){s=a}},showXAxis:{get:function(){return t},set:function(a){t=a}},showYAxis:{get:function(){return u},set:function(a){u=a}},defaultState:{get:function(){return x},set:function(a){x=a}},noData:{get:function(){return z},set:function(a){z=a}},duration:{get:function(){return A},set:function(a){A=a}},tooltips:{get:function(){return i.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),i.enabled(!!b)
}},tooltipContent:{get:function(){return i.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),i.contentGenerator(b)}},tooltipXContent:{get:function(){return i.contentGenerator()},set:function(){a.deprecated("tooltipContent","This option is removed, put values into main tooltip.")}},tooltipYContent:{get:function(){return i.contentGenerator()},set:function(){a.deprecated("tooltipContent","This option is removed, put values into main tooltip.")}},margin:{get:function(){return j},set:function(a){j.top=void 0!==a.top?a.top:j.top,j.right=void 0!==a.right?a.right:j.right,j.bottom=void 0!==a.bottom?a.bottom:j.bottom,j.left=void 0!==a.left?a.left:j.left}},rightAlignYAxis:{get:function(){return v},set:function(a){v=a,e.orient(a?"right":"left")}},color:{get:function(){return n},set:function(b){n=a.utils.getColor(b),f.color(n),g.color(n),h.color(n)}}}),a.utils.inheritOptions(b,c),a.utils.initOptions(b),b},a.models.sparkline=function(){"use strict";function b(k){return k.each(function(b){var k=h-g.left-g.right,q=i-g.top-g.bottom;j=d3.select(this),a.utils.initSVG(j),l.domain(c||d3.extent(b,n)).range(e||[0,k]),m.domain(d||d3.extent(b,o)).range(f||[q,0]);{var r=j.selectAll("g.nv-wrap.nv-sparkline").data([b]),s=r.enter().append("g").attr("class","nvd3 nv-wrap nv-sparkline");s.append("g"),r.select("g")}r.attr("transform","translate("+g.left+","+g.top+")");var t=r.selectAll("path").data(function(a){return[a]});t.enter().append("path"),t.exit().remove(),t.style("stroke",function(a,b){return a.color||p(a,b)}).attr("d",d3.svg.line().x(function(a,b){return l(n(a,b))}).y(function(a,b){return m(o(a,b))}));var u=r.selectAll("circle.nv-point").data(function(a){function b(b){if(-1!=b){var c=a[b];return c.pointIndex=b,c}return null}var c=a.map(function(a,b){return o(a,b)}),d=b(c.lastIndexOf(m.domain()[1])),e=b(c.indexOf(m.domain()[0])),f=b(c.length-1);return[e,d,f].filter(function(a){return null!=a})});u.enter().append("circle"),u.exit().remove(),u.attr("cx",function(a){return l(n(a,a.pointIndex))}).attr("cy",function(a){return m(o(a,a.pointIndex))}).attr("r",2).attr("class",function(a){return n(a,a.pointIndex)==l.domain()[1]?"nv-point nv-currentValue":o(a,a.pointIndex)==m.domain()[0]?"nv-point nv-minValue":"nv-point nv-maxValue"})}),b}var c,d,e,f,g={top:2,right:0,bottom:2,left:0},h=400,i=32,j=null,k=!0,l=d3.scale.linear(),m=d3.scale.linear(),n=function(a){return a.x},o=function(a){return a.y},p=a.utils.getColor(["#000"]);return b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return h},set:function(a){h=a}},height:{get:function(){return i},set:function(a){i=a}},xDomain:{get:function(){return c},set:function(a){c=a}},yDomain:{get:function(){return d},set:function(a){d=a}},xRange:{get:function(){return e},set:function(a){e=a}},yRange:{get:function(){return f},set:function(a){f=a}},xScale:{get:function(){return l},set:function(a){l=a}},yScale:{get:function(){return m},set:function(a){m=a}},animate:{get:function(){return k},set:function(a){k=a}},x:{get:function(){return n},set:function(a){n=d3.functor(a)}},y:{get:function(){return o},set:function(a){o=d3.functor(a)}},margin:{get:function(){return g},set:function(a){g.top=void 0!==a.top?a.top:g.top,g.right=void 0!==a.right?a.right:g.right,g.bottom=void 0!==a.bottom?a.bottom:g.bottom,g.left=void 0!==a.left?a.left:g.left}},color:{get:function(){return p},set:function(b){p=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.sparklinePlus=function(){"use strict";function b(p){return p.each(function(p){function q(){if(!j){var a=z.selectAll(".nv-hoverValue").data(i),b=a.enter().append("g").attr("class","nv-hoverValue").style("stroke-opacity",0).style("fill-opacity",0);a.exit().transition().duration(250).style("stroke-opacity",0).style("fill-opacity",0).remove(),a.attr("transform",function(a){return"translate("+c(e.x()(p[a],a))+",0)"}).transition().duration(250).style("stroke-opacity",1).style("fill-opacity",1),i.length&&(b.append("line").attr("x1",0).attr("y1",-f.top).attr("x2",0).attr("y2",u),b.append("text").attr("class","nv-xValue").attr("x",-6).attr("y",-f.top).attr("text-anchor","end").attr("dy",".9em"),z.select(".nv-hoverValue .nv-xValue").text(k(e.x()(p[i[0]],i[0]))),b.append("text").attr("class","nv-yValue").attr("x",6).attr("y",-f.top).attr("text-anchor","start").attr("dy",".9em"),z.select(".nv-hoverValue .nv-yValue").text(l(e.y()(p[i[0]],i[0]))))}}function r(){function a(a,b){for(var c=Math.abs(e.x()(a[0],0)-b),d=0,f=0;f<a.length;f++)Math.abs(e.x()(a[f],f)-b)<c&&(c=Math.abs(e.x()(a[f],f)-b),d=f);return d}if(!j){var b=d3.mouse(this)[0]-f.left;i=[a(p,Math.round(c.invert(b)))],q()}}var s=d3.select(this);a.utils.initSVG(s);var t=a.utils.availableWidth(g,s,f),u=a.utils.availableHeight(h,s,f);if(b.update=function(){s.call(b)},b.container=this,!p||!p.length)return a.utils.noData(b,s),b;s.selectAll(".nv-noData").remove();var v=e.y()(p[p.length-1],p.length-1);c=e.xScale(),d=e.yScale();var w=s.selectAll("g.nv-wrap.nv-sparklineplus").data([p]),x=w.enter().append("g").attr("class","nvd3 nv-wrap nv-sparklineplus"),y=x.append("g"),z=w.select("g");y.append("g").attr("class","nv-sparklineWrap"),y.append("g").attr("class","nv-valueWrap"),y.append("g").attr("class","nv-hoverArea"),w.attr("transform","translate("+f.left+","+f.top+")");var A=z.select(".nv-sparklineWrap");if(e.width(t).height(u),A.call(e),m){var B=z.select(".nv-valueWrap"),C=B.selectAll(".nv-currentValue").data([v]);C.enter().append("text").attr("class","nv-currentValue").attr("dx",o?-8:8).attr("dy",".9em").style("text-anchor",o?"end":"start"),C.attr("x",t+(o?f.right:0)).attr("y",n?function(a){return d(a)}:0).style("fill",e.color()(p[p.length-1],p.length-1)).text(l(v))}y.select(".nv-hoverArea").append("rect").on("mousemove",r).on("click",function(){j=!j}).on("mouseout",function(){i=[],q()}),z.select(".nv-hoverArea rect").attr("transform",function(){return"translate("+-f.left+","+-f.top+")"}).attr("width",t+f.left+f.right).attr("height",u+f.top)}),b}var c,d,e=a.models.sparkline(),f={top:15,right:100,bottom:10,left:50},g=null,h=null,i=[],j=!1,k=d3.format(",r"),l=d3.format(",.2f"),m=!0,n=!0,o=!1,p=null;return b.sparkline=e,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return g},set:function(a){g=a}},height:{get:function(){return h},set:function(a){h=a}},xTickFormat:{get:function(){return k},set:function(a){k=a}},yTickFormat:{get:function(){return l},set:function(a){l=a}},showLastValue:{get:function(){return m},set:function(a){m=a}},alignValue:{get:function(){return n},set:function(a){n=a}},rightAlignValue:{get:function(){return o},set:function(a){o=a}},noData:{get:function(){return p},set:function(a){p=a}},margin:{get:function(){return f},set:function(a){f.top=void 0!==a.top?a.top:f.top,f.right=void 0!==a.right?a.right:f.right,f.bottom=void 0!==a.bottom?a.bottom:f.bottom,f.left=void 0!==a.left?a.left:f.left}}}),a.utils.inheritOptions(b,e),a.utils.initOptions(b),b},a.models.stackedArea=function(){"use strict";function b(m){return u.reset(),u.models(r),m.each(function(m){var s=f-e.left-e.right,v=g-e.top-e.bottom;j=d3.select(this),a.utils.initSVG(j),c=r.xScale(),d=r.yScale();var w=m;m.forEach(function(a,b){a.seriesIndex=b,a.values=a.values.map(function(a,c){return a.index=c,a.seriesIndex=b,a})});var x=m.filter(function(a){return!a.disabled});m=d3.layout.stack().order(o).offset(n).values(function(a){return a.values}).x(k).y(l).out(function(a,b,c){a.display={y:c,y0:b}})(x);var y=j.selectAll("g.nv-wrap.nv-stackedarea").data([m]),z=y.enter().append("g").attr("class","nvd3 nv-wrap nv-stackedarea"),A=z.append("defs"),B=z.append("g"),C=y.select("g");B.append("g").attr("class","nv-areaWrap"),B.append("g").attr("class","nv-scatterWrap"),y.attr("transform","translate("+e.left+","+e.top+")"),0==r.forceY().length&&r.forceY().push(0),r.width(s).height(v).x(k).y(function(a){return a.display.y+a.display.y0}).forceY([0]).color(m.map(function(a){return a.color||h(a,a.seriesIndex)}));var D=C.select(".nv-scatterWrap").datum(m);D.call(r),A.append("clipPath").attr("id","nv-edge-clip-"+i).append("rect"),y.select("#nv-edge-clip-"+i+" rect").attr("width",s).attr("height",v),C.attr("clip-path",q?"url(#nv-edge-clip-"+i+")":"");var E=d3.svg.area().x(function(a,b){return c(k(a,b))}).y0(function(a){return d(a.display.y0)}).y1(function(a){return d(a.display.y+a.display.y0)}).interpolate(p),F=d3.svg.area().x(function(a,b){return c(k(a,b))}).y0(function(a){return d(a.display.y0)}).y1(function(a){return d(a.display.y0)}),G=C.select(".nv-areaWrap").selectAll("path.nv-area").data(function(a){return a});G.enter().append("path").attr("class",function(a,b){return"nv-area nv-area-"+b}).attr("d",function(a){return F(a.values,a.seriesIndex)}).on("mouseover",function(a){d3.select(this).classed("hover",!0),t.areaMouseover({point:a,series:a.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:a.seriesIndex})}).on("mouseout",function(a){d3.select(this).classed("hover",!1),t.areaMouseout({point:a,series:a.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:a.seriesIndex})}).on("click",function(a){d3.select(this).classed("hover",!1),t.areaClick({point:a,series:a.key,pos:[d3.event.pageX,d3.event.pageY],seriesIndex:a.seriesIndex})}),G.exit().remove(),G.style("fill",function(a){return a.color||h(a,a.seriesIndex)}).style("stroke",function(a){return a.color||h(a,a.seriesIndex)}),G.watchTransition(u,"stackedArea path").attr("d",function(a,b){return E(a.values,b)}),r.dispatch.on("elementMouseover.area",function(a){C.select(".nv-chart-"+i+" .nv-area-"+a.seriesIndex).classed("hover",!0)}),r.dispatch.on("elementMouseout.area",function(a){C.select(".nv-chart-"+i+" .nv-area-"+a.seriesIndex).classed("hover",!1)}),b.d3_stackedOffset_stackPercent=function(a){var b,c,d,e=a.length,f=a[0].length,g=[];for(c=0;f>c;++c){for(b=0,d=0;b<w.length;b++)d+=l(w[b].values[c]);if(d)for(b=0;e>b;b++)a[b][c][1]/=d;else for(b=0;e>b;b++)a[b][c][1]=0}for(c=0;f>c;++c)g[c]=0;return g}}),u.renderEnd("stackedArea immediate"),b}var c,d,e={top:0,right:0,bottom:0,left:0},f=960,g=500,h=a.utils.defaultColor(),i=Math.floor(1e5*Math.random()),j=null,k=function(a){return a.x},l=function(a){return a.y},m="stack",n="zero",o="default",p="linear",q=!1,r=a.models.scatter(),s=250,t=d3.dispatch("areaClick","areaMouseover","areaMouseout","renderEnd","elementClick","elementMouseover","elementMouseout");r.pointSize(2.2).pointDomain([2.2,2.2]);var u=a.utils.renderWatch(t,s);return b.dispatch=t,b.scatter=r,r.dispatch.on("elementClick",function(){t.elementClick.apply(this,arguments)}),r.dispatch.on("elementMouseover",function(){t.elementMouseover.apply(this,arguments)}),r.dispatch.on("elementMouseout",function(){t.elementMouseout.apply(this,arguments)}),b.interpolate=function(a){return arguments.length?(p=a,b):p},b.duration=function(a){return arguments.length?(s=a,u.reset(s),r.duration(s),b):s},b.dispatch=t,b.scatter=r,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return f},set:function(a){f=a}},height:{get:function(){return g},set:function(a){g=a}},clipEdge:{get:function(){return q},set:function(a){q=a}},offset:{get:function(){return n},set:function(a){n=a}},order:{get:function(){return o},set:function(a){o=a}},interpolate:{get:function(){return p},set:function(a){p=a}},x:{get:function(){return k},set:function(a){k=d3.functor(a)}},y:{get:function(){return l},set:function(a){l=d3.functor(a)}},margin:{get:function(){return e},set:function(a){e.top=void 0!==a.top?a.top:e.top,e.right=void 0!==a.right?a.right:e.right,e.bottom=void 0!==a.bottom?a.bottom:e.bottom,e.left=void 0!==a.left?a.left:e.left}},color:{get:function(){return h},set:function(b){h=a.utils.getColor(b)}},style:{get:function(){return m},set:function(a){switch(m=a){case"stack":b.offset("zero"),b.order("default");break;case"stream":b.offset("wiggle"),b.order("inside-out");break;case"stream-center":b.offset("silhouette"),b.order("inside-out");break;case"expand":b.offset("expand"),b.order("default");break;case"stack_percent":b.offset(b.d3_stackedOffset_stackPercent),b.order("default")}}},duration:{get:function(){return s},set:function(a){s=a,u.reset(s),r.duration(s)}}}),a.utils.inheritOptions(b,r),a.utils.initOptions(b),b},a.models.stackedAreaChart=function(){"use strict";function b(k){return F.reset(),F.models(e),r&&F.models(f),s&&F.models(g),k.each(function(k){var x=d3.select(this),F=this;a.utils.initSVG(x);var K=a.utils.availableWidth(m,x,l),L=a.utils.availableHeight(n,x,l);if(b.update=function(){x.transition().duration(C).call(b)},b.container=this,v.setter(I(k),b.update).getter(H(k)).update(),v.disabled=k.map(function(a){return!!a.disabled}),!w){var M;w={};for(M in v)w[M]=v[M]instanceof Array?v[M].slice(0):v[M]}if(!(k&&k.length&&k.filter(function(a){return a.values.length}).length))return a.utils.noData(b,x),b;x.selectAll(".nv-noData").remove(),c=e.xScale(),d=e.yScale();var N=x.selectAll("g.nv-wrap.nv-stackedAreaChart").data([k]),O=N.enter().append("g").attr("class","nvd3 nv-wrap nv-stackedAreaChart").append("g"),P=N.select("g");if(O.append("rect").style("opacity",0),O.append("g").attr("class","nv-x nv-axis"),O.append("g").attr("class","nv-y nv-axis"),O.append("g").attr("class","nv-stackedWrap"),O.append("g").attr("class","nv-legendWrap"),O.append("g").attr("class","nv-controlsWrap"),O.append("g").attr("class","nv-interactive"),P.select("rect").attr("width",K).attr("height",L),q){var Q=p?K-z:K;h.width(Q),P.select(".nv-legendWrap").datum(k).call(h),l.top!=h.height()&&(l.top=h.height(),L=a.utils.availableHeight(n,x,l)),P.select(".nv-legendWrap").attr("transform","translate("+(K-Q)+","+-l.top+")")}if(p){var R=[{key:B.stacked||"Stacked",metaKey:"Stacked",disabled:"stack"!=e.style(),style:"stack"},{key:B.stream||"Stream",metaKey:"Stream",disabled:"stream"!=e.style(),style:"stream"},{key:B.expanded||"Expanded",metaKey:"Expanded",disabled:"expand"!=e.style(),style:"expand"},{key:B.stack_percent||"Stack %",metaKey:"Stack_Percent",disabled:"stack_percent"!=e.style(),style:"stack_percent"}];z=A.length/3*260,R=R.filter(function(a){return-1!==A.indexOf(a.metaKey)}),i.width(z).color(["#444","#444","#444"]),P.select(".nv-controlsWrap").datum(R).call(i),l.top!=Math.max(i.height(),h.height())&&(l.top=Math.max(i.height(),h.height()),L=a.utils.availableHeight(n,x,l)),P.select(".nv-controlsWrap").attr("transform","translate(0,"+-l.top+")")}N.attr("transform","translate("+l.left+","+l.top+")"),t&&P.select(".nv-y.nv-axis").attr("transform","translate("+K+",0)"),u&&(j.width(K).height(L).margin({left:l.left,top:l.top}).svgContainer(x).xScale(c),N.select(".nv-interactive").call(j)),e.width(K).height(L);var S=P.select(".nv-stackedWrap").datum(k);if(S.transition().call(e),r&&(f.scale(c)._ticks(a.utils.calcTicksX(K/100,k)).tickSize(-L,0),P.select(".nv-x.nv-axis").attr("transform","translate(0,"+L+")"),P.select(".nv-x.nv-axis").transition().duration(0).call(f)),s){var T;if(T="wiggle"===e.offset()?0:a.utils.calcTicksY(L/36,k),g.scale(d)._ticks(T).tickSize(-K,0),"expand"===e.style()||"stack_percent"===e.style()){var U=g.tickFormat();D&&U===J||(D=U),g.tickFormat(J)}else D&&(g.tickFormat(D),D=null);P.select(".nv-y.nv-axis").transition().duration(0).call(g)}e.dispatch.on("areaClick.toggle",function(a){k.forEach(1===k.filter(function(a){return!a.disabled}).length?function(a){a.disabled=!1}:function(b,c){b.disabled=c!=a.seriesIndex}),v.disabled=k.map(function(a){return!!a.disabled}),y.stateChange(v),b.update()}),h.dispatch.on("stateChange",function(a){for(var c in a)v[c]=a[c];y.stateChange(v),b.update()}),i.dispatch.on("legendClick",function(a){a.disabled&&(R=R.map(function(a){return a.disabled=!0,a}),a.disabled=!1,e.style(a.style),v.style=e.style(),y.stateChange(v),b.update())}),j.dispatch.on("elementMousemove",function(c){e.clearHighlights();var d,g,h,i=[];if(k.filter(function(a,b){return a.seriesIndex=b,!a.disabled}).forEach(function(f,j){g=a.interactiveBisect(f.values,c.pointXValue,b.x());var k=f.values[g],l=b.y()(k,g);if(null!=l&&e.highlightPoint(j,g,!0),"undefined"!=typeof k){"undefined"==typeof d&&(d=k),"undefined"==typeof h&&(h=b.xScale()(b.x()(k,g)));var m="expand"==e.style()?k.display.y:b.y()(k,g);i.push({key:f.key,value:m,color:o(f,f.seriesIndex),stackedValue:k.display})}}),i.reverse(),i.length>2){var m=b.yScale().invert(c.mouseY),n=null;i.forEach(function(a,b){m=Math.abs(m);var c=Math.abs(a.stackedValue.y0),d=Math.abs(a.stackedValue.y);return m>=c&&d+c>=m?void(n=b):void 0}),null!=n&&(i[n].highlight=!0)}var p=f.tickFormat()(b.x()(d,g)),q=j.tooltip.valueFormatter();"expand"===e.style()||"stack_percent"===e.style()?(E||(E=q),q=d3.format(".1%")):E&&(q=E,E=null),j.tooltip.position({left:h+l.left,top:c.mouseY+l.top}).chartContainer(F.parentNode).valueFormatter(q).data({value:p,series:i})(),j.renderGuideLine(h)}),j.dispatch.on("elementMouseout",function(){e.clearHighlights()}),y.on("changeState",function(a){"undefined"!=typeof a.disabled&&k.length===a.disabled.length&&(k.forEach(function(b,c){b.disabled=a.disabled[c]}),v.disabled=a.disabled),"undefined"!=typeof a.style&&(e.style(a.style),G=a.style),b.update()})}),F.renderEnd("stacked Area chart immediate"),b}var c,d,e=a.models.stackedArea(),f=a.models.axis(),g=a.models.axis(),h=a.models.legend(),i=a.models.legend(),j=a.interactiveGuideline(),k=a.models.tooltip(),l={top:30,right:25,bottom:50,left:60},m=null,n=null,o=a.utils.defaultColor(),p=!0,q=!0,r=!0,s=!0,t=!1,u=!1,v=a.utils.state(),w=null,x=null,y=d3.dispatch("stateChange","changeState","renderEnd"),z=250,A=["Stacked","Stream","Expanded"],B={},C=250;v.style=e.style(),f.orient("bottom").tickPadding(7),g.orient(t?"right":"left"),k.headerFormatter(function(a,b){return f.tickFormat()(a,b)}).valueFormatter(function(a,b){return g.tickFormat()(a,b)}),j.tooltip.headerFormatter(function(a,b){return f.tickFormat()(a,b)}).valueFormatter(function(a,b){return g.tickFormat()(a,b)});var D=null,E=null;i.updateState(!1);var F=a.utils.renderWatch(y),G=e.style(),H=function(a){return function(){return{active:a.map(function(a){return!a.disabled}),style:e.style()}}},I=function(a){return function(b){void 0!==b.style&&(G=b.style),void 0!==b.active&&a.forEach(function(a,c){a.disabled=!b.active[c]})}},J=d3.format("%");return e.dispatch.on("elementMouseover.tooltip",function(a){a.point.x=e.x()(a.point),a.point.y=e.y()(a.point),k.data(a).position(a.pos).hidden(!1)}),e.dispatch.on("elementMouseout.tooltip",function(){k.hidden(!0)}),b.dispatch=y,b.stacked=e,b.legend=h,b.controls=i,b.xAxis=f,b.yAxis=g,b.interactiveLayer=j,b.tooltip=k,b.dispatch=y,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return m},set:function(a){m=a}},height:{get:function(){return n},set:function(a){n=a}},showLegend:{get:function(){return q},set:function(a){q=a}},showXAxis:{get:function(){return r},set:function(a){r=a}},showYAxis:{get:function(){return s},set:function(a){s=a}},defaultState:{get:function(){return w},set:function(a){w=a}},noData:{get:function(){return x},set:function(a){x=a}},showControls:{get:function(){return p},set:function(a){p=a}},controlLabels:{get:function(){return B},set:function(a){B=a}},controlOptions:{get:function(){return A},set:function(a){A=a}},tooltips:{get:function(){return k.enabled()},set:function(b){a.deprecated("tooltips","use chart.tooltip.enabled() instead"),k.enabled(!!b)}},tooltipContent:{get:function(){return k.contentGenerator()},set:function(b){a.deprecated("tooltipContent","use chart.tooltip.contentGenerator() instead"),k.contentGenerator(b)}},margin:{get:function(){return l},set:function(a){l.top=void 0!==a.top?a.top:l.top,l.right=void 0!==a.right?a.right:l.right,l.bottom=void 0!==a.bottom?a.bottom:l.bottom,l.left=void 0!==a.left?a.left:l.left}},duration:{get:function(){return C},set:function(a){C=a,F.reset(C),e.duration(C),f.duration(C),g.duration(C)}},color:{get:function(){return o},set:function(b){o=a.utils.getColor(b),h.color(o),e.color(o)}},rightAlignYAxis:{get:function(){return t},set:function(a){t=a,g.orient(t?"right":"left")}},useInteractiveGuideline:{get:function(){return u},set:function(a){u=!!a,b.interactive(!a),b.useVoronoi(!a),e.scatter.interactive(!a)}}}),a.utils.inheritOptions(b,e),a.utils.initOptions(b),b},a.models.sunburst=function(){"use strict";function b(u){return t.reset(),u.each(function(b){function t(a){a.x0=a.x,a.dx0=a.dx}function u(a){var b=d3.interpolate(p.domain(),[a.x,a.x+a.dx]),c=d3.interpolate(q.domain(),[a.y,1]),d=d3.interpolate(q.range(),[a.y?20:0,y]);return function(a,e){return e?function(){return s(a)}:function(e){return p.domain(b(e)),q.domain(c(e)).range(d(e)),s(a)}}}l=d3.select(this);var v,w=a.utils.availableWidth(g,l,f),x=a.utils.availableHeight(h,l,f),y=Math.min(w,x)/2;a.utils.initSVG(l);var z=l.selectAll(".nv-wrap.nv-sunburst").data(b),A=z.enter().append("g").attr("class","nvd3 nv-wrap nv-sunburst nv-chart-"+k),B=A.selectAll("nv-sunburst");z.attr("transform","translate("+w/2+","+x/2+")"),l.on("click",function(a,b){o.chartClick({data:a,index:b,pos:d3.event,id:k})}),q.range([0,y]),c=c||b,e=b[0],r.value(j[i]||j.count),v=B.data(r.nodes).enter().append("path").attr("d",s).style("fill",function(a){return m((a.children?a:a.parent).name)}).style("stroke","#FFF").on("click",function(a){d!==c&&c!==a&&(d=c),c=a,v.transition().duration(n).attrTween("d",u(a))}).each(t).on("dblclick",function(a){d.parent==a&&v.transition().duration(n).attrTween("d",u(e))}).each(t).on("mouseover",function(a){d3.select(this).classed("hover",!0).style("opacity",.8),o.elementMouseover({data:a,color:d3.select(this).style("fill")})}).on("mouseout",function(a){d3.select(this).classed("hover",!1).style("opacity",1),o.elementMouseout({data:a})}).on("mousemove",function(a){o.elementMousemove({data:a})})}),t.renderEnd("sunburst immediate"),b}var c,d,e,f={top:0,right:0,bottom:0,left:0},g=null,h=null,i="count",j={count:function(){return 1},size:function(a){return a.size}},k=Math.floor(1e4*Math.random()),l=null,m=a.utils.defaultColor(),n=500,o=d3.dispatch("chartClick","elementClick","elementDblClick","elementMousemove","elementMouseover","elementMouseout","renderEnd"),p=d3.scale.linear().range([0,2*Math.PI]),q=d3.scale.sqrt(),r=d3.layout.partition().sort(null).value(function(){return 1}),s=d3.svg.arc().startAngle(function(a){return Math.max(0,Math.min(2*Math.PI,p(a.x)))}).endAngle(function(a){return Math.max(0,Math.min(2*Math.PI,p(a.x+a.dx)))}).innerRadius(function(a){return Math.max(0,q(a.y))}).outerRadius(function(a){return Math.max(0,q(a.y+a.dy))}),t=a.utils.renderWatch(o);return b.dispatch=o,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{width:{get:function(){return g},set:function(a){g=a}},height:{get:function(){return h},set:function(a){h=a}},mode:{get:function(){return i},set:function(a){i=a}},id:{get:function(){return k},set:function(a){k=a}},duration:{get:function(){return n},set:function(a){n=a}},margin:{get:function(){return f},set:function(a){f.top=void 0!=a.top?a.top:f.top,f.right=void 0!=a.right?a.right:f.right,f.bottom=void 0!=a.bottom?a.bottom:f.bottom,f.left=void 0!=a.left?a.left:f.left}},color:{get:function(){return m},set:function(b){m=a.utils.getColor(b)}}}),a.utils.initOptions(b),b},a.models.sunburstChart=function(){"use strict";function b(d){return m.reset(),m.models(c),d.each(function(d){var h=d3.select(this);a.utils.initSVG(h);var i=a.utils.availableWidth(f,h,e),j=a.utils.availableHeight(g,h,e);if(b.update=function(){0===k?h.call(b):h.transition().duration(k).call(b)},b.container=this,!d||!d.length)return a.utils.noData(b,h),b;h.selectAll(".nv-noData").remove();var l=h.selectAll("g.nv-wrap.nv-sunburstChart").data(d),m=l.enter().append("g").attr("class","nvd3 nv-wrap nv-sunburstChart").append("g"),n=l.select("g");m.append("g").attr("class","nv-sunburstWrap"),l.attr("transform","translate("+e.left+","+e.top+")"),c.width(i).height(j);var o=n.select(".nv-sunburstWrap").datum(d);d3.transition(o).call(c)}),m.renderEnd("sunburstChart immediate"),b}var c=a.models.sunburst(),d=a.models.tooltip(),e={top:30,right:20,bottom:20,left:20},f=null,g=null,h=a.utils.defaultColor(),i=(Math.round(1e5*Math.random()),null),j=null,k=250,l=d3.dispatch("tooltipShow","tooltipHide","stateChange","changeState","renderEnd"),m=a.utils.renderWatch(l);return d.headerEnabled(!1).duration(0).valueFormatter(function(a){return a}),c.dispatch.on("elementMouseover.tooltip",function(a){a.series={key:a.data.name,value:a.data.size,color:a.color},d.data(a).hidden(!1)}),c.dispatch.on("elementMouseout.tooltip",function(){d.hidden(!0)}),c.dispatch.on("elementMousemove.tooltip",function(){d.position({top:d3.event.pageY,left:d3.event.pageX})()}),b.dispatch=l,b.sunburst=c,b.tooltip=d,b.options=a.utils.optionsFunc.bind(b),b._options=Object.create({},{noData:{get:function(){return j},set:function(a){j=a}},defaultState:{get:function(){return i},set:function(a){i=a}},color:{get:function(){return h},set:function(a){h=a,c.color(h)}},duration:{get:function(){return k},set:function(a){k=a,m.reset(k),c.duration(k)}},margin:{get:function(){return e},set:function(a){e.top=void 0!==a.top?a.top:e.top,e.right=void 0!==a.right?a.right:e.right,e.bottom=void 0!==a.bottom?a.bottom:e.bottom,e.left=void 0!==a.left?a.left:e.left}}}),a.utils.inheritOptions(b,c),a.utils.initOptions(b),b},a.version="1.8.1"}();
/** nvd3 ends */
/**Angular-nvd3 starts */
!function(window){"use strict";var nv=window.nv;"undefined"!=typeof exports&&(nv=require("nvd3")),angular.module("nvd3",[]).directive("nvd3",["nvd3Utils",function(nvd3Utils){return{restrict:"AE",scope:{data:"=",options:"=",api:"=?",events:"=?",config:"=?",onReady:"&?"},link:function(scope,element,attrs){function configure(chart,options,chartType){chart&&options&&angular.forEach(chart,function(value,key){"_"===key[0]||("dispatch"===key?(void 0!==options[key]&&null!==options[key]||scope._config.extended&&(options[key]={}),configureEvents(value,options[key])):"tooltip"===key?(void 0!==options[key]&&null!==options[key]||scope._config.extended&&(options[key]={}),configure(chart[key],options[key],chartType)):"contentGenerator"===key?options[key]&&chart[key](options[key]):-1===["axis","clearHighlights","defined","highlightPoint","nvPointerEventsClass","options","rangeBand","rangeBands","scatter","open","close","node"].indexOf(key)&&(void 0===options[key]||null===options[key]?scope._config.extended&&(options[key]=value()):chart[key](options[key])))})}function configureEvents(dispatch,options){dispatch&&options&&angular.forEach(dispatch,function(value,key){void 0===options[key]||null===options[key]?scope._config.extended&&(options[key]=value.on):dispatch.on(key+"._",options[key])})}function configureWrapper(name){var _=nvd3Utils.deepExtend(defaultWrapper(name),scope.options[name]||{});scope._config.extended&&(scope.options[name]=_);var wrapElement=angular.element("<div></div>").html(_.html||"").addClass(name).addClass(_.className).removeAttr("style").css(_.css);_.html||wrapElement.text(_.text),_.enable&&("title"===name?element.prepend(wrapElement):"subtitle"===name?angular.element(element[0].querySelector(".title")).after(wrapElement):"caption"===name&&element.append(wrapElement))}function configureStyles(){var _=nvd3Utils.deepExtend(defaultStyles(),scope.options.styles||{});scope._config.extended&&(scope.options.styles=_),angular.forEach(_.classes,function(value,key){value?element.addClass(key):element.removeClass(key)}),element.removeAttr("style").css(_.css)}function defaultWrapper(_){switch(_){case"title":return{enable:!1,text:"Write Your Title",className:"h4",css:{width:scope.options.chart.width+"px",textAlign:"center"}};case"subtitle":return{enable:!1,text:"Write Your Subtitle",css:{width:scope.options.chart.width+"px",textAlign:"center"}};case"caption":return{enable:!1,text:"Figure 1. Write Your Caption text.",css:{width:scope.options.chart.width+"px",textAlign:"center"}}}}function defaultStyles(){return{classes:{"with-3d-shadow":!0,"with-transitions":!0,gallery:!1},css:{}}}function dataWatchFn(newData,oldData){newData!==oldData&&(scope._config.disabled||(scope._config.refreshDataOnly?scope.api.update():scope.api.refresh()))}var defaultConfig={extended:!1,visible:!0,disabled:!1,refreshDataOnly:!0,deepWatchOptions:!0,deepWatchData:!0,deepWatchDataDepth:2,debounce:10,debounceImmediate:!0};scope.isReady=!1,scope._config=angular.extend(defaultConfig,scope.config),scope.api={refresh:function(){scope.api.updateWithOptions(),scope.isReady=!0},refreshWithTimeout:function(t){setTimeout(function(){scope.api.refresh()},t)},update:function(){scope.chart&&scope.svg?"sunburstChart"===scope.options.chart.type?scope.svg.datum(angular.copy(scope.data)).call(scope.chart):scope.svg.datum(scope.data).call(scope.chart):scope.api.refresh()},updateWithTimeout:function(t){setTimeout(function(){scope.api.update()},t)},updateWithOptions:function(options){if(arguments.length){if(scope.options=options,scope._config.deepWatchOptions&&!scope._config.disabled)return}else options=scope.options;scope.api.clearElement(),angular.isDefined(options)!==!1&&scope._config.visible&&(scope.chart=nv.models[options.chart.type](),scope.chart.id=Math.random().toString(36).substr(2,15),angular.forEach(scope.chart,function(value,key){"_"===key[0]||["clearHighlights","highlightPoint","id","options","resizeHandler","state","open","close","tooltipContent"].indexOf(key)>=0||("dispatch"===key?(void 0!==options.chart[key]&&null!==options.chart[key]||scope._config.extended&&(options.chart[key]={}),configureEvents(scope.chart[key],options.chart[key])):["bars","bars1","bars2","boxplot","bullet","controls","discretebar","distX","distY","focus","interactiveLayer","legend","lines","lines1","lines2","multibar","pie","scatter","scatters1","scatters2","sparkline","stack1","stack2","sunburst","tooltip","x2Axis","xAxis","y1Axis","y2Axis","y3Axis","y4Axis","yAxis","yAxis1","yAxis2"].indexOf(key)>=0||"stacked"===key&&"stackedAreaChart"===options.chart.type?(void 0!==options.chart[key]&&null!==options.chart[key]||scope._config.extended&&(options.chart[key]={}),configure(scope.chart[key],options.chart[key],options.chart.type)):"focusHeight"===key&&"lineChart"===options.chart.type||"focusHeight"===key&&"lineWithFocusChart"===options.chart.type||("xTickFormat"!==key&&"yTickFormat"!==key||"lineWithFocusChart"!==options.chart.type)&&("tooltips"===key&&"boxPlotChart"===options.chart.type||("tooltipXContent"!==key&&"tooltipYContent"!==key||"scatterChart"!==options.chart.type)&&("x"!==key&&"y"!==key||"forceDirectedGraph"!==options.chart.type)&&(void 0===options.chart[key]||null===options.chart[key]?scope._config.extended&&("barColor"===key?options.chart[key]=value()():options.chart[key]=value()):scope.chart[key](options.chart[key]))))}),scope.api.updateWithData(),(options.title||scope._config.extended)&&configureWrapper("title"),(options.subtitle||scope._config.extended)&&configureWrapper("subtitle"),(options.caption||scope._config.extended)&&configureWrapper("caption"),(options.styles||scope._config.extended)&&configureStyles(),nv.addGraph(function(){return scope.chart?(scope.chart.resizeHandler&&scope.chart.resizeHandler.clear(),scope.chart.resizeHandler=nv.utils.windowResize(function(){scope.chart&&scope.chart.update&&scope.chart.update()}),void 0!==options.chart.zoom&&["scatterChart","lineChart","candlestickBarChart","cumulativeLineChart","historicalBarChart","ohlcBarChart","stackedAreaChart"].indexOf(options.chart.type)>-1&&nvd3Utils.zoom(scope,options),scope.chart):void 0},options.chart.callback))},updateWithData:function(data){if(arguments.length){if(scope.data=data,scope._config.deepWatchData&&!scope._config.disabled)return}else data="sunburstChart"===scope.options.chart.type?angular.copy(scope.data):scope.data;if(data){d3.select(element[0]).select("svg").remove();var h,w;scope.svg=d3.select(element[0]).insert("svg",".caption"),(h=scope.options.chart.height)&&(isNaN(+h)||(h+="px"),scope.svg.attr("height",h).style({height:h})),(w=scope.options.chart.width)?(isNaN(+w)||(w+="px"),scope.svg.attr("width",w).style({width:w})):scope.svg.attr("width","100%").style({width:"100%"}),scope.svg.datum(data).call(scope.chart),scope.chart&&scope.chart.zoomRender&&scope.chart.zoomRender()}},clearElement:function(){if(element.find(".title").remove(),element.find(".subtitle").remove(),element.find(".caption").remove(),element.empty(),scope.chart&&scope.chart.tooltip&&scope.chart.tooltip.id&&d3.select("#"+scope.chart.tooltip.id()).remove(),nv.graphs&&scope.chart)for(var i=nv.graphs.length-1;i>=0;i--)nv.graphs[i]&&nv.graphs[i].id===scope.chart.id&&nv.graphs.splice(i,1);nv.tooltip&&nv.tooltip.cleanup&&nv.tooltip.cleanup(),scope.chart&&scope.chart.resizeHandler&&scope.chart.resizeHandler.clear(),scope.chart=null},getScope:function(){return scope},getElement:function(){return element}},scope._config.deepWatchOptions&&scope.$watch("options",nvd3Utils.debounce(function(newOptions){scope._config.disabled||scope.api.refresh()},scope._config.debounce,scope._config.debounceImmediate),!0),scope._config.deepWatchData&&(1===scope._config.deepWatchDataDepth?scope.$watchCollection("data",dataWatchFn):scope.$watch("data",dataWatchFn,2===scope._config.deepWatchDataDepth)),scope.$watch("config",function(newConfig,oldConfig){newConfig!==oldConfig&&(scope._config=angular.extend(defaultConfig,newConfig),scope.api.refresh())},!0),scope._config.deepWatchOptions||scope._config.deepWatchData||scope.api.refresh(),angular.forEach(scope.events,function(eventHandler,event){scope.$on(event,function(e,args){return eventHandler(e,scope,args)})}),element.on("$destroy",function(){scope.api.clearElement()}),scope.$watch("isReady",function(isReady){isReady&&scope.onReady&&"function"==typeof scope.onReady()&&scope.onReady()(scope,element)})}}}]).factory("nvd3Utils",function(){return{debounce:function(func,wait,immediate){var timeout;return function(){var context=this,args=arguments,later=function(){timeout=null,immediate||func.apply(context,args)},callNow=immediate&&!timeout;clearTimeout(timeout),timeout=setTimeout(later,wait),callNow&&func.apply(context,args)}},deepExtend:function(dst){var me=this;return angular.forEach(arguments,function(obj){obj!==dst&&angular.forEach(obj,function(value,key){dst[key]&&dst[key].constructor&&dst[key].constructor===Object?me.deepExtend(dst[key],value):dst[key]=value})}),dst},zoom:function(scope,options){var zoom=options.chart.zoom,enabled="undefined"==typeof zoom.enabled||null===zoom.enabled?!0:zoom.enabled;if(enabled){var fixDomain,d3zoom,zoomed,unzoomed,zoomend,xScale=scope.chart.xAxis.scale(),yScale=scope.chart.yAxis.scale(),xDomain=scope.chart.xDomain||xScale.domain,yDomain=scope.chart.yDomain||yScale.domain,x_boundary=xScale.domain().slice(),y_boundary=yScale.domain().slice(),scale=zoom.scale||1,translate=zoom.translate||[0,0],scaleExtent=zoom.scaleExtent||[1,10],useFixedDomain=zoom.useFixedDomain||!1,useNiceScale=zoom.useNiceScale||!1,horizontalOff=zoom.horizontalOff||!1,verticalOff=zoom.verticalOff||!1,unzoomEventType=zoom.unzoomEventType||"dblclick.zoom";useNiceScale&&(xScale.nice(),yScale.nice()),fixDomain=function(domain,boundary){return domain[0]=Math.min(Math.max(domain[0],boundary[0]),boundary[1]-boundary[1]/scaleExtent[1]),domain[1]=Math.max(boundary[0]+boundary[1]/scaleExtent[1],Math.min(domain[1],boundary[1])),domain},zoomed=function(){if(void 0!==zoom.zoomed){var domains=zoom.zoomed(xScale.domain(),yScale.domain());horizontalOff||xDomain([domains.x1,domains.x2]),verticalOff||yDomain([domains.y1,domains.y2])}else horizontalOff||xDomain(useFixedDomain?fixDomain(xScale.domain(),x_boundary):xScale.domain()),verticalOff||yDomain(useFixedDomain?fixDomain(yScale.domain(),y_boundary):yScale.domain());scope.chart&&scope.chart.update()},unzoomed=function(){if(void 0!==zoom.unzoomed){var domains=zoom.unzoomed(xScale.domain(),yScale.domain());horizontalOff||xDomain([domains.x1,domains.x2]),verticalOff||yDomain([domains.y1,domains.y2])}else horizontalOff||xDomain(x_boundary),verticalOff||yDomain(y_boundary);d3zoom.scale(scale).translate(translate),scope.chart&&scope.chart.update()},zoomend=function(){void 0!==zoom.zoomend&&zoom.zoomend()},d3zoom=d3.behavior.zoom().x(xScale).y(yScale).scaleExtent(scaleExtent).on("zoom",zoomed).on("zoomend",zoomend),scope.svg&&(scope.svg.call(d3zoom),d3zoom.scale(scale).translate(translate).event(scope.svg),"none"!==unzoomEventType&&scope.svg.on(unzoomEventType,unzoomed)),scope.chart&&(scope.chart.zoomRender=function(){d3zoom.scale(scale).translate(translate),xScale=scope.chart.xAxis.scale(),yScale=scope.chart.yAxis.scale(),xDomain=scope.chart.xDomain||xScale.domain,yDomain=scope.chart.yDomain||yScale.domain,x_boundary=xScale.domain().slice(),y_boundary=yScale.domain().slice(),d3zoom.x(xScale).y(yScale),scope.svg.call(d3zoom),"none"!==unzoomEventType&&scope.svg.on(unzoomEventType,unzoomed)})}}}})}(window);

