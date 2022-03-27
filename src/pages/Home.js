import { Row, Col, Container } from "react-bootstrap";
import ListCategories from "../components/listCategories"
import Hasil from "../components/hasil"
import React, { Component } from 'react'
import { API_URL } from "../utils/constants";
import axios from "axios";
import Menus from "../components/Menus";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
       categoryYangDipilih: "Makanan",
       keranjangs: []
    }
  }

  getListkeranjang = () => {
    axios.get(API_URL+"keranjangs")
      .then((res) => {
        // handle success
        const keranjangs = res.data;
        this.setState({ keranjangs })
      })
      .catch((error) => {
        // handle error
        console.error(error);
      })
  }

  componentDidMount() {
    axios.get(API_URL+"products?category.nama="+this.state.categoryYangDipilih)
      .then((res) => {
        // handle success
        const menus = res.data;
        this.setState({ menus })
      })
      .catch((error) => {
        // handle error
        console.error(error);
      })

      this.getListkeranjang()
  }

  changeCategory = (value) => {
    this.setState({
      categoryYangDipilih: value,
      menus: []
    })

    axios.get(API_URL+"products?category.nama="+value)
      .then((res) => {
        // handle success
        const menus = res.data;
        this.setState({ menus })
      })
      .catch((error) => {
        // handle error
        console.error(error);
      })
  }

  masukKeranjang = (value) => {
    axios.get(API_URL+"keranjangs?product.id="+value.id)
      .then((res) => {
        // handle success
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }
      
          axios.post(API_URL+"keranjangs", keranjang)
            .then((res) => {
              this.getListkeranjang()
              swal({
                title: 'Success',
                text: 'Sukses masuk keranjang'+keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              })
            })
            .catch((error) => {
              // handle error
              console.error(error);
            })
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value
          }

          axios.put(API_URL+"keranjangs/"+res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: 'Success',
                text: 'Sukses masuk keranjang'+keranjang.product.nama,
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
      })
      .catch((error) => {
        // handle error
        console.error(error);
      })
  }

  render() {
    const { menus, categoryYangDipilih, keranjangs } = this.state
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
          <ListCategories changeCategory={this.changeCategory} categoryYangDipilih={categoryYangDipilih}/>
            <Col>
              <h4><strong>Daftar Produk</strong></h4>
              <hr />
              <Row className="overflow-auto menu">
                { menus && menus.map((menu) =>
                  <Menus 
                    key={menu.id} 
                    menu={menu}
                    masukKeranjang = {this.masukKeranjang}
                  />
                )}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListkeranjang={this.getListkeranjang}/>
          </Row>
        </Container>
      </div>
    )
  }
}