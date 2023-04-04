type ReactInputChangeEvtFn = (evt: React.ChangeEvent<HTMLInputElement>) => void

interface Props {
  showEmptyValue: boolean
  queryValue: string
  onShowEmptyChange: ReactInputChangeEvtFn
  onQueryChange: ReactInputChangeEvtFn
}

const RoomsFilters: React.FC<Props> = ({ showEmptyValue, queryValue, onShowEmptyChange, onQueryChange }) => {
  return (
    <div>
      <input type='text' placeholder="Search room" onChange={onQueryChange} value={queryValue} />
      <label>
        <span>Show empty</span>
        <input type='checkbox' onChange={onShowEmptyChange} checked={showEmptyValue} />
      </label>
    </div>
  )
}

export default RoomsFilters
