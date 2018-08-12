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

@WebServlet("/user/info")

public class UserInfo extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("aplication/json; charset=UTF-8");
        IndividualUser user = (IndividualUser) request.getAttribute("user");
        String name = (user == null) ? "مهمان": user.getName();
        int credit = (user == null)? 0 : user.getCredit();
        JSONObject outJSON = new JSONObject();
        outJSON.put("name", "" + name);
        outJSON.put("credit", ""+credit);
        String outString = outJSON.toString();
        PrintWriter outStream = response.getWriter();
        outStream.println(outString);
    }
}