import React from 'react';
import axios from 'axios';
import { API_URL_1 } from '../helpers/apiurl';

class Category extends React.Component {
    state = { 
        listCategory: [], 
        addNamaCategory: '', 
        addParentId: 0, 
        editedId: 0,
        editNamaCategory: '', 
        editParentId: 0
    }

    componentDidMount() {
       this.getListCategory()
    }

    getListCategory = () => {
        axios.get(API_URL_1 + '/category/getall')
        .then((res) => {
            this.setState({ 
                listCategory: res.data,
                addNamaCategory: '',
                addParentId: 0,
                editedId: 0
            })
        }).catch((err) => {
            console.log(err.response)
        })
    }

    onChangeSelectParentId = (e) => {
        this.setState({ addParentId: parseInt(e.target.value) })
    }

    onButtonAddClick = () => {
        var body = {
            category: this.state.addNamaCategory
        }
        if (this.state.addParentId !== 0) {
            body.parentId = this.state.addParentId
        }

        axios.post(API_URL_1 + '/category/add', body)
        .then((res) => {
            this.getListCategory()
        }).catch((err) => {
            console.log(err.response.data)
        })
    }

    onBtnDeleteClick = async (categoryId) => {
        try {
            if(window.confirm('Are you sure to delete?')) {
                var res = await axios.delete(API_URL_1 + `/category/delete/${categoryId}`)
                this.getListCategory()
            }    
        } catch(err) {
            console.log(err.response.data)
        }
    }

    onBtnSaveClick = async () => {
        try {
            if(window.confirm('Are you sure to update?')) {
                var res = await axios.put(API_URL_1 + `/category/edit/${this.state.editedId}`, {
                    parentId: this.state.editParentId === 0 ? null : this.state.editParentId,
                    category: this.state.editNamaCategory
                })
                this.getListCategory()
            }    
        } catch(err) {
            console.log(err.response.data)
        }
    }

    renderListCategory = () => {
        return this.state.listCategory.map((item, index) => {
            if(this.state.editedId !== item.id) {
                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.categorychild}</td>
                        <td>{item.categoryparent}</td>
                        <td>
                            <input 
                                type="button" 
                                value="Edit" 
                                onClick={() => this.setState({ 
                                    editedId: item.id,
                                    editNamaCategory: item.categorychild,
                                    editParentId: item.parentId
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
                            value={this.state.editNamaCategory} 
                            onChange={(e) => this.setState({ editNamaCategory: e.target.value })}
                        />
                    </td>
                    <td>
                        <select
                            value={this.state.editParentId}
                            onChange={(e) => this.setState({ editParentId: parseInt(e.target.value) })}
                        >
                            <option value={0}>-- Pilih Category --</option>
                            {this.renderListPilihanParentCat()}
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
    
    renderListPilihanParentCat = () => {
        return this.state.listCategory.map((item) => {
            return (
                <option value={item.id}>{item.categorychild}</option>
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
                                <th>Category</th>
                                <th>Parent Category</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListCategory()}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td />
                                <td>
                                    <input 
                                        type="text" 
                                        value={this.state.addNamaCategory}
                                        placeholder="Nama Category"
                                        onChange={(e) => this.setState({ addNamaCategory: e.target.value })}
                                    />
                                </td>
                                <td>
                                    <select 
                                        value={this.state.addParentId}
                                        onChange={this.onChangeSelectParentId}
                                    >
                                        <option value={0}>-- Pilih Category --</option>
                                        {this.renderListPilihanParentCat()}
                                    </select>
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

export default Category;