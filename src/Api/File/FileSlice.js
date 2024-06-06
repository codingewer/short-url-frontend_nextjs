import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const cloudKey = process.env.NEXT_PUBLIC_CLOUD_KEY;


export const UploadImage = createAsyncThunk("File/UploadImageAsync", async (file) => {
  try {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pkps8e7sd');
    formData.append('api_key',`${cloudKey}`);

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dsfggqsdp/image/upload',
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
  }
});
export const UploadVideo = createAsyncThunk("file/UploadVideo", async (file) => {
  try {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gfhbmczb');
    formData.append('api_key', `${cloudKey}`);

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dsfggqsdp/video/upload',
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
  }
});

const FileSlice = createSlice({
  name: "fileupload",
  initialState: {
    loading: false,
    success: false,
    url: '',
    videoUrl:''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UploadImage.fulfilled, (state, action) => {
        state.success = true
        state.url = action.payload
        state.loading = false
      })
      .addCase(UploadImage.pending, (state, action) => {
        state.loading = true
      })
      .addCase(UploadImage.rejected, (state, action) => {
        state.success = false
      })
      .addCase(UploadVideo.fulfilled, (state, action) => {
        state.success = true
        state.videoUrl = action.payload
        state.loading = false
      })
      .addCase(UploadVideo.pending, (state, action) => {
        state.loading = true
      })
      .addCase(UploadVideo.rejected, (state, action) => {
        state.success = false
      })
  }
})

export default FileSlice.reducer;