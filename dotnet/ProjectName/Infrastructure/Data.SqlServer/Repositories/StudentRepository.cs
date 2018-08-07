using System.Collections.Generic;
using System.Linq;
using ProjectName.Business.Core.Interfaces;
using ProjectName.Business.Core.Interfaces.Data;
using ProjectName.Business.Core.Models;
using Microsoft.EntityFrameworkCore;


namespace Data.SqlServer.Repositories
{
    public class StudentRepository : IStudentRepository
	{
        StudentContext context = new StudentContext();

        public void Add(Student s)
        {
            context.Student.Add(s);
            context.SaveChanges(); 
        }

        public void Edit(Student s)
        {
            Student studentToUpdate = context.Student.FirstOrDefault(x => x.StudentId == s.StudentId);
            if (studentToUpdate != null)
            {
                studentToUpdate.FirstName = s.FirstName;
                studentToUpdate.LastName = s.LastName;
                studentToUpdate.Email = s.Email;
                studentToUpdate.Age = s.Age;
                studentToUpdate.Grade = s.Grade;
            }
            context.SaveChanges();
        }

        public void Remove(int studentId)
        {
            Student s = context.Student.Find(studentId);
            context.Student.Remove(s);
            context.SaveChanges();
        }
 
        public IEnumerable<Student> GetStudents()
        {
            return context.Student;
        }

        public Student FindById(int studentId)
        {
            var student = (from s in context.Student where s.StudentId == studentId select s).FirstOrDefault();
            return student; 
            return null;
        }
    }
}