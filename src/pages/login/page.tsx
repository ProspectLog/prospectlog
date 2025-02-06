import { motion } from "framer-motion";
import GoogleButton from "../../components/button/GoogleButton";
import MicrosoftButton from "../../components/button/MicrosoftButton";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <GoogleButton />
          <MicrosoftButton />
        </div>

        {/* Séparateur */}
        <div className="flex items-center w-full mt-2">
          <hr className="flex-grow border-gray-300" />
          <p className="mx-2 text-gray-500 text-sm">Ou</p>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Formulaire de connexion */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Adresse email
          </label>
          <input
            type="email"
            placeholder="exemple@entreprise.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mt-4 text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
              👁
            </span>
          </div>

          {/* Lien mot de passe oublié */}
          <div className="text-right mt-2">
            <a href="#" className="text-black underline text-sm font-medium hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Bouton de connexion */}
          <button
            className={`w-full mt-4 py-2 rounded-lg font-semibold ${
              email && password
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!email || !password}
          >
            Se connecter
          </button>
        </div>

        {/* Lien pour s'inscrire */}
        <p className="text-sm text-gray-600 mt-4">
          Pas encore de compte ?{" "}
          <a href="#" className="text-black underline font-medium hover:underline">
            Créer un compte gratuitement
          </a>
        </p>
      </div>
    </motion.div>
  );
}
