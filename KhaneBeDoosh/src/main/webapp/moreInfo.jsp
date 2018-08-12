<%@ page import="java.util.*, codes.models.*" %>
<html>
    <%@ page contentType="text/html; charset=UTF-8" %>
    <% MyUser user = DataBase.getUser(); %> 
    <body>
        <h2>خانه به دوش</h2>
        <div align="right"><a href="index.jsp" align="right">خانه</a></div>
        <h3><%= user.getName() %></h3>
        <h4> اعتبار شما: <%= user.getCredit() %></h4>
        <h5><%= request.getAttribute("message") == null ? "" : request.getAttribute("message") %></h5>
        <hr>
        <%
            HashMap<String,String> house = (HashMap<String,String>)request.getAttribute("house");
            String[] keys = (String[]) request.getAttribute("keysForPrint");
            for(String key: keys){
                if(house.containsKey(key)){
        %>
                    <%= key %> : <%= house.get(key) %><br>
        <%
                }
            }
        %>

        <form action="MoreInfoHouse" method="GET">
            <input type="submit" value='<%= (String) request.getAttribute("buttonMessage")%>'>
            <input name="serverNum" type="hidden" value="<%= house.get("serverNum") %>">
            <input name="id" type="hidden" value="<%= house.get("id") %>">
            <input name="requestToGetPhone" type="hidden" value="True">
        </form>                
    </body>
</html>
