import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from './pages/header/Header';
import Profile from './components/profile/Profile';
import Booking from './components/Booking/Booking';
import Payment from './components/Payment/Payment';
import Login from './components/Login/Login';
import Register from './components/register/Register';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from './components/Storecontext/StoreContext';
import AdminHome from './components/admin/AdminHome';
import AddTrain from './components/admin/pages/addTrain/AddTrain';
import TicketBooked from './components/admin/pages/TicketBooked/TicketBooked';
import TrainList from './components/admin/pages/Trainlist/TrainList';
import CreateCompartments from './components/admin/pages/compartments/Compartments';
import EditTrain from './components/admin/pages/editTrain/EditTrain';
import AboutUs from './components/AboutUs/AboutUs';
import ContactUs from './components/ContactUs/ContactUs';
import UserDetails from './components/admin/pages/userDetails/UserDetails';
import UserLoginDetails from './components/admin/pages/UserLoginDetails/UserLoginDetails';
import CreateStation from './components/admin/pages/createStation/station';
import Feedback from './components/admin/feedbaack/Feedback';
import BookedTicket from './components/booked ticket/BookedTicket';
import UserBooking from './components/admin/pages/userBooking/UserBooking';
import UserPayment from './components/admin/pages/userPayment/UserPayment';

function ProtectRouter() {
  const { token } = useContext(StoreContext);

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}

function AdminProtectRouter() {
  const admin = localStorage.getItem("user");

  if (admin !== "admin1") {  // Corrected condition
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<Header />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route element={<AdminProtectRouter />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/addTrain" element={<AddTrain />} />
            <Route path="/Trainbooked" element={<TicketBooked />} />
            <Route path="/TrainList" element={<TrainList />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/UserLoginDetails" element={<UserLoginDetails />} />
            <Route path="/stations" element={<CreateStation />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/EditTrain/:id" element={<EditTrain />} />
            <Route path="/UserBooking" element={<UserBooking />} />
            <Route path="/UserPayment" element={<UserPayment />} />
            <Route path="/compartments" element={<CreateCompartments />} />

          </Route>


          <Route element={<ProtectRouter />}>
            <Route path="/Booking/:id" element={<Booking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/About" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/BookedTicket" element={<BookedTicket />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
