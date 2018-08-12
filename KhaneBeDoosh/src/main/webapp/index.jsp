<%@ page import="java.util.*, codes.models.*" %>
<html>
<%@ page contentType="text/html; charset=UTF-8" %>
<body>
<% MyUser user = DataBase.getUser(); %> 
<h2>خانه به دوش</h2>
<h3><%= user.getName() %></h3>
<h4> اعتبار شما: <%= user.getCredit() %></h4>
<h5><%= request.getAttribute("message") == null ? "" : request.getAttribute("message") %></h5>
<hr>

<form action="SearchHouse" method="GET">
    <input type="text" name="areaLimit" placeholder="حداقل متراژ"><br>
    <select name="buildingType">
        <option value="0">ویلایی</option>
        <option value="1">آپارتمان</option>
        <option value="" selected>مهم نیست</option>
    </select><br>
    <select name="dealType">
        <option value="0">خرید</option>
        <option value="1">اجاره</option>
    </select><br>
    <input type="text" name="maxPrice" placeholder="حداکثر قیمت"><br>
    <input type="submit" value="جست و جو">
</form>

<form action="AddHouse" method="POST">
    <select name="buildingType">
        <option value="0">ویلایی</option>
        <option value="1">آپارتمان</option>
    </select><br>
    <input type="text" name="area" placeholder="متراژ"><br>
    <select name="dealType">
        <option value="0">فروش</option>
        <option value="1">اجاره</option>
    </select><br>
    <input type="text" name="rentSellPrice" placeholder="قیمت"><br>
    <input type="text" name="address" placeholder="آدرس"><br>
    <input type="text" name="phone" placeholder="شماره تلفن"><br>
    <input type="text" name="description" placeholder="توضیحات"><br>
    <input type="submit" value="اضافه کردن خانه‌ی جدید">
</form>

<form action="AddCredit" method="POST">
    <input type="text" name="credit" placeholder="اعتبار"><br>
    <input type="submit" value="افزایش اعتبار">
</form>
</body>
</html>
