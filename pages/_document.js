import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDoc extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />

          <link
            href="/favicon.ico"
            rel="favicon"
          />

          <link rel="apple-touch-icon" href="/brand.png" />

          <link rel="preconnect" href="//fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>

          <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}
