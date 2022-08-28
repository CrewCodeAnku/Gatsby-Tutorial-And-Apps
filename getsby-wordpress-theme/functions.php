<?php
   add_theme_support('custom-logo');
   add_theme_support('menus');
   add_theme_support('post-thumbnails');

   function add_nav_menus() {
       register_nav_menus( array(
            'nav menu' => 'Navigation Bar',
            'footer menu' => 'Footer Bar',
       ));

   }

   add_action('init', 'add_nav_menus');

   function create_custom_posrtfolio_post_type(){
       register_post_type('portfolio', array(
           'labels'=>array(
               'name'=>__('Portfolio'),
               'singular_name'=>__('Portfolio')
           ),
           'public'=>true,
           'show_in_graphql'=>true,
           'graphql_single_name'=>'Portfolio',
           'graphql_plural_name'=>'Portfolios',
           'show_in_admin_bar'=>true,
           'show_in_rest'=>true
        ));

        add_post_type_support('portfolio', array(
            'thumbnail',
            'excerpt'
        ));
   }

   add_action('init', 'create_custom_portfolio_post_type');
?>