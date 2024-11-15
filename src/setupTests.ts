import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/node";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  // This will remove any runtime request handlers
  // after each test, ensuring isolated network behavior.
  server.resetHandlers();
});
afterAll(() => server.close());
