import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link';
import { Container, Row } from "react-bootstrap";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Container className="my-5">
          <Row>
            <Link href="/"><h2>Home</h2></Link>
          </Row>
          <Main />
        </Container>
        <NextScript />
      </body>
    </Html>
  )
}
