import './Header.css'

function Header() {
  const menuItems = ['MAISION', 'COLLECTION', 'SCENT', 'STORY', 'BEYOND', 'RITUAL']

  return (
    <header className="site-header" data-node-id="566:3031">
      <div className="site-header__inner">
        <img
          className="site-header__logo"
          src="/images/figma-logo.svg"
          width="116"
          height="36"
          alt="Diptyque Paris"
          data-node-id="566:3032"
        />

        <nav className="site-header__nav" aria-label="Primary navigation">
          <ul className="site-header__menu">
            {menuItems.map((item) => (
              <li className="site-header__menu-item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions" aria-label="Utility navigation">
          <img
            src="/images/search-icon.svg"
            width="30"
            height="30"
            alt="Search"
            data-node-id="566:3059"
          />
          <img
            src="/images/cart-icon.svg"
            width="29"
            height="29"
            alt="Cart"
            data-node-id="566:3055"
          />
          <img
            src="/images/account-icon.svg"
            width="28"
            height="29"
            alt="Account"
            data-node-id="566:3057"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
