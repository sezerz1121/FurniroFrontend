import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListProduct from './ListProduct.jsx';
import EditProduct from './EditProduct.jsx';
import Registration from './Registration.jsx';
import SignIn from './SignIn.jsx';
import HomePage from './HomePage.jsx';
import SavedProduct from './SavedProduct.jsx';
import Buy from './Buy.jsx';
import Address from './Address.jsx';
import Order from './Order.jsx';
import Shop from './Shop.jsx';
import Dining from './Dining.jsx';
import Living from './Living.jsx';
import Bedroom from './Bedroom.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/living" element={<Living />} />
        <Route path="/bedroom" element={<Bedroom />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/order" element={<Order />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/address" element={<Address />} />
        <Route path="/saved" element={<SavedProduct />} />
        <Route path="/Register" element={<Registration />} />
        <Route path="/Signin" element={<SignIn />} />
        <Route path="/edit/:productId" element={<EditProduct />} />
        <Route path="/buy/:productId" element={<Buy />} />
        <Route path="/productlist" element={<ListProduct />} />
      </Routes>
    </Router>
  );
}

export default App;

