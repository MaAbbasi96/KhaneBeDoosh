package codes.controllers;

import codes.models.*;

import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/register")

public class Register extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        String password = request.getParameter("password");
        String username = request.getParameter("username");
        String name = request.getParameter("name");
        String phone = request.getParameter("phone");
        String result = DataBase.addIndividualUser(name, username, password, phone, "No", 0) ? "succes" : "exists";
        if(result.equals("success"))
            response.setStatus(201);
        else
            response.setStatus(403);
        response.setContentType("aplication/json; charset=UTF-8");
        JSONObject outJSON = new JSONObject();
        outJSON.put("result", result);
        String outString = outJSON.toString();
        PrintWriter outStream = response.getWriter();
        outStream.println(outString);
    }
}