import {useEffect, useState} from "react";
import '../styles/globals.css'
import {useRouter} from "next/router";
import Loading from "../components/loading";
import initFirebase from "../lib/firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";

function MyApp({Component, pageProps}) {

  const {pathname} = useRouter()
  const [loading, setLoading] = useState(true)

  initFirebase()

  useEffect(() => {
    if (window.localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(getAuth(), async user => {
      if (user) {
        if (pathname === '/') {
          window.location.href = '/dashboard'
        } else {
          setLoading(false)
        }
      } else {
        if (pathname !== '/') {
          window.location.href = '/'
        } else {
          setLoading(false)
        }
      }
    })
  }, [pathname]);

  if (loading)
    return <Loading/>

  return <Component {...pageProps} />
}

export default MyApp
