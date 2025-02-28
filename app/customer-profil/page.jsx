import {get, list} from '@/app/api/api'
import CustomerProfilComponent from "@/components/CustomerProfilComponent/CustomerProfilComponent";

// const fetchCustomerData= async () => {
//   const fetchCustomerData = await get("/customers/profile").then(
//     (response) => response?.payload
//   );
//   return fetchCustomerData;
// }; kad bude live ovaj deo

  // const fetchBillingAddress = async() => {
  //     const fetchBillingAddress = await list("/customers/billing-address/").then(
  //     (response) => 
  //         response?.payload
          
  //     )
  //     return fetchBillingAddress;
  //     };


const CustomerProfil = async () => {
  // const customerData = await fetchCustomerData();
  // const billingAddress = await fetchBillingAddress();



  return(
  // <CustomerProfilComponent customerData={customerData} billingAddress={billingAddress}/>
  <CustomerProfilComponent />
  )
    
}

export default CustomerProfil;
