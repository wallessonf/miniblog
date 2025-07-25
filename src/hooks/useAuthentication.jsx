import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      return user;
    } catch (error) {

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      setError(systemErrorMessage);
    }

    setLoading(false);
  };

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
console.log(error.code);
  console.log(error.message);
      switch (error.code) {
        case "auth/invalid-email":
          setError("Email inválido.");
          break;
        case "auth/user-disabled":
          setError("Usuário desativado.");
          break;
        case "auth/user-not-found":
          setError("Usuário não encontrado.");
          break;
          case "auth/invalid-credential":
          setError("Usuario ou senha icorretos.");
          break;
        case "auth/wrong-password":
          setError("Senha incorreta.");
          break;
        default:
          setError("Erro ao fazer login. Tente novamente mais tarde.");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    logout,
    login,
    loading,
  };
};