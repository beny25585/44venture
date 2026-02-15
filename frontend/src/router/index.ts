import { NotFound } from '@/ui/pages/NotFound';
import { Jokes } from '@/ui/pages/Jokes';
import { Root } from '@/ui/Root';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Jokes }
    ]
  },
  {
    path: '*',
    Component: NotFound
  }
]);
