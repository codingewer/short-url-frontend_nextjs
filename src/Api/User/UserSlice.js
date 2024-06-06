import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
var token
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}
export const NewUserAsync = createAsyncThunk(
  "users/NewUserAsync",
  async (data) => {
    const res = await axios.post(`${apiUrl}/user/new`, data);
    return res.data;
  }
);

export const GetUserByIDAsync = createAsyncThunk(
  "users/GetUserByUserNameAsync",
  async (id) => {
    const res = await axios.get(`${apiUrl}/user/getbyId/`+ id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  }
);

export const UpdateUserAsync = createAsyncThunk(
  "users/UpdateUserAsync",
  async (data) => {
    const res = await axios.put(`${apiUrl}/user/update`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const UpdatePasswordAsync = createAsyncThunk(
  "users/UpdatePasswordAsync",
  async (data) => {
    const res = await axios.put(`${apiUrl}/user/updatepassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const LoginAsync = createAsyncThunk("users/LoginAsync", async (data) => {
  const res = await axios.post(`${apiUrl}/user/login`, data);
  return res.data;
});

export const ForgotPasswordAsync = createAsyncThunk(
  "users/ForgotPasswordAsync",
  async (data) => {
    const res = await axios.post(`${apiUrl}/user/forgotpassword`, data);
    return res.data;
  }
);

export const ResetPasswordAsync = createAsyncThunk(
  "users/ResetPasswordAsync",
  async (data) => {
    const res = await axios.post(`${apiUrl}/user/resetpassword/${data.token}`, data);
    return res.data;
  }
);

export const GetAllUserAsync = createAsyncThunk(
  "user/GetAllUserAsync",
  async () => {
    const res = await axios.get(`${apiUrl}/user/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
)

export const DeleteUserByAdminAsync = createAsyncThunk(
  "user/DeleteUserByAdminAsync",
  async (id) => {
    const res = await axios.delete(`${apiUrl}/user/deletebyadmin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const UpdateUserBlockedAsync = createAsyncThunk(
  "user/UpdateUserBlockedAsync",
  async (id) => {
    const res = await axios.put(`${apiUrl}/user/updateblocked/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  })

const UserSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    users:[],
    userrealtime: null,
    success: false,
    logined:false,
    message: null,
    deleted : false
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.logined = true;
        state.loading = false;
        localStorage.setItem("logined", true);
      })
      .addCase(LoginAsync.pending, (state) => {
        state.loading = true;
        state.logined = false;
      })
      .addCase(LoginAsync.rejected, (state, action) => {
        console.log(action);
        state.error =
          "Giriş başarısız şifrenizi ve Kullanıcı adınızı kontrol edin";
        state.logined = false;
        state.loading = false;
      })
      .addCase(GetUserByIDAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.userrealtime = action.payload;
      })
      .addCase(GetUserByIDAsync.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(GetUserByIDAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(UpdateUserAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(UpdateUserAsync.rejected, (state, action) => {
        state.error = "Bilgiler güncellenirken hata oluştu";
        state.success = false;
        state.loading = false;
      })
      .addCase(UpdatePasswordAsync.fulfilled, (state, action) => {
        state.success = true;
        console.log(action);
        state.loading = false;
      })
      .addCase(UpdatePasswordAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(UpdatePasswordAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = "Eski şifre hatalı";
      })
      .addCase(NewUserAsync.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.logined = true;
        state.loading = false;
        localStorage.setItem("logined", true);
      })
      .addCase(NewUserAsync.pending, (state, action) => {
        state.loading = true;
        state.logined = false;
      })
      .addCase(NewUserAsync.rejected, (state, action) => {
        state.logined = false;
        state.loading = false;
        state.error =
          "Kayıt olunurken hata oluştu kullanıcı adı daha önce kullanılmış olabilir";
      })
      .addCase(ForgotPasswordAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(ForgotPasswordAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(ForgotPasswordAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = "Bir hata oluştu e-mail adresinizi kontrol edin";
      })
      .addCase(ResetPasswordAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(ResetPasswordAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(ResetPasswordAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = "Bir hata oluştu şifre yenileme linki geçersiz";
      })
      .addCase(GetAllUserAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(GetAllUserAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(GetAllUserAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = "Bir hata oluştu";
      })
      .addCase(DeleteUserByAdminAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.deleted = true;
      })
      .addCase(DeleteUserByAdminAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(DeleteUserByAdminAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = "Bir hata oluştu";
      })
      .addCase(UpdateUserBlockedAsync.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.message= "İşlem Başarılı"
      })
      .addCase(UpdateUserBlockedAsync.pending, (state, action) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(UpdateUserBlockedAsync.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = "Bir hata oluştu";
      });
  },
});

export default UserSlice.reducer;
