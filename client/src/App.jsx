import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Forget from "./Pages/Forget";
import Loan from "./Pages/Loan";
import Insurance from "./Pages/Insurance";
import Cards from "./Pages/User/Cards";
import Deposits from "./Pages/Deposits";
import Home from "./Pages/User/Home";
import HomeLayout from "./layouts/HomeLayout";
import PrsnlLoan from "./Pages/PrsnlLoan";
import GoldLoan from "./Pages/GoldLoan";
import CarLoan from "./Pages/CarLoan";
import HouseLoan from "./Pages/HouseLoan";
import EducationLoan from "./Pages/EduLoan";
import HealthInsurance from "./Pages/HealthInsure";
import LifeInsurance from "./Pages/User/LifeInsure";
import GeneralInsurance from "./Pages/GeneralInsur";
import DebitCards from "./Pages/DebitCards";
import CreditCards from "./Pages/CreditCard";
import PaymentTransfer from "./Pages/PaymentTransfer";
import BillPayment from "./Pages/BillPayment";
import TaxPayment from "./Pages/TaxPayment";
import LoanRequest from "./Pages/LoanRequest";
import DepositReq from "./Pages/DepositReq";
import ManagerDash from "./Pages/Manager/ManagerDash";
import Requests from "./Pages/Manager/Requests";
import CardApplication from "./Pages/User/CardReq";
import AdminDash from "./Pages/Admin/AdminDash";
import RequestsPage from "./Pages/Manager/AccRequests";
import AboutUs from "./Pages/AboutUs";
import ComplaintPage from "./Pages/User/Complaint";
import FeedbackPage from "./Pages/FeedBack";
import AccountDashboard from "./Pages/User/AccountDashboard";
import ViewUsers from "./Pages/Admin/ViewUsers";
import { ToastContainer } from "react-toastify";
import AccountRequestForm from "./components/User/AccountRequestForm";
import ScrollToTop from "./components/scrolltotop/ScrollToTop";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AddManager from "./Pages/Admin/AddManager";
import Complaints from "./Pages/Admin/Complaints";
import Feedbacks from "./Pages/Admin/Feedbacks";
import ManagerLayout from "./layouts/ManagerLayout";
import LoanRequests from "./Pages/Manager/LoanRequests";
import LoanRepayment from "./Pages/User/LoanRepayment";
import NotFoundPage from "./Pages/NotFoundPage/NotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import InsuranceRequests from "./Pages/Manager/InsuranceRequests";
import InsuranceApplicationForm from "./Pages/User/InsurReq";
import InsuranceDashboard from "./Pages/User/InsuranceDashboard";
import LoanDashboard from "./Pages/User/LoanDashboard";
import CardRequests from "./Pages/Manager/CardRequests";
import CardDashboard from "./Pages/User/CardDashboard";
import Profile from "./Pages/User/Profile";
import BankTransfer from "./Pages/User/BankTransfer";
import ManagerProfile from "./Pages/Manager/ManagerProfile";

function App() {
    return (
        <div>
            <ToastContainer />
            <ScrollToTop />
            <Routes>
                {/* Pages with header and footer add here */}
                <Route path="/" element={<HomeLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/bankaccntdash" element={<AccountDashboard />} />
                        <Route path="/complaint" element={<ComplaintPage />} />
                        <Route path="/feedback" element={<FeedbackPage />} />
                        <Route path="/loans" element={<Loan />} />
                        <Route path="/insurance" element={<Insurance />} />
                        <Route path="/cards" element={<Cards />} />
                        <Route path="/deposits" element={<Deposits />} />
                        <Route path="/paymentsTransfer" element={<PaymentTransfer />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/bankaccntreg" element={<AccountRequestForm />} />
                        <Route path="/insurance-dashboard" element={<InsuranceDashboard />} />
                        <Route path="/loan-dashboard" element={<LoanDashboard />} />
                        <Route path="/card-dashboard" element={<CardDashboard />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                        <Route path="/personalloan" element={<PrsnlLoan />} />
                        <Route path="/goldloan" element={<GoldLoan />} />
                        <Route path="/carloan" element={<CarLoan />} />
                        <Route path="/houseloan" element={<HouseLoan />} />
                        <Route path="/educationloan" element={<EducationLoan />} />
                        <Route path="/healthInsurance" element={<HealthInsurance />} />
                        <Route path="/lifeInsurance" element={<LifeInsurance />} />
                        <Route path="/generalInsurance" element={<GeneralInsurance />} />
                        <Route path="/debitcard" element={<DebitCards />} />
                        <Route path="/creditcard" element={<CreditCards />} />
                        <Route path="/billpayment" element={<BillPayment />} />
                        <Route path="/taxpayment" element={<TaxPayment />} />
                        <Route path="/loanreq" element={<LoanRequest />} />
                        <Route path="/insurancereq" element={<InsuranceApplicationForm />} />
                        <Route path="/cardrequest" element={<CardApplication />} />
                        <Route path="/depositreq" element={<DepositReq />} />
                        <Route path="/pay-loan" element={<LoanRepayment />} />
                        <Route path="/transfer" element={<BankTransfer />} />
                    </Route>
                </Route>
                {/* Admin */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDash />} />
                    <Route path="/admin/users" element={<ViewUsers />} />
                    <Route path="/admin/addmanager" element={<AddManager />} />
                    <Route path="/admin/complaints" element={<Complaints />} />
                    <Route path="/admin/feedbacks" element={<Feedbacks />} />
                </Route>
                {/* Manager */}
                <Route path="/manager" element={<ManagerLayout />}>
                    <Route index element={<ManagerDash />} />
                    <Route path="/manager/bankaccountrequests" element={<RequestsPage />} />
                    <Route path="/manager/profile" element={<ManagerProfile />} />
                    <Route path="/manager/requests" element={<Requests />} />
                    <Route path="/manager/loan-requests" element={<LoanRequests />} />
                    <Route path="/manager/insurance-requests" element={<InsuranceRequests />} />
                    <Route path="/manager/card-requests" element={<CardRequests />} />
                </Route>
                {/* pages without header and footer */}
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chngpass" element={<Forget />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
