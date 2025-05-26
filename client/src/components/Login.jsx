import React from "react";
import styles from "./Login.module.css";
import logo from "../assets/images/logo2.png";
import loginImage from "../assets/images/adminLogin2.png";
import messageIcon from "../assets/icons/envelope.svg";
import lockIcon from "../assets/icons/lock.svg";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      {/* Left side - form */}
      <div className={styles.formSection}>
         <div className={styles.curve}></div>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Admin Login</h2>

          <div className={styles.inputGroup}>
           <img src={messageIcon} alt="Email Icon" className={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              aria-label="Email"
            />
          </div>

          <div className={styles.inputGroup}>
            <img src={lockIcon} alt="Password Icon" className={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              aria-label="Password"
            />
          </div>

          <div className={styles.forgot}>
            <a href="#">Forgot your password?</a>
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>Sign in</button>
          </div>
        </div>
      </div>

      {/* Right side - image */}
      <div className={styles.imageSection}>
        <img
          src={loginImage}
          alt="Login Visual"
          className={styles.loginImage}
        />
      </div>
    </div>
  );
}
