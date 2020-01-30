import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItem:JSON.parse(localStorage.getItem('array')).slice(0)
        };
    }

    insertItem = (e)=>{
        let history=this.state.listItem.slice()
        let data=e.target.previousElementSibling.value;
        e.target.previousElementSibling.value=""
        let status={
            id:data,
            checkbox:false,
            name:data
        };
        localStorage.setItem('array',JSON.stringify(history.concat([status])))
        this.setState({listItem: history.concat([status])})
    }
    updateItem = (e)=>{
        let history=this.state.listItem;
        const check=history.filter((item)=>{return (item.id==e.target.nextElementSibling.textContent)})
        {console.log(check[0])}
        let index=history.indexOf(check[0])
        let status={
            id:check[0].name,
            checkbox:!check[0].checkbox,
            name:check[0].name
        };

        history.splice(index,1,status)
        localStorage.setItem('array',JSON.stringify(history))
        this.setState({listItem:history})
    }

    deleteItem = (e)=>{
        const history=this.state.listItem;
        const check=history.filter((item)=>{return (item.id==e.target.previousElementSibling.textContent)})
        {console.log(check[0])}
        let index=history.indexOf(check[0])

        history.splice(index,1)
        localStorage.setItem('array',JSON.stringify(history))
        this.setState({listItem:history})


    }

    render() {
        const history=this.state.listItem;
        let listArray=history.map((item,index)=> {
            if (item.checkbox) {

            return (
                <li className="listElement" key={item.id} name={item.id}>
                    <input type="checkbox" checked={item.checkbox}  onClick={this.updateItem}></input>
                    <div style={{textDecoration: "line-through"}}>{item.name}</div>
                    <button onClick={this.deleteItem}>"delete"</button>
                </li>)
        }else{
                return (
                    <li className="listElement" key={item.id} name={item.id}>
                        <input type="checkbox" checked={item.checkbox}  onClick={this.updateItem}></input>
                        <div >{item.name}</div>
                        <button onClick={this.deleteItem}>"delete"</button>
                    </li>)
            }
        })

        return (
            <div className="todolist">
            <div className="label">{"TO-DO List"}</div>
            <div className="inputCol">
                <input type="text"></input>
                <button className="submit" onClick={this.insertItem}>
                insert
                </button>
            </div>
                <div className="list">
                    <ul>{listArray}</ul>
                </div>
            </div>

        );

}
}

ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);
