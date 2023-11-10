
import React, { useState, useEffect } from 'react';
import './App.css';
import { BsFillCartCheckFill } from "react-icons/bs"
import { AiFillDelete } from "react-icons/ai"
import { Drawer, message } from 'antd';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  function Header() {
    return (
      <header>
        <h1 className='text-2xl font-bold text-center lg:text-4xl'>Ecommerce Website</h1>
        <div className=" cart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="flex justify-end w-full cart-icon pe-1" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="flex items-center gap-2 text-xl cart-count">{cart && cart.length}
              <BsFillCartCheckFill size={24} onClick={() => {
                setOpen(true);
                fetchData()
              }} className='cursor-pointer' />
            </span>
          </div>
        </div>
      </header>
    );
  }
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const addToCart = (product) => {
    // Assuming 'product' is an object representing the product to add to the cart

    fetch('http://localhost:8080/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(product), // Send the 'product' data in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data, e.g., update the cart state
        setCart(data);
        message.success("Product Added Successfully")
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const fetchData = () => {
    fetch('http://localhost:8080/api/cart', {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      }
    })
      .then(response => response.json())
      .then(data => {
        // Process the data received (list of items in the cart)
        setCart(data)
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
        message.error("Error occurs")
      });
  }
  const deleteData = (itemId) => {
    fetch(`http://localhost:8080/api/cart/${itemId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // Process the data received (list of items in the cart)
        message.success(data.message)
        fetchData()
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
        message.error("Error occurs")
      });
  }
  function Footer() {
    return (
      <footer style={{color:'white',backgroundColor:'black',textAlign:'center'}}>
        <p>&copy; {new Date().getFullYear()} My Awesome Website</p>
      </footer>
    );
  }
  return (
    <div className="pt-5 lg:px-10 md:px-3 container-fluid product-list-container">
      <Header />
      <h1 className='py-4 text-2xl font-bold text-center lg:mb-10 lg:text-4xl'>Product List</h1>
      <ul className="flex flex-wrap justify-center product-list">
        {products.map((product) => (
          <li className="border rounded-md product-item bg-slate-100" key={product.id}>
            <div className="flex justify-center w-full product-image">
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className="text-center product-details">
              <h2 className='my-3 text-2xl font-bold text-center '>{product.title}</h2>
              <p className='text-center'>{product.description}</p>
              <div className='flex justify-center gap-3'>
                <p><strong>Price:</strong></p>
                <p> ${product.price}</p>
              </div>
              <div className='flex justify-center gap-3'>
                <p><strong>Discount:</strong></p>
                <p>{product.discountPercentage}%</p>
              </div>
              <div className='flex justify-center gap-3'>
                <p><strong>Rating:</strong></p>
                <p> {product.rating}</p>
              </div>
              <div className='flex justify-center gap-3'>
                <p><strong>Stock:</strong></p>
                <p>{product.stock} units</p>
              </div>
              <div className='flex justify-center gap-3'>
                <p><strong>Brand:</strong></p>
                <p>{product.brand}</p>
              </div>
              <div className='flex justify-center gap-3'>
                <p><strong>Category:</strong></p>
                <p>{product.category}</p>
              </div>  
              <button className='px-4 py-1 mt-5 text-base border rounded-md lg:px-5 lg:text-lg bg-slate-200 hover:text-blue-600 hover:bg-white hover:shadow-md' 
              onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
      <Drawer width={600} title="Cart Items" placement="right" onClose={onClose} open={open}>
        {cart && cart.length > 0 ? (
          <>
            {cart.map((item, index) => (
              <div key={index} className='flex justify-start w-full gap-2 p-2 mt-2 capitalize border rounded-md shadow-lg bg-slate-100'>
                <img src={item.thumbnail} alt={item.title} style={{
                  height: "100px", width: "100px"
                }} />
                <div className='flex flex-col w-full'>
                  <p className='flex items-center justify-between font-medium text-md'>{item.title}
                    <AiFillDelete size={20} onClick={() => {
                      deleteData(item._id)
                    }} className='cursor-pointer hover:text-red-700' />
                  </p>
                  <p>brand: {item.brand} || price: {item.price}</p>
                  <p>rating: {item.rating} || quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </>
        ) : (<div className='flex items-center justify-center w-full h-full'>
          <h2>Empty Cart</h2>
        </div>)
        }
      </Drawer>
    </div>
  );
}
export default ProductList;
