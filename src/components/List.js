import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Typography } from 'antd';
import { loadList } from '../store/list';
import './List.css';

const { Text } = Typography;


function List({ loadList, listItems }) {

  useEffect(() => {
    loadList();
  }, [loadList])

  return (
    <div>
      {listItems.map(singleItem => {
        console.log('single item: ', singleItem)
        return (
          <div className="singleItem">
            <Text>Name: {singleItem.productName} </Text>
            <Text>Quantity: {singleItem.quantity} </Text>
            <Text>Category: {singleItem.category} </Text>
            <Text>Price: ${singleItem.price} </Text>
            <Text>Notes: {singleItem.notes} </Text>
            <Text>{singleItem.image} </Text>
            <Text>Aisle: {singleItem.aisle} </Text>
          </div>
        )
      })
      }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(List);