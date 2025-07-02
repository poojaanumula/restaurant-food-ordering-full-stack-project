package nology.io.restaurant.menu;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.validation.Valid;

@Service
public class MenuService {
    private MenuRepository menuRepository;
    
	public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public Menu addMenuItem(MenuDTO data) {
        Menu newMenu = new Menu();
        newMenu.setItemName((data.getItemName().trim()));
        newMenu.setItemPrice(data.getItemPrice());
        newMenu.setCategory(data.getCategory());
        return menuRepository.save(newMenu);

	}

	public List<Menu> getAllMenu() {
		return this.menuRepository.findAll();
	}

}
