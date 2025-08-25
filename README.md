# restaurant-food-ordering-full-stack-project
<h2>Project Overview</h2>
<p>A full-stack food ordering application inspired by restaurant ordering apps. This project allows customers, chefs, and managers to interact seamlessly through different modules.</p>
<h2>Features</h2>
<h3>Customer</h3>
<ul>
  <li>Enter table number via a form</li>
 <li>Browse and select food from the menu.</li>
 <li>Add/remove items in the cart before placing an order.</li>
  <li>Place an order and track its status in the View Order tab.</li>
</ul>
<h3>Chef</h3>
<ul>
  <li>Login with chef credentials.</li>
    <li>View incoming orders from customers.</li>
    <li>Update order status by marking items as “Order Ready” once prepared.</li>
</ul>
<h3>Manager</h3>
<ul>
  <li>Login with manager credentials.</li>
    <li>Access the dashboard to add new items to the menu.</li>
</ul>
<h3>Order Flow</h3>
<ul>
  <li>Customer enters table number → selects food → places an order.</li>
  <li<Chef receives the order → prepares food → marks it as ready</li>
  <li>Customer can view status → updates from “Order Pending” → “Order Ready”.</li>
  <li>Manager updates menu when required.</li>
</ul>
<h2>Tech Stack</h2>
<h3>Frontend</h3>
<ul>
  <li>React.js – Component-based UI</li>
  <li>SCSS – Styling and responsive design</li>
  <li>Testing: React Testing Library + Jest</li>
</ul>
<h3>Backend</h3>
<ul>
  <li>Java Spring Boot – RESTful APIs and business logic</li>
    <li>MySQL – database</li>
    <li>H2 (in-memory) – For testing</li>
    <li>Mockito – Unit testing backend logic</li>
  <li>Role-Based Authentication – Access control for Customers, Chefs, and Managers</li>
</ul>
<h3>Installation setup</h3>
<h4>Clone the repository</h4>
<ul>
  <h3>Backend</h3>
  <li>git clone https://github.com/poojaanumula/restaurant-food-ordering-full-stack-project.git </li>
  <li>cd  restaurant-food-ordering-full-stack-project</li>
  <li>Navigate to: /src/main/java/io/nology/restaurant/RestaurantApplication.java</li>
  <li>click Run</li>
  <h3>Front end</h3>
  <li>cd front-end</li>
  <li>npm install</li>
  <li>npm run dev</li>
</ul>
<h3>Future Enhancements</h3>
<ul>
  <li>Online payment integration 💳

</li>
  <li>Order history for customers</li>
</ul>



