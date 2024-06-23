import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UseAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      setIsAdminLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/user/admin/${email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch admin status");
        }
        const data = await response.json();
        setIsAdmin(data.isAdmin || false); // Ensure isAdmin is a boolean
      } catch (error) {
        console.error("Error fetching admin status:", error);
        toast.error("Failed to fetch admin status", {
          position: "top-center",
        });
        setIsAdmin(false);
      } finally {
        setIsAdminLoading(false);
      }
    };

    if (email) {
      fetchAdminStatus();
    } else {
      setIsAdmin(false);
      setIsAdminLoading(false);
    }
  }, [email]);

  return [isAdmin, isAdminLoading];
};

export default UseAdmin;
