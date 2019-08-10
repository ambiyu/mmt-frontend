using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MMTAPI.Model
{
    public partial class Users
    {
        [Column("user_id")]
        [JsonProperty(PropertyName = "user_id")]
        public int UserId { get; set; }
        [Required]
        [Column("username")]
        [StringLength(30)]
        public string Username { get; set; }
    }
}
