import React, { useState } from 'react';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de réinitialisation du mot de passe
    console.log('Email soumis:', email);
  };

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col items-center justify-center p-4">
      {/* Logo en haut */}
      <div className="mb-8 text-white flex items-center">
        <div className="w-4 h-4 bg-red-500 transform rotate-45 mr-2"></div>
        <span className="text-lg font-medium">RED PRODUCT</span>
      </div>

      {/* Carte blanche du formulaire */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Mot de passe oublié?
        </h2>
        
        <p className="text-gray-600 text-sm mb-6">
          Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la façon de modifier votre mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre e-mail"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200"
          >
            Envoyer
          </button>
        </form>
      </div>

      {/* Lien de retour */}
      <div className="mt-6 text-gray-300">
        Revenir à la{' '}
        <a href="/login" className="text-yellow-500 hover:text-yellow-400">
          connexion
        </a>
      </div>
    </div>
  );
}