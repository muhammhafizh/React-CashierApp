import axios from 'axios'
import React, { Component } from 'react'
import {Button, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/constants'

export default class Sukses extends Component {
  componentDidMount() {
    axios.get(API_URL+"keranjangs")
      .then((res) => {
        // handle success
        const keranjangs = res.data;
        keranjangs.map((item) => {
          return axios
                    .delete(API_URL+"keranjangs/"+item.id)
                    .then((res) => console.log(res))
                    .catch(err => console.error(err))

        })
      })
      .catch((error) => {
        // handle error
        console.error(error);
      })
  }

  render() {
    return (
      <div className='mt-4 text-center'>
          <Image src='assets/images/success.png' width="500"/>
          <h2>Sukses Pesan</h2>
          <p>TerimaKasih Sudah Memesan</p>
          <Button variant='primary' as={Link} to="/">
            Kembali
          </Button>
      </div>
    )
  }
}
