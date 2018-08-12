package codes.controllers;

import codes.models.Config;
import codes.models.House;
import codes.models.PayBeforeException;
import codes.models.ServerAccessException;
import codes.models.DataBase;
import codes.models.Utils;
import codes.models.DecreaseCreditException;
import codes.models.PayBeforeException;
import codes.models.IndividualUser;
import codes.models.NotRegisteredException;

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

@WebServlet("/phone/*")

public class Phone extends HttpServlet {

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
        JSONObject obj = new JSONObject();
        obj = jsonObj.getJSONObject("data");
        connection.disconnect();
        in.close();
        return obj;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getPathInfo();
        String id = path.substring(1, path.lastIndexOf('/'));
        int server = Integer.parseInt(path.substring(path.lastIndexOf('/')+1));
        IndividualUser user = (IndividualUser) request.getAttribute("user");
        response.setContentType("aplication/json; charset=UTF-8");
        String phone = "";
        String message = "";
        if (server == 0){
            House house = new House(id);
            phone = house.getPhone();
        }
        else{
            try{
                JSONObject obj = sendRequest(DataBase.getServerURL(server)+"/"+id);
                phone = obj.getString("phone");
            }
            catch(ServerAccessException ex){
                message = "serverError";
            }
        }
        JSONObject outJSON = new JSONObject();
        try{
            if(user == null)
                throw new NotRegisteredException();
            DataBase.payForHouse(user, id, server, Config.viewPhonePrice);
            message = "paid";
            outJSON.put("phone", phone);
        }
        catch(DecreaseCreditException e){
            message = "creditError";
        }
        catch(PayBeforeException e){
            message = "paid";
        }
        catch(NotRegisteredException e){
            message = "notAuthenticated";
        }
        outJSON.put("message", message);
        String outString = outJSON.toString();
        PrintWriter outStream = response.getWriter();
        outStream.println(outString);
    }
}