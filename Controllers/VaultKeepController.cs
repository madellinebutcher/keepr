using Microsoft.AspNetCore.Mvc;
using keepr.Repositories;
using keepr.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace keepr.Controllers
{
  [Route("api/[controller]")]
  public class VaultKeepController : Controller
  {
    private readonly VaultKeepRepository _db;
    public VaultKeepController(VaultKeepRepository repo)
    {
      _db = repo;  
    }
    [HttpPost]
    [Authorize]
    public VaultKeep CreateVaultKeep([FromBody]VaultKeep newVaultKeep)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVaultKeep.AuthorId = user.Identity.Name;
        return _db.CreateVaultKeep(newVaultKeep);
      }
      return null;
    }
    //get all posts
    // [HttpGet]
    // public IEnumerable<Keep> GetAll()
    // {
    //   return _db.GetAll();
    // }
    [HttpGet("vault/{id}")]
    public IEnumerable<Keep> GetByVaultId(int id)
    {
      return _db.GetbyVaultId(id);
    }
    //get post by id
    [HttpGet("{id}")]
    public IEnumerable<Keep> GetById(int id)
    {
      return _db.GetbyVaultKeepId(id);
    }
    //get post by author
    [HttpGet("author/{id}")]
    
    public IEnumerable<Keep> GetByAuthorId(string id)
    {
      return _db.GetbyAuthorId(id);
    }
    //edit keep
    [HttpPut("{id}")]
    public VaultKeep EditVaultKeep(int id, [FromBody]VaultKeep newVaultKeep)

    {
      return _db.EditVaultKeep(id, newVaultKeep);
    }

    //delete keep
    [HttpDelete("{id}")]
        [Authorize]
        public string DeleteVaultKeep(int id, int keepId)
        {
            var user = HttpContext.User.Identity.Name;
            bool delete = _db.DeleteVaultKeep(id, keepId);
            if (delete)
            {
                return "This Has Been Successfully Deleted!";
            }
            return "Error Occurred!";
        }
  }
}