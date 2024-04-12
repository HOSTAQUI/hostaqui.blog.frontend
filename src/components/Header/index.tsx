import { HeaderContainer, HeaderContent } from "./styles";

import logoImg from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <NavLink to="/">
          <img className="logo" src={logoImg} alt="" width="340px" />
        </NavLink>
      </HeaderContent>
    </HeaderContainer>
  );
}
