
import React, { use, useState , useEffect} from "react";
import Image from "next/image";
import { useStateProvider } from "@/context/StateContext";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";
import axios from "axios";
import { ONBOARD_USER } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";

function Onboarding() {
  const router = useRouter();
  const [{ userInfo, newUser },dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [profileImage, setProfileImage] = useState("/default_avatar.png");


  useEffect(() => {
    if (!newUser && !userInfo?.email) {
      router.push("/login");
    }
    else if(!newUser && userInfo?.email) {
      router.push("/");
    }
  }, [newUser, userInfo,router]);
  
  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;
      try {
        const { data } = await axios.post(ONBOARD_USER, {
          email:userInfo?.email,
          name,
          about,
          profilePicture:profileImage,
        });
        if (data.status) {
          dispatch({
            type: reducerCases.SET_NEW_USER, newUser: false
          });

          dispatch({
            type: reducerCases.SET_USER_INFO,
             userInfo: {
              id: data.id,
              name,
              email,
              profileImage,
              status: about,
            }
          })
          router.push("/");
        }

      } catch (error) {
        console.log(error)
      }

    }
  };
  const validateDetails = () => {
    if (name.length < 3) {
      alert("Name should be at least 3 characters long");
      return false;
    }
    return true;
  }

  return (
    <div className="bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen w-full flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-xl w-full max-w-3xl text-white">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center text-center md:text-left md:items-start gap-4">
            <Image src="/whatsapp.gif" alt="whatsapp" height={100} width={100} className="rounded-full" />
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              WizzApp
            </h1>
            <p className="text-lg text-gray-300">Create Your Profile</p>
          </div>

          <div className="w-full max-w-md flex flex-col gap-6">
            <Input name="Display Name" state={name} setState={setName} label />
            <Input name="About" state={about} setState={setAbout} label />
            <div>
              <Avatar type="xl" profileImage={profileImage} setProfileImage={setProfileImage} />
            </div>

            <button
              className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 hover:opacity-90 transition-opacity duration-200 text-white font-semibold py-3 rounded-xl shadow-lg" onClick={onboardUserHandler}
              type="button"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;

