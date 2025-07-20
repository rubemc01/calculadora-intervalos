// src/App.tsx

import React from 'react';
import IntervalCalculator from './components/IntervalCalculator';
import './App.css'; // Pode manter ou remover, dependendo se tem estilos globais

const App: React.FC = () => {
  // Renderize o componente diretamente, sem um div extra
  return <IntervalCalculator />;
};

export default App;