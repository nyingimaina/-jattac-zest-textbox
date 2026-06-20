import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ZestTextboxLayout } from '../components/ZestTextboxLayout';

const baseProps = {
  isMultiline: false,
  commonProps: { className: 'textbox', value: '', onChange: () => {} },
  finalHelperTextNode: null,
  helperTextConfig: undefined,
  helperTextPositioning: 'reserved' as const,
  showCounter: false,
  currentLength: 0,
  maxLength: undefined,
  counterColorClass: '',
  isPassword: false,
  isPasswordVisible: false,
  togglePasswordVisibility: () => {},
  showProgressBar: false,
  charPercentage: 0,
};

describe('ZestTextboxLayout — baseline', () => {
  it('renders an input inside a wrapper div', () => {
    const { container } = render(<ZestTextboxLayout {...baseProps} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe('DIV');
    expect(wrapper.querySelector('input')).toBeInTheDocument();
  });

  it('wrapper does not have fullWidth class when stretch is not set', () => {
    const { container } = render(<ZestTextboxLayout {...baseProps} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('fullWidth');
  });

  it('renders a textarea when isMultiline is true', () => {
    const { container } = render(
      <ZestTextboxLayout {...baseProps} isMultiline={true} />
    );
    expect(container.querySelector('textarea')).toBeInTheDocument();
    expect(container.querySelector('input')).not.toBeInTheDocument();
  });
});

describe('ZestTextboxLayout — stretch prop', () => {
  it('wrapper has fullWidth class when fullWidth prop is true', () => {
    const { container } = render(
      <ZestTextboxLayout {...baseProps} fullWidth={true} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('fullWidth');
  });

  it('wrapper does not have fullWidth class when fullWidth prop is false', () => {
    const { container } = render(
      <ZestTextboxLayout {...baseProps} fullWidth={false} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toContain('fullWidth');
  });
});
