import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const initialState = {
  userInfo: {
    data: null,
    loading: false,
    error: null,
  },
  loginData: {
    loading: false,
    error: null,
  },
  registerData: {
    loading: false,
    error: null,
  },
  changePasswordData: {
    load: false,
    error: "",
  },
  changeAvatarData: {
    load: false,
    error: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginOthersRequest: (state, action) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    loginOthersSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.data = data;
      state.userInfo.error = null;
    },
    loginOthersFailure: (state, action) => {
      const { err } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.error = err;
    },
    loginRequest: (state, action) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    loginSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.data = data;
    },
    loginFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.error = error;
      state.userInfo.loading = false;
    },
    // register
    registerRequest: (state, action) => {
      state.registerData.loading = true;
      state.registerData.error = null;
    },
    registerSuccess: (state, action) => {
      state.registerData.loading = false;
    },
    registerFailure: (state, action) => {
      const { error } = action.payload;
      state.registerData.loading = false;
      state.registerData.error = error;
    },
    // logout
    logoutRequest: (state, action) => {
      Cookies.remove("jwt");
      state.userInfo.data = null;
      let { callback } = action.payload;
      callback();
    },
    // getUserInfo
    getUserInfoRequest: (state, action) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.userInfo.loading = false;
    },
    getUserInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.error = error;
    },
    // updateUserInfo
    updateUserInfoRequest: (state, action) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    updateUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.userInfo.loading = false;
    },
    updateUserInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.error = error;
    },
    // changePassword
    changePasswordRequest: (state, action) => {
      state.changePasswordData.loading = true;
      state.changePasswordData.error = null;
    },
    changePasswordSuccess: (state, action) => {
      state.changePasswordData.loading = false;
    },
    changePasswordFailure: (state, action) => {
      const { error } = action.payload;
      state.changePasswordData.loading = false;
      state.changePasswordData.error = error;
    },
    // changeAvatar
    changeAvatarRequest: (state, action) => {
      state.changeAvatarData.loading = true;
      state.changeAvatarData.error = null;
    },
    changeAvatarSuccess: (state, action) => {
      const { avatar } = action.payload;
      state.changeAvatarData.loading = false;
      state.userInfo.data.avatar = avatar;
    },
    changeAvatarFailure: (state, action) => {
      const { error } = action.payload;
      state.changeAvatarData.loading = false;
      state.changeAvatarData.error = error;
    },
  },
});

export const {
  ///
  loginRequest,
  loginSuccess,
  loginFailure,
  ///
  registerRequest,
  registerSuccess,
  registerFailure,
  ///
  logoutRequest,
  ///
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  ///
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  ///
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  ///
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFailure,
  ///
  loginOthersRequest,
  loginOthersSuccess,
  loginOthersFailure,
} = authSlice.actions;

export default authSlice.reducer;
