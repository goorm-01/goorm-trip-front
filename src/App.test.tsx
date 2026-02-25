import { render, screen } from '@testing-library/react';
// 테스팅 단계에서 라우팅이 필요한 컴포넌트를 감싸기 위해 MemoryRouter를 사용
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('렌더링 확인', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByText('goorm-trip')).toBeInTheDocument();
});
