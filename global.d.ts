import { NextPage } from 'next'
import { ReactNode } from 'react'

type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactNode) => ReactNode
}
