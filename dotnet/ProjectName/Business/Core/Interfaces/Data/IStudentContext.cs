using System.Linq;
using ProjectName.Business.Core.Models;

namespace ProjectName.Business.Core.Interfaces.Data
{
    public interface IStudentContext : IDataContext
    {
        IQueryable<Student> Student { get; }
    }
}
