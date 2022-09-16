import './App.css';
import logo from './img/logo.png'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://breakingbadapi.com/api/characters')
      .then(resp => {
        setItems(resp.data);
        // console.log(resp.data);
      }).catch(error => console.error(error));
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filterItems = items.filter(items =>
    items.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='container'>

      <div className='center'>
        <img src={logo} alt='img' />
      </div>

      <section className='search'>
        <form>
          <input
            type='text'
            onChange={handleChange}
            className='form-control'
            placeholder='Search characters'
            autoFocus
          />
        </form>
      </section>

      <section className='cards'>
        {
          filterItems.map((item) => {
            return (
              <div key={item.char_id} className='card'>
                <div className='card-inner'>
                  <div className='card-front'>
                    <img src={item.img} alt='' />
                  </div>
                  <div className='card-back'>
                    <h1>{item.name}</h1>
                    <ul>
                      <li>
                        <strong>Actor Name:</strong> {item.portrayed}
                      </li>
                      <li>
                        <strong>Nickname:</strong> {item.nickname}
                      </li>
                      <li>
                        <strong>Birthday:</strong> {item.birthday}
                      </li>
                      <li>
                        <strong>Status:</strong> {item.status}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      
    </div>
  );
}
export default App;