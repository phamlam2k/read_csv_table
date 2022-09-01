import { useEffect, useState } from 'react'

const Pagination = ({ total, handleIncrease, handleDecrease, handleInputNumber }) => {
  const [listPagination, setListPagination] = useState([])

  useEffect(() => {
    if (total > 0) {
      setListPagination([])
      for (let i = 1; i <= total; i++) {
        setListPagination((prev) => [...prev, i])
      }
    }
  }, [total])

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleInputNumber(Number(e.target.value))
    }
  }

  return (
    <div className="w-fit">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-black text-[24px] cursor-pointer text-white" onClick={handleDecrease}>
          {'<'}
        </div>
        <div className="flex gap-2">
          {listPagination?.map((listIndex) => {
            if (listIndex < 6 || listIndex === total - 1 || listIndex === total - 2) {
              return (
                <div key={listIndex} onClick={() => handleInputNumber(listIndex)}>
                  {listIndex}
                </div>
              )
            } else if (listIndex === total / 2 - 1) {
              return <div>...</div>
            }
          })}
        </div>
        <div className="p-2 bg-black text-[24px] cursor-pointer text-white" onClick={handleIncrease}>
          {'>'}
        </div>
        <div>
          <input type={'number'} min={1} max={total - 1} className="w-[30px]" onKeyDown={onKeyDown} />
        </div>
      </div>
    </div>
  )
}

export default Pagination
