import { useGetNotesQuery } from "./notesApiSlice"
import Note from './Note'
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from 'react-spinners'


const NotesList = () => {

  const { username, isManager, isAdmin } = useAuth();

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', { /*options for listening and then dispatching new queries to redux store */
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

        const { ids, entities } = notes

        let filteredIds
        if (isManager || isAdmin) {
          filteredIds = [...ids]
        } else {
          filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)

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
export default NotesList