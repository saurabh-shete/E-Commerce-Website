import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProductDetails from './screens/ProductDetails';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";  
const App = () => {
  return (
    <Router>
      <Header />
      <main className='my-3'>
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart/:id/:qty" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:_id" element={<OrderScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}
export default App;