using System.Collections.Generic;
using ProjectName.Business.Core.Models;

namespace ProjectName.Business.Core.Interfaces
{
    public interface IStudentRepository
    {
        void Add(Student s);
        void Edit(Student s);
        void Remove(int studentId);
        IEnumerable<Student> GetStudents();
        Student FindById(int studentId);
    }
}