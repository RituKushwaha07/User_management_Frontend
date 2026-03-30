

import { useAuth } from "../store/auth";
import design from "../assets/design.png";
console.log('design path:', design);



export const Service = () => {
  const { services } = useAuth();

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Service</h1>
      </div>

      <div className="container grid grid-three-cols">
        {services?.map((curElem, index) => {
          const { price, service, provider, description } = curElem;

          return (
            <div className="card" key={index}>
              <div className="card-img">
                <img src={design} alt="our service info" width="500" />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>

                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};


// import design from "../assets/design.png";
// import { useAuth } from "../store/auth";

// export const Service = () => {
//   const { services } = useAuth();


//   return (
//     <section className="section-services">
//       <div className="container">
//         <h1 className="main-heading">Services</h1>
//       </div>

//       <div className="container grid grid-three-cols">

//         {services.map((curElem, index) => {

//           const { provider, price, service, description } = curElem;

//           return (
//           <div className="card" key={index}>
//             <div className="card-img">
//               <img src={design} alt="our services info" width="200" />
//             </div>

//             <div className="card-details">
//               <div className="grid grid-two-cols">
//                 <p>{provider}</p>
//                 <p>{price}</p>
//               </div>
//               <h2>{service}</h2>
//               <p>{description}</p>
//             </div>
//           </div>
//           )
//         })}

//       </div>

//     </section>
//   )
// }
