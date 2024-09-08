import Image from "next/image";

const Auth = () => {
  return (
    <div className="relative h-full w-full bg-[url('/images/header.jpg')] bg-cover bg-center">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={"/images/logo.svg"} width={100} height={100} alt="logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-1/2 lg:max-w-md rounded-md h-full">

          </div>

        </div>
      </div>
    </div>
  );
};

export default Auth;
