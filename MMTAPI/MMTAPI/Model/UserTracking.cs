using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MMTAPI.Model
{
    public partial class UserTracking
    {
        [Column("tracking_id")]
        public int TrackingId { get; set; }
        [Required]
        [Column("user_id")]
        public int? UserId { get; set; }
        [Required]
        [Column("media_id")]
        public int? MediaId { get; set; }
        [Required]
        [Column("media_type")]
        [StringLength(5)]
        public string MediaType { get; set; }
    }
}
