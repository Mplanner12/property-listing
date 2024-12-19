"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./components/PropertyCard";
import { IconContext } from "react-icons";
import { MdErrorOutline } from "react-icons/md";
import { motion } from "framer-motion";

interface Property {
  id: number;
  name: string;
  address: string;
  price: string;
  propertyType: string;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/properties`
        );
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch properties. Please try again later.");
        setLoading(false);
      }
    };
    setLoading(false);
    fetchProperties();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Property Listings</h1>
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
          <span>Loading Properties...</span>
        </div>
      ) : error ? (
        <div className="text-red-600 flex items-center">
          <IconContext.Provider value={{ className: "mr-2 w-6 h-6" }}>
            <MdErrorOutline />
          </IconContext.Provider>
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <motion.div
              key={property.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <PropertyCard {...property} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
