import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { API_URL } from '../utils/constants'
import { faUtensils, faCoffee, faCheese} from '@fortawesome/free-solid-svg-icons'

const Icon = ({nama}) => {
  if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2"/>
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee}/>
  if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2"/>

  return
}

export default class ListCategories extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    axios.get(API_URL+"categories")
      .then((res) => {
        // handle success
        const categories = res.data;
        this.setState({ categories })
      })
      .catch((error) => {
        // handle error
        console.error(error);
      })
  }

  render() {
    const { categories } = this.state
    const { changeCategory, categoryYangDipilih } = this.props

    return (
      <Col md={2} mt="2">
          <h4><strong>Daftar Kategori</strong></h4>
          <hr />
          <ListGroup>
            {categories && categories.map((category) => (
              <ListGroup.Item 
                key={category.id} 
                onClick={() => changeCategory(category.nama)}
                className={categoryYangDipilih === category.nama && "active"}
              >
                  <Icon nama={category.nama}/> {category.nama}
              </ListGroup.Item>
            ))}
          </ListGroup>
      </Col>
    )
  }
}
