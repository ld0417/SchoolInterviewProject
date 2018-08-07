import * as React from "react";
import Icon from 'react-icons-kit';
import { cross } from 'react-icons-kit/icomoon/cross';  
import { cancelCircle } from 'react-icons-kit/icomoon/cancelCircle';  
import { pencil } from 'react-icons-kit/icomoon/pencil';   
import { ic_school } from 'react-icons-kit/md/ic_school';       

/*
-----------------------------------------------------------------------------------------
Component
Build a solution that does the following
Done: Shows a list of students with the following information: First Name, Last Name, Email, Age, Grade (1st, 2nd, 3rd, etc...)
Done: The user should be able to add a new student
Done: The user should be able to edit the an existing student record
Done: The user should be able to delete a student
Done: Before a student can be removed, a confirmation dialog should be displayed that asks the user if they really want to delete the student
-----------------------------------------------------------------------------------------
*/

class Home extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
        this.state = { 
            students: [],
            isFormVisible: false,
            selectedStudent: null
        };
    }

    // Get all students
    componentDidMount() {
        fetch('/Home/GetStudents/').then(response => {
            response.json().then(data => {
                //console.log(data);
                this.setStudents(data);
            })
        });
    }

    // Set/Get values of state. 
    // For some reason this.state.data, etc. doesn't work
    setStudents(data){
        this.setState({ students: data, isFormVisible: false });
    }
    getStudents(state){
        return state.students;
    }
    IsFormVisible(state){ 
        return state.isFormVisible; 
    }
    closeForm(){
        this.setState({ isFormVisible: false });
    }
    openForm(student, state){
        this.setState({ selectedStudent: student, isFormVisible: !state.isFormVisible });
    }

    // Add/Update/Delete a student
    addStudent(student){
        fetch('/Home/AddStudent', {
            method: 'post',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                    'FirstName': student.firstName,
                    'LastName': student.lastName, 
                    'Email': student.email, 
                    'Age': parseInt(student.age, 10),
                    'Grade': parseInt(student.grade,10)
                })
        }).then(response => {
            response.json().then(data => {
                //console.log(data);
                if (data == "Error"){
                    alert("Something went wrong!");
                }else{
                    this.setStudents(data);
                }
            })
        });
    }
    editStudent(student){
        fetch('/Home/EditStudent', {
            method: 'post',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
                    'StudentId': parseInt(student.studentId, 10),
                    'FirstName': student.firstName,
                    'LastName': student.lastName, 
                    'Email': student.email, 
                    'Age': parseInt(student.age, 10),
                    'Grade': parseInt(student.grade,10)
                })
        }).then(response => {
            response.json().then(data => {
                //console.log(data);
                if (data == "Error"){
                    alert("Something went wrong!");
                }else{                    
                    this.setStudents(data);
                }
            })
        });
    }
    deleteStudent(student){
        if(student.studentId > 0 && confirm("Are you sure you want to delete this student?")){
            fetch('/Home/DeleteStudent', {
                method: 'post',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({
                        'StudentId': parseInt(student.studentId, 10),
                        'FirstName': student.firstName, 
                        'LastName': student.lastName, 
                        'Email': student.email, 
                        'Age': parseInt(student.age, 10),
                        'Grade': parseInt(student.grade,10)
                    })
            }).then(response => {
                response.json().then(data => {
                    //console.log(data);
                    if (data == "Error"){
                        alert("Something went wrong!");
                    }else{
                        alert("Your student has been deleted.");
                        this.setStudents(data);
                    }
                })
            });
        }
    }
    handleSubmit(event){
        event.preventDefault();
        if(event.target != null && event.target != undefined){
            var student = {
                studentId: event.target.studentId.value, 
                firstName: event.target.firstName.value, 
                lastName: event.target.lastName.value, 
                email: event.target.email.value, 
                age: event.target.age.value,
                grade: event.target.grade.value
            };

            if (event.target.studentId.value == ''){ 
                this.addStudent(student);
            }else{
                this.editStudent(student);
            }
        }
    }
    
    
    // Render page
    renderStudent(student){
        return (
            <tr className="student" key={student.studentId}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td> 
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>
                    <button className="btnEdit" onClick={() => this.openForm(student, this.state)}>
                        <Icon size={18} icon={pencil} />
                    </button>
                </td>
                <td>
                    <button className="btnDelete" onClick={() => this.deleteStudent(student)}>
                        <Icon size={18} icon={cancelCircle} />
                    </button>
                </td>
            </tr>
        );
    }
     
    renderRows(){
        var rows: JSX.Element[] = [];
        var students = this.state.students;
        if(students != null || students != undefined){
            for (var i=0; i < students.length; i++) {
                rows.push(this.renderStudent(students[i]));
            }
        }
        return rows;
    }

    renderInputs(studentId,firstName,lastName,email,age,grade){
        return(
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="hidden" name="studentId" defaultValue={studentId} />
                <label>First Name</label>
                <input type="text" id="firstName" required defaultValue={firstName} />
                <label>Last Name</label>
                <input type="text" id="lastName" required defaultValue={lastName} />
                <label>Email</label>
                <input type="email" id="email" required defaultValue={email} /> 
                <label>Age</label>
                <input type="number" id="age" required defaultValue={age} />
                <label>Grade</label>
                <input type="number" id="grade" required defaultValue={grade} />
                <input type="submit" value="Submit" />
            </form>
        );
    }

    renderForm(state){
        var s = state.selectedStudent;
        var title = '';
        var inputs;
        if(s != null && s != undefined){
            title = 'Edit Student';
            inputs = this.renderInputs(s.studentId, s.firstName, s.lastName, s.email, s.age, s.grade);
        }else{
            title = 'Add Student';
            inputs = this.renderInputs("","","","","","");
        }   
        
        return (
            <div className="formBackground">
                <div className="formView">
                    <p> 
                        <button className="btnClose" onClick={() => this.closeForm()}>
                            <Icon size={18} icon={cross} />
                        </button>
                    </p>
                    <h2 className="formHeader">{title}</h2>
                    <hr /> 
                    { inputs }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Icon className="brand" size={24} icon={ic_school} />
                        <div className="brandSpan">Student Connect</div>
                    </li>
                </ul>
                <div className="homeContainer">
                    <div className="listView">    
                        <h2>Student List</h2>    
                        <table>
                            <thead>
                            <tr>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Email</td>
                                <td>Age</td>
                                <td>Grade</td>
                                <td></td>
                                <td></td>
                            </tr>
                            </thead>
                            <tbody>{ this.renderRows() }</tbody>
                        </table>
                        <input type="button" className="btnAdd" value="Add Student" 
                        onClick={() => this.openForm(null,this.state)} />
                    </div>
                    { this.IsFormVisible(this.state) ? this.renderForm(this.state) : null }
                </div>
            </div>
        );
    } 
}


/*
-----------------------------------------------------------------------------------------
Exports
-----------------------------------------------------------------------------------------
*/

export default Home;

