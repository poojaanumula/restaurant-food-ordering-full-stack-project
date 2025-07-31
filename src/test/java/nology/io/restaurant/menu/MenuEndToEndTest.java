package nology.io.restaurant.menu;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.http.impl.bootstrap.HttpServer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import nology.io.restaurant.menu.Menu;
import nology.io.restaurant.menu.MenuRepository;
import nology.io.restaurant.menu.Menu.CategoryList;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class MenuEndToEndTest {
    @LocalServerPort
    private int port;

    private ArrayList<Menu> menu = new ArrayList<>();

    @Autowired
    private MenuRepository repo;
    

    @BeforeEach
    public void setUp(){
       RestAssured.port=port;
       repo.deleteAll();
       menu.clear();
       Menu menuItem = new Menu();
       menuItem.setItemName("Papads");
       menuItem.setCategory(CategoryList.ENTREES);
       menuItem.setItemPrice(20);
       this.repo.save(menuItem);
 
       Menu menuItemTwo = new Menu();
       menuItemTwo.setItemName("Rasam");
       menuItemTwo.setCategory(CategoryList.MAINS);
       menuItemTwo.setItemPrice(20);
       this.repo.save(menuItemTwo);
    }
    @Test
    public void getAllMenu()
    {
       given().
       when()
       .get("/menu")
       .then()
       .statusCode(HttpStatus.OK.value())
       .body("$",hasSize(2))
       .body("itemName",hasItems("Rasam", "Papads"))
       .body(matchesJsonSchemaInClasspath("schemas/menu-schema.json"));
    }

    @Test
    public void MenuReturnsEmptyArray()
    {
        this.repo.deleteAll();
        given()
        .when()
        .get("/menu")
        .then()
        .statusCode(HttpStatus.OK.value())
        .body("$",hasSize(0));
    }

    @Test
    public void WhenPassedEmptyBody_BadRequest()
    {
        given()
        .contentType(ContentType.JSON)
        .when()
        .post("/menu")
        .then()
        .statusCode(HttpStatus.BAD_REQUEST.value());
    }
   
    @Test
    public void WhenPassedPlainText()
    {
        given()
        .contentType(ContentType.TEXT)
        .body("hello")
        .when()
        .post("/menu")
        .then()
        .statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value());
    }

    @Test
    public void whenPassedBadData_BadRequest()
    {
        HashMap<String, String> data = new HashMap<>();
        data.put("itemName", "test");
        given()
        .contentType(ContentType.JSON).body(data)
        .when()
        .post("/menu")
        .then()
        .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    public void AddMenuWhenAddedValidData()
    {
         HashMap<String, String> items = new HashMap<>();
        items.put("itemName", "chicken curry");
        items.put("itemPrice", "30");
        items.put("category","MAINS");
        given()
                .contentType(ContentType.JSON)
                .body(items)
                .when()
                .post("/menu")
                .then()
                .statusCode(HttpStatus.CREATED.value())
                .body("itemName", equalTo("chicken curry"))
                .body(matchesJsonSchemaInClasspath("schemas/menu-array-schema.json"));
    }

}
