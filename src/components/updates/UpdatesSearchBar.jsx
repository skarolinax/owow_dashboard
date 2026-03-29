export default function UpdatesSearchBar({ id, value, onChange, placeholder }) {
  return (
    <div className="updates-search">
      <label className="visually-hidden" htmlFor={id}>
        Search updates
      </label>
      <span className="updates-search__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Zm0-2a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
            fill="currentColor"
            opacity="0.45"
          />
          <path
            d="M16.2 17.8 20 21.6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      </span>
      <input
        id={id}
        className="updates-search__input"
        type="search"
        autoComplete="off"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
