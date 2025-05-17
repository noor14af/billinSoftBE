const mongoose = require("mongoose");

const validationRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter((field = !data[field]));
  if (missingFields.length > 0) {
    throw new error(`Missing required fields: ${missingFields.join(", ")}`);
  }
};
  const validateEmails = (email)=>{

  }