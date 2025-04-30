// import { Button } from "antd";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { googleSignIn, logOut } from "../redux/features/auth/authSlice";

// const LoginPage = () => {
//   const dispatch = useAppDispatch();
//   const { user } = useAppSelector((state) => state.auth);

//   return (
//     <div style={{ textAlign: "center", marginTop: 50 }}>
//       {!user ? (
//         <Button type="primary" onClick={() => dispatch(googleSignIn())}>
//           Sign in with Google
//         </Button>
//       ) : (
//         <div>
//           <p>Welcome, {user.name}</p>
//           <img
//             src={user.photo!}
//             alt="Profile"
//             style={{ width: 50, borderRadius: "50%" }}
//           />
//           <br />
//           <Button danger onClick={() => dispatch(logOut())}>
//             Log Out
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginPage;
