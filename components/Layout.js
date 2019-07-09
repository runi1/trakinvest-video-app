import Head from "next/head";
import styled, { css } from 'styled-components';
import Link from 'next/link'

const Layout = (props) => (
    <div className="main-container">
    <header id="header">
    <h1 id="logo"><span>&#9775;</span> <Link href='/movie/299534'><a>Trakinvest</a></Link></h1>
    <nav id="nav"><ul> 
     <li><Link href='/movie/299534'><a>Home</a></Link></li>
     <li><Link href=''><a>About US</a></Link></li>
     </ul>
     </nav>
     </header>
     <div className="">
    
    <Head>
    <title>Watch Trakinvest Videos</title>
      <meta charSet='utf-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
       <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <link rel="stylesheet"href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
  integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>
   <link rel="stylesheet" href="/static/css/styles.css"/>
   </Head>
   {props.children}
    </div>
    <footer id="footer"><p class="copyright">© Untitled. All rights reserved.<br/> <a href="#">Terms of Use</a> | <a href="#">Privacy Policy</a> | <a href="#">Contact</a></p> </footer>
    </div>
);

export default Layout;