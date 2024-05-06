import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './HeroPage.css';

const HeroPage = () => {
  return (
    <section className="hero-page">
      <div className="hero-page__background"></div>
      <Header />

      <div className="hero-page__hero-content">
        <h1>Welcome to CodeExec</h1>
        <p>Exectue code on your favourite programming languages</p>
        <Link className="hero-page__hero-content__cta" to="/select-language">
          Pick Your Language!
        </Link>
      </div>
    </section>
  );
};

export default HeroPage;
