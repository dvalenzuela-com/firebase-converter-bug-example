import React from 'react';
import logo from './logo.svg';
import './App.css';

import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getFirestore, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { Order, OrderConverter, OrderStatus } from 'types';
import { useCollectionData } from "react-firebase-hooks/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "---",
  authDomain: "---", 
  projectId: "---",
  storageBucket: "---",
  messagingSenderId: "---",
  appId: "---"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();

function App() {

  	// Fetch all orders

  const orderCollection = collection(firestore, 'orders').withConverter(OrderConverter);
  const q = query<Order>(orderCollection, orderBy('created_at', 'asc'));
  const [orders, ordersLoading, ordersError, ordersSnapshot] = useCollectionData<Order>(q, {
    snapshotListenOptions: { includeMetadataChanges: true }
  });

  const handleCreateOrderWithDate = async () => {

    const newOrder: Order = {
      status: OrderStatus.OPEN,
      customer_id: null,
      discount: 0,
      fulfilled_at: null,
      general_note: null,
      line_items: [],
      payment_confirmed_by_waiter_id: null,
      delivered_by_waiter_id: null,
      table_number: null,
      tip: 0,
      total_price: 0,
      created_at: new Date(0)
    }

    const newDoc = doc(orderCollection);

    const result = await setDoc(newDoc, newOrder)
    alert('Order created!')

  }

  const handleCreateOrderWithTimestamp = async () => {

    const newOrder: Order = {
      status: OrderStatus.OPEN,
      customer_id: null,
      discount: 0,
      fulfilled_at: null,
      general_note: null,
      line_items: [],
      payment_confirmed_by_waiter_id: null,
      delivered_by_waiter_id: null,
      table_number: null,
      tip: 0,
      total_price: 0
    }

    const newDoc = doc(orderCollection);

    const result = await setDoc(newDoc, newOrder)
    alert('Order created! ')

  }

  return (
    <div className="App">
      <header className="App-header">

        <h1>Orders</h1>

        {ordersLoading && <p>Loading</p>}
        {ordersError && <p>Order error: {ordersError.message}</p>}

        <ul>
          {orders?.map( order => {
            return (
              <li key={order.id}>Order created at {order.created_at?.toISOString()}</li>
            )
          })}
        </ul>

        <p>The following buttons create orders. The first one passes a date object, therefore the converter skips line 12 where ServerTimestamp() is called and everything works.</p>
        <button onClick={handleCreateOrderWithDate}>Create order with new Date()</button>

        <p>Using the second button an order without date is created, which means line 12 where ServerTimestamp() is used gets called, creating an exception that can be seen in the console.</p>
        <button onClick={handleCreateOrderWithTimestamp}>Create order with serverTimestamp()</button>
      </header>
    </div>
  );
}

export default App;
