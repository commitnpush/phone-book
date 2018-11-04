import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2;
  state = {
    information: [
      {
        id: 0,
        name: 'harry',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: 'lone',
        phone: '010-0000-0001'
      }
    ],
    keyword: ''
  }
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    });
  }
  handleCreate = (data) => {
    const {information} = this.state;
    this.setState({
      information: information.concat({id:this.id++, ...data})
    });
  }
  handleRemove = (id) => {
    const {information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }
  handleUpdate = (id, data)=> {
    const {information} = this.state;
    this.setState({
      information: information.map(
        (info) => {
          if(id === info.id){
            //info에 있었던 내용을 data로 변경
            return {...info, ...data};
          }else{
            return info;
          }
        }
      )
    });
  };
  render() {
    const {information, keyword} = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        <p>
          <input type="text" placeholder="검색 할 이름을 입력하세요"
            onChange={this.handleChange}
            value={keyword}/>
        </p>
        <PhoneInfoList data={filteredList}
                       onRemove={this.handleRemove}
                       onUpdate={this.handleUpdate}/>
      </div>

    );
  }
}

export default App;
