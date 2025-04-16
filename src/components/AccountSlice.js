import api from "../app/api";

const accountApi = api.injectEndpoints({
  endpoints: (build) => ({
    addAccount: build.mutation({
      query: ({ firstname, lastname, email, password }) => ({
        url: "/users/register",
        method: "POST",
        body: {
          firstname,
          lastname,
          email,
          password,
        },
      }),
    }),
    loginAccount: build.mutation({
      query: ({ email, password }) => ({
        url: "/users/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["User", "Reservations"],
    }),
    getUserDetails: build.query({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
    getUserReservations: build.query({
      query: () => "/reservations",
      providesTags: ["Reservations"],
    }),

    returnBook: build.mutation({
      query: (reservationId) => ({
        url: `/reservations/${reservationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Reservations"],
    }),
  }),
});

export const {
  useAddAccountMutation,
  useLoginAccountMutation,
  useGetUserDetailsQuery,
  useGetUserReservationsQuery,
  useReturnBookMutation,
} = accountApi;
