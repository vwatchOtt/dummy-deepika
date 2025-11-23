import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const handleNotFound = () => {
    navigate("/login");
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center flex-col"
      style={{
        backgroundImage: "url('/notFoundImg.png')",
        backgroundSize: "auto", // Ensure the image covers the entire screen
        backgroundPosition: "center", // Center the image to avoid misalignment
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-3xl font-bold mb-3 bg-[#f0f0f0] py-2 px-4 rounded-lg">
        404 - Page Not Found
      </h1>
      <div
        className="text-blue-600 cursor-pointer hover:underline text-lg bg-[#f0f0f0] py-2 px-4 rounded-lg"
        onClick={handleNotFound}
      >
        Go to Login page
      </div>
    </div>
  );
}
export default NotFound;
