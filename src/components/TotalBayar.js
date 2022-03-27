import axios from 'axios';
import React, { Component } from 'react'
import { Row, Col, Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import { API_URL } from '../utils/constants';

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(API_URL+"pesanans", pesanan)
            .then((res) => {
                this.props.history.push('/sukses')
            })
    }

  render() {

    const totalBayar = this.props.keranjangs.reduce((result, item) => {
        return result + item.total_harga
    }, 0)

    return (
        <div className='fixed-bottom'>
            <Row>
                <Col md={{ span: 3, offset: 9}}>
                    <h5>Total Harga : {" "} 
                        <strong className='float-right me-2'>
                           Rp {totalBayar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </strong>
                    </h5>
                    <div className="d-grid gap-2">
                        <Link 
                        className="btn btn-primary btn-md"
                        role="button"
                        to="/sukses"
                        >
                            <Button onClick={() => this.submitTotalBayar(totalBayar)}>
                                BAYAR
                            </Button>
                        </Link>
                    </div>
                </Col>
            </Row>
        </div>
    )
  }
}
