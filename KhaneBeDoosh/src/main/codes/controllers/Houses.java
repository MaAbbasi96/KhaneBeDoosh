package codes.controllers;

import codes.models.DataBase;
import codes.models.MyUser;
import codes.models.IndividualUser;

import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/houses")

public class Houses extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("aplication/json; charset=UTF-8");
        IndividualUser user = (IndividualUser) request.getAttribute("user");
        JSONObject outJSON = new JSONObject();
        outJSON.put("message", "failed");
        if(user != null){
            outJSON = DataBase.getHouses(user);
            
            outJSON.put("message", "success");
        }
        String outString = outJSON.toString();
        PrintWriter outStream = response.getWriter();
        outStream.println(outString);
    }
}