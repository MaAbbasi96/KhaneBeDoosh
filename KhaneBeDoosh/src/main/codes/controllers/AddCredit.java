package codes.controllers;

import codes.models.Config;
import codes.models.AddCreditException;
import codes.models.DataBase;
import codes.models.DecreaseCreditException;
import codes.models.IndividualUser;
import codes.models.ServerAccessException;
import codes.models.NotRegisteredException;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.*;

@WebServlet("/credit/increase")
//Extend HttpServlet class
public class AddCredit extends HttpServlet {
    public void init() throws ServletException {
    }

    private JSONObject sendRequest(String urlName, JSONObject outJson) throws ServerAccessException, IOException{
        URL url = new URL(urlName);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setConnectTimeout(10000);
        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        connection.setRequestProperty("apiKey", Config.apiKey);
        connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
        OutputStreamWriter bankOutStream= new OutputStreamWriter(connection.getOutputStream());
        bankOutStream.write(outJson.toString());
        bankOutStream.flush();
        if(connection.getResponseCode() >= 500)
            throw new ServerAccessException(); 
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        JSONObject jsonInput = new JSONObject(in.readLine());
        connection.disconnect();
        in.close();
        return jsonInput;
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int credit = 0;
        String message = "";
        IndividualUser user = (IndividualUser) request.getAttribute("user");
        try{    
            response.setContentType("aplication/json; charset=UTF-8");
            if(user == null)
                throw new NotRegisteredException();
            credit = Integer.parseInt(request.getParameter("credit"));
            if(credit <= 0)
                throw new NumberFormatException();
            JSONObject jsonBankOut = new JSONObject();
            jsonBankOut.put("userId", user.getId()); //TODO: hardcoded user id
            jsonBankOut.put("value", credit);
            JSONObject jsonInput = sendRequest(Config.acmBank, jsonBankOut);
            if(jsonInput.getString("result").equals("OK")){
                DataBase.addCredit(user, credit);
                message = "success";
            }
            else
                throw new AddCreditException();
        }
        catch(NumberFormatException Ex){
            message = "invalidInput";
        }
        catch(AddCreditException Ex){
            message = "serverError";
        }
        catch(ServerAccessException Ex){
            message = "bankError";
        }
        catch(NotRegisteredException Ex){
            message = "notRegistered";
        }
        finally{
            JSONObject outJSON = new JSONObject();
            outJSON.put("message", message);
            String outString = outJSON.toString();
            PrintWriter outStream = response.getWriter();
            outStream.println(outString);
        }
   }

   public void destroy() {
   }
}
