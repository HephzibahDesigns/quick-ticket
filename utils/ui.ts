export const priorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-red-600 font-semibold font-poppins";
    case "Medium":
      return "text-yellow-600 font-semibold font-poppins";
    case "Low":
      return "text-green-600 font-semibold font-poppins";
    default:
      return "text-gray-500";
  }
};
