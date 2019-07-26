using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MMTAPI.Model
{
    public partial class Person
    {
        [Column("user_id")]
        public int UserId { get; set; }
        [Column("name")]
        [StringLength(31)]
        public string Name { get; set; }
    }
}
