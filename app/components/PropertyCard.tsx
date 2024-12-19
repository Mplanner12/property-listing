"use client";
import React from "react";
import { motion } from "framer-motion";

interface Property {
  id: number;
  name: string;
  address: string;
  price: string;
  propertyType: string;
  imageUrl: string;
}

const PropertyCard: React.FC<Property> = ({
  id,
  name,
  address,
  price,
  propertyType,
  imageUrl,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * id }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="border rounded-lg shadow-lg overflow-hidden">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-600">{address}</p>
          <p className="text-gray-800 font-semibold">{price}</p>
          <span className="text-sm text-blue-600">{propertyType}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
