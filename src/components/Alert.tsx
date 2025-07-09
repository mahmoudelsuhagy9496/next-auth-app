import { BsExclamationTriangle, BsCheckCircle } from "react-icons/bs";

interface AlertProps {
  type: "success" | "error";
  message: string;
}
const Alert = ({ type, message }: AlertProps) => {
  const setColor = () => {
    if (type === "error") return " bg-red-200 text-red-900 border-red-200";
    return "bg-green-100 text-green-900 border-green-200";
  };
  return (
    <div
      className={`rounded text-sm border my-1 p-2 flex items-center ${setColor()} `}
    >
      {type === "error" ? (
        <BsExclamationTriangle className="me-1" />
      ) : (
        <BsCheckCircle className="me-1" />
      )}
      {message}
    </div>
  );
};
export default Alert;
