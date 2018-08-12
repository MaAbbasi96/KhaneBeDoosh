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


@WebServlet("/search/*")
public class MoreInfoHouse extends HttpServlet {

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
        response.setContentType("aplication/json; charset=UTF-8");
        IndividualUser user = (IndividualUser) request.getAttribute("user");
        JSONObject completeInfo = new JSONObject();
        if (server == 0){
            House house = new House(id);
            completeInfo = house.getCompleteJSONInfo();
        }
        else{
            try{
                JSONObject obj = sendRequest(DataBase.getServerURL(server)+"/"+id);
                completeInfo = Utils.getCompleteJSONInfo(obj, server);
            }
            catch(ServerAccessException ex){
                request.setAttribute("message", "مشکل در ارتباط با سرور");
            }
        }
        String message = "";
        if(user == null){
            message = "notAuthenticated";//TODO... front bayad avaz she
            completeInfo.put("phone",Utils.encryptPhone(completeInfo.get("phone").toString()));
        }
        else if(DataBase.checkPay(user, id, server))
            message = "paid";
        else if(DataBase.haveCredit(user, Config.viewPhonePrice)){
            message = "notPaid";
            completeInfo.put("phone",Utils.encryptPhone(completeInfo.get("phone").toString()));
        }
        else{
            message = "creditError";
            completeInfo.put("phone",Utils.encryptPhone(completeInfo.get("phone").toString()));
        }

        completeInfo.put("message", message);
        JSONObject outJSON = new JSONObject();
        outJSON.put("data", completeInfo);
        String outString = outJSON.toString();
        PrintWriter outStream = response.getWriter();
        outStream.println(outString);
   }

   public void destroy() {
   }
}
