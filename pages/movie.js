import React from 'react';
import Fetch from "isomorphic-unfetch";
import  Layout  from "../components/Layout";
import  Relatedvideos  from "../components/Relatedvideos";
import Link from 'next/link';
import axios from 'axios';

/*const Index = (props) => (
    <Layout>
    <div>
   <h1>{props.movie.original_title}</h1> </div>
    <Relatedvideos movieid={props.movie.id}/>
    </Layout>
); */

//Index.getInitialProps = async function(){

 // calling movie detail service
//const res = await fetch('http://demo9371423.mockable.io/movie/299534');
//const data = await res.json();
//return {
   // movie: data
//}
//}


class Movie extends React.Component {
    static getInitialProps ({ query: { id } }) {
        return { id };
      }

      constructor(props) {
        super(props);
        this.state = {
             movie: null
        };
         this.fetchData = this.fetchData.bind(this);
       }
       componentDidMount() {
        this.fetchData();
        console.log('error - fetching data');
      }
      fetchData() {
        this.setState(() => {
          axios.get('/api/movie/' + this.props.id)
            .then((response) => {
              this.setState({
                movie: response.data
               });
               alert('got data');
            })
            .catch((error) => {
              console.log('error - fetching data');
            });
        });
      }
    
      render() {
        return (
          <Layout>
        <div className='container'>
           <h1>  Welcome to react Movie App </h1>
           <h2>{this.state.movie}</h2>
            </div>
          </Layout>
        );
      }

}


export default Movie;