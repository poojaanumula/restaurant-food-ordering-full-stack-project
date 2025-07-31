package nology.io.restaurant.menu;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;

import nology.io.restaurant.menu.Menu.CategoryList;

public class MenuServiceTest {
    @Mock
    private MenuRepository menuRepository;

    @Spy
    @InjectMocks
    private MenuService menuService;
    @BeforeEach
    public void setUp()
    {
       MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getAllMenu_Calls_FindAll()
    {
        menuService.getAllMenu();
        verify(menuRepository).findAll();
    }

    @Test
    public void addMenuITem_Calling_Save()
    {
       MenuDTO menuDTO = new MenuDTO();
       menuDTO.setItemName("Noodles");
       menuDTO.setItemPrice(30.0);
       menuDTO.setCategory(CategoryList.MAINS);
       menuService.addMenuItem(menuDTO);
       verify(menuRepository).save(any(Menu.class));
    }
}
