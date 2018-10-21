import * as React from 'react'
import App, { Container } from 'next/app'
import { injectGlobal } from 'react-emotion'

import { Layout } from '../components/layouts'

injectGlobal(`
  #__next {
    height: 100%;
  }
`)

class Root extends App {
  render() {
    const { Component } = this.props

    return (
      <Container>
        <Layout>
          <Component />
        </Layout>
      </Container>
    )
  }
}

export default Root
