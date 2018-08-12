package codes.models;
import java.util.*;
import codes.models.Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import codes.models.DecreaseCreditException;
import codes.models.PayBeforeException;

public class IndividualUser extends MyUser{
    private String username;
    private String password;
    private String phone;
    private int balance;
    private Set<String> payedFor;
    private int isAdmin;

    public IndividualUser(String name, String username, String password, String phone, String isAdmin, int balance, int id){
        this.name = name;
        this.id = id;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.balance = balance;
        this.payedFor = new HashSet<String>();
        this.isSaved = false;
        this.isAdmin = isAdmin.equals("Yes") ? 1 : 0;
    }

    public IndividualUser(int id){
        this.id = id;
        this.isSaved = true;
        this.payedFor = new HashSet<String>();
        Connection connection = null;
        try
        {
            connection = DataBase.getConnection();
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);  // set timeout to 30 sec.

            ResultSet rs = statement.executeQuery(String.format("select * from individualUser where userId = %d",this.id));
            while(rs.next())
            {
                this.username = rs.getString("username");
                this.password = rs.getString("password");
                this.phone = rs.getString("phone");
                this.balance = rs.getInt("balance");
                this.isAdmin = rs.getInt("isAdmin");
            }

            ResultSet rs1 = statement.executeQuery(String.format("select name from user where id = %d",this.id));
            while(rs1.next())
            {
                this.name = rs1.getString("name");
            }

            ResultSet rs2 = statement.executeQuery(String.format("select * from payFor where userId = %d",this.id));
            while(rs2.next()){
                this.payedFor.add(""+rs.getInt("serverNum")+rs2.getString("houseId"));
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

    public boolean save(){
        ArrayList<String> atts = new ArrayList<String>();
        ArrayList<String> atts2 = new ArrayList<String>();
        atts.add(this.name);
        atts2.add(this.username);
        atts2.add(this.password);
        atts2.add(this.phone);
        if(!this.isSaved){
            try{
                executeUpdate(String.format("insert into user values(%d, ?)", this.id), atts);
                executeUpdate(String.format("insert into individualUser values(%d, ?, ?, ?, %d, %d)", this.id, this.balance, this.isAdmin), atts2);
            }catch(SQLException e){
                try{executeUpdate(String.format("delete from user where id = %d", this.id), new ArrayList<String>());}
                catch(SQLException ex){}
                return false;
            }
        }
        else{
            try{
                executeUpdate(String.format("update user set name = ? where id = %d", this.id), atts);
                executeUpdate(String.format("update individualUser set username = ?, password = ?, phone = ?, balance = %d where userId = %d", this.balance, this.id), atts2);
            }catch(SQLException e){
                return false;
            }
        }
        return true;
    }

    @Override
    public int getServerNum(){
        return 0;
    }

    public void addCredit(int value){
        balance += value;
    }

    private void decreaseCredit(int value){
        this.balance -= value;
    }

    public int getCredit(){
        return this.balance;
    }

    @Override
    public String getName(){
        return this.name;
    }

    public String getUserName(){
        return this.username;
    }

    public boolean haveCredit(int value){
        return this.balance - value >= 0;
    } 

    public boolean isAdmin(){
        return this.isAdmin == 1 ? true : false;
    }

    public void payForHouse(String houseId, int serverNum, int value) throws DecreaseCreditException, PayBeforeException{
        if(!this.haveCredit(value))
            throw new DecreaseCreditException();
        if(this.checkPay(houseId, serverNum))
            throw new PayBeforeException();
        this.payedFor.add(""+serverNum+houseId);
        try{
            ArrayList<String> atts =  new ArrayList<String>();
            atts.add(houseId);
            executeUpdate(String.format("insert into payFor values(%d, ?, %d)", this.id, serverNum), atts);
            this.decreaseCredit(value);
            this.save();
        }catch(SQLException e){}
    }

    public boolean checkPay(String houseId, int serverNum){
        return this.payedFor.contains(""+serverNum+houseId);
    }

    public static int getMaxIndex(){
        int maxIndex = -1;
        Connection connection = null;
        try
        {
            connection = DataBase.getConnection();
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);  // set timeout to 30 sec.

            ResultSet rs = statement.executeQuery("select MAX(id) from user");
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
}
