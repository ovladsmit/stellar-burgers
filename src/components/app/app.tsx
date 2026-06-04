import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import {
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
  useParams
} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  getIngredients,
  getIngredientsError,
  getIngredientsLoading
} from '../../services/slices/ingredientsSlice';
import { useEffect } from 'react';
import { getCookie } from '../../utils/cookie';
import { authChecked, getUser } from '../../services/slices/userSlice';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getOrderNumber } from '../../services/slices/orderSlice';

const App = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменные из стора */
  const isIngredientsLoading = useSelector(getIngredientsLoading);
  const ingredients = useSelector(getIngredients);
  const error = useSelector(getIngredientsError);
  const orderNumber = useSelector(getOrderNumber);
  const ingredientMatch = useMatch('/ingredients/:id');

  const ingredientData = ingredients.find(
    (item) => item._id === ingredientMatch?.params.id
  );
  useEffect(() => {
    dispatch(fetchIngredients());
    if (getCookie('accessToken')) {
      dispatch(getUser());
    } else if (localStorage.getItem('refreshToken')) {
      dispatch(getUser());
    } else {
      dispatch(authChecked());
    }
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const closeModal = () => navigate(-1);
  const background = location.state?.background;

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
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />

            <Route
              path='/login'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route
              path='/register'
              element={
                <ProtectedRoute onlyUnAuth>
                  <Register />
                </ProtectedRoute>
              }
            />

            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />

            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/orders'
              element={
                <ProtectedRoute>
                  <ProfileOrders />
                </ProtectedRoute>
              }
            />

            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal title={String(`#${orderNumber}`)} onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />

              <Route
                path='/ingredients/:id'
                element={
                  <Modal
                    title={ingredientData?.name || ''}
                    onClose={closeModal}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />

              <Route
                path='/profile/orders/:number'
                element={
                  <Modal title={String(`#${orderNumber}`)} onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
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
