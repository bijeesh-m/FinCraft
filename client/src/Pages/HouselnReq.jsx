// import React, { useState } from "react";
// import { useForm } from "react-hook-form";

// function HouselnReq() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [currentPart, setCurrentPart] = useState(1); // Track the current part (1 or 2)

//   // Handle form submission
//   const onSubmit = (data) => {
//     console.log("House Loan Form Data:", data);
//     // You can send the data to a backend API here
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4 border rounded-md shadow-md">
//       <h2 className="text-2xl font-bold mb-4 text-center">House Loan Application</h2>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         {currentPart === 1 && (
//           <>
//             {/* Personal Details */}
//             <h3 className="text-xl font-semibold mb-4">Personal Details</h3>

//             <div className="mb-4">
//               <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
//               <input
//                 type="text"
//                 id="fullName"
//                 {...register("fullName", { required: "Full Name is required" })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 {...register("email", { required: "Email is required", pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}₹/ })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             {/* House Details */}
//             <h3 className="text-xl font-semibold mb-4">House Details</h3>

//             <div className="mb-4">
//               <label htmlFor="houseValue" className="block text-sm font-medium mb-1">House Value (₹)</label>
//               <input
//                 type="number"
//                 id="houseValue"
//                 {...register("houseValue", { required: "House Value is required", min: 10000 })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.houseValue && <p className="text-red-500 text-sm mt-1">{errors.houseValue.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="downPayment" className="block text-sm font-medium mb-1">Down Payment (₹)</label>
//               <input
//                 type="number"
//                 id="downPayment"
//                 {...register("downPayment", { required: "Down Payment is required" })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.downPayment && <p className="text-red-500 text-sm mt-1">{errors.downPayment.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="loanAmount" className="block text-sm font-medium mb-1">Loan Amount (₹)</label>
//               <input
//                 type="number"
//                 id="loanAmount"
//                 {...register("loanAmount", { required: "Loan Amount is required" })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.loanAmount && <p className="text-red-500 text-sm mt-1">{errors.loanAmount.message}</p>}
//             </div>

//             <div className="flex justify-between mt-4">
//               {/* Next button */}
//               <button
//                 type="button"
//                 onClick={() => setCurrentPart(2)} // Go to the next part
//                 className="bg-blue-500 text-white p-2 rounded-md"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}

//         {currentPart === 2 && (
//           <>
//             {/* Supporting Documents */}
//             <h3 className="text-xl font-semibold mb-4">Supporting Documents</h3>

//             <div className="mb-4">
//               <label htmlFor="identityProof" className="block text-sm font-medium mb-1">Upload Proof of Identity</label>
//               <input
//                 type="file"
//                 id="identityProof"
//                 {...register("identityProof", { required: "Proof of Identity is required" })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.identityProof && <p className="text-red-500 text-sm mt-1">{errors.identityProof.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="incomeProof" className="block text-sm font-medium mb-1">Upload Proof of Income</label>
//               <input
//                 type="file"
//                 id="incomeProof"
//                 {...register("incomeProof", { required: "Proof of Income is required" })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.incomeProof && <p className="text-red-500 text-sm mt-1">{errors.incomeProof.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="addressProof" className="block text-sm font-medium mb-1">Upload Proof of Address</label>
//               <input
//                 type="file"
//                 id="addressProof"
//                 {...register("addressProof", { required: "Proof of Address is required" })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.addressProof && <p className="text-red-500 text-sm mt-1">{errors.addressProof.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="propertyDocuments" className="block text-sm font-medium mb-1">Upload Property Documents</label>
//               <input
//                 type="file"
//                 id="propertyDocuments"
//                 {...register("propertyDocuments", { required: "Property Documents are required" })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.propertyDocuments && <p className="text-red-500 text-sm mt-1">{errors.propertyDocuments.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="photograph" className="block text-sm font-medium mb-1">Upload Photograph</label>
//               <input
//                 type="file"
//                 id="photograph"
//                 {...register("photograph", { required: "Photograph is required" })}
//                 className="w-full p-2 border rounded-md"
//               />
//               {errors.photograph && <p className="text-red-500 text-sm mt-1">{errors.photograph.message}</p>}
//             </div>

//             <div className="flex justify-between mt-4">
//               {/* Back button */}
//               <button
//                 type="button"
//                 onClick={() => setCurrentPart(1)} // Go back to the previous part
//                 className="bg-gray-500 text-white p-2 rounded-md"
//               >
//                 Back
//               </button>

//               {/* Submit button */}
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white p-2 rounded-md"
//               >
//                 Submit House Loan Application
//               </button>
//             </div>
//           </>
//         )}
//       </form>
//     </div>
//   );
// }

// export default HouselnReq;
