import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  ///
  registerRequest,
  registerSuccess,
  registerFailure,
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
} from "../slicer/auth.slice.js";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:6789/login`, data, {
      withCredentials: true,
    });
  } catch (e) {
    yield put(loginFailure({ error: "Email hoặc mật khẩu không đúng" }));
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:6789/register", data);
    yield callback();
    yield put(registerSuccess());
    notification.success({
      message: "Đăng kí thành công !!!",
      duration: 2,
    });
  } catch (e) {
    notification.error({
      message: "Email đã tồn tại !!!",
      duration: 2,
    });
    yield put(registerFailure({ error: "Email đã tồn tại" }));
  }
}

function* getUserInfoSaga(action) {
  try {
    const { token, callback } = action.payload;
    const result = yield axios.post(`http://localhost:6789/getUserByToken`, {
      token,
    });
    yield put(getUserInfoSuccess({ data: result.data }));
    const { roleId, name } = result.data;
    callback(roleId, name);
  } catch (e) {
    yield put(getUserInfoFailure({ error: "Lỗi" }));
  }
}

function* updateUserInfoSaga(action) {
  try {
    const data = action.payload;
    const result = yield axios.put(`http://localhost:6789/editUser`, data);
    yield put(updateUserInfoSuccess({ data: result.data.data }));
    notification.success({
      message: "Update User Successfully",
      duration: 2,
    });
  } catch (e) {
    yield put(updateUserInfoFailure({ error: "Lỗi" }));
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post("/login", {
      email: data.email,
      password: data.password,
    });
    const result = yield axios.put(`http://localhost:6789/editUser`, {
      id,
      password: data.newPassword,
    });
    callback();
    yield put(changePasswordSuccess({ data: result.data }));
    notification.success({
      message: "Password changed successfully",
      duration: 2,
    });
  } catch (e) {
    yield put(changePasswordFailure({ error: "Lỗi" }));
    notification.error({
      message: "Password changed Error",
      duration: 2,
    });
  }
}

function* changeAvatarSaga(action) {
  try {
    const data = action.payload;
    let result = yield axios.put(`http://localhost:6789/editAvatarUser`, data);
    yield put(changeAvatarSuccess(result.data));

    notification.success({
      message: "Change Avatar successfully",
    });
  } catch (e) {
    yield put(changeAvatarFailure({ error: "Lỗi" }));
  }
}

function* loginOthersSaga(action) {
  try {
    const { data, callback } = action.payload;
    let result = yield axios.post("http://localhost:6789/loginOthers", data);
    yield put(loginOthersSuccess(result));
    yield callback();
    const res = yield getDoc(doc(db, "userChats", result?.data?.id));
    const combinedId = "idadmin" + result?.data?.id;
    if (!res.exists()) {
      yield setDoc(doc(db, "userChats", result?.data?.id), {});
      yield setDoc(doc(db, "chats", combinedId), { messages: [] });
      if (result?.data?.roleId == "USER") {
        //create user chats
        // connect admin to user
        yield updateDoc(doc(db, "userChats", result?.data?.id), {
          [combinedId + ".userInfo"]: {
            id: result?.data?.id,
            name: result?.data?.name,
            avatar: result?.data?.avatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // connect user to admin
        yield updateDoc(doc(db, "userChats", "idadmin"), {
          [combinedId + ".userInfo"]: {
            id: "idadmin",
            name: "ADMIN",
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/cccc-bd93c.appspot.com/o/files%2Ficons8-admin-100.png?alt=media&token=f31b1775-2ebd-47b6-9ae5-b499f8d7e477",
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    yield put(
      loginOthersFailure({
        err: "Something went wrong , are u again login other methods :((  ",
      })
    );
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(registerRequest.type, registerSaga);
  yield takeEvery(getUserInfoRequest.type, getUserInfoSaga);
  yield takeEvery(updateUserInfoRequest.type, updateUserInfoSaga);
  yield takeEvery(changePasswordRequest.type, changePasswordSaga);
  yield takeEvery(changeAvatarRequest.type, changeAvatarSaga);
  yield takeEvery(loginOthersRequest.type, loginOthersSaga);
}
