import Input from "@/components/Input";
import Image from "next/image";
import { useCallback, useState } from "react";
import axios from "axios"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import {FcGoogle} from "react-icons/fc"
import {FaGithub, faGithub} from "react-icons/fa"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

    const login = useCallback(async () => {
      try {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        name: userName,
      });

      login()
    } catch (error) {
      console.log(error);
    }
  }, [email, userName, password, login]);


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
              onClick={variant === "login" ? login : register}
              type="submit"
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Sign in" : "Register"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div className=" w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle />
              </div>
              <div className=" w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub  className="text-black" />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
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
