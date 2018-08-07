using Data.SqlServer.Extensions;
using ProjectName.Business.Core.Interfaces.Data;
using ProjectName.Business.Core.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using ProjectName.Business.Core.Models;

namespace Data.SqlServer
{
    public class StudentContext : DataContext, IStudentContext
    {
        #region Properties

        public DbSet<Student> Student { get; set; }

        #endregion

        #region Constructor

        public StudentContext() : base(Configuration.GetConnectionString())
        {
            //Console.WriteLine($"StudentContext () => {Configuration.GetConnectionString()}");
        }

        public StudentContext(string connectionString) : base(connectionString)
        {
            //Console.WriteLine($"StudentContext (string connectionString) => {connectionString}");
        }

        public StudentContext(IConnection connection) : base(connection)
        {
            //Console.WriteLine($"StudentContext (IConnection connection) => {connection.ToString()}");
        }

        #endregion

        #region IStudentContext Implementation

        IQueryable<Student> IStudentContext.Student => Student;

        #endregion

        #region Configure Mappings

        public override void ConfigureMappings(ModelBuilder modelBuilder)
        {
            // base.ConfigureMappings(modelBuilder);
        }

        #endregion
    }
}
