import {
  FaBook,
  FaGraduationCap,
  FaHospital,
  FaStethoscope,
  FaUniversity,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const PrescriptionCard = () => {
  return (
    <div className="flex items-start bg-white p-4 rounded-lg shadow mb-4 max-w-sm relative">
      <div className="flex flex-col space-y-2">
        <img
          className="w-32 h-32 rounded mr-4"
          src="https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/QmUi84qorq5CBi8AUn5JpX77BPP9ARkkWdssfFNpSsRU86"
          alt="Student ID"
        />
        <h3 className="font-bold">Prescription</h3>
        <div>
          <p className="text-xs">Issued by a dPharm</p>
        </div>
      </div>

      <div className="flex flex-row items-center h-full justify-center space-x-5">
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold">dPharm</h3>
          <div className="flex flex-row">
            <div className="w-24 h-4 rounded-md ">
              <p className="text-xs">doctorId</p>
            </div>
            <div className="w-24 bg-gray-300 h-4 rounded-md "></div>
          </div>
          <div className="flex flex-row">
            <div className="w-24 h-4 rounded-md ">
              <p className="text-xs">Drug</p>
            </div>
            <div className="w-24 bg-gray-300 h-4 rounded-md "></div>
          </div>
          <div className="flex flex-row">
            <div className="w-24 h-4 rounded-md ">
              <p className="text-xs">Quantity</p>
            </div>
            <div className="w-24 bg-gray-300 h-4 rounded-md "></div>
          </div>
          <div className="flex flex-row">
            <div className="w-24 h-4 rounded-md ">
              <p className="text-xs">Dosage</p>
            </div>
            <div className="w-24 bg-gray-300 h-4 rounded-md "></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex text-gray-400 text-2xl">
        <FaStethoscope title="Stethoschope" className="mr-4" />
        <FaUserDoctor title="Doctor" className="mr-4" />
        <FaHospital title="Hospital" />
      </div>
    </div>
  );
};

export default PrescriptionCard;
