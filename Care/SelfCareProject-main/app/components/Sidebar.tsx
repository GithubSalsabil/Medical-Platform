import Link from 'next/link';
import { Home, Settings, Users } from 'lucide-react';
import { BiUser, BiLogOut, BiColor } from 'react-icons/bi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaAppleAlt, FaUserMd, FaBrain } from 'react-icons/fa';
import { faDumbbell} from '@fortawesome/free-solid-svg-icons';
import PsychologyIcon from '@mui/icons-material/Psychology';
export const Sidebar = () => {
  return (
    <aside style={{ backgroundColor: 'rgb(0, 43, 106)' }} className="w-64 text-white flex flex-col">
      
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link href="/admin-dashboard/dashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <Home className="h-5 w-5" />
                <span>Home</span>
           
            </Link>
          </li>
          <li>
            <Link href="/admin-dashboard/listeDoctor"className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <FaUserMd className="h-5 w-5" />
                <span>Doctors</span>
              
            </Link>
          </li>
          <li>
            <Link href="/admin-dashboard/listeNutritionist"className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
                <FaAppleAlt className="h-5 w-5" />
                <span>Nutritionists</span>
              
            </Link>
          </li>
          <li>
            <Link href="/admin-dashboard/listeFitnessTrainer" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faDumbbell} className="h-5 w-5" />
                <span>FitnessTrainer</span>
          
            </Link>
          </li>
          <li>
            <Link href="/admin-dashboard/listePsychologist" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700">
            <PsychologyIcon className="h-5 w-5" />
                <span>Psychologist</span>
          
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
