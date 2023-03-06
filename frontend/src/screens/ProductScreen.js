import { useParams } from 'react-router-dom';
import React, {useState,useEffect} from 'react'
import products from '../products';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails} from '../actions/productActions'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


// function ProductScreen() {
//   const { id } = useParams();
//   const product = products.find(p => p._id === id);

function ProductScreen() {
    const history = useNavigate();
    const [qty, setQty] = useState(1)
    const dispatch=useDispatch()
    const productDetails= useSelector(state=>state.productDetails)
    const {loading,error, product}=productDetails
    const { id } = useParams();

    useEffect(()=>{
        dispatch(listProductDetails(id))
        // async function fetchProduct(){
        //     const {data}= await axios.get(`/api/products/${id}`)
        //     setProduct(data)
        // }
        // fetchProduct()
        // console.log(`/api/products/${id}`)
    },[dispatch])
    const addToCartHandler = () => {
        history(`/cart/${id}?qty=${qty}`)
    }

 

  return (
    <div>
      <Link to="/" className='btn btn-light my-3'>Go back</Link>
      {
            loading?<Loader />
            :error?<Message variant="danger">{error}</Message>
            :
            <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </ListGroup.Item>
                <ListGroup.Item>
                    price:${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Description:{product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                <Row>
                        <Col>Status:</Col>
                        <Col>{ product.countInStock>0 ? 'In Stock' : 'Out of Stock'}</Col>
                    </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {

                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}
                <ListGroup.Item>
                    <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock==0}  type='button'> Add to Cart</Button>
                </ListGroup.Item>
                
            </ListGroup>
        </Col>
      </Row>
        }
     
      
    </div>
  );
}

export default ProductScreen;
