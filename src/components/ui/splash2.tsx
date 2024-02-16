import Footer from "./footer";

const Splash2: React.FC = () => {
  return (
    <div className="">
      <div className=" "></div>
      <div className="bg-white flex justify-between px-20 py-60">
        <div className="text-center w-1/3 bg-gray-200 rounded-lg py-20 px-4 p-4 mx-20">
          Input your flashcard subject
        </div>
        <div className="text-center w-1/3 bg-gray-200 rounded-lg py-20 px-4 p-4 mx-20">
          Ai will the generate your set
        </div>
        <div className="text-center w-1/3 bg-gray-200 rounded-lg py-20 px-4 p-4 mx-20">
          Get to Studying!
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Splash2;
