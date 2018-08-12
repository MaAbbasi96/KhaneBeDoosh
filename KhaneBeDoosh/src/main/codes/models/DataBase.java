package codes.models;
import java.util.*;

import javax.security.auth.login.LoginException;

import codes.models.Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import codes.models.DecreaseCreditException;
import codes.models.IndividualUser;
import codes.models.RealEstateUser;
import org.apache.commons.dbcp.BasicDataSource;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class DataBase{
    private static ArrayList<IndividualUser> users;
    private static ArrayList<RealEstateUser> firms;
    private static BasicDataSource source = new org.apache.commons.dbcp.BasicDataSource();
    private static int houseIdCount;

    static {
        users = new ArrayList<IndividualUser>();
        firms = new ArrayList<RealEstateUser>();
        source.setDriverClassName("org.sqlite.JDBC");
        source.setUrl(Config.sqliteFile);
        source.setMinIdle(5);
        source.setMaxIdle(10);
        source.setMaxOpenPreparedStatements(100);
        users.add(new IndividualUser("بهنام همایون","behnam","123","09122222222","Yes",0,0));
        firms.add(new RealEstateUser("ACM", "http://139.59.151.5:6664/khaneBeDoosh/v2/house",1));
        createDatabase();
    }

    public static Connection getConnection() throws SQLException{
        return source.getConnection();
    }

    public static void createDatabase(){
        boolean firstTime = true;
        Connection connection = null;
        try{
            connection = getConnection();
            Statement statement = connection.createStatement();
            statement.executeUpdate("PRAGMA foreign_keys = ON");
            statement.executeUpdate("create table user(id integer primary key, name string)");
            statement.executeUpdate("create table realEstateUser(userId integer primary key, url string, expTime string, foreign key(userId) references user(id) on delete cascade)");
            statement.executeUpdate("create table individualUser(userId integer primary key, username string unique, password string, phone string, balance integer, isAdmin integer, foreign key(userId) references user(id) on delete cascade)");
            statement.executeUpdate("create table house(id string primary key, userId integer, area integer, buildingType string, address string, imageURL string, dealType integer, basePrice integer, sellPrice integer, rentPrice Integer, phone string, description string, foreign key(userId) references user(id) on delete cascade)");
            statement.executeUpdate("create table payFor(userId integer, houseId string,serverNum integer, foreign key(userId) references user(id) on delete cascade, foreign key(houseId) references house(id), primary key(userId, houseId, serverNum))");
        }
        catch(SQLException e){
            firstTime = false;
        }
        finally{
            if(connection != null)
                try{
                    connection.close();
                }
                catch(SQLException e){   
                }
            if(firstTime){
                firms.get(0).save();
                users.get(0).save();
            }
            users.set(0, new IndividualUser(users.get(0).getId()));
            firms.set(0, new RealEstateUser(firms.get(0).getId()));
        }
    }

    public static void addHouse(String buildingType, int area, int dealType,
                int basePrice, int rentPrice, int sellPrice, String address, String phone, String description){
        House newHouse = new House((""+(House.getMaxIndex()+1)), buildingType, area, dealType,
                basePrice, rentPrice, sellPrice, address, phone, description, users.get(0));
        newHouse.save();
    }

    public static boolean addIndividualUser(String name, String username, String password, String phone, String isAdmin, int balance){
        IndividualUser user = new IndividualUser(name, username, password, phone, isAdmin, balance, IndividualUser.getMaxIndex()+1);
        return user.save();
    }

    // public static void addRealEstimateUser(String name, String URL){
    //     firms.add(new RealEstateUser(name, URL, 0));
    // }

    public static String getServerURL(int serverNums){
        for (RealEstateUser firm: firms){
            if(firm.getId() == serverNums)
            return firm.getURL();
        }
        return "";
    }

    public static ArrayList<House> getHouses(String areaLimit,String buildingType, String dealType, String maxPrice){ //TODO: check time ...
        ArrayList<House> houses = new ArrayList<House>();
        Connection connection = null;
        try
        {
            connection = DataBase.getConnection();
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);  // set timeout to 30 sec.

            int cnt_condition = 0;
            String where = " where";
            if(!areaLimit.equals("")){
                if(cnt_condition > 0)
                    where += " and";
                where += " area >="+ areaLimit;
                cnt_condition ++;
            }

            if(!buildingType.equals("")){
                if(cnt_condition > 0)
                    where += " and";
                where += " buildingType ='"+ buildingType + "'";
                cnt_condition ++;
            }

            if(!dealType.equals("")){
                if(cnt_condition > 0)
                    where += " and";
                where += " dealType ="+ dealType;
                cnt_condition ++;
            }

            if(!maxPrice.equals("")){
                if(cnt_condition > 0)
                    where += " and";
                where += " sellPrice <="+ maxPrice + " or rentPrice <="+ maxPrice;
                cnt_condition ++;
            }

            String query = "select id from house"; 
            if(cnt_condition != 0)
                query += where;

            ResultSet rs = statement.executeQuery(query);
            while(rs.next())
            {
                houses.add(new House(rs.getString("id")));
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
        return houses;
    }

    public static void addCredit(IndividualUser user, int value){
        user.addCredit(value);
        user.save();
    }

    public static JSONObject getHouses(IndividualUser user){
        JSONObject result = new JSONObject();
        String query = "select u.username AS username, p.houseId AS houseId from individualUser u, payFor p where u.userId = p.userId";
        if(!user.isAdmin())
            query += " and p.userId = " + user.getId();
        Connection connection = null;
        try{
            connection = getConnection();
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery(query);
            while(rs.next())
            {
                result.append(rs.getString("username"), rs.getString("houseId"));
            }
        }
        catch(SQLException e){
        }
        finally{
            if(connection != null)
                try{
                    connection.close();
                }
                catch(SQLException e){  
                }
        }
        return result;
    }

    public static boolean checkPay(IndividualUser user, String houseId, int serverNum){
        return user.checkPay(houseId, serverNum);
    }

    public static boolean haveCredit(IndividualUser user, int value){
        return user.haveCredit(value);
    }

    public static void payForHouse(IndividualUser user, String houseId, int serverNum, int value) throws DecreaseCreditException, PayBeforeException{
        user.payForHouse(houseId, serverNum, value);
    }

    public static RealEstateUser getFirm(int id){
        for(RealEstateUser firm:firms)
            if(firm.getId() == id)
                return firm;
        return null;
    }

    public static IndividualUser getIndividualUser(String username, String password) throws LoginException{
        Connection connection = null;
        int userId = -1;
        try
        {
            String query = "select userId from individualUser where username = ? and password = ?";
            connection = DataBase.getConnection();
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setQueryTimeout(30);  // set timeout to 30 sec.
            statement.setString(1, username);
            statement.setString(2, password);

            ResultSet rs = statement.executeQuery();
            while(rs.next())
            {
                userId = rs.getInt("userId");
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
        if(userId == -1)
            throw new LoginException();
        else
            return new IndividualUser(userId);
    }
}