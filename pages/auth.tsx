import Input from "@/components/Input";
import Image from "next/image";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");


  return (
    <div className="relative h-full w-full bg-[url('/images/header.jpg')] bg-cover bg-center">
      <div className="bg-black w-full h-full bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={"/images/logo.svg"} width={100} height={100} alt="logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-80 px-16 py-16 self-center mt-2 lg:w-1/2 lg:max-w-md rounded-md h-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>

            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                id="name"
                value={userName}
                onChange={(ev) => setUserName(ev.target.value)}
              />

              <Input
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
