import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import taskReducer from './slices/taskSlice.ts';
import myTaskReducer from './slices/myTaskSlice.ts';
import myBidReducer from './slices/myBidSlice.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import categoriesReducer from './slices/jobCategoriesSlice.ts';

export const appReducer = combineReducers({
  authReducer,
  taskReducer,
  myTaskReducer,
  myBidReducer,
  categoriesReducer,
});

export type RootState = ReturnType<typeof appReducer>;
const rootReducer = (state: RootState | undefined, action: PayloadAction) =>
  appReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);

export default rootReducer;
