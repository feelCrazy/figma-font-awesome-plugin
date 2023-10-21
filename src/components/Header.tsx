import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons"

interface Props {}
export default function Header({}: Props) {
  return (
    <div className='flex justify-center gap-2 py-4 items-center font-semibold text-lg'>
      <FontAwesomeIcon
        icon={faFontAwesomeLogoFull}
        className='text-[#339af0]'
      />
      Font Awesome Icons
    </div>
  )
}
