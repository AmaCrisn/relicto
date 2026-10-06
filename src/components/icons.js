function Icon({ children, className = "size-6", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export const AccountIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
  </Icon>
);

export const SearchIcon = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m16.2 16.2 4.8 4.8" />
  </Icon>
);

export const CartIcon = (props) => (
  <Icon {...props}>
    <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.45-1.1L20.5 8H6.1" />
    <circle cx="9.5" cy="19.5" r="1.3" />
    <circle cx="17" cy="19.5" r="1.3" />
  </Icon>
);

export const FavoriteIcon = (props) => (
  <Icon {...props}>
    <path d="M12 20.5s-8-4.6-8-10.2A4.6 4.6 0 0 1 12 7.6a4.6 4.6 0 0 1 8 2.7c0 5.6-8 10.2-8 10.2z" />
  </Icon>
);

export const HistoryIcon = (props) => (
  <Icon {...props}>
    <path d="M5 3h14v18l-2.33-1.5L14.33 21 12 19.5 9.67 21 7.33 19.5 5 21z" />
    <path d="M9 8h6M9 12h6" />
  </Icon>
);

export const AddressIcon = (props) => (
  <Icon {...props}>
    <path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);

export const PaymentIcon = (props) => (
  <Icon {...props}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 10h19M6.5 15h4" />
  </Icon>
);

export const PhoneIcon = (props) => (
  <Icon {...props}>
    <path d="M6.5 3.5h3l1.6 4.2-2.1 1.4a11.5 11.5 0 0 0 5.9 5.9l1.4-2.1 4.2 1.6v3a2 2 0 0 1-2 2C10.8 19.5 4.5 13.2 4.5 5.5a2 2 0 0 1 2-2z" />
  </Icon>
);

export const EmailIcon = (props) => (
  <Icon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7.5 8.5 6 8.5-6" />
  </Icon>
);

export const DiscountIcon = (props) => (
  <Icon {...props}>
    <path d="M3 12.2V4.5A1.5 1.5 0 0 1 4.5 3h7.7a1.5 1.5 0 0 1 1.06.44l7.3 7.3a1.5 1.5 0 0 1 0 2.12l-7.7 7.7a1.5 1.5 0 0 1-2.12 0l-7.3-7.3A1.5 1.5 0 0 1 3 12.2z" />
    <circle cx="9.5" cy="9.5" r="1.1" />
    <circle cx="14.5" cy="14.5" r="1.1" />
    <path d="M14.5 9.5l-5 5" />
  </Icon>
);

export const PlusIcon = (props) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const MinusIcon = (props) => (
  <Icon {...props}>
    <path d="M5 12h14" />
  </Icon>
);