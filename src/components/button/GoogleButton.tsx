import { motion } from "framer-motion";
import { auth, googleProvider, db } from '../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



interface SocialButtonProps {
  provider: 'google' | 'microsoft' | 'apple';
}

export default function SocialButton({ provider }: SocialButtonProps) {
  const navigate = useNavigate();

  const getAuthProvider = () => {
    switch (provider) {
      case 'google':
        return googleProvider;
      case 'microsoft':
        return; // Add Microsoft provider here
      case 'apple':
        return; // Add Apple provider here
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  };

  const handleSignIn = async () => {
    try {
      const authProvider = getAuthProvider();
      if (!authProvider) {
        throw new Error('Auth provider is undefined');
      }
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        console.log('Utilisateur connecté:', {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
        navigate('/dashboard'); // Redirect if the user is found in Firestore
      } else {
        console.error("Vous n'êtes pas inscrit. Veuillez créer un compte.");
      }
    } catch (error) {
      console.error("Erreur lors de l'authentification :", error);
    }
  };

  return (
    <motion.button
      onClick={handleSignIn}
      className="flex items-center justify-center w-[250px] h-[35px] bg-white border border-gray-300 rounded-xl shadow-inner transition-all"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        alt="Google Logo"
        className="w-6 h-6 mr-2"
      />
      <span className="text-gray-700 font-medium">Google</span>
    </motion.button>
  );
}
