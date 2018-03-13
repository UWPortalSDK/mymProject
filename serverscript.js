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
    var queryResult = db.Execute('select distinct pname_f, pname_l,student_id from StudentProfile');
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
    db.Execute('INSERT INTO StudentProfile(mailing_id,contact_id,pname_f,pname_l,student_id,current_term,program,p_email,gender,rname,rtype,remail,rdepartment,rprogress,rfrequent,consideration,submission_date,academic_term) Values(@mailing,@contact,@fname,@lname,@sid,@term,@program,@email,@gender,@rName,@rType,@rEmail,@rDepartment,@progress,@frequency,@consideration,@dates,@aterm)');
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
    var queryResult = db.Execute('SELECT type, survey_id FROM surveytable WHERE term = @value ');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}


//retrieve term information from the database for distribution page
function getTermsDist() {
    var queryResult = db.Execute('SELECT DISTINCT current_term From StudentProfile');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"test no table"}';
    }
    return queryResult;
}

//retrieve student information from the database for distribution page given a term
function getStudentDist() {
    var queryResult = db.Execute('SELECT pname_f, pname_l, p_email, contact_id, mailing_id, student_id From StudentProfile WHERE current_term =  @term');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getSurveyType(){
    var queryResult = db.Execute('SELECT type, survey_id FROM surveytable WHERE term=@value');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

//update student profile
function updateStudent(){
    db.Execute('UPDATE StudentProfile SET pname_f=@fname, pname_l= @lname,student_id=@sid, p_email=@email, gender=@gender, program=@program, academic_term=@aterm, workout_buddy=@hbuddy, buddy_name=@bname, rfrequent=@confreq  WHERE current_term = @current_term AND contact_id= @contact_id');
    return ("Executed");
}

function getEditStudent(){
    var queryResult = db.Execute('SELECT * FROM StudentProfile WHERE student_id=@sid AND current_term=@term');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getBefore() {
    var queryResult = db.Execute("SELECT * FROM InitialMHMotivate where email=@email");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getAfter() {
    var queryResult = db.Execute("SELECT * FROM FinalMHMotivate where email=@email");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getBeforeGB(){
    var queryResult = db.Execute("SELECT * FROM IntakeSurvey where email=@email");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

//the following 5 server scripts are for each of the 5 survey tables
function deleteInitialMHMotivate(){
    //SET @sql = 'INSERT INTO ' + @SourceTable + ' SELECT ....';
    //var test = '@tableName';
    //var sql = 'DELETE FROM ' + @tableName + ' WHERE current_term=@term';    
    db.Execute('DELETE FROM InitialMHMotivate WHERE current_term=@term');
    return ("DID some stuff");
}

function deleteIntakeSurvey(){
    
    db.Execute('DELETE FROM IntakeSurvey WHERE current_term=@term');
    return ("DID some stuff");
}

function deleteExitSurvey(){
     db.Execute('DELETE FROM ExitSurvey WHERE current_term=@term');
    return ("DID some stuff");
}

function deleteFinalFeedback(){
    db.Execute('DELETE FROM FinalFeedback WHERE current_term=@term');
    return ("DID some stuff");
}

function deleteFinalMHMotivate(){    
    db.Execute('DELETE FROM FinalMHMotivate WHERE current_term=@term');
    return ("DID some stuff");
}
//end of the server scripts for the 5 surveys 

//the following 5 server scripts are for entering into survey results
function insertInitialMHMotivate(){    
    
    db.Execute('Insert into InitialMHMotivate (survey_id,student_id,current_term,email,mh_life,mh_nervous,mh_sleep,mh_stress,mh_concentrate,mh_tired,mh_eval,exercise_benefit,exercise_regular,exercise_fun,exercise_satisfaction,exercise_pressure,exercise_guilt,exercise_other) ' + 
                "Values(@survey_id,@student_id,@current_term,@email,@mh_life,@mh_nervous,@mh_sleep,@mh_stress,@mh_concentrate,@mh_tired,@mh_eval,@exercise_benefit,@exercise_regular,@exercise_fun,@exercise_satisfaction,@exercise_pressure,@exercise_guilt,@exercise_other)");
    return ("DID some stuff");
}

// function insertInitialMHMotivate2(){    
    
//      db.Execute('Insert into InitialMHMotivate (survey_id,student_id,current_term,email,mh_life,mh_nervous,mh_sleep,mh_stress,mh_concentrate,mh_tired,mh_eval,exercise_benefit,exercise_regular,exercise_fun,exercise_satisfaction,exercise_pressure,exercise_guilt,exercise_other) ' + 
//                 "Values(@survey_id,@student_id,@current_term,@email,@mh_life,@mh_nervous,@mh_sleep,@mh_stress,@mh_concentrate,@mh_tired,@mh_eval,@exercise_benefit,@exercise_regular,@exercise_fun,@exercise_satisfaction,@exercise_pressure,@exercise_guilt,@exercise_other)");
//     return ("DID some stuff");
// }

function insertIntakeSurvey(){
    
    db.Execute('Insert Into IntakeSurvey (survey_id,student_id,current_term,email,gba_feel,gba_look,gba_sleep,gba_energy,gba_memory,gba_health,gba_people,gba_other,gbb_motivate,gbb_support,gbb_account,gbb_school,gbb_job,gbb_physical,gbb_finance,gbb_other,gbb_plan,gbb_notes) Values(@survey_id, @student_id, @current_term,@email,@gba_feel,@gba_look,@gba_sleep,@gba_energy,@gba_memory,@gba_health,@gba_people,@gba_other,@gbb_motivate,@gbb_support,@gbb_account,@gbb_school,@gbb_job,@gbb_physical,@gbb_finance,@gbb_other,@gbb_plan,@gbb_notes)');
    return ("DID some stuff");
}


function insertExitSurvey2(){
    
     db.Execute('Insert INTO ExitSurvey(survey_id,student_id,current_term,email,gba_feel,gba_look,gba_sleep,gba_energy,gba_memory,gba_health,gba_people,gba_other,gb_goal_change,gb_goalchange_other,gb_achieve,gb_achieve_other,gbb_motivate,gbb_support,gbb_account,gbb_school,gbb_job,gbb_physical,gbb_finance,gbb_other,gbb_notes,f_level,f_participate,f_participate_rate,f_enjoy,f_enjoy_rate,f_not_enjoy,f_not_enjoy_rate,f_wo_contribute,f_feedback)' +
                'Values(@survey_id,@student_id,@current_term,@email,@gba_feel,@gba_look,@gba_sleep,@gba_energy,@gba_memory,@gba_health,@gba_people,@gba_other,@gb_goal_change,@gb_goalchange_other,@gb_achieve,@gb_achieve_other,@gbb_motivate,@gbb_support,@gbb_account,@gbb_school,@gbb_job,@gbb_physical,@gbb_finance,@gbb_other,@gbb_notes,@f_level,@f_participate,@f_participate_rate,@f_enjoy,@f_enjoy_rate,@f_not_enjoy,@f_not_enjoy_rate,@f_wo_contribute,@f_feedback)');
     return ("DID some stuff");
     
}

function insertFinalFeedback(){
     db.Execute('Insert Into FinalFeedback (survey_id,student_id,current_term,email,scm_cope,scm_other,scm_motivate,scm_impact,scm_reason,crs_contact,crs_amount,crs_improve,crs_confident,crs_conf_exp,crs_contact_yn,crs_enjoy,crs_comment) ' + 
                "Values(@survey_id,@student_id,@current_term,@email,@scm_cope,@scm_other,@scm_motivate,@scm_impact,@scm_reason,@crs_contact,@crs_amount,@crs_improve,@crs_confident,@crs_conf_exp,@crs_contact_yn,@crs_enjoy,@crs_comment)");
    return ("DID some stuff");
}

function insertFinalMHMotivate(){    
    db.Execute('Insert into FinalMHMotivate (survey_id,student_id,current_term,email,mh_life,mh_nervous,mh_sleep,mh_stress,mh_concentrate,mh_tired,mh_eval,exercise_benefit,exercise_regular,exercise_fun,exercise_satisfaction,exercise_pressure,exercise_guilt,exercise_other) ' + 
                "Values(@survey_id,@student_id,@current_term,@email,@mh_life,@mh_nervous,@mh_sleep,@mh_stress,@mh_concentrate,@mh_tired,@mh_eval,@exercise_benefit,@exercise_regular,@exercise_fun,@exercise_satisfaction,@exercise_pressure,@exercise_guilt,@exercise_other)");
    return ("DID some stuff");
}
//end of the server scripts for the 5 surveys 

//the following server scripts are for the general report 
function getTerms (){
    var queryResult = db.Execute('SELECT DISTINCT current_term FROM StudentProfile');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getNumStudents ()
{
	var queryResult = db.Execute("SELECT count (*) FROM StudentProfile where current_term = @term");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getAvgBefore(){
	var queryResult = db.Execute("select avg (mh_life) as life, avg (mh_nervous) as nervous, avg (mh_sleep) as sleep, avg (mh_stress) as stress,avg (mh_concentrate) as concentrate,avg (mh_tired) as tired,avg(exercise_benefit) as benefit,avg(exercise_regular) as regular,avg(exercise_fun) as fun,avg(exercise_satisfaction) as satisfaction,avg(exercise_pressure) as pressure,avg(exercise_guilt) as guilt from PreIntakeMeeting where current_term=@term");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getAvgAfter(){
	var queryResult = db.Execute("select avg (mh_life) as life, avg (mh_nervous) as nervous, avg (mh_sleep) as sleep, avg (mh_stress) as stress,avg (mh_concentrate) as concentrate,avg (mh_tired) as tired,avg(exercise_benefit) as benefit,avg(exercise_regular) as regular,avg(exercise_fun) as fun,avg(exercise_satisfaction) as satisfaction,avg(exercise_pressure) as pressure,avg(exercise_guilt) as guilt from FinalMeeting where current_term=@term");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getAvgGBBefore(){
	var queryResult = db.Execute("select avg(gba_feel) as feel,avg(gba_look) as look,avg(gba_sleep) as sleep,avg (gba_energy) as energy,avg(gba_memory) as memory,avg(gba_health) as health,avg(gba_people) as people,avg(gbb_motivate) as motivate,avg(gbb_support) as support,avg(gbb_account) as account,avg(gbb_school) as school,avg(gbb_job) as job,avg(gbb_physical) as physical,avg(gbb_finance) as finance from Intake where current_term=@term");
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}
//end of the general report queries


