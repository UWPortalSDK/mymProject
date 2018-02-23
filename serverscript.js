// Retreive data from the database
function getQs() {
    var queryResult = db.Execute('SELECT * FROM SurveyQuestions');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}https://portal.uwaterloo.ca/Index

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
    return getData();
}
// Remove Data from cluster table
function insertResult() {
    db.Execute('INSERT INTO cluster_data Values(@activity,@cluster)');
    return getData();
}

function registrate(){
 	db.Execute('INSERT INTO StudentProfile Values (@id,@term,@name,@email,@gender,@program,@date,@aterm,@wob,@wobname,@surveyid,@support)');
    return getData();
}