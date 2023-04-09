import AuthRoute from '@/components/AuthRoute'
import CreateRoomForm from '@/components/CreateRoomForm'
import RoomsList from '@/components/RoomsList'
import DotLoader from '@/components/DotLoader'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'
import useRooms from '@/hooks/useRooms'
import styles from '@/styles/Index.module.css'
import RoomsFilters from '@/components/RoomsFilters'
import Button from '@/components/Button'

const Home: React.FC = () => {
  const { rooms, query, showEmpty, handleQueryChange, handleShowEmptyChange, refreshRoomList } = useRooms()

  return (
    <SocketConnectedRoute>
      <AuthRoute>
        <section className={styles.section}>
          <header className={styles.section_header}>
            <CreateRoomForm />
            <RoomsFilters
              queryValue={query}
              showEmptyValue={showEmpty}
              onQueryChange={handleQueryChange}
              onShowEmptyChange={handleShowEmptyChange}
            />
          </header>
          <div className={styles.rooms_container}>
            <h3>Rooms: {rooms?.length}</h3>
            <div className={styles.rooms}>
              {
                rooms === undefined
                  ? <DotLoader />
                  : <RoomsList rooms={rooms} />
              }
            </div>
          </div>
          <footer className={styles.rooms_footer}>
            <Button onClick={refreshRoomList}>Refresh</Button>
          </footer>
        </section>
      </AuthRoute>
    </SocketConnectedRoute>
  )
}

export default Home
