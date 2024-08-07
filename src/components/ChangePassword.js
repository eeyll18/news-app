import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

export default function ChangePassword() {
    const {currentUser} = useAuth();
    const [currentPassword,setCurrentPassword] = useState("");
    const [newPassword,setNewPassword] = useState("")


    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (currentUser) {
          try {
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            await reauthenticateWithCredential(currentUser, credential);
            await updatePassword(currentUser, newPassword);
            setCurrentPassword("");
            setNewPassword("");
            console.log('başarılı')
          } catch (err) {
            console.log(err.message);
          }
        }
      };
  return (
    <div>
      <form onSubmit={handleChangePassword} className="space-y-6">
        <h3 className="text-md font-semibold mt-16">Change Password</h3>
        <input
          type="password"
          value={currentPassword}
          placeholder="Current Password"
          className="w-full px-2 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          onChange={(e) => setCurrentPassword(e.target.value)}

        />
        <input
          type="password"
          value={newPassword}
          placeholder="New Password"
          className="w-full px-2 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-sm"
          onChange={(e) => setNewPassword(e.target.value)}

        />
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-pink-500 rounded hover:bg-pink-600 text-md"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
