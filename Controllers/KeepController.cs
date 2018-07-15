using Microsoft.AspNetCore.Mvc;
using keepr.Repositories;
using keepr.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace keepr.Controllers
{
  [Route("api/[controller]")]
  public class KeepController : Controller
  {
    private readonly KeepRepository _db;
    public KeepController(KeepRepository repo)
    {
      _db = repo;  
    }
    [HttpPost]
    [Authorize]
    public Keep CreateKeep([FromBody]Keep newKeep)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newKeep.AuthorId = user.Identity.Name;
        return _db.CreateKeep(newKeep);
      }
      return null;
    }
    //get all posts
    [HttpGet]
    public IEnumerable<Keep> GetAll()
    {
      return _db.GetAll();
    }
    //get post by id
    [HttpGet("{id}")]
    public Keep GetById(int id)
    {
      return _db.GetbyKeepId(id);
    }
    //get post by author
    [HttpGet("author/{id}")]
    
    public IEnumerable<Keep> GetByAuthorId(string id)
    {
      return _db.GetbyAuthorId(id);
    }
    //edit keep
    [HttpPut("{id}")]
    public Keep EditKeep(int id, [FromBody]Keep newKeep)
    {
      return _db.EditKeep(id, newKeep);
    }

    //delete keep
    [HttpDelete("{id}")]
        [Authorize]
        public string DeleteKeep(int id)
        {
            var user = HttpContext.User.Identity.Name;
            bool delete = _db.DeleteKeep(id);
            if (delete)
            {
                return "This Has Been Successfully Deleted!";
            }
            return "Error Occurred!";
        }
  }
}