// Retreive data from the database
function getQs() {
    var queryResult = db.Execute('SELECT * FROM SurveyQuestions');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}