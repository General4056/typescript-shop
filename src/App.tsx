import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/Navbar';
import DeviceList from './components/DeviceList/DeviceList';
import BurgerMenu from './components/BurgerMenu/BurgerMenu';
import DevicePage from './components/DevicePage/DevicePage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Login from './components/Login/Login';
import { MenuContext } from './contexts/menuContext';
import { fetchDeviceListInCategory } from './store/reducers/deviceSlice';
import { useAppDispatch, useAppSelector } from './utils/redux';
import Account from './components/Account/Account';

function App() {
  const dispatch = useAppDispatch();

  // const [userEmail, setUserEmail] = useState<string>('');
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);

  const selectedCategory = useAppSelector((state) => state.categories.selectedCategory);

  useEffect(() => {
    dispatch(fetchDeviceListInCategory(selectedCategory));
  }, [selectedCategory, dispatch]);

  return (
    <div>
      <MenuContext.Provider
        value={{
          menuIsOpened,
          setMenuIsOpened
        }}>
        <NavBar />
        <BurgerMenu />
        <Routes>
          <Route path="/*" element={<DeviceList />} />
          <Route path="/device/:id" element={<DevicePage />} />
          <Route path="/shopingCart" element={<ShoppingCart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signIn" element={<Login />} />
        </Routes>
      </MenuContext.Provider>
    </div>
  );
}

export default App;
