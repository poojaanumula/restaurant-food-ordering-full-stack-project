package nology.io.restaurant.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.core.userdetails.User;

@Configuration
public class SpringConfig {
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService()
    {
      UserDetails admin = User.builder()
         .username("chef")
         .password(passwordEncoder().encode("chef123$A"))
         .roles("CHEF")
         .build();

      UserDetails user = User.builder()
         .username("admin")
         .password(passwordEncoder().encode("admin123$A"))
         .roles("ADMIN")
         .build();

         return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception
    {
         return security.csrf(csrf->csrf.disable())
            .authorizeHttpRequests(authorize->authorize
            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() 
            .requestMatchers(HttpMethod.GET, "/menu/**").permitAll() 
            .requestMatchers(HttpMethod.POST, "/menu").hasRole("ADMIN")
            .requestMatchers(HttpMethod.POST, "/menu").hasRole("ADMIN")
            .requestMatchers(HttpMethod.GET, "/orders").permitAll()
            .requestMatchers(HttpMethod.PATCH, "/orders/**").hasRole("CHEF")
            .requestMatchers(HttpMethod.DELETE, "/orders/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/orders").permitAll()
            .requestMatchers(HttpMethod.POST, "/orderedItems").permitAll()
                         .anyRequest()
                         .authenticated())
                         .httpBasic(Customizer.withDefaults()).build();
    };
}
