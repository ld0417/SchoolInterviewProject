using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjectName.Business.Core.Interfaces;
using ProjectName.Business.Core.Models;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        IStudentRepository repo; 

        public HomeController(IStudentRepository studentRepo)
        {
            this.repo = studentRepo; 
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

        // GET: /Home/GetStudents/
        public ActionResult GetStudents()
        {
           return Json(this.repo.GetStudents().ToList()); 
        }

        // POST: /Home/AddStudent/
        [HttpPost]
        public ActionResult AddStudent([FromBody] Student student)
        {
            if (student != null)
            {
                this.repo.Add(student);
                return Json(this.repo.GetStudents().ToList()); 
            }
            else
            {
                return Json("Error"); 
            }
        }
 
        // POST: /Home/EditStudent/
        [HttpPost]
        public ActionResult EditStudent([FromBody] Student student)
        {
            if (student != null)
            {
                this.repo.Edit(student);
                return Json(this.repo.GetStudents().ToList()); 
            }
            else
            {
                return Json("Error"); 
            }
        }

        // POST: /Home/DeleteStudent/
        [HttpPost]        
        public ActionResult DeleteStudent([FromBody] Student student)
        {
            if (student != null)
            {
                Student s = this.repo.FindById(student.StudentId);
                if(s!=null)
                {
                    this.repo.Remove(s.StudentId);
                }
                return Json(this.repo.GetStudents().ToList()); 
            }
            else
            {
                return Json("Error"); 
            }
        }   

    }
}
