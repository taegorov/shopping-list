import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Table } from 'antd';
import { loadList, addItem } from '../../store/list';
import PostModal from "./PostModal";
import './List.css';



function List({ loadList, listItems, addItem }) {

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes'
    },
    {
      title: 'Aisle',
      dataIndex: 'aisle',
      key: 'aisle'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions'
    }
  ];



  useEffect(() => {
    loadList();
  }, [loadList])

  // function handleChecked(productName) {
  //   console.log(`${productName} checked!`)
  // }



  // const addItem = () => {
  //   console.log('item added!')
  // }


  return (
    <div>
      {/* <Switch>
        <Text>Test Switch</Text>
      </Switch> */}
      <PostModal />
      {/* {listItems.map((singleItem, id) => {
        // console.log('single item: ', singleItem)
        return (
          <div className="singleItem" key={id}>
            <Checkbox onChange={handleChecked}>Name: {singleItem.productName} </Checkbox>
            <Text>Quantity: {singleItem.quantity} </Text>
            <Text>Category: {singleItem.category} </Text>
            <Text>Price: ${singleItem.price} </Text>
            <Text>Notes: {singleItem.notes} </Text>
            <Text>{singleItem.image} </Text>
            <Text>Aisle: {singleItem.aisle} </Text>
          </div>
        )
      })
      } */}

      <Table
        className="singleItem"
        dataSource={listItems}
        columns={columns}
        rowSelection
      />
    </div>
  )
}


// for rendering in the dom
// map redux state to component props
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    listItems: state.shoppingList.shoppingList
  }
}

// for firing actions
const mapDispatchToProps = {
  loadList,
  addItem,
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
