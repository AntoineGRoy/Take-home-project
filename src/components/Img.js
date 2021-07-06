import React, { PureComponent } from 'react';
import placeHolder from '../svg/placeHolder.svg';

//Img component allows lazy loading of the students pictures
//using the class component to show I can...

class Img extends PureComponent { 
    componentDidMount() {
      //if the img element reaches the intersection assign the source to the image
      //otherwise src is a grey svg called placeholder
        this.observer = new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                const { isIntersecting } = entry;
                if (isIntersecting) {
                  this.element.src = this.props.source;
                  this.observer = this.observer.disconnect();
                }
              });
            },
            {
              root: document.querySelector(".StudentsList")
            }
          );
        this.observer.observe(this.element);
      }

    render() {
      return <img ref={el => this.element = el} width={this.props.width} height={this.props.height} src={placeHolder} alt={this.props.alt}/>;
    }
  }
  export default Img;