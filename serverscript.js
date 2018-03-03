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
 	db.Execute('INSERT INTO StudentProfile Values (@id,@term,@name,@email,@gender,@program,@date,@aterm,@wob,@wobname,@surveyid,@support)');
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

