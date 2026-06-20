import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ZestTextbox from '../ZestTextbox';

describe('ZestTextbox — stretch / fullWidth', () => {
  it('wrapper does not have fullWidth class by default', async () => {
    const { container } = render(<ZestTextbox placeholder="test" />);
    const wrapper = container.firstChild as HTMLElement;
    await waitFor(() => {
      expect(wrapper.className).not.toContain('fullWidth');
    });
  });

  it('wrapper has fullWidth class when stretch is true', async () => {
    const { container } = render(
      <ZestTextbox placeholder="test" zest={{ stretch: true }} />
    );
    const wrapper = container.firstChild as HTMLElement;
    await waitFor(() => {
      expect(wrapper.className).toContain('fullWidth');
    });
  });

  it('wrapper does not have fullWidth class when stretch is false', async () => {
    const { container } = render(
      <ZestTextbox placeholder="test" zest={{ stretch: false }} />
    );
    const wrapper = container.firstChild as HTMLElement;
    await waitFor(() => {
      expect(wrapper.className).not.toContain('fullWidth');
    });
  });
});
