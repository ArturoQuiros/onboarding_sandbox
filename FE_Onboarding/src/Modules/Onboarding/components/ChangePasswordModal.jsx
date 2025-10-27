import React, { useState } from "react";
import axiosClient from "../../../Api/axiosClient";
import toast from "react-hot-toast";
import styles from "./ChangePasswordModal.module.css";

export const ChangePasswordModal = ({ email, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setOldPassword("");
    setNewPassword("");
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {};
    if (!oldPassword.trim())
      formErrors.oldPassword = "Old password is required";
    if (!newPassword.trim())
      formErrors.newPassword = "New password is required";
    else if (newPassword.length < 6)
      formErrors.newPassword = "Password must be at least 6 characters";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      await axiosClient.post(`/User/Outside/Password/Change/${email}`, {
        contrasenaVieja: oldPassword,
        contrasenaNueva: newPassword,
      });
      toast.success("Password changed successfully");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Password change error:", error);
      toast.error(
        error.response?.data || "Passwords doesn't match. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Change Password</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Enter your old password"
            />
            {errors.oldPassword && (
              <span className={styles.error}>{errors.oldPassword}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.formInput}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <span className={styles.error}>{errors.newPassword}</span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.primaryButton}`}
              disabled={loading}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
