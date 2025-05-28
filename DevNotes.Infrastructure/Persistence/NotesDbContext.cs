using DevNotes.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DevNotes.Infrastructure.Persistence
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }
        public DbSet<Tag> Tags { get; set; }

        // Optional: Override OnModelCreating for more config
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Note>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Content).IsRequired();
                entity.Property(e => e.CreatedAt).IsRequired();
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Note>()
                .HasMany(n => n.Tags)
                .WithMany(t => t.Notes)
                .UsingEntity<Dictionary<string, object>>(
                    "NoteTag",
                    j => j.HasOne<Tag>().WithMany().HasForeignKey("TagId").HasConstraintName("FK_NoteTag_TagId").OnDelete(DeleteBehavior.Cascade),
                    j => j.HasOne<Note>().WithMany().HasForeignKey("NoteId").HasConstraintName("FK_NoteTag_NoteId").OnDelete(DeleteBehavior.Cascade),
                    j =>
                    {
                        j.HasKey("NoteId", "TagId");
                        j.ToTable("NoteTags");
                    });
        }
    }
}
