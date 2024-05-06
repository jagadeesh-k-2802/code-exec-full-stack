import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import PythonLogo from '../../assets/python.png';
import CPPLogo from '../../assets/cpp.png';
import JavaLogo from '../../assets/java.png';
import NodeJsLogo from '../../assets/nodejs.svg';
import './SelectLanguagePage.css';

const SelectLanguagePage = () => {
  const languages = [
    { name: 'Python', lang: 'python', image: PythonLogo },
    { name: 'C++', lang: 'cpp', image: CPPLogo },
    { name: 'Java', lang: 'java', image: JavaLogo },
    { name: 'Node JS', lang: 'javascript', image: NodeJsLogo }
  ];

  return (
    <section className="select-language-page">
      <Header />

      <div className="select-language-page__content">
        <h1>Select Your Language</h1>
        <p>Choose Your Favourite One...</p>
      </div>

      <div className="select-language-page__grid">
        {languages.map(language => (
          <Link
            to={`/code?language=${language.lang}`}
            className="select-language-page__grid__item"
          >
            <img
              src={language.image}
              alt={`${language.name} Logo`}
              className="select-language-page__grid__item__img"
            />
            <h5 className="select-language-page__grid__item__title">
              {language.name}
            </h5>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SelectLanguagePage;
