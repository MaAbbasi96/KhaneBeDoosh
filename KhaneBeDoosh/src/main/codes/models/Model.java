package codes.models;

import org.apache.commons.dbcp.BasicDataSource;

import codes.models.DataBase;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.PreparedStatement;
import java.util.*;

public abstract class Model{
    protected boolean isSaved;

    public void executeUpdate(String query, ArrayList<String> atts) throws SQLException{
        Connection connection = null;
        try{
            connection = DataBase.getConnection();
            PreparedStatement statement = connection.prepareStatement(query);
            for(int i = 0; i < atts.size(); i++)
                statement.setString(i+1, atts.get(i));
            statement.executeUpdate();
        }
        catch(SQLException e){
            throw e;
        }
        finally{
            if(connection != null)
                try{
                    connection.close();
                }
                catch(SQLException e){
                    throw e;    
                }
        }
    }
}
