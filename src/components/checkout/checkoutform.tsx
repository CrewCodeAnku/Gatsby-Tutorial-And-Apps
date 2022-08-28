import * as React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


const CheckOutForm:React.FC<{method:(request:any)=>void}> = (props) =>{
    return(
      <Formik
        initialValues = {{
            firstname: '',
            lastname: '',
            email: '',
            address:'',
            address2: '',
            country: '',
            state: '',
            zip: ''
        }}
        validationSchema = {Yup.object({
            firstname: Yup.string().required("First Name is required"),
            lastname: Yup.string().required("Last Name is required"),
            email: Yup.string()
                 .email('Invalid email address')
                 .required('Email address is required'),
            address: Yup.string().required("Address is required"),
            country: Yup.string().required("Country is required"),
            state: Yup.string().required("State is required"),
            zip: Yup.string().required("Zip is required")
         })}
         onSubmit={(values,{ setSubmitting }) => {
           const request = {
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              address: values.address,
              address2: values.address2,
              country: values.country,
              state: values.state,
              zip: values.zip
            }
            props.method(request);
            setSubmitting(false);
         }}
         >
            {({
                 values,
                 errors,
                 touched,
                 handleSubmit,
                 handleChange,
                 handleBlur,
                 isSubmitting,
                 isValidating
              }) => (
                  <Form 
                  onSubmit={handleSubmit}
                  className="needs-validation bg-white p-3"
               >
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="firstName">First name</label>
                        <input value={values.firstname} onBlur={handleBlur}  onChange={handleChange} type="text" name="firstname" placeholder="First Name"  className="form-control" id="firstName"/>
                        {errors.firstname && touched.firstname && <p className="invalid-feedback">{errors.firstname}</p>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="lastName">Last name</label>
                        <input value={values.lastname} onBlur={handleBlur}  onChange={handleChange} type="text" name="lastname" placeholder="Last Name"  className="form-control" id="lastName"/>
                        {errors.lastname && touched.lastname && <p className="invalid-feedback">{errors.lastname}</p>}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input value={values.email} onBlur={handleBlur}  onChange={handleChange} type="email" name="email" className="form-control" id="email" placeholder="you@example.com"/>
                    {errors.email && touched.email && <p className="invalid-feedback">{errors.email}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address">Address</label>
                    <input value={values.address} onBlur={handleBlur}  onChange={handleChange} type="text" name="address" className="form-control" id="address" placeholder="1234 Main St"/>
                    {errors.address && touched.address && <p className="invalid-feedback">{errors.address}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                    <input type="text" name="address2" className="form-control" id="address2" placeholder="Apartment or suite"/>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <label htmlFor="country">Country</label>
                        <select onChange={handleChange} name="country" className="custom-select d-block w-100" id="country">
                            <option value="">Choose...</option>
                            <option>United States</option>
                        </select>
                        {errors.country && touched.country && <p className="invalid-feedback">{errors.country}</p>}
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="state">State</label>
                        <select onChange={handleChange} name="state" className="custom-select d-block w-100" id="state">
                            <option value="">Choose...</option>
                            <option>California</option>
                        </select>
                        {errors.state && touched.state && <p className="invalid-feedback">{errors.state}</p>}
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="zip">Zip</label>
                        <input onBlur={handleBlur}  onChange={handleChange} name="zip" type="text" className="form-control" id="zip" placeholder=""/>
                        {errors.zip && touched.zip && <p className="invalid-feedback">{errors.zip}</p>}
                    </div>
                </div>
                <hr className="mb-4"/>
                <button 
                  className="btn btn-lg btn-block app-btn" 
                  type="submit"
                  disabled={isSubmitting || isValidating }
                 >
                      Continue to checkout
                </button>
           </Form>
       )}
      </Formik> 
    )
}

export default CheckOutForm
