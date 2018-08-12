package codes.controllers;

import codes.models.*;

import java.io.*;
import java.util.*;
import java.time.Instant;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.auth0.jwt.*;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@WebFilter("/*")
public class Authenticated implements Filter {

	FilterConfig filterConfig = null;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
    }
    
    public void destroy() {
	}


	public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) throws IOException, ServletException {
        int id;
        IndividualUser user = null;
        HttpServletRequest request = (HttpServletRequest) req; 
        HttpServletResponse response = (HttpServletResponse) res; 
        response.setContentType("aplication/json");
        String token = request.getHeader("token");
        boolean flag = true;
        if(token == null)
            user = null;
        else{
            try{
                Algorithm algorithm = Algorithm.HMAC256(Config.secretKey);
                JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(Config.iss)
                    .build();
                DecodedJWT jwt = verifier.verify(token);
                id = jwt.getClaim("id").asInt();
                user = new IndividualUser(id);
            }
            catch (JWTVerificationException ex){
                flag = false;
                response.setStatus(403);
                JSONObject outJSON = new JSONObject();
                outJSON.put("message", "invalid token");
                String outString = outJSON.toString();
                PrintWriter outStream = response.getWriter();
                outStream.println(outString);
            }
            catch(UnsupportedEncodingException ex){}
        }
        if(flag){
            request.setAttribute("user", user);
            filterChain.doFilter(request, response);
        }
	}

}