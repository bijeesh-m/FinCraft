import { useState } from "react";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email.includes("@")) {
            newErrors.email = "Invalid email address";
        }
        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axiosInstance
                .post("/Admin/login", { email, password })
                .then((res) => {
                    console.log(res);
                    toast.success("Login success!");
                    window.location.replace('/admin/dashboard')
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
    };

    console.log(errors);

    return (
        <div className="min-h-screen flex items-center bg-gradient-to-br from-slate-400 to-slate-950 justify-center bg-cover bg-center bg-no-repeat px-4">
            <div className="bg-[rgba(250,250,250,0.2)] bg-opacity-90 p-8 rounded-md shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full  p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full  p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
