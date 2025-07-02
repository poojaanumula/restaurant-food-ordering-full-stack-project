package nology.io.restaurant.menu;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/menu")
public class MenuController {

private MenuService menuService;

public MenuController(MenuService menuService) {
    this.menuService = menuService;
}

@PostMapping
public ResponseEntity<Menu> postMenu(@Valid @RequestBody MenuDTO data) {
    Menu newMenu = this.menuService.addMenuItem(data);
    return new ResponseEntity<Menu>(newMenu, HttpStatus.CREATED);
}

@GetMapping
public ResponseEntity<List<Menu>> getMenu()
{
    List<Menu> menuList = this.menuService.getAllMenu();
    return new ResponseEntity<>(menuList, HttpStatus.OK);
}

}
