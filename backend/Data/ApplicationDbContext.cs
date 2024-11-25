using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.AspNetCore.Identity;
using ReserveBite.Api.Models;
using IdentityUser = Microsoft.AspNetCore.Identity.IdentityUser;

namespace ReserveBite.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() { }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Restaurant> Restaurants { get; set; }
    }
}
