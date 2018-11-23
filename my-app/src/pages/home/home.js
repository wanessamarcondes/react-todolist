import React from 'react'
import { getUser } from '../../infra/local-storage'
import { Redirect } from 'react-router-dom'
import Postit from '../../components/postit'
import { getPostitsApi } from '../../apis/postit.api'

import './home.css'

class Home extends React.Component {
    constructor(){
        super()
        this.state = {
            postits : [],
            postitsFilters: [],
        }
    }
    componentDidMount() {
        console.log('hello componentDidMount foi criado')
        this.getPostits()
    }
    componentWillUnmount() {
        console.log('hello componentWillUnmount morreu :(')
    }
    getPostits = () => {
        getPostitsApi()
            .then((response) => {
                console.log(response)
                this.setState({
                    postits:  response.data.todo.reverse()
                })
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    onFilterPostit = (e)=>{
        const value = e.target.value
        const postits = this.state.postits.filter((item)=>{
            return item.title.toLowerCase().indexOf(value) !== -1
        })
        this.setState({
            postitsFilters: postits
        })
    }
    render(){
        const user  = this.props.user ? this.props.user : getUser()
        const postits = this.state.postitsFilters.length > 0
            ? this.state.postitsFilters
            : this.state.postits
        if(user){
             return (
                <div className='home'>
                        <input placeholder='Pesquisar' onChange={this.onFilterPostit} type='text' className='home__search' />
                        <div>
                            <Postit updatePostits={this.getPostits} />
                                {this.state.postits.map((item,index)=>(
                                    <Postit 
                                    key={item._id}
                                    id={item._id}
                                    title={item.title}
                                    text={item.desc}
                                    color={item.color}
                                    updatePostits={this.getPostits}
                                    />
                                    ))}
                        </div>
                   </div>
                )
                    
        }else{
             return <Redirect to='/login' />
        }
    }
} 
export default Home