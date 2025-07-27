import { db, auth } from "../../firebase";
import { Input } from "../ui/Input";
import { ShieldCheck } from "lucide-react";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PersonalInfo = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("male");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const [first, last] = user.displayName?.split(" ") || ["", ""];
      setFirstName(first || "");
      setLastName(last || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const resetFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setBirthdate("");
    setGender("male");
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        resetFields(); // Clear all inputs if logged out
      }
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "users", uid);

    try {
      // 1. Update Firebase Auth name
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });

      // 2. Update Firestore data
      await setDoc(
        userRef,
        {
          phone,
          birthdate,
          gender,
          email,
          firstName,
          lastName,
        },
        { merge: true }
      );

      toast.success("Profile updated successfully!");
      setSuccess(true);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const [first, last] = user.displayName?.split(" ") || ["", ""];
      setDisplayName(user.displayName || "");
      setFirstName(first);
      setLastName(last);
      setEmail(user.email || "");

      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPhone(data.phone || "");
          setBirthdate(data.birthdate || "");
          setGender(data.gender || "male");
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };

    fetchData();
  }, [user]);

  if (user === null) {
    return <div className="text-center py-6">Loading profile...</div>;
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-start sm:items-center gap-3 mb-6">
        <ShieldCheck className="text-pink-500 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mt-1 shrink-0" />
        <div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Personal Information
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Manage your personal details to keep your account information
            accurate and up to date.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Input
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          label="Enter your Birth Date"
          name="birthdate"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
      </div>

      {/* Gender */}
      <div className="flex gap-4 mb-4">
        <div
          className={`flex-1 text-center p-3 rounded border cursor-pointer ${
            gender === "male"
              ? "bg-pink-500 text-white border-pink-500"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setGender("male")}
        >
          ♂ Male
        </div>
        <div
          className={`flex-1 text-center p-3 rounded border cursor-pointer ${
            gender === "female"
              ? "bg-pink-500 text-white border-pink-500"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          onClick={() => setGender("female")}
        >
          ♀ Female
        </div>
      </div>

      {/* Note */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        To access some features of the service, you must complete your profile.
        This data is also used for shipping.{" "}
        <a href="#" className="text-pink-500 underline">
          Click here
        </a>
      </p>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={handleUpdate}
          className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer"
        >
          Cancel
        </button>
      </div>

      {success && (
        <p className="mt-3 text-green-500 font-medium">Profile updated!</p>
      )}
    </div>
  );
};

export default PersonalInfo;
