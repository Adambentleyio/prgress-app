import { useGetExercisesQuery } from "./exercisesApiSlice"
import Exercise from './Exercise'
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from 'react-spinners'

const ExercisesList = () => {

    // const { username, isManager, isAdmin } = useAuth();

      const {
          data: exercises,
          isLoading,
          isSuccess,
          isError,
          error
      } = useGetExercisesQuery('exercisesList', { /*options for listening and then dispatching new queries to redux store */
          pollingInterval: 60000,
          refetchOnFocus: true,
          refetchOnMountOrArgChange: true
      })

      let content

      if (isLoading) {
          content = <PulseLoader color={'#fff'} />
      }

      if (isError) {
          content = <p className="errmsg">{error?.data?.message}</p>
      }

      if (isSuccess) {

          const { ids, entities } = exercises

        //   let filteredIds
        //   if (isManager || isAdmin) {
        //     filteredIds = [...ids]
        //   } else {
        //     filteredIds = ids.filter(exerciseId => entities[exerciseId].username === username)
        //   }

        //   const tableContent = ids?.length && filteredIds.map(exerciseId => <Exercise key={exerciseId} noteId={exerciseId} />)
          const tableContent = ids?.map(exerciseId => <Exercise key={exerciseId} exerciseId={exerciseId} />)

          content = (
              <div style={{overflowX: "auto"}}>
                  <table className="table table--notes">
                      <thead className="table__thead">
                          <tr>
                              <th scope="col" className="table__th note__status">Status</th>
                              <th scope="col" className="table__th user__created">Created</th>
                              <th scope="col" className="table__th user__updated">Updated</th>
                              <th scope="col" className="table__th user__title">Title</th>
                              <th scope="col" className="table__th user__owner">Owner</th>
                              <th scope="col" className="table__th user__edit">Edit</th>
                          </tr>
                      </thead>
                      <tbody>
                          {tableContent}
                      </tbody>
                  </table>
              </div>
          )
      }

      return content
  }
  export default ExercisesList