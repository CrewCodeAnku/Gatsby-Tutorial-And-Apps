const path = require('path');

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions
    const result = await graphql(`
         {
            allRestApiGetallproduct {
                edges {
                  node {
                    data {
                      category
                      color
                      image
                      price
                      subcategory
                      title
                      userid
                      _id
                    }
                  }
                }
              }
          }
    `)

    if(result.errors) {
        throw new Error(result.errors)
    }

    const productdetail = result.data.allRestApiGetallproduct.edges

    const productdetailTemplate = path.resolve(`./src/templates/productdetail.tsx`)

    productdetail.forEach(({node}) => {
         node.data.forEach(data=>{
             node.url = `/product-detail/${data._id}`

             createPage({
                 path: node.url,
                 component: productdetailTemplate,
                 context:{
                     id: data._id
                 }
             })
         })
    })

}