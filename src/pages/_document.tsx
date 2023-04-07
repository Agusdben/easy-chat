import { Html, Head, Main, NextScript } from 'next/document'

const Document = (): JSX.Element => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id='modal'/>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
