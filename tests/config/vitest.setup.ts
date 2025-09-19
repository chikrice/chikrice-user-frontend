import { beforeAll, afterEach, afterAll } from 'vitest';

import useStore from 'src/store';

import { server } from '../_mocks';

// -------------------------------------

vi.mock('src/routes/navigation', () => ({
  setNavigate: vi.fn(),
  router: {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    reload: vi.fn(),
  },
}));

vi.mock('notistack', () => ({
  enqueueSnackbar: vi.fn(),
}));

export const createTestStore = () => {
  return useStore;
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
