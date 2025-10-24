import React, { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle, FaKey } from "react-icons/fa";
import { useStaffAuth, useCustomerAuth } from "../../../Global/Context";
import styles from "./Navbar.module.css";
import toast from "react-hot-toast";
import { ChangePasswordModal } from "./ChangePasswordModal";

export const Navbar = () => {
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userType = sessionStorage.getItem("userType");
  const staffAuth = useStaffAuth();
  const customerAuth = useCustomerAuth();

  const auth =
    userType === "staff"
      ? staffAuth
      : userType === "client"
      ? customerAuth
      : null;

  const userName = auth?.user?.nombre || "User";

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogOut = () => {
    auth?.logout?.();
    setIsDropdownOpen(false);
  };

  const handleChangePassword = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <img
        src="https://cdn.bdo.global/images/bdo_logo/1.0.0/bdo_logo_color.png"
        alt="BDO logo"
        className={styles.logo}
      />
      <h1 className={styles.title}>Costa Rica</h1>

      <div className={styles.menu}>
        <div className={styles.userDropdownContainer} ref={dropdownRef}>
          <div className={styles.userButton} onClick={toggleDropdown}>
            <FaUserCircle className={styles.userIcon} />
            <span className={styles.userName}>{userName}</span>
          </div>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {userType === "client" && (
                <div
                  className={styles.dropdownItem}
                  onClick={handleChangePassword}
                >
                  <FaKey className={styles.dropdownIcon} />
                  Change Password
                </div>
              )}
              <div
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={handleLogOut}
              >
                <FiLogOut className={styles.dropdownIcon} />
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ChangePasswordModal
          email={auth?.user?.email}
          onClose={closeModal}
          onSuccess={() => {
            toast.success("Password changed successfully!");
            closeModal();
          }}
          onError={(msg) => toast.error(msg)}
        />
      )}
    </nav>
  );
};
