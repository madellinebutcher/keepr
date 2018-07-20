using System.Collections.Generic;
using System.Data;
using keepr.Models;
using Dapper;

namespace keepr.Repositories
{
  public class VaultKeepRepository : DbContext
  {
    public VaultKeepRepository(IDbConnection db) : base(db)
    {

    }
    // Create Vault
    public VaultKeep CreateVaultKeep(VaultKeep newVaultKeep)
    {
        var k = _db.Execute(@"
                UPDATE keeps SET
                keeps = keeps + 1
                WHERE id = @KeepId;",
                newVaultKeep);
        if (k > 0)
        {
        int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaultkeeps (vaultId, keepId, authorId)
                VALUES (@VaultId, @KeepId, @AuthorId);
                SELECT LAST_INSERT_ID();
            ", newVaultKeep);
      newVaultKeep.Id = id;
      return newVaultKeep;
      }
        return null;
    }
    // // GetAll Vault
    // public IEnumerable<Vault> GetAll()
    // {
    //   return _db.Query<Vault>("SELECT * FROM vaults;");
    // }
    // GetbyAuthor
    public IEnumerable<Keep> GetbyAuthorId(string id)
    {
      return _db.Query<Keep>(@"SELECT * FROM vaultkeeps
                    INNER JOIN keeps on keeps.id = vaultkeeps.keepId 
                    WHERE vaultkeeps.authorId = @id;", new { id });
    }
    // GetbyId
    public IEnumerable<Keep> GetbyVaultKeepId(int id)
    {
      return _db.Query<Keep>(@"SELECT * FROM vaultkeeps 
                    INNER JOIN keeps on keeps.id = vaultkeeps.keepId
                    WHERE vaultkeeps.id = @id;", new { id });
    }

     public IEnumerable<Keep> GetbyVaultId(int id)
    {
      return _db.Query<Keep>(@"SELECT * FROM vaultkeeps 
                    INNER JOIN keeps on keeps.id = vaultkeeps.keepId
                    WHERE vaultkeeps.vaultId = @id;", new { id });
    }
    // Edit
    public VaultKeep EditVaultKeep(int id, VaultKeep vaultKeep)
    {
      vaultKeep.Id = id;
      var i = _db.Execute(@"
                UPDATE vaultkeeps SET
                    vaultId = @VaultId,
                    keepId = @KeepId
                WHERE id = @Id
            ", vaultKeep);
      if (i > 0)
      {
        return vaultKeep;
      }
      return null;
    }
    // Delete
    public bool DeleteVaultKeep(int id, int keepId)
    {
      var i = _db.Execute(@"
      DELETE FROM vaultkeeps
      WHERE id = @id
      LIMIT 1;
      ", new { id });
      if (i > 0)
      {
        var num = _db.Execute(@"
            UPDATE keeps SET
                keeps = keeps -1
                WHERE id = @Id;",
                new {id});
                return num > 0;
      }
      return false;
    }

    // Add get user favs to user
  }





}
