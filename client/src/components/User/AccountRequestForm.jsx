import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/yupSchemas";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

const BankAccountRequestForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        try {
            axiosInstance
                .post("/User/BankAccReg", data)
                .then((res) => {
                    toast.success("Request submitted.");
                    reset()
                })
                .catch((err) => {
                    toast.error("Error occured!");
                    reset()
                });
        } catch (error) {
            toast("Error submitting request.");
        }
    };

    return (
        <div className=" mx-auto bg-white p-6 rounded-lg my-5 ">
            <h2 className="text-2xl font-semibold text-center mb-5">Bank Account Request</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            {...register("firstname")}
                            placeholder="First Name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.firstname?.message}</p>
                    </div>
                    <div>
                        <input
                            {...register("lastname")}
                            placeholder="Last Name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.lastname?.message}</p>
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className=" text-sm font-bold text-gray-500"> Date of Birth</label>
                    <input
                        type="date"
                        
                        {...register("dateofbirth")}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.dateofbirth?.message}</p>
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        {...register("email")}
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                </div>

                {/* Phone */}
                <div>
                    <input
                        type="tel"
                        {...register("phone")}
                        placeholder="Phone Number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.phone?.message}</p>
                </div>

                {/* Address */}
                <div>
                    <input
                        {...register("address")}
                        placeholder="Address"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
                </div>

                {/* City & State */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            {...register("city")}
                            placeholder="City"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.city?.message}</p>
                    </div>
                    <div>
                        <input
                            {...register("state")}
                            placeholder="State"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                        />
                        <p className="text-red-500 text-sm mt-1">{errors.state?.message}</p>
                    </div>
                </div>

                {/* Postal Code */}
                <div>
                    <input
                        type="text"
                        {...register("postalcode")}
                        placeholder="Postal Code"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.postalcode?.message}</p>
                </div>

                {/* Branch */}
                <div>
                    <input
                        type="text"
                        {...register("branch")}
                        placeholder="Branch"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-500"
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.branch?.message}</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-500"
                >
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default BankAccountRequestForm;
