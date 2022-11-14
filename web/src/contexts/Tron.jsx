import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const context = createContext()

export const useTron = () => useContext(context)

export const TronProvider = ({ children }) => {
  const [account, setAccount] = useState()

  const value = { account }

  useEffect(() => {
    if (!account) {
      const interval = setInterval(async () => {
        if (window.tronWeb && window.tronWeb.ready) {
          window.tronWeb.trx
            .getAccount(window.tronWeb.defaultAddress.base58)
            .then(setAccount)
        }
      }, 2000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [account])

  return <context.Provider value={value}>{children}</context.Provider>
}
