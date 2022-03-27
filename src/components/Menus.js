import { Card, Col } from 'react-bootstrap'
import React from 'react'

const Menus = ({menu, masukKeranjang}) => {
  return (
    <Col md={4} xs={6} className="mb-4" onClick={() => masukKeranjang(menu)}>
        <Card key={menu.id} className="shadow">
            <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
            <Card.Body>
                <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
                <Card.Text>
                   RP {menu.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default Menus