import Footer from './components/layout/Footer';
import AppRouter from './router/AppRouter';
import './App.css';

function App() {
  return (
    <>
      <main>
        <AppRouter />
      </main>
      <Footer />
    </>
  );
}

export default App;