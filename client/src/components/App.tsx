import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroPage from '../pages/hero/HeroPage';
import SelectLanguagePage from '../pages/select-language/SelectLanguagePage';
import CodePage from '../pages/code/CodePage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HeroPage} />
        <Route path="/select-language" Component={SelectLanguagePage} />
        <Route path="/code" Component={CodePage} />
      </Routes>
    </Router>
  );
}
