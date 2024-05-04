import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import {Route, Routes} from 'react-router-dom';
import Register from './containers/User/Register';
import Login from './containers/User/Login';
import Container from '@mui/material/Container';
import AddForm from './containers/NewProductForm/AddForm';
import Product from './containers/Product/Product';
import ProductsByCategory from './containers/Product/ProductsByCategory';
function App() {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Container maxWidth='xl'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/newItem' element={<AddForm />}/>
            <Route path='/product/:productId' element={<Product />}/>
            <Route path='/category/:id' element={<ProductsByCategory />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path="*" element={<h1>Not found</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
