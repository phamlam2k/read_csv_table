const MenuSideLeft = () => {
  const MENU = [
    {
      label: 'Home',
      value: 'home',
    },
  ]

  return (
    <div className="w-[150px] bg-white shadow-lg">
      {MENU.map((item, index) => {
        return (
          <div className="w-[100%] py-3 pl-2 bg-gray-500 text-white hover:text-black hover:bg-gray-300 cursor-pointer">
            {item.label}
          </div>
        )
      })}
    </div>
  )
}

export default MenuSideLeft
