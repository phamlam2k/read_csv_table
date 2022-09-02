import { useEffect, useState } from 'react'

const Pagination = ({ total, handleIncrease, handleDecrease, handleInputNumber, page }) => {
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
        <div
          className={`p-2 bg-black text-[24px] cursor-pointer text-white ${page === 1 && 'cursor-not-allowed'}`}
          onClick={handleDecrease}
        >
          {'<'}
        </div>
        <div className="flex gap-2">
          {listPagination?.map((listIndex) => {
            if (listIndex < 5 || listIndex === total - 1 || listIndex === total - 2) {
              return (
                <div
                  key={listIndex}
                  onClick={() => handleInputNumber(listIndex)}
                  className={`cursor-pointer p-2 border-2 border-black ${listIndex === page && 'bg-gray-400'}`}
                >
                  {listIndex}
                </div>
              )
            } else if (listIndex === 5) {
              return (
                <div
                  key={listIndex}
                  onClick={() => page === 5 && handleInputNumber(listIndex)}
                  className={`cursor-pointer p-2 border-2 border-black ${
                    page >= 5 && page !== total - 1 && page !== total - 2 && 'bg-gray-400'
                  }`}
                >
                  {page < 5 || page === total - 1 || page === total - 2 ? '5' : page}
                </div>
              )
            } else if (listIndex === 6) {
              return <div>...</div>
            }
          })}
        </div>
        <div
          className={`p-2 bg-black text-[24px] cursor-pointer text-white ${page === total - 1 && 'cursor-not-allowed'}`}
          onClick={handleIncrease}
        >
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
