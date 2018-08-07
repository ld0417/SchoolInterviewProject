using ProjectName.Business.Core.Models.Entities;
using System;

namespace ProjectName.Business.Core.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public int Grade { get; set; }
    } 
}