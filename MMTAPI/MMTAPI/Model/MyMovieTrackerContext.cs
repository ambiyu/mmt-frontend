using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MMTAPI.Model
{
    public partial class MyMovieTrackerContext : DbContext
    {
        public MyMovieTrackerContext()
        {
        }

        public MyMovieTrackerContext(DbContextOptions<MyMovieTrackerContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Media> Media { get; set; }
        public virtual DbSet<UserFavourites> UserFavourites { get; set; }
        public virtual DbSet<UserWatchlist> UserWatchlist { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:mymovietracker.database.windows.net,1433;Initial Catalog=MyMovieTracker;Persist Security Info=False;User ID=andy;Password=Ayylmao123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Media>(entity =>
            {
                entity.HasKey(e => new { e.MediaType, e.MediaId });

                entity.Property(e => e.MediaType).IsUnicode(false);

                entity.Property(e => e.Overview).IsUnicode(false);

                entity.Property(e => e.PosterPath).IsUnicode(false);

                entity.Property(e => e.ReleaseDate).IsUnicode(false);

                entity.Property(e => e.ReleaseYear).IsUnicode(false);

                entity.Property(e => e.Status).IsUnicode(false);

                entity.Property(e => e.Title).IsUnicode(false);
            });

            modelBuilder.Entity<UserFavourites>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.MediaType, e.MediaId });

                entity.Property(e => e.MediaType).IsUnicode(false);
            });

            modelBuilder.Entity<UserWatchlist>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.MediaType, e.MediaId });

                entity.Property(e => e.MediaType).IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK__Users__B9BE370FFF1F88C1");

                entity.Property(e => e.Username).IsUnicode(false);
            });
        }
    }
}
