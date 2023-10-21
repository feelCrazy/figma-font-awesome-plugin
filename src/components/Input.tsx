import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons"

interface Props {
  value: string
  onChange: (val: string) => void
}
export default function Input({ value, onChange }: Props) {
  return (
    <div
      className='bg-gray-100 flex items-center
        px-3 sticky top-0 focus-within:bg-white 
        focus-within:outline outline-blue-500 
        -mx-4'
    >
      <div>
        <FontAwesomeIcon icon={faSearch} size='sm' />
      </div>
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type='text'
        className='w-full px-3 py-2 focus:bg-white bg-gray-100 outline-none text-sm'
        placeholder='Search...'
      />

      {value && (
        <div
          className='p-2'
          onClick={() => {
            onChange("")
          }}
        >
          <FontAwesomeIcon icon={faClose} size='sm' className='text-sky-600' />
        </div>
      )}
    </div>
  )
}
