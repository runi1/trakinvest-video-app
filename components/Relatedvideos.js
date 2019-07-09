
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import {Col} from 'react-bootstrap';

const Row = styled.div`
  margin-top:${props => props.marginForty ? '40px' : '20px'};
`;

const SizedContainer = styled.div`
${props => props.imageContainer && css` 
  width:150px;
  height:150px;
`};
height:${props => props.elementContainer ? '53px' : ''};
height:${props => props.actionContainer ? '40px' : ''};
${props => props.relatedImageContainer && css` 
height: 175px;
position: relative;
overflow: hidden;
display: block;
`};

${props => props.spacingContainer && css` 
padding: 0.7em;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
@media (max-width: 768px) {
  box-shadow:none;
  padding:0;
}

`};
${props => props.hideForSmallDevice && css` 
  height:56px;
  @media (max-width: 768px) {
    height:15px;
  }
`};
`;
const Paragraph = styled.p`
margin:${props => props.text ? '10px 0' : ''};
${props => props.text && css` 
  margin:10px 0;
  color:#5E6876;
  @media (max-width: 768px) {
    font-size:1.1em;
    font-weight:bold;
  }
`};
`;

const StyleImage = styled.img`
position: absolute;
top: 0;
left: 0;
width: 100%;
`;

const StyledButton = styled.button`

box-shadow:inset 0 0 0 2px rgba(231,35,42,0.65);
color:rgba(231,35,42,0.65);
height:2.8em;
line-height:1em;
border-radius:7px;
font-size: 0.9em;
font-weight: 700;
text-transform: uppercase;
&:hover{
  background-color:rgba(231,35,42,0.55);
  color:#fff;
   @media (max-width: 768px) {
    box-shadow:inset 0 0 0 2px rgba(231,35,42,0.65);
    color:rgba(231,35,42,0.65);
  }
}

`;
class Relatedvideos extends Component {
   constructor(props){
   super(props)
    this.props = props 
    this.state = {
        relatedMovieList: []
   };
   this.fetchRelatedVideoList = this.fetchRelatedVideoList.bind(this);
   }
   componentDidMount() {
    this.fetchRelatedVideoList(); 
 }

 fetchRelatedVideoList() {
    fetch('http://demo9371423.mockable.io/movie/'+this.props.id+'/related')
     .then(response => response.json())
     .then(
       (data) => {
         this.setState({
            relatedMovieList: data.results
         });
       },
       (error) => {
         this.setState({
            relatedMovieList: []
         });
       }
     )
}


render() { 
    const { relatedMovieList } = this.state;
    const videoList = relatedMovieList.slice(0,4).map((video) =>
        <Col sm={3} className="grid-column" key={video.id}>
        <SizedContainer spacingContainer>
        <SizedContainer relatedImageContainer>
            <StyleImage src="/static/images/justice-league.jpg"/>
         </SizedContainer>
         <Paragraph text> {video.title} </Paragraph>
         <StyledButton variant="primary" block className="btn btn-block">Play</StyledButton>
        </SizedContainer>
        </Col>
        );
    return(
          <Row  className="row related-videos-list">   
            {videoList}
         </Row>
   
 )
    }
}

export default Relatedvideos;