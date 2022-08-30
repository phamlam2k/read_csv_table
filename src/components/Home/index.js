import { useState } from 'react'
import { useCSVReader } from 'react-papaparse'
import PrivateLayout from '../../layout/PrivateLayout'

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  browseFile: {
    width: '20%',
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

  console.log(data)

  return (
    <PrivateLayout>
      <div>
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
        <div></div>
      </div>
    </PrivateLayout>
  )
}

export default Home
