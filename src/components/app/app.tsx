import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients, getIngredients, getIngredientsError, getIngredientsLoading } from '../../services/slices/ingredientsSlice'
import { useEffect } from 'react';
const App = () => {
  const dispatch = useDispatch()
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = useSelector(getIngredientsLoading);
  const ingredients = useSelector(getIngredients);
  const error = useSelector(getIngredientsError);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch])
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length > 0 ? (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/fogot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />

            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/orders' element={<ProfileOrders />} />

            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/profile/orders/:number' element={<OrderInfo />} />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route path='/feed/:number' element={
                <Modal title='' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              }
              />

              <Route path='/ingredients/:id' element={
                <Modal title='' onClose={() => navigate(-1)}>
                  <IngredientDetails />
                </Modal>
              }
              />

              <Route path='/profile/orders/:number' element={
                <Modal title='' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              } />
            </Routes>
          )}
        </>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </div>
  );
};

export default App;
