using System.Collections.Generic;
using System.Data;
using keepr.Models;
using Dapper;

namespace keepr.Repositories
{
  public class VaultRepository : DbContext
  {
    public VaultRepository(IDbConnection db) : base(db)
    {

    }
    // Create Vault
    public Vault CreateVault(Vault newVault)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaults (name, description, authorId)
                VALUES (@Name, @Description, @AuthorId);
                SELECT LAST_INSERT_ID();
            ", newVault);
      newVault.Id = id;
      return newVault;
    }
    // GetAll Vault
    public IEnumerable<Vault> GetAll()
    {
      return _db.Query<Vault>("SELECT * FROM vaults;");
    }
    // GetbyAuthor
    public IEnumerable<Vault> GetbyAuthorId(int id)
    {
      return _db.Query<Vault>("SELECT * FROM keeps WHERE authorId = @id;", new { id });
    }
    // GetbyId
    public Vault GetbyVaultId(int id)
    {
      return _db.QueryFirstOrDefault<Vault>("SELECT * FROM vaults WHERE id = @id;", new { id });
    }
    // Edit
    public Vault EditVault(int id, Vault vault)
    {
      vault.Id = id;
      var i = _db.Execute(@"
                UPDATE vaults SET
                    name = @Name,
                    description = @Description
                WHERE id = @Id
            ", vault);
      if (i > 0)
      {
        return vault;
      }
      return null;
    }
    // Delete
    public bool DeleteVault(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM posts
      WHERE id = @id
      AND authorId = @authorId
      LIMIT 1;
      ", new { id });
      if (i > 0)
      {
        return true;
      }
      return false;
    }

    // Add get user favs to user
  }





}
