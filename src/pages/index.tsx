import AuthRoute from '@/components/AuthRoute'
import CreateRoomForm from '@/components/CreateRoomForm'
import RoomsList from '@/components/RoomsList'
import DotLoader from '@/components/DotLoader'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'
import useRooms from '@/hooks/useRooms'
import styles from '@/styles/Index.module.css'
import RoomsFilters from '@/components/RoomsFilters'

const Home: React.FC = () => {
  const { rooms, query, showEmpty, handleQueryChange, handleShowEmptyChange } = useRooms()

  return (
    <SocketConnectedRoute>
      <AuthRoute>
        <section className={styles.section}>
          <RoomsFilters
            queryValue={query}
            showEmptyValue={showEmpty}
            onQueryChange={handleQueryChange}
            onShowEmptyChange={handleShowEmptyChange}
          />
          <div className={styles.rooms}>
            {
              rooms === undefined
                ? <DotLoader />
                : <RoomsList rooms={rooms} />
            }
          </div>
            <CreateRoomForm />
        </section>
      </AuthRoute>
    </SocketConnectedRoute>
  )
}

export default Home
