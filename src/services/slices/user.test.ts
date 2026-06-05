import { userReducer, initialState, loginUser } from './userSlice';

const mockUser = {
  email: 'test@test.ru',
  name: 'Арнольд'
};

describe('user async action', () => {
  test('loginUser Request', () => {
    const state = userReducer(
      initialState,
      loginUser.pending('', {
        email: 'test@test.ru',
        password: '123456'
      })
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('loginUser Success', () => {
    const state = userReducer(
      initialState,
      loginUser.fulfilled(mockUser, '', {
        email: 'test@test.ru',
        password: '123456'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(true);
  });

  test('loginUser Failed', () => {
    const state = userReducer(
      initialState,
      loginUser.rejected(new Error('Ошибка входа'), '', {
        email: 'test@test.ru',
        password: '123456'
      })
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка входа');
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuthenticated).toBe(false);
  });
});
