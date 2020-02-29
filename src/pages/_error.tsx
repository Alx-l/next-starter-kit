import { NextPage } from 'next'
import * as React from 'react'

type Props = {
  statusCode?: number
}

const Error: NextPage<Props, {}> = ({ statusCode }) => {
  return (
    <div className="flex justify-center items-center h-full">
      {(() => {
        if (statusCode)
          return statusCode === 404
            ? 'Oops, missing page'
            : `An error ${statusCode} occurred on server`
        else return 'An error occurred on client'
      })()}
    </div>
  )
}

Error.getInitialProps = ({ err, res }) => {
  const statusCode = (() => {
    if (err) return err.statusCode
    if (res) return res.statusCode
    else return 404
  })()

  return { statusCode }
}

export default Error
