const Student = require('../models/student');
const Course = require('../models/course');

async function addStudent(req, res) {
  const { firstName, lastName, email } = req.body;

  const student = new Student({
    firstName,
    lastName,
    email
  });
  await student.save();
  return res.json(student);
}

async function getStudent(req, res) {
  const { id } = req.params;

  const student = await Student.findById(id).populate('courses', 'name');

  if (!student) {
    return res.status(404).json('student not found');
  }
  return res.json(student);
}

async function getAllStudents(req, res) {
  const students = await Student.find();
  return res.json(students);
}

async function updateStudent(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const newStudent = await Student.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    {
      new: true // return the updated object
      // runValidators: true // run validator against new value
    }
  );
  if (!newStudent) {
    return res.status(404).json('course not found');
  }
  return res.json(newStudent);
}

async function deleteStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);
  if (!student) {
    return res.status(404).json('student not found');
  }

  await Course.updateMany(
    { _id: { $in: student.courses } },
    { $pull: { students: student._id } }
  );

  return res.sendStatus(200);
}

async function addCourse(req, res) {
  const { id, code } = req.params;
  const course = await Course.findById(code);
  const student = await Student.findById(id);

  if (!student || !course) {
    return res.status(404).json('student or course not found');
  }

  student.courses.addToSet(course._id);
  course.students.addToSet(student._id);
  await student.save();
  await course.save();
  return res.json(student);
}

async function deleteCourse(req, res) {
  const{id,code} = req.params;
  const course = await courseModel.findById(code);
  const student = await studentModel.findById(id);
  if (!student || !course) {
      return res.status(404).json('student or course not found');
  }
  student.courses.pull(course._id);
  course.students.pull(student._id);
  await student.save();
  await course.save();
  //return student
  return res.json(student);
}

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  addCourse,
  deleteCourse
};
