package codes.controllers;

import codes.models.*;

import java.io.*;
import java.util.*;
import java.time.Instant;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.auth0.jwt.*;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

@WebServlet("/login")

public class Login extends HttpServlet {

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        String password = request.getParameter("password");
        String username = request.getParameter("username");
        String token = "";
        String message = "";

        try {
            IndividualUser user = DataBase.getIndividualUser(username, password);
            Algorithm algorithm = Algorithm.HMAC256(Config.secretKey);
            token = JWT.create()
                .withIssuer(Config.iss)
                .withIssuedAt(Date.from(Instant.ofEpochSecond(1466796822L)))
                .withClaim("id", user.getId())
                .sign(algorithm);
            message = "success";
            response.setStatus(200);
        }
        catch (Exception exception){
            response.setStatus(403);
            message = "failed";
        }
        finally{
            response.setContentType("aplication/json; charset=UTF-8");
            JSONObject outJSON = new JSONObject();
            outJSON.put("message", message);
            if(message.equals("success"))
                outJSON.put("token", token);
            String outString = outJSON.toString();
            PrintWriter outStream = response.getWriter();
            outStream.println(outString);
        }
    }
}