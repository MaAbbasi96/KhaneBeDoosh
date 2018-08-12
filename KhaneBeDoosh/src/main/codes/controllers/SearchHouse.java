package codes.controllers;
import codes.models.DataBase;
import codes.models.RealEstateUser;
import codes.models.House;
import codes.models.IndividualUser;
import codes.models.ServerAccessException;
import codes.models.Utils;
import codes.models.Config;
import static java.nio.charset.StandardCharsets.*;

import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@WebServlet("/search")
//Extend HttpServlet class
public class SearchHouse extends HttpServlet {
    private static final int AREA_LIMIT = 0;
    private static final int BUILDING_TYPE = 1;
    private static final int DEAL_TYPE = 2;
    private static final int MAX_PRICE = 3;

    private class UserInfo {
        public int id;
        public String url;
        public UserInfo(int id, String url){
            this.id = id;
            this.url = url;
        }
    }

    public void init() throws ServletException {
    }

    private JSONObject sendRequest(String urlName) throws IOException, ServerAccessException{
        URL url = new URL(urlName);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setConnectTimeout(10000);
        connection.setDoInput(true);
        connection.setRequestMethod("GET");
        if(connection.getResponseCode() >= 500)
            throw new ServerAccessException();
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        JSONObject jsonObj = new JSONObject(in.readLine());
        connection.disconnect();
        in.close();
        return jsonObj;
    }
    private void updateHousesFromServers() throws ServerAccessException, IOException{
        Connection connection = null;
        ArrayList<UserInfo> infos = new ArrayList<UserInfo>();
        try{
            connection = DataBase.getConnection();
            Statement statement = connection.createStatement();
            statement.setQueryTimeout(30);  // set timeout to 30 sec.
            ResultSet rs = statement.executeQuery("select * from realEstateUser where expTime = '' or expTime >= (SELECT strftime('%s','now'))");
            while(rs.next())
            {
                infos.add(new UserInfo(rs.getInt("userId"),rs.getString("url")));
            }

        }
        catch(SQLException e){}
        finally{
            try{
                if(connection != null)
                    connection.close();
            }
            catch(SQLException e){}
        }

        for(UserInfo info:infos){
            JSONObject jsonObj = sendRequest(info.url);
            JSONArray dataArray = new JSONArray();
            dataArray = jsonObj.getJSONArray("data");
            connection = null;
            try{
                connection = DataBase.getConnection();
                connection.setAutoCommit(false);
                Statement statement = connection.createStatement();
                statement.executeUpdate(String.format("delete from house where userId = %d",info.id));
                for(int i = 0; i < dataArray.length(); i++){
                    JSONObject obj = dataArray.getJSONObject(i);
                    int sellPrice = obj.getInt("dealType") == House.SELL ? obj.getJSONObject("price").getInt("sellPrice"):0;
                    int rentPrice = obj.getInt("dealType") != House.SELL ? obj.getJSONObject("price").getInt("rentPrice"):0;
                    int basePrice = obj.getInt("dealType") != House.SELL ? obj.getJSONObject("price").getInt("basePrice"):0;
                    statement.executeUpdate(String.format("insert into house values('%s', %d, %d, '%s', '%s', '%s', %d, %d, %d, %d, '%s', '%s')",
                                obj.getString("id"), info.id, obj.getInt("area"), obj.getString("buildingType"), obj.getString("address"), obj.getString("imageURL"), obj.getInt("dealType"), basePrice, sellPrice, rentPrice, "*", "*"));
                }
                connection.commit();
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
            RealEstateUser firm = DataBase.getFirm(info.id);
            if(firm != null)
                firm.updateExpTime(""+jsonObj.getInt("expireTime"));
        }
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONArray data = new JSONArray();

        String message = "";
        try{    
            response.setContentType("aplication/json; charset=UTF-8");

            updateHousesFromServers();
            
            for(House house: DataBase.getHouses(request.getParameter("areaLimit"),Utils.translateBuildingType(request.getParameter("buildingType")),
                                    request.getParameter("dealType"),request.getParameter("maxPrice"))){
                data.put(house.getEarlyJSONInfo());
            }
            message = "success";
        }
        catch(ServerAccessException Ex){
            message = "serverError";
        }
        finally{
            JSONObject outJSON = new JSONObject();
            outJSON.put("data", data);
            outJSON.put("message", message);
            String outString = outJSON.toString();
            PrintWriter outStream = response.getWriter();
            outStream.println(outString);
        }
    }

    public void destroy() {
    }
}
