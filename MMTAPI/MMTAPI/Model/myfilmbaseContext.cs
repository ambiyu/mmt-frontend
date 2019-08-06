using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MMTAPI.Model
{
    public partial class myfilmbaseContext : DbContext
    {
        public myfilmbaseContext()
        {
        }

        public myfilmbaseContext(DbContextOptions<myfilmbaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Movie> Movie { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<UserFavourites> UserFavourites { get; set; }
        public virtual DbSet<UserTrackings> UserTrackings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:filmdatabase.database.windows.net,1433;Initial Catalog=myfilmbase;Persist Security Info=False;User ID=andy;Password=Ayylmao123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Movie>(entity =>
            {
                entity.Property(e => e.MediaType).IsUnicode(false);

                entity.Property(e => e.Overview).IsUnicode(false);

                entity.Property(e => e.ReleaseDate).IsUnicode(false);

                entity.Property(e => e.ReleaseYear).IsUnicode(false);

                entity.Property(e => e.Status).IsUnicode(false);

                entity.Property(e => e.Title).IsUnicode(false);
            });

            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__Person__B9BE370FB7DBC69A");

                entity.Property(e => e.UserId).ValueGeneratedNever();

                entity.Property(e => e.Name).IsUnicode(false);
            });

            modelBuilder.Entity<UserFavourites>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK__UserFavo__93DBE7F2C56B9ADC");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<UserTrackings>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK__UserTrac__7AC3E9AEB1789248");

                entity.Property(e => e.Id).ValueGeneratedNever();
            });
        }
    }
}
