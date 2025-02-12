import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialButton from "../../components/button/GoogleButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

export default function Login() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    //log les informations du l'utilisateur
    console
      .log(`Email: ${email}, Password: ${password}`)
    
    try {
      // Connexion utilisateur côté client avec Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setMessage("Connexion réussie");

      // Redirige l'utilisateur vers la page d'accueil après une connexion réussie
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage("Mot de passe ou email incorrect");
    }
  };

  return (
    <motion.div
      className="w-full h-screen bg-gradient-to-b items-center justify-center flex shadow-xl from-gray-100 via-gray-200 to-gray-400 bg-[length:100%_200%]"
      animate={{ backgroundPosition: ["50% 0%", "50% 100%", "50% 0%"] }}
      transition={{ duration: 20, ease: "linear", repeat: Infinity }}
    >
      <div className="flex bg-white w-[600px] rounded-xl items-center py-6 px-6 flex-col gap-4 shadow-lg">
        {/* Logo et Titre */}
        <div className="flex items-center gap-2">
          <img className="w-12 h-12" src="/Logo.png" alt="Logo" />
          <h3 className="text-xl font-bold">FunnelVista</h3>
        </div>
        <h3 className="text-2xl font-semibold">Bienvenue à vous</h3>

        {/* Boutons de connexion */}
        <div className="flex gap-2 justify-center w-full">
          <SocialButton provider="google" />
          <SocialButton provider="google" />
        </div>

        {/* Séparateur */}
        <div className="flex items-center w-full mt-2">
          <hr className="flex-grow border-gray-300" />
          <p className="mx-2 text-gray-500 text-sm">Ou</p>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Formulaire de connexion */}
        <form className="w-2/3" onSubmit={handleLogin}>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              placeholder="exemple@entreprise.com"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block mt-4 text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••••"
                name="password"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                👁
              </span>
            </div>

            {/* Lien mot de passe oublié */}
            <div className="text-right mt-2">
              <a
                href="#"
                className="text-black underline text-sm font-medium hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              className={`w-full mt-4 py-2 rounded-lg font-semibold `}
            >
              Se connecter
            </button>
          </div>
        </form>

        {/* Lien pour s'inscrire */}
        <p className="text-sm text-gray-600 mt-4">
          Pas encore de compte ?{" "}
          <a
            href="#"
            className="text-black underline font-medium hover:underline"
          >
            Créer un compte gratuitement
          </a>
        </p>
      </div>
    </motion.div>
  );
}
