var mysql = require('mysql');
function configDatabase(req, res) {

  var connection = mysql.createConnection({
    host: "mysql.mapledonut.ca",
    user: "mapledonutca1",
    password: "UQ8P2mdX",
    database: "mapledonut_ca"
  });
  connection.connect(function(err) {
    if(err){
      return console.log("error" + err.message);               // connection failed
    }else{
      console.log("connected to mapledonut_ca");                // connection success
      //let insertQuery = 'INSERT INTO ?? (??,??,??,??) VALUES (?,?,?,?)';
      //let query = mysql.format(insertQuery,["Student","student_id","email","biography",
    //  "discipline_id", 100, "test@gmail.com", "test", 101]);
    }
  });
  return connection;
}

function obtainAllCourses(connection, callback){
  let query = 'SELECT course_name FROM Course,Student,Takes WHERE Student.student_id=Takes.student_id AND Takes.course_id = Course.course_id AND Student.student_id = 101';

  connection.query(query, (err, result) => {
    if(err){                                               // query failed
      console.log(err);
    }else{
      var courses;                    // query success
      for (var i = 0; i <result.length; i ++){
            courses += result[i].course_name;
      }
      courses = courses.slice(9);
      callback(courses);
    }
  });
}

function obtainAllProfessors(connection, callback){
  let query = 'SELECT name FROM Teacher, Teaches, Course WHERE Teacher.teacher_id = Teaches.teacher_id AND Teaches.course_id = Course.course_id \
  AND Course.course_id IN (SELECT Course.course_id FROM Course, Takes, Student WHERE Course.course_id = Takes.course_id AND Takes.student_id = 100)';

  connection.query(query, (err, result) => {
    if(err){                                               // query failed
      console.log(err);
    }else{
      var teachers;                    // query success
      for (var i = 0; i <result.length; i ++){
            teachers += result[i].name;
      }
      teachers = teachers.slice(9);
      callback(teachers);
    }
  });
}

module.exports = {configDatabase, obtainAllCourses, obtainAllProfessors};
