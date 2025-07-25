import styles from "./About.module.css";

import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Este projeto é um blog desenvolvido por Wallesson Fernando, utilizando React no front-end, Firebase no back-end e Tailwind CSS para o estilo. O objetivo do projeto é demonstrar habilidades práticas em desenvolvimento web moderno, incluindo autenticação de usuários, criação e gerenciamento de postagens, e navegação com React Router.
      </p>
      <Link to="/posts/create" className="btn">
        Criar post
      </Link>
    </div>
  );
};

export default About;