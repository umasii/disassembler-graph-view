import { Dispatch, SetStateAction, useState } from 'react'

interface INav {
  functions: Object
  selectedPointer: string
  setSelectedPointer: Dispatch<SetStateAction<string>>
}

function Nav({ functions, selectedPointer, setSelectedPointer }: INav) {
  const [search, setSearch] = useState('')

  return (
    <div className="h-full overflow-auto w-1/4 px-4">
      <div className="h-[40px] border-2 my-4 rounded">
        <input placeholder="Search Pointers" className="w-full h-full bg-transparent px-4" onInput={(e) => setSearch(e.currentTarget.value)} value={search} />
      </div>
      <div className="">
        {Object.entries(functions).map(([key, value]) => {
          if (key.toLowerCase().includes(search.toLowerCase())) {
            return (
              <div className={`border-[1px] rounded p-2 mb-4 ${selectedPointer !== key && 'opacity-60'} cursor-pointer`} key={key} onClick={() => setSelectedPointer(key)}>
                <div>Pointer: {key}</div>
                <div>Instructions: {value.length}</div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Nav
