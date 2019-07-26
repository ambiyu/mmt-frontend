using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MMTAPI.Model
{
    public partial class Movie
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("media_id")]
        public int MediaId { get; set; }
        [Required]
        [Column("media_type")]
        [StringLength(5)]
        public string MediaType { get; set; }
        [Required]
        [Column("title")]
        [StringLength(255)]
        public string Title { get; set; }
        [Required]
        [Column("release_date")]
        [StringLength(15)]
        public string ReleaseDate { get; set; }
        [Required]
        [Column("release_year")]
        [StringLength(4)]
        public string ReleaseYear { get; set; }
        [Required]
        [Column("overview")]
        [StringLength(1023)]
        public string Overview { get; set; }
        [Required]
        [Column("status")]
        [StringLength(15)]
        public string Status { get; set; }
    }
}
