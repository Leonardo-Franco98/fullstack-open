import { useState } from 'react'

const Toggleable = ({ buttonText, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  return (
    <>
      {!visible && <button onClick={toggleVisible}>{buttonText}</button>}
      {visible && (
        <>
          <div>
            {children}
          </div>
          <button onClick={toggleVisible}>Cancel</button>
        </>
      )}
    </>
  )
}

export default Toggleable