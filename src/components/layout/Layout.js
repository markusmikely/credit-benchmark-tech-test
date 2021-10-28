import React from 'react'
import styled from 'styled-components'

const Page = styled.div`
  /* width: 100% */
`
const Container = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`
const Row = styled.div`
  margin-right: -15px;
  margin-left: -15px;
`
const Col = styled.div`
  width: 100%;
  float: left;
  position: relative;
  min-height: 1px;
`

const Layout = props => {

  return (
    <Page>
      <Container fluid>
        <Row>
          <Col>{props.children}</Col>
        </Row>
      </Container>
    </Page>
  )
}

export default Layout
