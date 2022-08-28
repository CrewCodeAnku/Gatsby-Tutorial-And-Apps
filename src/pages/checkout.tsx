import * as React from 'react';
import Seo from "../components/seo";
//import { graphql } from 'gatsby';
import Layout from "../components/layouts";
import CheckoutListing from "../components/checkout/checkoutlisting";
import ReactNotifications from 'react-notifications-component'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import 'animate.css'
import { navigate } from "gatsby"
import { connect } from 'react-redux';
import { resetCart } from '../stores/actions/product.actions.types';

  interface IndexPageProps {
    resetCart:any
  }

  class CheckOut extends React.Component<IndexPageProps, {}> {
    constructor(props: IndexPageProps, context: any) {
      super(props, context)
    }
    
    checkout = () => {

      store.addNotification({
        title: 'Success',
        message: "Order successfully placed!",
        type: 'default',
        insert: 'top',
        container: 'top-right',
        animationIn:  ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        }
      });
      this.props.resetCart();
      navigate("/shop");
    }

    public render() {
      return (
        <Layout>
            <Seo title="Checkout" />
            <ReactNotifications />
            <CheckoutListing method={this.checkout}/>
        </Layout>
      )
    }
  }

  export default connect(null, {
     resetCart
 })(CheckOut)
  
 