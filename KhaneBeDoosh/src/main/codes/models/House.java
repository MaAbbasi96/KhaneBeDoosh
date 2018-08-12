package codes.models;

import java.util.*;
import codes.models.Config;
import codes.models.Model;
import codes.models.Utils;
import codes.models.IndividualUser;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class House extends Model{
    public static final int SELL = 0;
    public static final int RENT = 1;

    private MyUser user;
    private int userId;
    private String id;
    private int area;
    private String buildingType;
    private String address;
    private String imageURL;
    private int dealType;
    private int basePrice;
    private int rentPrice;
    private int sellPrice;
    private String phone;
    private String description;
    private Date expireTime;

    public House(String id, String buildingType, int area, int dealType, int basePrice,
                int rentPrice, int sellPrice, String address, String phone, String description, MyUser user){
        this.id = id;
        this.buildingType = buildingType;
        this.area = area;
        this.dealType = dealType;
        this.rentPrice = dealType == RENT ? rentPrice : 0;
        this.sellPrice = dealType == SELL ? sellPrice : 0;
        this.basePrice = dealType == RENT ? basePrice : 0;
        this.address = address;
        this.phone = phone;
        this.description = description;
        this.user = user;
        this.userId = user.getId();
        this.imageURL = Config.noPicURL;
        this.isSaved = false;
    }

    public House(String id){
        this.id = id;
        this.isSaved = true;
        this.user = null;

        Connection connection = null;
        try
        {
            connection = DataBase.getConnection();
            PreparedStatement statement = connection.prepareStatement("select * from house where id = ?");
            statement.setQueryTimeout(30);  // set timeout to 30 sec.
            statement.setString(1, this.id);

            ResultSet rs = statement.executeQuery();
            while(rs.next())
            {
                this.buildingType = rs.getString("buildingType");
                this.area = rs.getInt("area");
                this.dealType = rs.getInt("dealType");
                this.rentPrice = rs.getInt("rentPrice");
                this.sellPrice = rs.getInt("sellPrice");
                this.basePrice = rs.getInt("basePrice");
                this.address = rs.getString("address");
                this.phone = rs.getString("phone");
                this.description = rs.getString("description");
                this.userId = rs.getInt("userId");
                this.imageURL = rs.getString("imageURL");
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

    public static int getMaxIndex(){
        int maxIndex = -1;
        Connection connection = null;
        try
        {
            connection = DataBase.getConnection();
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);  // set timeout to 30 sec.

            ResultSet rs = statement.executeQuery("select MAX(id) from house where userId in (select userId from individualUser)");
            while(rs.next())
            {
                maxIndex = rs.getInt(1);
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
        return maxIndex;
    }
    
    public void save(){
        if(!this.isSaved){
            try{
                ArrayList<String> atts = new ArrayList<String>();
                atts.add(this.id);
                atts.add(this.buildingType);
                atts.add(this.address);
                atts.add(this.imageURL);
                atts.add(this.phone);
                atts.add(this.description);
                executeUpdate(String.format("insert into house values(?, %d, %d, ?, ?, ?, %d, %d, %d, %d, ?, ?)", this.userId, this.area, this.dealType , this.basePrice, this.sellPrice, this.rentPrice), atts);
            }catch(SQLException e){}
        }
    }


    public int getSellPrice(){
        return this.sellPrice;
    }

    public int getDealType(){
        return this.dealType;
    }
    
    public int getRentPrice(){
        return this.rentPrice;
    }

    public int getBasePrice(){
        return this.basePrice;
    }

    public int getArea(){
        return this.area;
    }

    public String getImageURL(){
        return Utils.makeLinkURL(this.imageURL);
    }

    public String getId(){
        return id;
    }

    public int getServerNum(){
        if(this.user == null){
            this.user = new IndividualUser(this.userId);
        }
        return this.user.getServerNum();
    }

    public String getBuildingType(){
        return Utils.translateBuildingType(this.buildingType);
    }

    public String getAddress(){
        return this.address;
    }

    public String getDescription(){
        return this.description;
    }

    public String getPhone(){
        return phone;
    }

    public JSONObject getEarlyJSONInfo(){
        JSONObject obj = new JSONObject();
        JSONObject price = new JSONObject();
        if(dealType == SELL){
            price.put("sellPrice", ""+this.sellPrice);
            obj.put("dealType", 0);
        }
        else{
            price.put("basePrice", ""+this.basePrice);
            price.put("rentPrice", ""+this.rentPrice);
            obj.put("dealType", 1);
        }
        obj.put("price",price);
        obj.put("area", this.area);
        obj.put("imageURL", this.getImageURL());
        obj.put("id", this.id);
        obj.put("serverNum", ""+this.userId);
        obj.put("address", this.address);
        obj.put("buildingType", this.buildingType);
        return obj;
    }

    public JSONObject getCompleteJSONInfo(){
        JSONObject obj = new JSONObject();
        JSONObject price = new JSONObject();
        obj.put("area", this.area);
        obj.put("buildingType", this.buildingType);
        obj.put("address", this.address);
        obj.put("description", this.description);
        obj.put("imageURL", this.getImageURL());

        if(this.dealType == SELL){
            price.put("sellPrice", this.sellPrice);
            obj.put("dealType", 0);
            price.put("basePrice", 0);
            price.put("rentPrice", 0);
        }
        else{
            price.put("basePrice", this.basePrice);
            price.put("rentPrice", this.rentPrice);
            obj.put("dealType", 1);
            price.put("sellPrice", 0);
        }
        obj.put("price", price);
        obj.put("id",this.id);
        obj.put("serverNum", ""+this.userId);
        obj.put("phone", this.phone);
        obj.put("expireTime", ""+this.expireTime);
        return obj;
    }
}
