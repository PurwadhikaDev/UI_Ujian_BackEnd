import React from 'react';
import axios from 'axios';
import { API_URL_1 } from '../helpers/apiurl';

class ProductCategory extends React.Component {
    state = { 
        listProductCategory: [], 
        listProduct: [],
        listCategory: [],
        addProductId: null, 
        addCategoryId: null,
        editedId: 0,
        editProductId: null, 
        editCategoryId: null
    }

    componentDidMount() {
       this.getListProductCategory()
       this.getListCategory()
       this.getListProduct()
    }

    getListProductCategory = () => {
        axios.get(API_URL_1 + '/productcat/getall')
        .then((res) => {
            this.setState({ 
                listProductCategory: res.data,
                addProductId: null, 
                addCategoryId: null,
                editedId: 0
            })
        }).catch((err) => {
            console.log(err.response)
        })
    }

    getListProduct = () => {
        axios.get(API_URL_1 + '/product/getall')
        .then((res) => {
            this.setState({ 
                listProduct: res.data
            })
        }).catch((err) => {
            console.log(err.response)
        })
    }

    getListCategory = () => {
        axios.get(API_URL_1 + '/category/getallleaf')
        .then((res) => {
            this.setState({ 
                listCategory: res.data
            })
        }).catch((err) => {
            console.log(err.response)
        })
    }

    onButtonAddClick = () => {
        var body = {
            productId: this.state.addProductId,
            categoryId: this.state.addCategoryId
        }

        axios.post(API_URL_1 + '/productcat/add', body)
        .then((res) => {
            this.getListProductCategory()
            this.getListProduct()
            this.getListCategory()
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    onBtnDeleteClick = async (productId) => {
        try {
            if(window.confirm('Are you sure to delete?')) {
                var res = await axios.delete(API_URL_1 + `/productcat/delete/${productId}`)
                this.getListProductCategory()
                this.getListProduct()
                this.getListCategory()
            }    
        } catch(err) {
            console.log(err.response.data)
        }
    }

    onBtnSaveClick = async () => {
        try {
            if(window.confirm('Are you sure to update?')) {
                var res = await axios.put(API_URL_1 + `/productcat/edit/${this.state.editedId}`, {
                    productId: this.state.editProductId,
                    categoryId: this.state.editCategoryId
                })
                this.getListProductCategory()
                this.getListProduct()
                this.getListCategory()
            }    
        } catch(err) {
            console.log(err.response.data)
        }
    }

    renderListProductCategory = () => {
        return this.state.listProductCategory.map((item, index) => {
            if(this.state.editedId !== item.id) {
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.category}</td>
                        {/* <td>
                            <input 
                                type="button" 
                                value="Edit" 
                                onClick={() => this.setState({ 
                                    editedId: item.id,
                                    editCategoryId: item.categoryId,
                                    editProductId: item.productId
                                })} 
                            />
                        </td> */}
                        <td>
                            <input type="button" value="Delete" onClick={() => this.onBtnDeleteClick(item.productId)} />
                        </td>
                    </tr>
                )
            }

            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                        <select 
                            value={this.state.editProductId}
                            onChange={(e) => this.setState({ editProductId: parseInt(e.target.value) })}
                        >
                            <option value={null}>-- Pilih Product --</option>
                            {this.renderListPilihanProduct()}
                        </select>
                    </td>
                    <td>
                        <select 
                            value={this.state.editCategoryId}
                            onChange={(e) => this.setState({ editCategoryId: parseInt(e.target.value) })}
                        >
                            <option value={null}>-- Pilih Category --</option>
                            {this.renderListPilihanCategory()}
                        </select>
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

    renderListPilihanProduct = () => {
        return this.state.listProduct.map((item) => {
            return (
                <option value={item.id}>{item.nama}</option>
            )
        })
    }

    renderListPilihanCategory = () => {
        return this.state.listCategory.map((item) => {
            return (
                <option value={item.id}>{item.category}</option>
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
                                <th>Product</th>
                                <th>Category</th>
                                {/* <th /> */}
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListProductCategory()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td />
                                <td>
                                    <select 
                                        value={this.state.addProductId}
                                        onChange={(e) => this.setState({ addProductId: parseInt(e.target.value) })}
                                    >
                                        <option value={null}>-- Pilih Product --</option>
                                        {this.renderListPilihanProduct()}
                                    </select>
                                </td>
                                <td>
                                    <select 
                                        value={this.state.addCategoryId}
                                        onChange={(e) => this.setState({ addCategoryId: parseInt(e.target.value) })}
                                    >
                                        <option value={null}>-- Pilih Category --</option>
                                        {this.renderListPilihanCategory()}
                                    </select>
                                </td>
                                <td>
                                    <input type="button" value="Add" onClick={this.onButtonAddClick} />
                                </td>
                                {/* <td /> */}
                            </tr>
                        </tfoot>
                    </table>
                </center>
            </div>
        )
    }
}

export default ProductCategory;