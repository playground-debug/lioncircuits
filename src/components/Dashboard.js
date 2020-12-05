import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { containerStyle, itemStyle } from '../App.style';
import { productsList } from '../utils/Constant.utils';

function Dashboard(props) {

  const products = productsList

  const CardView = (product) => {
    return (
      <div style={itemStyle} data-testid="product-card">
        <Card style={{ width: '18rem' }}>
          <Card.Img data-testid="product-card-image" variant="top" src={product.image} height="200px" />
          <Card.Body>
            <Row>
              <Col md={4}><Card.Title>{product.name}</Card.Title></Col>
              <Col md={{ span: 4, offset: 4 }}><Card.Title>{product.price}</Card.Title></Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    )
  }

  const productsView = () => {
    return (
      products.map((product) => {
        return (CardView(product))
      }
      )
    )
  }

  return (
    <div>
      <div style={containerStyle}>
        {productsView()}
      </div>
    </div>
  )
}

export default Dashboard;