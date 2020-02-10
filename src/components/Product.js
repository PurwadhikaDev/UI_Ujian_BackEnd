import React from 'react';
import axios from 'axios';
import { API_URL_1 } from '../helpers/apiurl';

class Product extends React.Component {
    state = { 
        listProduct: [], 
        addNamaProduct: '', 
        addDescriptionProduct: '',
        addHargaProduct: 0,
        editedId: 0,
        editNamaProduct: '', 
        editDescriptionProduct: '',
        editHargaProduct: 0
    }

    componentDidMount() {
       this.getListProduct()
    }

    getListProduct = () => {
        axios.get(API_URL_1 + '/product/getall')
        .then((res) => {
            this.setState({ 
                listProduct: res.data,
                addNamaProduct: '',
                addDescriptionProduct: '',
                addHargaProduct: 0,
                editedId: 0
            })
        }).catch((err) => {
            console.log(err.response)
        })
    }

    onButtonAddClick = () => {
        var body = {
            nama: this.state.addNamaProduct,
            description: this.state.addDescriptionProduct,
            harga: this.state.addHargaProduct
        }

        axios.post(API_URL_1 + '/product/add', body)
        .then((res) => {
            this.getListProduct()
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    onBtnDeleteClick = async (productId) => {
        try {
            if(window.confirm('Are you sure to delete?')) {
                var res = await axios.delete(API_URL_1 + `/product/delete/${productId}`)
                this.getListProduct()
            }    
        } catch(err) {
            console.log(err.response.data)
        }
    }

    onBtnSaveClick = async () => {
        try {
            if(window.confirm('Are you sure to update?')) {
                var res = await axios.put(API_URL_1 + `/product/edit/${this.state.editedId}`, {
                    nama: this.state.editNamaProduct,
                    description: this.state.editDescriptionProduct,
                    harga: this.state.editHargaProduct
                })
                this.getListProduct()
            }    
        } catch(err) {
            console.log(err.response.data)
        }
    }

    renderListProduct = () => {
        return this.state.listProduct.map((item, index) => {
            if(this.state.editedId !== item.id) {
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.description}</td>
                        <td>{item.harga}</td>
                        <td>
                            <input 
                                type="button" 
                                value="Edit" 
                                onClick={() => this.setState({ 
                                    editedId: item.id,
                                    editNamaProduct: item.nama,
                                    editDescriptionProduct: item.description,
                                    editHargaProduct: item.harga
                                })} 
                            />
                        </td>
                        <td>
                            <input type="button" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} />
                        </td>
                    </tr>
                )
            }

            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                        <input 
                            type="text" 
                            value={this.state.editNamaProduct} 
                            onChange={(e) => this.setState({ editNamaProduct: e.target.value })}
                        />
                    </td>
                    <td>
                        <textarea
                            value={this.state.editDescriptionProduct}
                            onChange={(e) => this.setState({ editDescriptionProduct: e.target.value })}
                        >
                        </textarea>
                    </td>
                    <td>
                        <input 
                            type="number" 
                            value={this.state.editHargaProduct} 
                            onChange={(e) => this.setState({ editHargaProduct: parseInt(e.target.value) })}
                        />
                    </td>
                    <td>
                        <input 
                            type="button" 
                            value="Cancel" 
                            onClick={() => this.setState({ 
                                editedId: 0
                            })} 
                        />
                    </td>
                    <td>
                        <input type="button" value="Save" onClick={this.onBtnSaveClick} />
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="pad-top-5">
                <center>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nama</th>
                                <th>Description</th>
                                <th>Harga</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListProduct()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td />
                                <td>
                                    <input 
                                        type="text" 
                                        value={this.state.addNamaProduct}
                                        placeholder="Nama Product"
                                        onChange={(e) => this.setState({ addNamaProduct: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={this.state.addDescriptionProduct}
                                        placeholder="Description Product"
                                        onChange={(e) => this.setState({ addDescriptionProduct: e.target.value })}
                                    >
                                    </textarea>
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={this.state.addHargaProduct} 
                                        onChange={(e) => this.setState({ addHargaProduct: parseInt(e.target.value) })}
                                    />
                                </td>
                                <td>
                                    <input type="button" value="Add" onClick={this.onButtonAddClick} />
                                </td>
                                <td />
                            </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
        )
    }
}

export default Product;