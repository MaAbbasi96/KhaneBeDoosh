package codes.models;
import java.util.*;
import codes.models.Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class RealEstateUser extends MyUser{
    private String URL;
    private String expTime;

    public RealEstateUser(String name, String url, int id){
        this.name = name;
        this.URL = url;
        this.id = id;
        this.expTime = "";
        this.isSaved = false;
    }

    public RealEstateUser(int id){
        this.id = id;
        this.isSaved = true;
        Connection connection = null;
        try
        {
            connection = DataBase.getConnection();
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);  // set timeout to 30 sec.

            ResultSet rs = statement.executeQuery(String.format("select * from realEstateUser where userId = %d",this.id));
            while(rs.next())
            {
                this.URL = rs.getString("url");
                this.expTime = rs.getString("expTime");
            }

            ResultSet rs1 = statement.executeQuery(String.format("select * from user where id = %d",this.id));
            while(rs1.next())
            {
                this.name = rs1.getString("name");
            }
        }
        catch(SQLException e){}
        finally
        {
            try{
                if(connection != null)
                    connection.close();
            }
            catch(SQLException e){}
        }
    }

    public void updateExpTime(String expTime){
        try{
            ArrayList<String> atts = new ArrayList<String>();
            atts.add(expTime);
            executeUpdate(String.format("update realEstateUser set expTime = ? where userId = %d", this.id), atts);
        }catch(SQLException e){}
    }

    public void save(){
        ArrayList<String> atts = new ArrayList<String>();
        atts.add(this.name);
        ArrayList<String> atts2 = new ArrayList<String>();
        atts.add(this.URL);
        atts.add(this.expTime);
        ArrayList<String> atts3 = new ArrayList<String>();
        atts.add(this.URL);
        if(!this.isSaved){
            try{
                executeUpdate(String.format("insert into user values(%d, ?)", this.id), atts);
                executeUpdate(String.format("insert into realEstateUser values(%d, ?, ?)", this.id), atts2);
            }catch(SQLException e){}
        }
        else{
            try{
                executeUpdate(String.format("update user set name = ? where id = %d", this.id), atts);
                executeUpdate(String.format("update realEstateUser set url = ? where userId = %d", this.id), atts3);
            }catch(SQLException e){}
        }
    }

    @Override
    public int getServerNum(){
        return 1;
    }

    @Override
    public int getCredit(){
        return 0;
    }

    @Override
    public String getName(){
        return "Real Estate User 1";
    }

    public String getURL(){
        return this.URL;
    }


}
