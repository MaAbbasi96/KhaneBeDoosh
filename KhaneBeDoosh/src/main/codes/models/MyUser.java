package codes.models;
import java.util.*;
import codes.models.Model;

public abstract class MyUser extends Model{
    protected String name;
    protected int id;

    public abstract int getServerNum();

    public abstract int getCredit();
    
    public abstract String getName();

    public int getId(){
        return id;
    }
}
