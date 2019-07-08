
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import {Col,Button} from 'react-bootstrap';

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
`;

const StyleImage = styled.img`
height:100%;
width:100%;
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
        <SizedContainer relatedImageContainer >
            <StyleImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXaZ6Kk_PGPJcHWneAqzNc2eniBigt2IuBhuTwD-JIt3-K4e0V"/>
         </SizedContainer>
         <Paragraph text> {video.title} </Paragraph>
         <SizedContainer>
            <Button variant="primary" block >Play</Button>
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