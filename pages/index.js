import React, { Component } from 'react';
import Fetch from 'isomorphic-unfetch';
import { If, Then, Else } from 'react-if';
import styled, { css } from 'styled-components';
import { Container, Col, Button,Alert} from 'react-bootstrap';
import localStorage from 'local-storage-fallback';

import Layout from "../components/Layout";
import Relatedvideos from "../components/Relatedvideos";


const Row = styled.div`
  margin-top:${props => props.marginForty ? '40px' : '20px'};
  margin-top:${props => props.noMargin ? '0' : '20px'};
`;
const TextSpan = styled.span`
   ${props => props.favorite &&
    css`
     font-size:1.3em;
     cursor:pointer;
     color:#FFD700;
     margin-left:0.4em;
  `};
  ${props => props.notFavorite &&
    css`
     font-size:1.3em;
     cursor:pointer;
     color:#fff;
     margin-left:0.4em;
  `};
   ${props => props.heading &&
    css`
     font-weight:bold;
     margin-right:10px;
  `};
   ${props => props.presentational &&
    css`
     float:left;
     padding-right:5px;
  `};
`;

const SizedContainer = styled.div`
${props => props.imageContainer && css` 
  width:150px;
  height:150px;
`};
${props => props.backgroundImageContainer && css` 
width:150px;
height:150px;
background-image: url('/static/images/avg-endgame.jpg');
background-repeat: no-repeat;
background-position: 17%;
background-size: cover;
border-radius: 4px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
`};
height:${props => props.elementContainer ? '53px' : ''};
height:${props => props.actionContainer ? '40px' : ''};
height:${props => props.relatedImageContainer ? '175px' : ''};
${props => props.hideForSmallDevice && css` 
  height:56px;
  @media (max-width: 768px) {
    height:15px;
  }
`};
`;

const Paragraph = styled.p`
margin:${props => props.text ? '10px 0' : ''};
color:#5E6876;
`;
const StyleImage = styled.img`
height:100%;
width:100%;
${props => props.ImageOverview && css` 
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
border-radius: 0.3em;
`};
`;
const StyleAction = styled.a`

`;
const HorizontalRow = styled.hr`
border-top:1px solid black;
`;

const StyleH1 = styled.h1`
letter-spacing: 0.05em;
font-size: 1.3em;
display: inline-block;
`;
const StyleH2 = styled.h2`
letter-spacing: 0.05em;
font-size: 1.3em;
color:#4d5968;
text-transform:uppercase;
margin-bottom:1em;
${props => props.SubHeading && css` 
  font-size:1em;
  margin-bottom:0;
`};
`;

const StyleSection = styled.section`

`;

class Index extends Component {
  static getInitialProps({ query: { id } }) {
    return { id };
  }


  constructor(props) {
    super(props);
    this.state = {
      movie: [],
      refresh: false,
      loading: true
    };
    this.fetchVideoDetail = this.fetchVideoDetail.bind(this);
    this.markFavorite = this.markFavorite.bind(this);
  }
  componentDidMount() {
    this.fetchVideoDetail();
  }
  fetchVideoDetail() {
    fetch('http://demo9371423.mockable.io/movie/' + this.props.id)
      .then(response => response.json())
      .then(
        (data) => {
          this.setState({
            movie: data,
            loading: false
          });
        },
        (error) => {
          this.setState({
            movie: [],
            loading: false
          });
        }
      )
  }


  markFavorite() {
    let needRefresh = this.state.refresh;
    let favMoviesList = localStorage.getItem('favoriteMovies') ? (localStorage.getItem('favoriteMovies')).split(',') : [];
    let index = favMoviesList.indexOf(String(this.state.movie.id));
    if (index > -1)
      favMoviesList.splice(index, 1);
    else
      favMoviesList.push(String((this.state.movie.id)));
    localStorage.setItem('favoriteMovies', favMoviesList);
    this.setState({ refresh: !needRefresh });
  }

  renderVideoDetail() {
    const { movie } = this.state;
    const loading = this.state.loading;
    const favoriteMovies = localStorage.getItem('favoriteMovies') ? (localStorage.getItem('favoriteMovies')).split(',') : [];
    // this.setState({ favoriteMovies: favoriteMovies });
    if(loading){
      return (<Alert className="alert-container">Loading ......</Alert>);
    }
    else if(!loading){
    if (movie.length == 0) {
      return (<Alert className="alert-container">No Movies Found !</Alert>);
    }
    else {
      let favMovieIcon;
      if (favoriteMovies.indexOf(String((movie.id))) > -1) {
        favMovieIcon = <TextSpan favorite onClick={this.markFavorite}>&#9733;</TextSpan>
      }
      else {
        favMovieIcon = <TextSpan notFavorite onClick={this.markFavorite}>&#9734;</TextSpan>
      } 

      return (
        <SizedContainer>
          <TextSpan presentational> </TextSpan>
          <StyleSection className="banner-container">
          <Container>
            <Row noMargin className="row">
              <Col sm={2}>
                <SizedContainer backgroundImageContainer>
                  <StyleAction href={movie.homepage} target='_blank'> </StyleAction>
                </SizedContainer>
              </Col>
              <Col sm={10}>
                <SizedContainer hideForSmallDevice>
                </SizedContainer>
                <SizedContainer elementContainer>
                  <StyleH1>{movie.title}</StyleH1>
                  {favMovieIcon}
                </SizedContainer>
                <SizedContainer actionContainer className="btn-actions">
                  <Button>Play</Button>
                  <Button>Watch Later</Button>
                  <Button>Share</Button>
                </SizedContainer>
              </Col>
            </Row>
            </Container>
            </StyleSection>
           
            <StyleSection className="moviedetail-container">
            <Container>
            <Row marginForty className="row">
              <Col sm={6}>
                <StyleH2>Overview</StyleH2>
                <Paragraph>{movie.overview}</Paragraph>
              </Col>
              <Col sm={6} style={{ height: '300px' }}>
                <StyleImage ImageOverview src="/static/images/avengers-endgame-overview.jpg" alt="avengers-endgame-overview" />
              </Col>
            </Row>
            <Row className="row">
              <Col sm={12}>
              <StyleH2 SubHeading>Related Videos </StyleH2>
              </Col>
            </Row>
            <Relatedvideos id={this.props.id} />
           </Container>
           </StyleSection>
        </SizedContainer>

      );
    }
  }
  }
  render() {

    return (
      <Layout>
        {this.renderVideoDetail()}
      </Layout>
    );
  }

}


export default Index;