/**
 * HeaderLogo component that renders the logo image in the header layout.
 *
 * @component
 * @example
 * // Usage example:
 * <HeaderLogo />
 *
 * @returns {JSX.Element} The rendered logo image.
 */
const HeaderLogo = () => {
  return (
    <img className="header__logo" src="/assets/img/logo.svg" alt="HeaderLayout Logo"/>
  );
};

export default HeaderLogo;
