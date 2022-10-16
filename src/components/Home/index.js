import { useMemo } from 'react'
import { useEffect, useState } from 'react'
// import { useJwt } from 'react-jwt'
// import moment from 'moment'

import Pagination from '../../common/Pagination'
import PrivateLayout from '../../layout/PrivateLayout'

const Home = () => {
  const [dataFilter, setDataFilter] = useState([])
  // const [dataSearch, setDataSearch] = useState([])
  const [dataHeader, setDataHeader] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [dataCsv, setDataCsv] = useState(0)
  const [dataInformation, setDataInformation] = useState([])

  const getAccessToken = useMemo(() => {
    return localStorage.getItem('access_token_csv')
  }, [])
  // const { decodedToken } = useJwt(getAccessToken)

  useEffect(() => {
    if (dataInformation) {
      setDataHeader(dataInformation[0] || [])
    }
  }, [dataInformation])

  useEffect(() => {
    if (dataInformation?.length > 0) {
      setDataHeader()
      let arr = []
      setDataHeader(dataInformation[0])

      for (let i = page * 50 - 50; i < page * 50; i++) {
        arr.push(dataInformation[i] || [])
      }
      setDataFilter(arr)
      setTotal(Math.floor(dataInformation?.length / 50) + 2)
    }
  }, [dataInformation, page])

  useEffect(() => {
    if (dataCsv) {
      let arrData = []
      const arr = String(dataCsv).replace(',-,,', '')
      const test = arr?.split('\r\n')
      for (let i = 0; i < test?.length - 1; i++) {
        arrData?.push(test[i].split(','))
      }
      setDataInformation(arrData)
    }
  }, [dataCsv])

  const getDataInformation = async () => {
    try {
      const response = await fetch('http://dashboard.ulake.usth.edu.vn/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: '21112001',
          userName: 'KietLyanh',
        }),
      })

      const rawResponse = await response.json()

      if (rawResponse?.code === 200) {
        localStorage.setItem('access_token_csv', rawResponse?.resp)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getDataCsvTable = async () => {
    try {
      const response = await fetch('http://dashboard.ulake.usth.edu.vn/api/object/161188/fileData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken}`,
        },
      })

      const rawResponse = await response.text()

      setDataCsv(rawResponse)
    } catch (error) {}
  }

  const handleDecreasePage = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleIncreasePage = () => {
    if (page < total - 1) setPage(page + 1)
  }

  const handleInputNumber = (e) => {
    setPage(e)
  }

  useEffect(() => {
    void getDataInformation()
  }, [])

  useEffect(() => {
    void getDataCsvTable()
  }, [getAccessToken])

  return (
    <PrivateLayout>
      <div className="w-[100%] bg-slate-300">
        {/* <div className="w-[550px] mx-auto">
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
        </div> */}

        {/* <input
          placeholder="Search for title"
          className="w-[400px] rounded-3xl mx-auto mt-[20px] block py-3 pl-5"
          onKeyDown={handleSearch}
        /> */}

        {dataInformation && dataInformation.length > 0 ? (
          <div
            className={`w-[90%] mx-auto mt-[30px] ${
              dataInformation.length < 10 ? 'h-fit' : 'h-[650px]'
            } overflow-scroll`}
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
          {dataInformation && (
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
