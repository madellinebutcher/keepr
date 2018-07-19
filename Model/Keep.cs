namespace keepr.Models{

public class Keep
{
public int Id { get; set; }
public string Name { get; set; }
public string Description { get; set; }

public string Img { get ;set; }

public int Views { get; set; }

public int Keeps { get; set; } = 0;

public int Public { get; set; }

public string AuthorId { get; set; }

}




}