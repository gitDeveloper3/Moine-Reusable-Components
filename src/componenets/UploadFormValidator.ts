import { FormErrors, FormValues } from "./UploadImage";

const validateValue = (name: keyof FormValues, value: FormValues[typeof name]): string | undefined => {
    switch (name) {
      case "latitude":
        if (value < -90 || value > 90) {
          return "Latitude must be between -90 and 90 degrees.";
        }
        break; // Stops execution if this case runs successfully.
      case "longitude":
        console.log("longitude",value)
        if (value < -180 || value > 180) {
          return "Longitude must be between -180 and 180 degrees.";
        }
        break;
      case "altitude":
        if (value < 0) {
          return "Altitude must be a positive value.";
        }
        break;
      default:
        return "Invalid field name."; // Executes if `name` is not a valid key.
    }
  
    // Execution will reach here only if none of the above returned anything.
    return undefined;
  };

  export const validateForm=(formValues:FormValues)=>{
   
    const errors: Partial<FormErrors> = {}; // Start with an empty object

for(const [key,value] of Object.entries(formValues)){
    const error=validateValue(key as keyof FormValues,value)
    if(error){
        errors[key as keyof FormValues]=error
    }
}

return errors as FormErrors;

  }
  
  
 