package codes.models;
import java.util.*;
import codes.models.House;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Utils{
    public static JSONObject getEarlyJSONInfo(JSONObject obj,int serverNum){
        obj.put("address", "?");
        obj.put("serverNum", ""+serverNum);
        return obj;
    }
        
    public static JSONObject getCompleteJSONInfo(JSONObject obj, int serverNum){
        obj.put("serverNum", ""+serverNum);
        return obj;
    }

    public static int toInt(String s){
        return s.equals("") ? -1 : Integer.parseInt(s);
    }

    public static String makeLinkURL(String url){
        return url;
    }

    public static String translateBuildingType(String b){
        if (b.equals("0"))
            return "ویلایی";
        else if(b.equals("1"))
            return "آپارتمان";
        else
            return "";
    }

    public static String encryptPhone(String phone){
        if(phone.length() >= 8)
            return phone.substring(0,2) + "******" + phone.substring(8) ;
        else
            return "***********";
    }

    public static String xssAvoidance(String input){
        return input.replaceAll("&", "&amp")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll("\"", "&quot;")
                    .replaceAll("'", "&#39");
    }
}
