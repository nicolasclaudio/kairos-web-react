# Testing Infrastructure

## 🧪 Test Setup

Kairos uses **Vitest** as the testing framework with **React Testing Library** for component testing.

## Running Tests

```bash
# Run tests once
npm run test:run

# Run tests in watch mode (interactive)
npm test

# Run tests with UI
npm run test:ui
```

## Test Coverage

### Components
- ✅ **QuickAddInput** (4 tests)
  - Renders with placeholder
  - Calls onAdd when Enter pressed
  - Clears input after submission
  - Doesn't submit empty input

- ✅ **PrioritySelector** (3 tests)
  - Renders all priority options
  - Calls onChange when clicked
  - Highlights selected priority

### Store
- ✅ **useTasksStore** (4 tests)
  - Adds tasks correctly
  - Toggles task completion
  - Deletes tasks
  - Opens/closes drawer

## Test Results

```
Test Files  3 passed (3)
Tests      11 passed (11)
Duration   ~26s
```

## Writing New Tests

1. Create test file next to component: `ComponentName.test.tsx`
2. Import testing utilities:
```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';
```

3. Wrap components in ThemeProvider:
```tsx
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={lightTheme}>
      {component}
    </ThemeProvider>
  );
};
```

4. Write tests using describe/it blocks

## Configuration

- **Test setup**: `src/test/setup.ts` - Configures jest-dom and cleanup
- **Vite config**: `vite.config.ts` - Vitest configuration
- **Environment**: jsdom (simulates browser environment)

## Best Practices

- Test user interactions, not implementation details
- Use `screen.getByRole()` when possible for accessibility
- Mock external dependencies with `vi.fn()`
- Keep tests simple and focused
- Test edge cases (empty input, etc.)
