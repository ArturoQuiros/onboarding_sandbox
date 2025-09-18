using System;
using Microsoft.EntityFrameworkCore;
using WS_Onboarding.Models;

namespace WS_Onboarding.Data;

public class ApplicatonDBContext : DbContext
{
    public ApplicatonDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
    {

    }
    public DbSet<Company> Company { get; set; }
    public DbSet<Comment> Comment { get; set; }
}
