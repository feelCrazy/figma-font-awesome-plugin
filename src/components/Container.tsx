import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as AllSolidIcons from "@fortawesome/free-solid-svg-icons"
import * as AllBrandIcons from "@fortawesome/free-brands-svg-icons"
import { useDeferredValue, useMemo, useState } from "react"
import Input from "./Input"

const allSolidIcons = Object.keys(AllSolidIcons).filter((item) => {
  return item !== "far" && item !== "prefix" && item !== "fas"
})
const allBrandIcons = Object.keys(AllBrandIcons).filter((item) => {
  return item !== "fab" && item !== "prefix" && item !== "fas"
})

export default function Container() {
  const [search, setSearch] = useState("")
  const deferredSearch = useDeferredValue(search)

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "drawIcon",
          files: {
            type: "image/svg+xml",
            data: e.currentTarget.innerHTML,
          },
        },
      },
      "*"
    )
  }

  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    parent.postMessage(
      {
        pluginDrop: {
          clientX: e.clientX,
          clientY: e.clientY,
          items: [
            {
              type: "image/svg+xml",
              data: e.currentTarget.innerHTML,
            },
          ],
          dropMetadata: {},
        },
      },
      "*"
    )
  }

  const allIcons = {
    ...AllSolidIcons,
    ...AllBrandIcons,
  }

  const allIconName = [...allSolidIcons, ...allBrandIcons]

  const allIconMemo = useMemo(() => {
    return allIconName
      .filter((el) => el.toLowerCase().includes(search))
      .map((item, i) => (
        <div
          className='cursor-move hover:shadow-md hover:bg-gray-50 rounded-md'
          key={item + i}
        >
          <div
            draggable='true'
            onClick={onClick}
            onDragEnd={onDrag}
            className='p-3 flex justify-center items-center'
          >
            {
              <FontAwesomeIcon
                // @ts-ignore
                icon={allIcons[item]}
                width={32}
                height={32}
                size='xl'
              />
            }
          </div>
        </div>
      ))
  }, [deferredSearch])

  const handleChange = (value: string) => {
    setSearch(value)
  }

  return (
    <>
      <Input value={search} onChange={handleChange} />
      <div className='grid grid-cols-5 gap-2 py-4'>{allIconMemo}</div>
    </>
  )
}
