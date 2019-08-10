using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MMTAPI.Model
{
    public partial class Media
    {
        [Column("media_type")]
        [JsonProperty(PropertyName = "media_type")]
        [StringLength(5)]
        public string MediaType { get; set; }
        [Column("media_id")]
        [JsonProperty(PropertyName = "media_id")]
        public int MediaId { get; set; }
        [Required]
        [Column("title")]
        [StringLength(255)]
        public string Title { get; set; }
        [Required]
        [Column("poster_path")]
        [JsonProperty(PropertyName = "poster_path")]
        [StringLength(255)]
        public string PosterPath { get; set; }
        [Required]
        [Column("release_date")]
        [JsonProperty(PropertyName = "release_date")]
        [StringLength(15)]
        public string ReleaseDate { get; set; }
        [Required]
        [JsonProperty(PropertyName = "release_year")]
        [Column("release_year")]
        [StringLength(4)]
        public string ReleaseYear { get; set; }
        [Required]
        [Column("overview")]
        [StringLength(1023)]
        public string Overview { get; set; }
        [Required]
        [Column("status")]
        [StringLength(30)]
        public string Status { get; set; }
    }
}
