using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MMTAPI.Model
{
    public partial class UserWatchlist
    {
        [Column("user_id")]
        [JsonProperty(PropertyName = "user_id")]
        public int UserId { get; set; }
        [Column("media_type")]
        [JsonProperty(PropertyName = "media_type")]
        [StringLength(5)]
        public string MediaType { get; set; }
        [Column("media_id")]
        [JsonProperty(PropertyName = "media_id")]
        public int MediaId { get; set; }

    }
}
