import React, { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { serviceApi } from '../api/generalApi';
// import { loginThunk } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/store';

const AuthPage: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onLogin = (e: FormEvent) => {
    e.preventDefault();
    // if (emailRef.current?.value && passRef.current?.value) {
    //   serviceApi.auth.check({
    //     email: emailRef.current.value,
    //     password: passRef.current.value,
    //   });
    // }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <div className="nav_box">
            <div className="header_link">
              <Link to="/">contacts</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <h2>AUTH PAGE</h2>
          <div className="login_box">
            <form onSubmit={onLogin} className="login_form">
              <input ref={emailRef} type="text" className="login_input" />
              <input ref={passRef} type="text" className="pass_input" />
              <button type="submit" className="add_contact_btn">
                log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

// import { Field, Form, Formik } from 'formik';

// import { LoginFormType } from 'entities/auth/lib/types';

// import { useAppDispatch } from 'store/hooks/hooks';
// import { CustomInput } from 'shared/ui/CustomInput/CustomInput';
// import { CustomButton } from 'shared/ui/CustomButton/CustomButton';
// import { loginThunk } from 'components/auth/model/reducer';

// const initialLogin: LoginFormType = {
//   email: '',
//   password: '',
// };

// export const SignIn = () => {
//   const dispatch = useAppDispatch();

//   return (
//     <SignIn.Content>
//       <SignIn.Form>
//         <Formik>
//           {({ touched, errors, values, handleChange, handleBlur }) => (
//             <SignIn.Container>
//               <SignIn.Title>Вход</SignIn.Title>
//               <Field
//                 required
//                 handleChange={handleChange}
//                 handleBlur={handleBlur}
//                 touched={touched?.email}
//                 values={values?.email}
//                 type="text"
//                 placeholder="Email"
//                 name="email"
//                 id="email"
//                 errors={errors?.email}
//                 maxLength={100}
//                 component={CustomInput}
//                 width="100%"
//                 height="40px"
//                 padding="0 16px"
//                 marginBottom="16px"
//                 containerHoverBg="#eff4f5"
//               />
//               <Field
//                 required
//                 handleChange={handleChange}
//                 handleBlur={handleBlur}
//                 touched={touched?.password}
//                 values={values?.password}
//                 type="password"
//                 placeholder="Пароль"
//                 name="password"
//                 id="password"
//                 errors={errors?.password}
//                 maxLength={100}
//                 component={CustomInput}
//                 width="100%"
//                 height="40px"
//                 padding="0 16px"
//                 marginBottom="16px"
//                 minLength={8}
//                 containerHoverBg="#eff4f5"
//               />
//               <CustomButton
//                 type="submit"
//                 title="Войти"
//                 background="rgba(0, 158, 226, 1)"
//                 height="40px"
//                 width="100%"
//                 hoverBg="rgba(0, 158, 226, 1)"
//               />
//             </SignIn.Container>
//           )}
//         </Formik>
//       </SignIn.Form>
//     </SignIn.Content>
//   );
// };
