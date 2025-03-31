import { motion } from "framer-motion";

const AnimatedSearchBar = ({ query, handleSearchChange }) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 w-[40%] relative z-50 rounded-lg">
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-lg p-[3px]"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(45deg, #ff0080, #ff8c00, #40e0d0)",
          backgroundSize: "200% 200%",
        }}
      >
        {/* Inner White Box */}
        <div className="w-full h-full bg-white rounded-lg"></div>
      </motion.div>

      {/* Search Input */}
      <div className="relative bg-white shadow-lg p-0 rounded-lg border border-gray-300">
        <input
          type="text"
          placeholder="Search for a track or album"
          value={query}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-lg text-lg focus:outline-none"
        />
      </div>
    </div>
  );
};

export default AnimatedSearchBar;