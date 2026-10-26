// Small inline SVG icons (outline style, 24×24).
// Inline SVGs cost no extra downloads, unlike an icon font or library.
//
// Usage: <SearchIcon className="h-5 w-5" />

function Icon({ paths, className = 'h-5 w-5', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export const HomeIcon = (props) => (
  <Icon
    paths={[
      'm2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12',
      'M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75',
    ]}
    {...props}
  />
);

export const SearchIcon = (props) => (
  <Icon paths={['m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z']} {...props} />
);

export const MenuIcon = (props) => <Icon paths={['M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5']} {...props} />;

export const CloseIcon = (props) => <Icon paths={['M6 18 18 6M6 6l12 12']} {...props} />;

export const MapPinIcon = (props) => (
  <Icon
    paths={[
      'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
      'M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
    ]}
    {...props}
  />
);

export const ShieldIcon = (props) => (
  <Icon
    paths={[
      'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
    ]}
    {...props}
  />
);

export const WarningIcon = (props) => (
  <Icon
    paths={[
      'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z',
      'M12 15.75h.007v.008H12v-.008Z',
    ]}
    {...props}
  />
);

export const CheckCircleIcon = (props) => (
  <Icon paths={['M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z']} {...props} />
);

export const ChartIcon = (props) => (
  <Icon
    paths={[
      'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75Z',
      'M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625Z',
      'M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z',
    ]}
    {...props}
  />
);

export const FilterIcon = (props) => (
  <Icon
    paths={[
      'M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5',
      'M10.5 18h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5',
      'M16.5 12h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75',
    ]}
    {...props}
  />
);

export const ChevronLeftIcon = (props) => <Icon paths={['M15.75 19.5 8.25 12l7.5-7.5']} {...props} />;

export const ChevronRightIcon = (props) => <Icon paths={['m8.25 4.5 7.5 7.5-7.5 7.5']} {...props} />;

export const UserIcon = (props) => (
  <Icon
    paths={[
      'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z',
      'M4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
    ]}
    {...props}
  />
);

// Filled star for ratings (uses fill instead of stroke)
export function StarIcon({ className = 'h-4 w-4', ...props }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" />
    </svg>
  );
}
