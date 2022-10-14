
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Accusys.Uniweb2.Basics.Services;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/mep")]
    public class DemoController : ControllerBase
    {
        private readonly IContextManager _uniWebManager;
        private readonly AppDbContext context;

        public DemoController(AppDbContext context, IContextManager uniContext)
        {
            this.context = context;
            this._uniWebManager = uniContext;
        }

        [HttpGet("demo")]
        public async Task<ActionResult<List<Demo>>> Get()
        {
            return await context.Demo.ToListAsync();
        }

        [HttpGet("demo/{text}")] 
        public async Task<ActionResult<List<Demo>>> Get(string text)
        {

            var registro = context.Demo.Where(x => x.Value.Contains(text)).ToList();
            if (registro == null)
            {
                return NotFound();
            }
            return registro;
        }

        [HttpPost]
        public async Task<ActionResult> Post(Demo newCase)
        {
            newCase.Value = newCase.Value.ToUpper();
            context.Add(newCase);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(Demo newCase, int id)
        {
            if (newCase.Id != id)
            {
                return BadRequest("Id incorrecto.");
            }

            var originalCase = await context.Demo.FirstOrDefaultAsync(x => x.Id == id);

            if (newCase.Value != ""){ 
                originalCase.Value = newCase.Value.ToUpper(); 
            }


            context.Update(originalCase);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var existe = await context.Demo.AnyAsync(x => x.Id == id);

            if (!existe)
            {
                return NotFound();
            }

            context.Remove(new Demo() { Id = id });
            await context.SaveChangesAsync();
            return Ok();
        }
    }
}
