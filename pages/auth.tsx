import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useState } from "react";
import axios from "axios"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        name: userName,
      });
     }
    catch(error) {
      console.log(error)
    }
  },[])

  return (
    <div className="relative h-full w-full bg-[url('/images/header.jpg')] bg-cover bg-center">
      <div className="bg-black w-full h-full bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={"/images/logo.svg"} width={100} height={100} alt="logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-80 px-16 py-16 self-center mt-2 lg:w-1/2 lg:max-w-md rounded-md h-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  id="name"
                  value={userName}
                  onChange={(ev) => setUserName(ev.target.value)}
                />
              )}

              <Input
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />

              <Input
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Sign in" : "Register"}
            </button>
            <p className="text-neutral-500 mt-12">
             {variant === "login" ? "Don't have an account?" : "Already have an account?"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
