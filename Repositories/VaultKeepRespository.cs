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
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaultKeeps (vaultId, keepId, authorId)
                VALUES (@VaultId, @KeepId, @AuthorId);
                SELECT LAST_INSERT_ID();
            ", newVaultKeep);
      newVaultKeep.Id = id;
      return newVaultKeep;
    }
    // // GetAll Vault
    // public IEnumerable<Vault> GetAll()
    // {
    //   return _db.Query<Vault>("SELECT * FROM vaults;");
    // }
    // GetbyAuthor
    public IEnumerable<VaultKeep> GetbyAuthorId(string id)
    {
      return _db.Query<VaultKeep>("SELECT * FROM vaultKeeps WHERE authorId = @id;", new { id });
    }
    // GetbyId
    public IEnumerable<VaultKeep> GetbyVaultKeepId(int id)
    {
      return _db.Query<VaultKeep>("SELECT * FROM vaultKeeps WHERE id = @id;", new { id });
    }
    // Edit
    public VaultKeep EditVaultKeep(int id, VaultKeep vaultKeep)
    {
      vaultKeep.Id = id;
      var i = _db.Execute(@"
                UPDATE vaultKeeps SET
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
    public bool DeleteVaultKeep(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM vaultKeeps
      WHERE id = @id
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
