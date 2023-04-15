import EyeSlashIcon from '../Icons/EyeSlashIcon'
import OpenEyeIcon from '../Icons/OpenEyeIcon'
import styles from './RoomsFilters.module.css'

type ReactInputChangeEvtFn = (evt: React.ChangeEvent<HTMLInputElement>) => void

interface Props {
  showEmptyValue: boolean
  queryValue: string
  onShowEmptyChange: ReactInputChangeEvtFn
  onQueryChange: ReactInputChangeEvtFn
}

const RoomsFilters: React.FC<Props> = ({ showEmptyValue, queryValue, onShowEmptyChange, onQueryChange }) => {
  return (
    <div className={styles.container}>
      <input className={styles.search} type='text' placeholder="Search room" onChange={onQueryChange} value={queryValue} />
      <label className={styles.show_empty}>
        <span>Empty rooms</span>
        {showEmptyValue ? <OpenEyeIcon /> : <EyeSlashIcon />}
        <input type='checkbox' onChange={onShowEmptyChange} checked={showEmptyValue} />
      </label>
    </div>
  )
}

export default RoomsFilters
