import { useEffect, useState } from 'react'
import { useCSVReader } from 'react-papaparse'
import Pagination from '../../common/Pagination'
import PrivateLayout from '../../layout/PrivateLayout'

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  browseFile: {
    width: '20%',
    cursor: 'pointer',
  },
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  },
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  },
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  },
}

const Home = () => {
  const { CSVReader } = useCSVReader()
  const [data, setData] = useState()
  const [dataFilter, setDataFilter] = useState([])
  const [dataSearch, setDataSearch] = useState([])
  const [dataHeader, setDataHeader] = useState({})
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (data && dataSearch?.length === 0) {
      setDataFilter([])
      setDataHeader({})
      setDataHeader(data?.data[0])
      for (let i = page * 10 + 1 - 10; i <= page * 10; i++) {
        setDataFilter((prev) => [...prev, data?.data[i]])
      }
      setTotal(data?.data?.length / 10)
    }
  }, [data, page, dataSearch])

  useEffect(() => {
    if (dataSearch?.length > 0) {
      setDataFilter([])
      setDataHeader({})
      setDataHeader(data?.data[0])
      for (let i = page * 10 - 10; i <= page * 10; i++) {
        if (typeof dataSearch[i] !== 'undefined') setDataFilter((prev) => [...prev, dataSearch[i]])
      }

      setTotal(dataSearch?.length / 10)
    }
  }, [page, data, dataSearch])

  const handleInputNumber = (val) => {
    setPage(val)
  }

  const handleSearch = (e) => {
    if (data && e.keyCode === 13) {
      if (e.target.value === '') {
        setDataSearch([])
        setPage(1)
        return
      }
      setDataSearch([])
      data?.data?.map((item, index) => {
        if (index !== 0 && item[0].toLowerCase().includes(e.target.value.toLowerCase())) {
          setDataSearch((prev) => [...prev, item])
        }
      })
    }
  }

  const handleDecreasePage = () => {
    if (dataFilter?.length > 0 && page > 1) {
      setPage(page - 1)
    }
  }

  const handleIncreasePage = () => {
    if (page < total - 1) {
      setPage(page + 1)
    }
  }

  return (
    <PrivateLayout>
      <div className="w-[100%] bg-slate-300">
        <div className="w-[550px] mx-auto">
          <div className="text-[22px] text-center py-[20px]">Add file csv to convert to table in website</div>
          <div className="p-[10px] pt-[20px] shadow-xl bg-white text-black">
            <CSVReader
              onUploadAccepted={(results) => {
                setData(results)
              }}
            >
              {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
                <>
                  <div style={styles.csvReader}>
                    <button type="button" {...getRootProps()} style={styles.browseFile}>
                      Browse file
                    </button>
                    <div style={styles.acceptedFile}>{acceptedFile && acceptedFile.name}</div>
                    <button {...getRemoveFileProps()} style={styles.remove}>
                      Remove
                    </button>
                  </div>
                  <ProgressBar style={styles.progressBarBackgroundColor} />
                </>
              )}
            </CSVReader>
          </div>
        </div>

        <input
          placeholder="Search for title"
          className="w-[400px] rounded-3xl mx-auto mt-[20px] block py-3 pl-5"
          onKeyDown={handleSearch}
        />

        {data && dataFilter.length > 0 ? (
          <div
            className={`w-[90%] mx-auto mt-[30px] ${dataFilter.length < 10 ? 'h-fit' : 'h-[650px]'} overflow-scroll`}
          >
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">'>
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Order
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[0]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[1]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[2]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[3]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[4]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[5]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[6]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[7]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[8]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[9]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[10]}
                  </th>
                  <th scope="col" className="py-3 px-6">
                    {dataHeader[11]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataFilter?.map((item, index) => {
                  return (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="py-4 px-6 text-center">{index + 1}</td>
                      <td className="py-4 px-6">{item[0]}</td>
                      <td className="py-4 px-6">{item[1]}</td>
                      <td className="py-4 px-6">{item[2]}</td>
                      <td className="py-4 px-6">{item[3]}</td>
                      <td className="py-4 px-6">{item[4]}</td>
                      <td className="py-4 px-6">{item[5]}</td>
                      <td className="py-4 px-6">{item[6]}</td>
                      <td className="py-4 px-6">{item[7]}</td>
                      <td className="py-4 px-6">{item[8]}</td>
                      <td className="py-4 px-6">{item[9]}</td>
                      <td className="py-4 px-6">{item[10]}</td>
                      <td className="py-4 px-6">{item[11]}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-[90%] mx-auto mt-[30px] h-[550px] bg-white">
            <div className="w-[100%] text-center pt-[200px]">No data</div>
          </div>
        )}
        <div className="w-[90%] flex justify-end mt-[20px] pb-[30px]">
          {data && (
            <Pagination
              total={total}
              handleDecrease={handleDecreasePage}
              handleIncrease={handleIncreasePage}
              handleInputNumber={handleInputNumber}
              page={page}
            />
          )}
        </div>
      </div>
    </PrivateLayout>
  )
}

export default Home
