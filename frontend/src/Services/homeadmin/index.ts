import { API } from "../base";

const homeadminAPI = API.injectEndpoints({
  endpoints: (build) => ({
      addManagedUser: build.mutation(
        {
          query: ({email, user_ID}) => ({
            url: `homeadmin/addManagedUser/${user_ID}`,
            method: 'POST',
            body: {
              "email": email,
            },
          }),
        }
      ),
      getManagedUser: build.query(
        {
          query: ({user_ID}) => `homeadmin/getManagedUser/${user_ID}`,
        }
      ),
      deleteManagedUser: build.mutation(
        {
          query: ({user_ID}) => ({
            url : `homeadmin/removeSupervisorID/${user_ID}`,
            method: 'PATCH',
          })  
        },
      )
  }),
  overrideExisting: true,
});


export const { 
  useAddManagedUserMutation, 
  useLazyGetManagedUserQuery, 
  useGetManagedUserQuery,
  useDeleteManagedUserMutation } = homeadminAPI;