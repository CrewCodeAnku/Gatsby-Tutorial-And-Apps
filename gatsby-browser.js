import './src/assets/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'; 

const $ = require('jquery');

export const onInitialClientRender = () => {
   
}

export const onRouteUpdate = ({location, prevLocation}) => {
     $(document).ready(function(){
         //write your custom jquery code
     })
}

export { default as wrapRootElement } from './src/stores/ReduxWrapper';