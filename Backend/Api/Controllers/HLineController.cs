
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Accusys.Uniweb2.Basics.Services;
using Backend.Models;
using Backend.Globals;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/h")]
    public class HLineController
    {
        [HttpGet("testh")]
        public string Get()
        {
            ModGlb.Query = @"select * from Demo";
            return Method.exec(ModGlb.Query);
        }
    }
}
