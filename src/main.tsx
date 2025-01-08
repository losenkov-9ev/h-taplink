import { createRoot } from 'react-dom/client';
import { App } from './app/App';

import { BrowserRouter } from 'react-router';
import { StoreProvider } from './app/providers/StoreProvider';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StoreProvider>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </StoreProvider>,
);
