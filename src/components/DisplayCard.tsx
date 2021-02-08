import React from 'react';
import {
  Card, CardText, CardBody, CardTitle, CardDeck, CardGroup
} from 'reactstrap';
import "../style/DisplayCard.css";

interface AddProps {
    id: string
    title: string;
    teaser: string;
    category: string;
}

const Displaycard: React.FunctionComponent<AddProps> = ({ id, title, teaser, category }) => {

return (
    <div >
        <CardGroup className='displayCard' >
          <Card key={id} className='displayCard__contents'>
            <CardBody>
              <CardTitle tag="h5" font-weight-bold='true' >{title}</CardTitle>
              <CardText>{category}</CardText>
              <CardText>{teaser}</CardText>
            </CardBody>
          </Card>
        </CardGroup>
    </div>        
    )
}

export default Displaycard
