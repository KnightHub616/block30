import { data } from "react-router-dom";
import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";



const bookApi = api.injectEndpoints({
    endpoints: (build) => ({
      getBook: build.query({
        query: (bookId) => ({
          url: `/books/${bookId}`,
          method: "GET",
        }),
        providesTags: ["Books"],
      }),
      getBooks: build.query({
        query: () => ({
          url: `/books`,
          method: "GET",
        }),
        providesTags: ["Books"],
      }),
      deleteBooks: build.mutation({
        query: (bookId) => ({
            url: `/books/${bookId}`,
            method: "DELETE",
        }),
        invalidatesTags: ["Books"],
      }),
      addBook: build.mutation({
        query: (bookId) => ({
          url: `/books/${bookId}`,
          method: "POST",
          body: {title, author, description }
        }),
        invalidatesTags: ["Books"],
    })
    })
});

const storeToken = (state, { payload }) => {
    localStorage.setItem("token", payload.token);
  };
  
  const bookSlice = createSlice({
    name: "books",
    initialState: {},
    reducers: {},
    extraReducers: (build) => {
      if (api.endpoints?.AddBooks?.matchFulfilled) build.addMatcher(api.endpoints.books.matchFulfilled, storeToken);
    },
  });
  
  
  export default bookSlice.reducer;
  
  export const {
    useGetBookQuery,
    useGetPBooksQuery,
    useAddBookMutation,
   useDeleteBookMutation,
  } = bookApi;