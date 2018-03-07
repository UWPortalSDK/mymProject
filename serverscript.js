// Retreive data from the database
function getQs() {
    var queryResult = db.Execute('SELECT * FROM SurveyQuestions');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

// Retreive student data from the database
function getStudents() {
    var queryResult = db.Execute('select distinct name, student_id from StudentProfile');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

// Retreive student data from the database
function getTerms() {
    var queryResult = db.Execute('SELECT * FROM StudentProfile WHERE student_id = @value ');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

// Remove Data from cluster table
function deleteCluster() {
    db.Execute('Delete From cluster_data');
    db.Execute('Delete From cluster_center');
    return "Success";
}

// Remove Data from cluster center table
function deleteCenter() {
    db.Execute('Delete From cluster_center');
    return getData();
}
// Insert into cluster data table
// Insert into cluster data table
function insertResult() {
    db.Execute('Insert Into cluster_data(Activity,Cluster,X_Val,Y_Val,Z_Val, Category) Values (@activity, @cluster,@xVal,@yVal,@zVal,@category)');
    return "Success";
}

// insert int cluster_center table
function insertCen() {
    db.Execute('INSERT INTO cluster_center Values(@cNum,@c1,@c2,@c3)');
    return getData();
}

function registrate(){
 	db.Execute('INSERT INTO StudentProfile Values(@mailing,@contact,@fname,@lname,@sid,@term,@program,@email,@gender,@rName,@rType,@rEmail,@rDepartment,@progress,@frequency,@consideration,@dates,@aterm)');
    return getData();
}

// Retreive student data from the database
function getCenters() {
    var queryResult = db.Execute('SELECT * FROM cluster_center');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getClusters(){
 	var queryResult = db.Execute ('SELECT Activity FROM cluster_data WHERE Cluster = @cNumber'); 
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}
// Retreive activities from the DB
function getAct() {
    var queryResult = db.Execute('SELECT * FROM cluster_data');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

// Retreive individual scores from the DB
function getScores() {
    var queryResult = db.Execute('SELECT X_val, Y_val, Z_val FROM cluster_data WHERE Activity = @activity');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

//get existing surveys
function SurveyTerms() {
    var queryResult = db.Execute('select distinct term, mailing_id from surveytable');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

//insert surveyData into table
function insertSurvey(){
 	db.Execute('INSERT INTO surveytable Values (@mailing_id,@survey_id,@type,@term)');
    return getData();
}

//check if survey exists
function checkSurveyExist(){
 	var queryResult = db.Execute('Select survey_id from surveytable WHERE survey_id = @survey_id');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function searchSurveyTerm(){
 	var queryResult = db.Execute('select distinct term from surveytable');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function searchSurveyType(){
 	var queryResult = db.Execute('select * from surveytable');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getSurveyTerms() {
    var queryResult = db.Execute('SELECT type FROM StudentProfile WHERE term = @value ');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

//retrieve term information from the database for distribution page
function getTermsDist() {
    var queryResult = db.Execute('SELECT current_term From StudentProfile');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"test no table"}';
    }
    return queryResult;
}

//retrieve student information from the database for distribution page given a term
function getStudentDist() {
    var queryResult = db.Execute('SELECT pname_f, pname_l From StudentProfile WHERE current_term =  @term');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getSurveyType(){
    var queryResult = db.Execute('SELECT type FROM surveytable');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}
