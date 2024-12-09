import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './providers/QueryProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './components/Layout';
import Calculator from './pages/Calculator';
import { CalculatorProvider } from './contexts/CalculatorContext';

export default function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <BrowserRouter>
          <CalculatorProvider>
            <Layout>
              <Calculator />
            </Layout>
          </CalculatorProvider>
        </BrowserRouter>
      </QueryProvider>
    </ErrorBoundary>
  );
}