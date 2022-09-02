import Footer from '../common/Footer'
import Header from '../common/Header'
// import MenuSideLeft from '../common/MenuSideLeft'

const PrivateLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        {/* <MenuSideLeft /> */}
        <div className="w-full bg-slate-400">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default PrivateLayout
