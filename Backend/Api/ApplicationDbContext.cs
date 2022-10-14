using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Api
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Demo> Demo { get; set; }


    }
}
