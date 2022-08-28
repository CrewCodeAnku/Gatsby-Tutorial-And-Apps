  import * as React from 'react';
  import Seo from "../components/seo";
  import Layout from "../components/layouts";
  import Cart from "../components/cart/cart";
  import { connect } from 'react-redux';
  import { removeFromCart, updateQuantity } from '../stores/actions/product.actions.types';
  
  interface IndexPageProps {
    removeFromCart:any,
    updateQuantity:any
  }

 class CartPage extends React.Component<IndexPageProps, {}> {
    constructor(props: IndexPageProps, context: any) {
      super(props, context)
    }
    public render() {
      return (
        <Layout>
            <Seo title="Cart" />
            <Cart updateQuantity={this.props.updateQuantity} removeFromCart={this.props.removeFromCart}/>
        </Layout>
      )
    }
  }

  export default connect(null, {
    removeFromCart,
    updateQuantity
 })(CartPage)
  
 