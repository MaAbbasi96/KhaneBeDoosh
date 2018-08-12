package codes.controllers;
import codes.models.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet("/house/add")
public class AddHouse extends HttpServlet {

    public void init() throws ServletException {
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("aplication/json; charset=UTF-8");
        String message = "";
        try{
            String buildingType = Utils.xssAvoidance(request.getParameter("buildingType"));
            int area = Integer.parseInt(request.getParameter("area"));
            int dealType = Integer.parseInt(request.getParameter("dealType"));
            int rentPrice = Integer.parseInt(request.getParameter("rentPrice"));
            int basePrice = Integer.parseInt(request.getParameter("basePrice"));
            int sellPrice = Integer.parseInt(request.getParameter("sellPrice"));
            if(dealType == House.SELL && sellPrice <= 0)
                throw new NoValueException();
            if(dealType == House.RENT && (rentPrice < 0 || basePrice < 0 || (rentPrice == 0 && basePrice == 0)) )
                throw new NoValueException();
            String address = Utils.xssAvoidance(request.getParameter("address"));
            String phone = Utils.xssAvoidance(request.getParameter("phone"));
            String description = Utils.xssAvoidance(request.getParameter("description"));
            if(phone.equals("") || address.equals("") || buildingType.equals(""))
                throw new NoValueException();
            if(dealType != House.SELL && dealType != House.RENT)
                throw new DealTypeException();
            DataBase.addHouse(buildingType, area, dealType, basePrice, rentPrice, sellPrice, address, phone, description);
            message = "success";
        }
        catch(NumberFormatException Ex){
            message = "invalidInput";
        }
        catch(NoValueException Ex){
            message = "unsuitableInput";
        }
        catch(DealTypeException Ex){
            message = "invalidDealType";
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
