import axios from 'axios'
import { createContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { DEV_URL } from '../Constants/apiUrls'
import { electionId } from '../Services'
import { getWeb3, logOut, submitPublicKey } from '../Services/loginServices'

interface AppContextProps {
  account: string | null
  balance: string | null
  isConnected: boolean
  isRightNetwork: boolean
  publicKeySubmitted: boolean
  sendPublicKey: any
  errMsg: string
  openErrDialog: boolean
}

export const AppContext = createContext<AppContextProps>({
  balance: null,
  isConnected: true,
  isRightNetwork: true,
  account: null,
  publicKeySubmitted: false,
  sendPublicKey: () => {},
  errMsg: '',
  openErrDialog: false,
})

declare const window: any
export const AppProvider: React.FC<{}> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true)
  const [account, setAccount] = useState('')
  const [isRightNetwork, setIsRightNetwork] = useState(true)
  const [balance, setBalance] = useState('')
  const [publicKeySubmitted, setPublicKeySubmitted] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [openErrDialog, setOpenErrDialog] = useState(false)
  let history = useHistory()

  //Metamask
  //Fetching initial values of account, network and balance
  useEffect(() => {
    async function checkMetaMask() {
      if ((window as any)?.ethereum?.isConnected()) {
        const web3 = getWeb3()
        const accounts = await web3.eth.getAccounts()
        if (accounts.length === 0) {
          setIsConnected(false)
        } else {
          setIsConnected(true)
          setAccount(accounts[0])
          const balance = await web3.eth.getBalance(accounts[0])
          setBalance(web3.utils.fromWei(balance))
          // const netId = await web3.eth.net.getId();
          // setIsRightNetwork(netId.toString() === networkChainId);
          setIsRightNetwork(true)
        }
      } else {
        setIsConnected(false)
      }
    }
    checkMetaMask()
  }, [isConnected])

  //Listeners to account change, network change and lock account
  useEffect(() => {
    const web3 = getWeb3()
    if ((window as any).ethereum) {
      ;(window as any).ethereum.on('chainChanged', async () => {
        logOut()
        const netId = await web3.eth.net.getId()
        // setIsRightNetwork(netId.toString() === networkChainId);
        setIsRightNetwork(true)
        let accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        if (accounts.length === 0) {
          setIsConnected(false)
        } else {
          setIsConnected(true)
          let balance = await web3.eth.getBalance(accounts[0])
          setBalance(web3.utils.fromWei(balance.toString()))
        }
      })
      ;(window as any).ethereum.on('accountsChanged', async () => {
        logOut()
        let accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        if (accounts.length === 0) {
          setIsConnected(false)
        } else {
          setIsConnected(true)
          let balance = await web3.eth.getBalance(accounts[0])
          setBalance(web3.utils.fromWei(balance))
        }
      })
      ;(window as any).ethereum.on('disconnect', () => {
        logOut()
        console.log('metamask disconnect')
        setIsConnected(false)
      })
      ;(window as any).ethereum.on('connect', () => {
        console.log('metamask connected')
        setIsConnected(true)
      })
    }
  }, [])

  useEffect(() => {
    let publickKey = localStorage.getItem('publicKey')
    if (publickKey) setPublicKeySubmitted(true)
  }, [])

  const sendPublicKey = async () => {
    // console.log(
    //   elgamal_public_key,
    //   "elgamal_public_key",
    //   commitment_hash,
    //   "commitment_hash"
    // );

    try {
      const response: any = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/api/v1/key/ceremony/publish?key_name=${process.env.REACT_APP_KEY_NAME}`,
        { election_id: electionId },
      )

      console.log(response, 'res from publish')

      // if (elgamal_public_key !== null && commitment_hash !== null) {
      // setPending(true);

      // console.log("response", response);

      const statusContract: any = await submitPublicKey(
        response.data.elgamal_public_key,
        account,
      )

      if (statusContract) {
        console.log('public key set', statusContract)
        setPublicKeySubmitted(true)
        localStorage.setItem('publicKey', response.data.commitment_hash)
      } else {
        throw new Error('Please wait for other guardians confirmation.')
      }
      // } else {
      //   throw new error("Please refresh and try again later.");
      // }

      // window.location = "/election-contest";
      // history.push("/election-contest");
    } catch (e) {
      console.log(e)

      setOpenErrDialog(!openErrDialog)
      if (e.toString().includes('denied'))
        throw new Error('User denied transaction')
      else throw new Error(e.message)
    }
  }

  return (
    <AppContext.Provider
      value={{
        isRightNetwork,
        balance,
        isConnected,
        account,
        publicKeySubmitted,
        sendPublicKey,
        errMsg,
        openErrDialog,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
