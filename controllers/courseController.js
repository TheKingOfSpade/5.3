const {Course} = require('../models')
const departments = ['Math', 'English', 'Music', 'Art', 'Physical Education', 'World Languages', 'Social Studies', 'Science', 'Computer'].sort();
//view all
module.exports.viewAll = async function (req, res) {
    const courses = await Course.findAll();
    res.render('course/view_all',{courses});
};
//profile
module.exports.viewProfile= async function(req, res) {
    const course = await Course.findByPk(req.params.id);
    res.render('course/profile', {course})
}
//render add form
module.exports.renderEditForm = async function(req, res){
    const course = {
        name: '',
        department: departments[0],
        instructor_name: '',
        description: ''
    }
    res.render('course/add', {course, departments});
}
//add
module.exports.addCourse = async function(req,res){
    const course = await Course.create( {
        name: req.body.name,
        department: req.body.department,
        instructor_name: req.body.department,
        description: req.body.description
    });
    res.redirect(`/courses/profile/${course.id}`);
}
//render edit form

//update
module.exports.updateCourse = async function(req, res){
    const course = await Course.update({
        name: req.body.name,
        department: res.body.department,
        instructor_name: req.body.instructor_name,
        description: req.body.description
    }, {
        where: {
            id: req.params.id
        }
        });
res.redirect(`/courses/profile/${res.params.id}`);
}
//delete
module.exports.deleteCourse = async function(req, res){
    await Course.destroy({
        where: {
            id:res.params.id
        }
        });
    res.redirect('/courses');
}