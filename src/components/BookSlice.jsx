import { data } from "react-router-dom";
import api from "../../store/api";
import { createSlice } from "@reduxjs/toolkit";



const booksApi = api.injectEndpoints({
    endpoints: (build) => ({
      getBook: build.query({
        query: (bookId) => ({
          url: `/books/${bookId}`,
          method: "GET",
        }),
        providesTags: ["Books"],
      }),
    //   getPuppies: build.query({
    //     query: () => ({
    //       url: `/players`,
    //       method: "GET",
    //     }),
    //     providesTags: ["Puppy"],
    //   }),
    //   deletePuppy: build.mutation({
    //     query: (puppyId) => ({
    //       url: `/players/${puppyId}`,
    //       method: "DELETE",
    //     }),
    //     invalidatesTags: ["Puppy"],
    //   }),
    //   addPuppy: build.mutation({
    //     query: (puppyId) => ({
    //       url: `/players/${puppyId}`,
    //       method: "POST",
    //       body: {name, data, status }
    //     }),
    //     invalidatesTags: ["Puppy"],
    // })
    })
})