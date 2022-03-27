import axios from 'axios'
import React, { Component } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { API_URL } from '../utils/constants'
import ModalKeranjang from './ModalKeranjang'
import TotalBayar from './TotalBayar'
import swal from "sweetalert";

export default class Hasil extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: '',
      totalHarga: 0
    }
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah+1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
    })
  }

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah-1,
        totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
      }) 
    }
  }

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.handleClose()

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan
    }

    axios.put(API_URL+"keranjangs/"+this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListkeranjang()
        swal({
          title: 'Update pesanan',
          text: 'Sukses update pesanan'+data.product.nama,
          icon: "success",
          button: false,
          timer: 1500,
        })
      })
      .catch((error) => {
        // handle error
        console.error(error);
      })
  }

  hapusPesanan = (id) => {
    this.handleClose()

    axios.delete(API_URL+"keranjangs/"+id)
      .then((res) => {
        this.props.getListkeranjang()
        swal({
          title: 'Hapus pesanan',
          text: 'Hapus pesanan sukses'+this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1500,
        })
      })
      .catch((error) => {
        // handle error
        console.error(error);
      })
  }

  render() {
    const { keranjangs } = this.props
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
            <ListGroup variant="flush">
              {keranjangs.map((menuKeranjang) => (
                <ListGroup.Item
                  key={menuKeranjang.id}
                  onClick={() => this.handleShow(menuKeranjang)}
                >
                  <Row>
                    <Col xs={2}>
                      <Badge pill variant="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </Col>
                    <Col>
                      <h5>{menuKeranjang.product.nama}</h5>
                      <p>
                        Rp.{" "}
                        {menuKeranjang.product.harga
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </p>
                    </Col>
                    <Col>
                      <strong className="float-right">
                        Rp.{" "}
                        {menuKeranjang.total_harga
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}

              <ModalKeranjang
                handleClose={this.handleClose}
                {...this.state}
                tambah={this.tambah}
                kurang={this.kurang}
                changeHandler={this.changeHandler}
                handleSubmit={this.handleSubmit}
                hapusPesanan={this.hapusPesanan}
              />
            </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
