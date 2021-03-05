import styled from '@emotion/styled'
import { NextPage } from 'next'

type Props = {
  statusCode?: number
}

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Error: NextPage<Props, unknown> = ({ statusCode }) => {
  return (
    <Root>
      {(() => {
        if (statusCode)
          return statusCode === 404
            ? 'Oops, missing page'
            : `An error ${statusCode} occurred on server`
        else return 'An error occurred on client'
      })()}
    </Root>
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
